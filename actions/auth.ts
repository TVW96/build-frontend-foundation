"use server";

import {
  SignupFormSchema,
  LoginFormSchema,
  type FormState,
  type LoginFormState,
  type SignupFieldValues,
} from "@/lib/definitions";
import { SESSION_COOKIE_NAME } from "@/lib/session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type CreateUserResponse = {
  user: {
    userId: string;
    email: string;
    username: string;
    fullName: string;
    region: string | null;
    createdAt: string;
  };
  session: {
    token: string;
    expiresAt: string;
  };
};

type ApiErrorResponse = {
  field?: "email" | "username";
  message?: string | string[];
};

type LoginResponse = CreateUserResponse;

function getSafeValues(formData: FormData): SignupFieldValues {
  const firstName = String(formData.get("firstName") ?? "");
  const lastName = String(formData.get("lastName") ?? "");

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    mailingAddressLine1: String(formData.get("mailingAddressLine1") ?? ""),
    mailingAddressLine2: String(formData.get("mailingAddressLine2") ?? ""),
    region: String(formData.get("region") ?? ""),
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

  const backendUrl = process.env.BACKEND_API_URL ?? "http://127.0.0.1:3001";
  let response: Response;

  try {
    response = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: validatedFields.data.fullName,
        mailingAddressLine1: validatedFields.data.mailingAddressLine1,
        mailingAddressLine2:
          validatedFields.data.mailingAddressLine2 || undefined,
        region: validatedFields.data.region,
        username: validatedFields.data.username,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return {
      status: "error",
      message:
        "The account service is unavailable. Make sure the backend is running and try again.",
      values,
    };
  }

  const responseBody = (await response.json().catch(() => ({
    message: "The account service returned an unexpected response.",
  }))) as CreateUserResponse | ApiErrorResponse;

  if (!response.ok) {
    const apiError = responseBody as ApiErrorResponse;
    const message = Array.isArray(apiError.message)
      ? apiError.message.join(" ")
      : (apiError.message ?? "We could not create your account.");

    return {
      status: "error",
      errors: apiError.field
        ? {
            [apiError.field]: [message],
          }
        : undefined,
      message,
      values,
    };
  }

  const createdAccount = responseBody as CreateUserResponse;
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, createdAccount.session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(createdAccount.session.expiresAt),
  });
  revalidatePath("/", "layout");

  return {
    status: "success",
    message: "Your account was created and your session is active.",
    values: {
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lastName,
      fullName: createdAccount.user.fullName,
      mailingAddressLine1: validatedFields.data.mailingAddressLine1,
      mailingAddressLine2: validatedFields.data.mailingAddressLine2,
      region: createdAccount.user.region ?? validatedFields.data.region,
      username: createdAccount.user.username,
      email: createdAccount.user.email,
    },
  };
}

export async function login(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "");
  const validatedFields = LoginFormSchema.safeParse({
    email,
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Check the highlighted fields and try again.",
      values: { email },
    };
  }

  const backendUrl = process.env.BACKEND_API_URL ?? "http://127.0.0.1:3001";
  let response: Response;

  try {
    response = await fetch(`${backendUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return {
      status: "error",
      message:
        "The sign-in service is unavailable. Make sure the backend is running and try again.",
      values: { email: validatedFields.data.email },
    };
  }

  const responseBody = (await response.json().catch(() => ({
    message: "The sign-in service returned an unexpected response.",
  }))) as LoginResponse | ApiErrorResponse;

  if (!response.ok) {
    const apiError = responseBody as ApiErrorResponse;
    const message = Array.isArray(apiError.message)
      ? apiError.message.join(" ")
      : (apiError.message ?? "We could not sign you in.");

    return {
      status: "error",
      message,
      values: { email: validatedFields.data.email },
    };
  }

  const authenticatedAccount = responseBody as LoginResponse;
  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(validatedFields.data.rememberMe
      ? { expires: new Date(authenticatedAccount.session.expiresAt) }
      : {}),
  };

  cookieStore.set(
    SESSION_COOKIE_NAME,
    authenticatedAccount.session.token,
    cookieOptions,
  );
  revalidatePath("/", "layout");

  return {
    status: "success",
    message: "Welcome back. Your session is active.",
    values: {
      email: authenticatedAccount.user.email,
      fullName: authenticatedAccount.user.fullName,
      username: authenticatedAccount.user.username,
    },
  };
}
