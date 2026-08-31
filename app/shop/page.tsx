import type { Metadata } from "next";
import { getBrowseInventory } from "@/lib/marketplace-api";

import BrowseInventory from "./BrowseInventory";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Browse manga | MangaMarketplace",
  description: "Browse physical manga copies from community sellers.",
};

export default async function BrowsePage() {
  const browseInventory = await getBrowseInventory().catch((error: unknown) => {
    console.error("Unable to load Browse inventory", error);
    return null;
  });

  if (!browseInventory) {
    return (
      <div className={styles.page}>
        <main className={styles.main} id="main-content">
          <section className={styles.empty} aria-labelledby="api-error-heading">
            <p className={styles.eyebrow}>Connection issue</p>
            <h1 id="api-error-heading">Inventory is temporarily unavailable</h1>
            <p>
              Make sure the marketplace API is running, then refresh this page.
            </p>
          </section>
        </main>
      </div>
    );
  }

  const { inventoryItems, catalogProducts } = browseInventory;

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main} id="main-content">
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Community inventory</p>
          <h1>Browse manga copies</h1>
          <p>
            Explore the exact editions and conditions currently tracked by
            MangaMarketplace sellers.
          </p>
          <p className={styles.resultCount} aria-live="polite">
            {inventoryItems.length}{" "}
            {inventoryItems.length === 1 ? "copy" : "copies"}
          </p>
        </header>

        {inventoryItems.length > 0 ? (
          <BrowseInventory
            catalogProducts={catalogProducts}
            inventoryItems={inventoryItems}
          />
        ) : (
          <section className={styles.empty} aria-labelledby="empty-heading">
            <h2 id="empty-heading">No copies are available yet</h2>
            <p>Seed or add inventory, then refresh this page.</p>
          </section>
        )}
      </main>
    </div>
  );
}
