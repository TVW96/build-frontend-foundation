import type { Metadata } from "next";
import ShopPageClient from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Browse manga | MangaMarketplace",
  description: "Browse physical manga copies from community sellers.",
};

export default function BrowsePage() {
  return <ShopPageClient />;
}
