import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

export interface AddExpenseFormValues {
  merchant: string;
  date: Date;
  amount: number;
  description: string;
  reimbursable: boolean;
}

const validation = {
  merchant: { onChange: z.string().min(1, "Merchant is required") },
  date: { onChange: z.date({ required_error: "Date is required" }) },
  amount: {
    onChange: z.coerce
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Please enter a valid amount",
      })
      .gt(0, "Amount must be greater than 0"),
  },
};

export function useAddExpenseForm(
  onSubmit: (values: AddExpenseFormValues) => void,
) {
  const form = useForm({
    defaultValues: {
      merchant: "",
      date: new Date(),
      amount: 0,
      description: "",
      reimbursable: false,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
    validatorAdapter: zodValidator,
  });

  return { form, validation };
}
