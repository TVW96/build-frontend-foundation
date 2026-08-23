import Link from "next/link";

import styles from "./SiteHeader.module.css";

const utilityLinks = [
  { href: "/help", label: "Help center" },
  { href: "/orders", label: "Track an order" },
  { href: "/sell", label: "Start selling" },
];

const primaryLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/series", label: "Series" },
  { href: "/genres", label: "Genres" },
  { href: "/collectibles", label: "Collectibles" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <div className={styles.utilityBar}>
        <div className={styles.utilityBarInner}>
          <p className={styles.utilityMessage}>
            Free U.S. shipping on orders over $50
          </p>

          <nav aria-label="Utility navigation">
            <ul className={styles.utilityList}>
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.mainNavBar}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="MangaMarketplace home"
        >
          <span className={styles.brandMark} aria-hidden="true">
            ママ
          </span>
          <span>MangaMarketplace</span>
        </Link>

        <nav className={styles.primaryNav} aria-label="Primary navigation">
          <ul className={styles.primaryList}>
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.shoppingTools}>
          <form className={styles.search} role="search" action="/search">
            <label className={styles.visuallyHidden} htmlFor="header-search">
              Search manga and collectibles
            </label>
            <input
              id="header-search"
              type="search"
              name="q"
              placeholder="Search manga…"
            />
            <button type="submit">Search</button>
          </form>

          <ul className={styles.checkoutList} aria-label="Account and checkout">
            <li>
              <Link href="/account">Account</Link>
            </li>
            <li>
              <Link className={styles.cartLink} href="/cart">
                <span>Cart</span>
                <span className={styles.cartCount} aria-label="0 items">
                  0
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
