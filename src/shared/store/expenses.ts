import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

interface Expense {
  merchant: string;
  amount: number;
  date: Date;
  description?: string;
  reimbursable?: boolean;
}

type ExpenseWithId = Expense & { id: number };

interface Expenses {
  expenses: ExpenseWithId[];
}

interface ExpensesStore extends Expenses {
  addExpense: (expense: Expense) => void;
}

export const useExpenses = create<ExpensesStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      addExpense: (expense: Expense) => {
        const expenses = get().expenses;
        set({
          expenses: [...expenses, { ...expense, id: expenses.length + 1 }],
        });
      },
    }),
    {
      name: "expenses",
      storage: createJSONStorage(() => {
        if (Platform.OS === "web") {
          return window.localStorage;
        }

        return {
          getItem: async (key: string) => {
            const value = await SecureStore.getItemAsync(key);
            return value !== null ? JSON.parse(value) : null;
          },
          setItem: async (key: string, value: unknown) => {
            await SecureStore.setItemAsync(key, JSON.stringify(value));
          },
          removeItem: async (key: string) => {
            await SecureStore.deleteItemAsync(key);
          },
        };
      }),
    },
  ),
);
