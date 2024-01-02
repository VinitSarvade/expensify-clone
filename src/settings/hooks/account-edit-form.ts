import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useShallow } from "zustand/react/shallow";
import { z } from "zod";

import { useUser } from "@/shared/store/user";

export interface AccountEditFormValues {
  firstName?: string;
  lastName?: string;
  profilePic?: string | null;
}

const validation = {
  firstName: { onChange: z.string().min(1, "First name is required") },
  lastName: { onChange: z.string().min(1, "Last name is required") },
};

export function useAccountEditForm(
  onSubmit: (values: AccountEditFormValues) => void,
) {
  const [firstName, lastName, profilePic, setUser] = useUser(
    useShallow((store) => [
      store.firstName,
      store.lastName,
      store.profilePic,
      store.setUser,
    ]),
  );
  const form = useForm({
    defaultValues: {
      firstName,
      lastName,
      profilePic,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
    validatorAdapter: zodValidator,
  });

  return { form, validation };
}
