"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentAccount } from "@/app/account/_lib/client-api";

export default function SellPageClient() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [accountExists, setAccountExists] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const user = await getCurrentAccount();
        if (!active) return;
        if (!user) {
          // not authenticated -> route to signup prompt within /sell
          router.replace("/sell/signup-prompt");
          return;
        }
        setAccountExists(true);
      } catch {
        // treat errors as unauthenticated
        router.replace("/sell/signup-prompt");
      } finally {
        if (active) setChecking(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [router]);

  if (checking) {
    return (
      <main aria-live="polite">
        <section>
          <p>Verifying your account…</p>
        </section>
      </main>
    );
  }

  if (!accountExists) return null;

  return (
    <main id="main-content">
      <section>
        <h1>Sell on MangaMarketplace</h1>
        <p>
          Thanks for being a member — create a listing to sell a manga copy to the
          community.
        </p>
        <div>
          <p>
            (Placeholder for listing form — integrate listing form or flow here.)
          </p>
        </div>
      </section>
    </main>
  );
}
