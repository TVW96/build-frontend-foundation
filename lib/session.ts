import "server-only";

import type { AccountUser } from "@/lib/account-types";
import { cookies } from "next/headers";
import { cache } from "react";

export const SESSION_COOKIE_NAME = "manga_session";

export const getCurrentAccount = cache(async (): Promise<AccountUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const backendUrl = process.env.BACKEND_API_URL ?? "http://127.0.0.1:3001";

  try {
    const response = await fetch(`${backendUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) return null;
    return (await response.json()) as AccountUser;
  } catch {
    return null;
  }
});
