import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join to sell | MangaMarketplace",
  description:
    "Create an account to sell on MangaMarketplace. Sign up to list your manga copies.",
};

export default function SellSignupPrompt() {
  return (
    <main id="main-content">
      <section>
        <p className="eyebrow">Selling requires an account</p>
        <h1>Create a free account to start selling</h1>
        <p>
          Members can list manga copies, manage orders, and use seller tools to
          track inventory. Join the community to begin selling.
        </p>

        <div>
          <Link href="/account/signup">Create an account</Link>
        </div>

        <p>
          Already have an account? <Link href="/account/login">Sign in</Link> to
          access seller tools.
        </p>
      </section>
    </main>
  );
}
