import type { Metadata } from "next";
import SellPageClient from "./SellPageClient";

export const metadata: Metadata = {
  title: "Sell | MangaMarketplace",
  description:
    "Sell manga copies on MangaMarketplace. Only available for signed in members.",
};

export default function SellPage() {
  return <SellPageClient />;
}
