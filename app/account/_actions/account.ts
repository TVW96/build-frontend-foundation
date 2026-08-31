"use server";

import type { AccountActionResult } from "@/app/account/_lib/account-types";
import { COUNTRY_OPTIONS } from "@/app/account/_lib/countries";
import { SESSION_COOKIE_NAME } from "@/app/account/_lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const countryCodes = new Set(COUNTRY_OPTIONS.map((country) => country.code));

const ProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  username: z
    .string()
    .trim()
    .min(3, "Use at least 3 characters.")
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, "Use only letters, numbers, and underscores."),
  region: z.string().refine((value) => countryCodes.has(value), {
    message: "Select a country.",
  }),
  avatarUrl: z
    .union([z.literal(""), z.url("Enter a complete http or https image URL.")])
    .refine((value) => !value || /^https?:\/\//i.test(value), {
      message: "Avatar URL must begin with http or https.",
    }),
});

const AddressSchema = z.object({
  addressId: z.string().optional(),
  label: z.string().trim().min(1, "Name this address.").max(60),
  addressLine1: z.string().trim().min(3, "Enter an address.").max(255),
  addressLine2: z.string().trim().max(255),
  city: z.string().trim().max(100),
  administrativeArea: z.string().trim().max(100),
  postalCode: z.string().trim().max(24),
  country: z.string().refine((value) => countryCodes.has(value), {
    message: "Select a country.",
  }),
  isDefault: z.boolean(),
});

const BioSchema = z.object({
  bio: z.string().trim().max(600, "Keep your bio under 600 characters."),
});

async function authenticatedRequest(
  path: string,
  init: RequestInit,
): Promise<Response | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const backendUrl = process.env.BACKEND_API_URL ?? "http://127.0.0.1:3001";
  try {
    return await fetch(`${backendUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init.headers,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return null;
  }
}

async function resultFromResponse(
  response: Response | null,
  successMessage: string,
): Promise<AccountActionResult> {
  if (!response) {
    return { ok: false, message: "Your session is unavailable. Sign in again." };
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const message = Array.isArray(body?.message)
      ? body.message.join(" ")
      : body?.message;
    return { ok: false, message: message ?? "We could not save that change." };
  }

  revalidatePath("/account");
  revalidatePath("/", "layout");
  return { ok: true, message: successMessage };
}

export async function updateProfile(
  formData: FormData,
): Promise<AccountActionResult> {
  const validation = ProfileSchema.safeParse({
    fullName: formData.get("fullName"),
    username: formData.get("username"),
    region: formData.get("region"),
    avatarUrl: formData.get("avatarUrl"),
  });

  if (!validation.success) {
    return {
      ok: false,
      message: "Check the highlighted details.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const response = await authenticatedRequest("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      ...validation.data,
      avatarUrl: validation.data.avatarUrl || null,
    }),
  });

  return resultFromResponse(response, "Profile updated.");
}

export async function updateBio(
  bio: string,
): Promise<AccountActionResult> {
  const validation = BioSchema.safeParse({ bio });
  if (!validation.success) {
    return {
      ok: false,
      message: validation.error.issues[0]?.message ?? "Check your bio.",
    };
  }

  const response = await authenticatedRequest("/users/me/bio", {
    method: "PATCH",
    body: JSON.stringify(validation.data),
  });

  return resultFromResponse(response, "Bio updated.");
}

export async function saveAddress(
  formData: FormData,
): Promise<AccountActionResult> {
  const validation = AddressSchema.safeParse({
    addressId: String(formData.get("addressId") ?? "") || undefined,
    label: formData.get("label"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    city: formData.get("city"),
    administrativeArea: formData.get("administrativeArea"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    isDefault: formData.get("isDefault") === "on",
  });

  if (!validation.success) {
    return {
      ok: false,
      message: "Check the highlighted address fields.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { addressId, ...address } = validation.data;
  const response = await authenticatedRequest(
    addressId ? `/users/me/addresses/${addressId}` : "/users/me/addresses",
    {
      method: addressId ? "PATCH" : "POST",
      body: JSON.stringify(address),
    },
  );

  return resultFromResponse(
    response,
    addressId ? "Address updated." : "Address added.",
  );
}

export async function deleteAddress(
  addressId: string,
): Promise<AccountActionResult> {
  const response = await authenticatedRequest(
    `/users/me/addresses/${addressId}`,
    { method: "DELETE" },
  );
  return resultFromResponse(response, "Address removed.");
}

export async function logout(): Promise<never> {
  await authenticatedRequest("/users/me/session", { method: "DELETE" });
  (await cookies()).delete(SESSION_COOKIE_NAME);
  revalidatePath("/", "layout");
  redirect("/account/login");
}

export async function deleteAccount(): Promise<AccountActionResult> {
  const response = await authenticatedRequest("/users/me", {
    method: "DELETE",
  });

  if (!response?.ok) {
    return resultFromResponse(response, "");
  }

  (await cookies()).delete(SESSION_COOKIE_NAME);
  revalidatePath("/", "layout");
  return { ok: true, message: "Account deleted." };
}
