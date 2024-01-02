import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useShallow } from "zustand/react/shallow";

import { useUser } from "@/shared/store/user";

const validations = {
  firstName: { onChange: z.string().min(1, "First name is required!") },
  lastName: { onChange: z.string().min(1, "Last name is required!") },
  email: {
    onBlur: z.string().email("Email is invalid!").min(1, "Email is required"),
  },
};

export interface OnBoardingForm {
  firstName: string;
  lastName: string;
  email: string;
}

export function useOnboardingForm(onSubmit: (values: OnBoardingForm) => void) {
  const [firstName, lastName, email] = useUser(
    useShallow((store) => [store.firstName, store.lastName, store.email]),
  );

  const form = useForm({
    defaultValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email: email ?? "",
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
    validatorAdapter: zodValidator,
  });

  return { form, validations };
}
