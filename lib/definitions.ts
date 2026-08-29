import * as z from "zod";

export const SignupFormSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, { error: "Enter at least 2 characters." })
      .max(120, { error: "Keep your display name under 120 characters." }),
    username: z
      .string()
      .trim()
      .min(3, { error: "Use at least 3 characters." })
      .max(50, { error: "Keep your username under 50 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        error: "Use only letters, numbers, and underscores.",
      }),
    email: z
      .string()
      .trim()
      .email({ error: "Enter a valid email address." })
      .max(320, { error: "Email must be 320 characters or fewer." }),
    password: z
      .string()
      .min(8, { error: "Use at least 8 characters." })
      .regex(/[a-zA-Z]/, { error: "Add at least one letter." })
      .regex(/[0-9]/, { error: "Add at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Add at least one special character.",
      }),
    confirmPassword: z.string(),
    acceptedTerms: z.literal("on", {
      error: "Accept the terms to create an account.",
    }),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupField =
  | "displayName"
  | "username"
  | "email"
  | "password"
  | "confirmPassword"
  | "acceptedTerms";

export type SignupFieldValues = Pick<
  z.infer<typeof SignupFormSchema>,
  "displayName" | "username" | "email"
>;

export type FormState = {
  status: "idle" | "error" | "success";
  errors?: Partial<Record<SignupField, string[]>>;
  message?: string;
  values?: SignupFieldValues;
};

export const initialSignupState: FormState = {
  status: "idle",
};
