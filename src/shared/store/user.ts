import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePic?: string | null;
}

interface UserStore extends User {
  setUser: (user: User) => void;
  clearUser: () => void;
  setProfilePic: (pic: string) => void;
  clearProfilePic: () => void;
}

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      firstName: "Vinit",
      lastName: "Sarvade",
      email: "vinit.sarvade.08@gmail.com",
      profilePic: undefined,
      setUser: (user) => {
        set(user);
      },
      clearUser: () => {
        set({
          firstName: undefined,
          lastName: undefined,
          email: undefined,
        });
      },
      setProfilePic: (pic) => {
        set({ profilePic: pic });
      },
      clearProfilePic: () => {
        set({ profilePic: undefined });
      },
    }),
    {
      name: "user",
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
