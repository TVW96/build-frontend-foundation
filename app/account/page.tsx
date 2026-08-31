import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCurrentAccount } from "@/app/account/_lib/session";
import AccountDashboard from "./AccountDashboard";

export const metadata: Metadata = {
  title: "My account | MangaMarketplace",
  description: "Manage your MangaMarketplace profile and saved addresses.",
};

export default async function AccountPage() {
  const account = await getCurrentAccount();

  if (!account) redirect("/account/login");

  return <AccountDashboard account={account} />;
}
