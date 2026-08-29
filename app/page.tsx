import Card from "@/components/Card";
import Grid from "@/components/Grid";
import Navbar from "@/components/Navbar";
import Link from "next/link";

import { testProducts } from "@/data/grid-list-data";

export default function Home() {
  return (
    <div className="page">
      <Navbar />

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="main" id="main-content">
        {/* ---------- Community marketplace header ---------- */}
        <header className="communityHero" aria-labelledby="hero-heading">
          <div className="communityHeroGrid">
            <div className="communityHeroContent">
              <p className="communityHeroEyebrow">
                <span aria-hidden="true">読</span>
                Community-powered manga marketplace
              </p>
              <h1 className="communityHeroHeading" id="hero-heading">
                <span className="communityHeroHeadingPrimary">
                  Sell the copies you own.{" "}
                </span>
                <span className="communityHeroHeadingSecondary">
                  Buy the exact manga you want.
                </span>
              </h1>
              <p className="communityHeroLede">
                Search by series, volume, edition, ISBN, and condition. Track
                missing volumes, inspect real-copy photos, and bundle listings
                from trusted collectors.
              </p>

              <div className="communityHeroActions">
                <Link className="heroButton heroButtonPrimary" href="/shop">
                  Shop manga
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link className="heroButton heroButtonSecondary" href="/sell">
                  Sell your manga
                </Link>
              </div>

              <ul className="communityHeroAssurances" aria-label="Marketplace features">
                <li>Real-copy photos</li>
                <li>Edition details</li>
                <li>Singles &amp; sets</li>
              </ul>
            </div>

            <aside
              className="shelfFinder"
              aria-labelledby="shelf-finder-heading"
            >
              <div className="shelfFinderTopline">
                <span>Community find</span>
                <span className="shelfFinderStatus">Match spotted</span>
              </div>
              <h2 id="shelf-finder-heading">The missing-volume moment</h2>
              <p>
                Follow a series and let the community help fill the gap—down
                to volume, language, format, and printing.
              </p>

              <div className="volumeRun" aria-label="Volumes 1, 2, 4, and 5 owned; volume 3 wanted">
                <span>01</span>
                <span>02</span>
                <span className="volumeRunWanted">03</span>
                <span>04</span>
                <span>05</span>
              </div>

              <dl className="shelfFinderDetails">
                <div>
                  <dt>Wanted</dt>
                  <dd>Volume 03</dd>
                </div>
                <div>
                  <dt>Edition</dt>
                  <dd>English paperback</dd>
                </div>
                <div>
                  <dt>Condition</dt>
                  <dd>Good or better</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="communityHeroPaths" aria-label="How the marketplace helps">
            <Link href="/series">
              <span>01</span>
              <strong>Search the whole series</strong>
              <small>Title, volume, language, ISBN</small>
            </Link>
            <Link href="/sell">
              <span>02</span>
              <strong>Show the copy you own</strong>
              <small>Condition notes and seller photos</small>
            </Link>
            <Link href="/community">
              <span>03</span>
              <strong>Grow your collector circle</strong>
              <small>Share shelves, shops, and wish lists</small>
            </Link>
          </div>
        </header>

        {/* ---------- Test Card ---------- */}
        <Card title="This is a card component"
              description="This is a simple test card for demonstration purposes."
              imageUrl="/recycle.png"
         /> 

        {/* ---------- Test Grid ---------- */}
        <Grid List={testProducts.map((product) => (
          <Card
            key={product.sellerID}
            title={product.listingTitle}
            description={product.description}
            imageUrl={product.imageURL[0]}
          />
        ))} />

        {/* ---------- Featured genres ---------- */}
        <section className="categories" aria-labelledby="categories-heading">
          <header className="sectionHeader">
            <h2 className="sectionHeaderTitle" id="categories-heading">
              Browse by genre
            </h2>
            <a className="sectionHeaderLink" href="/genres">
              View all
            </a>
          </header>

          <ul className="categoryList">
            <li className="categoryCard">
              <a href="/shop?genre=shonen">
                <h3>Shōnen</h3>
                <p>Action and adventure for young readers.</p>
              </a>
            </li>
            <li className="categoryCard">
              <a href="/shop?genre=shojo">
                <h3>Shōjo</h3>
                <p>Romance and drama, character-driven.</p>
              </a>
            </li>
            <li className="categoryCard">
              <a href="/shop?genre=seinen">
                <h3>Seinen</h3>
                <p>Mature stories for adult readers.</p>
              </a>
            </li>
            <li className="categoryCard">
              <a href="/shop?genre=josei">
                <h3>Josei</h3>
                <p>Slice-of-life and romance for grown-ups.</p>
              </a>
            </li>
          </ul>
        </section>

        {/* ---------- Product grid ---------- */}
        <section className="productListing" aria-labelledby="listing-heading">
          <header className="sectionHeader">
            <h2 className="sectionHeaderTitle" id="listing-heading">
              Featured volumes
            </h2>

            <form className="listingFilters" aria-label="Filter and sort">
              <label htmlFor="filter-condition">Condition</label>
              <select id="filter-condition" name="condition">
                <option value="any">Any condition</option>
                <option value="new">New</option>
                <option value="used">Second-hand</option>
              </select>

              <label htmlFor="filter-sort">Sort by</label>
              <select id="filter-sort" name="sort">
                <option value="newest">Newest</option>
                <option value="popular">Most popular</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </form>
          </header>

          <ul className="productGrid">
            <li className="productCard">
              <article aria-labelledby="product-1-title">
                <a className="productCardMediaLink" href="/product/1">
                  <figure className="productCardMedia">
                    <img
                      src="/placeholder-product.jpg"
                      alt="Cover of Blade of the Meridian, Volume 3"
                      width={400}
                      height={400}
                    />
                  </figure>
                </a>
                <div className="productCardBody">
                  <h3 className="productCardTitle" id="product-1-title">
                    <a href="/product/1">Blade of the Meridian, Vol. 3</a>
                  </h3>
                  <p className="productCardAuthor">
                    by <a href="/authors/k-tanaka">K. Tanaka</a>
                  </p>
                  <p className="productCardCondition" data-condition="new">
                    <span className="visuallyHidden">Condition:</span>
                    New
                  </p>
                  <p className="productCardPrice">
                    <span className="visuallyHidden">Price:</span>
                    <data value="9.99">$9.99</data>
                  </p>
                  <button className="button buttonPrimary" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            </li>

            <li className="productCard">
              <article aria-labelledby="product-2-title">
                <a className="productCardMediaLink" href="/product/2">
                  <figure className="productCardMedia">
                    <img
                      src="/placeholder-product.jpg"
                      alt="Cover of Paper Lanterns, Volume 1"
                      width={400}
                      height={400}
                    />
                  </figure>
                </a>
                <div className="productCardBody">
                  <h3 className="productCardTitle" id="product-2-title">
                    <a href="/product/2">Paper Lanterns, Vol. 1</a>
                  </h3>
                  <p className="productCardAuthor">
                    by <a href="/authors/m-sato">M. Satō</a>
                  </p>
                  <p className="productCardCondition" data-condition="used">
                    <span className="visuallyHidden">Condition:</span>
                    Second-hand · Like new
                  </p>
                  <p className="productCardPrice">
                    <span className="visuallyHidden">Price:</span>
                    <data value="5.50">$5.50</data>
                  </p>
                  <button className="button buttonPrimary" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            </li>

            <li className="productCard">
              <article aria-labelledby="product-3-title">
                <a className="productCardMediaLink" href="/product/3">
                  <figure className="productCardMedia">
                    <img
                      src="/placeholder-product.jpg"
                      alt="Cover of Last Train North, Volume 7"
                      width={400}
                      height={400}
                    />
                  </figure>
                </a>
                <div className="productCardBody">
                  <h3 className="productCardTitle" id="product-3-title">
                    <a href="/product/3">Last Train North, Vol. 7</a>
                  </h3>
                  <p className="productCardAuthor">
                    by <a href="/authors/j-park">J. Park</a>
                  </p>
                  <p className="productCardCondition" data-condition="used">
                    <span className="visuallyHidden">Condition:</span>
                    Second-hand · Good
                  </p>
                  <p className="productCardPrice">
                    <span className="visuallyHidden">Price:</span>
                    <data value="4.00">$4.00</data>
                  </p>
                  <button className="button buttonPrimary" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            </li>

            <li className="productCard">
              <article aria-labelledby="product-4-title">
                <a className="productCardMediaLink" href="/product/4">
                  <figure className="productCardMedia">
                    <img
                      src="/placeholder-product.jpg"
                      alt="Cover of Tidepool, Volume 2"
                      width={400}
                      height={400}
                    />
                  </figure>
                </a>
                <div className="productCardBody">
                  <h3 className="productCardTitle" id="product-4-title">
                    <a href="/product/4">Tidepool, Vol. 2</a>
                  </h3>
                  <p className="productCardAuthor">
                    by <a href="/authors/l-mendez">L. Méndez</a>
                  </p>
                  <p className="productCardCondition" data-condition="new">
                    <span className="visuallyHidden">Condition:</span>
                    New
                  </p>
                  <p className="productCardPrice">
                    <span className="visuallyHidden">Price:</span>
                    <data value="10.99">$10.99</data>
                  </p>
                  <button className="button buttonPrimary" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            </li>
          </ul>

          <nav className="pagination" aria-label="Product pages">
            <a className="paginationPrev" href="/shop?page=1" aria-disabled="true">
              Previous
            </a>
            <ol className="paginationList">
              <li>
                <a href="/shop?page=1" aria-current="page">
                  1
                </a>
              </li>
              <li>
                <a href="/shop?page=2">2</a>
              </li>
              <li>
                <a href="/shop?page=3">3</a>
              </li>
            </ol>
            <a className="paginationNext" href="/shop?page=2">
              Next
            </a>
          </nav>
        </section>

        {/* ---------- Newsletter CTA ---------- */}
        <section className="newsletter" aria-labelledby="newsletter-heading">
          <h2 className="newsletterHeading" id="newsletter-heading">
            New arrivals every week
          </h2>
          <p className="newsletterLede">
            Get an email when fresh stock and restocks land. No spam,
            unsubscribe anytime.
          </p>
          <form className="newsletterForm" action="/subscribe" method="post">
            <label className="visuallyHidden" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
            <button className="button buttonPrimary" type="submit">
              Subscribe
            </button>
          </form>
        </section>
      </main>

      {/* ==================== SITE FOOTER ==================== */}
      <footer className="siteFooter">
        <div className="siteFooterInner">
          <nav className="footerNav" aria-label="Shop">
            <h2 className="footerNavTitle">Shop</h2>
            <ul>
              <li>
                <a href="/shop">All manga</a>
              </li>
              <li>
                <a href="/shop?condition=new">New releases</a>
              </li>
              <li>
                <a href="/shop?condition=used">Second-hand</a>
              </li>
            </ul>
          </nav>

          <nav className="footerNav" aria-label="Company">
            <h2 className="footerNavTitle">Company</h2>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/sell">Sell your manga</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>

          <nav className="footerNav" aria-label="Legal">
            <h2 className="footerNavTitle">Legal</h2>
            <ul>
              <li>
                <a href="/shipping">Shipping &amp; returns</a>
              </li>
              <li>
                <a href="/terms">Terms</a>
              </li>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="siteFooterBase">
          <p className="siteFooterCopyright">
            <small>© 2026 Mangamarketplace. All rights reserved.</small>
          </p>
        </div>
      </footer>
    </div>
  );
}
