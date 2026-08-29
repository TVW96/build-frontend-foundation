"use server";

import {
  SignupFormSchema,
  type FormState,
  type SignupFieldValues,
} from "@/lib/definitions";

function getSafeValues(formData: FormData): SignupFieldValues {
  return {
    displayName: String(formData.get("displayName") ?? ""),
    username: String(formData.get("username") ?? ""),
    email: String(formData.get("email") ?? ""),
  };
}

export async function signup(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = getSafeValues(formData);
  const validatedFields = SignupFormSchema.safeParse({
    ...values,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    acceptedTerms: formData.get("acceptedTerms"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Check the highlighted fields and try again.",
      values,
    };
  }

  // Validate the full signup contract without storing credentials. Replace
  // this return with the auth provider call once that service is connected.
  return {
    status: "success",
    message: "Your profile details are ready for account creation.",
    values: {
      displayName: validatedFields.data.displayName,
      username: validatedFields.data.username,
      email: validatedFields.data.email,
    },
  };
}
