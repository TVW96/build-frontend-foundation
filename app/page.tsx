export default function Home() {
  return (
    <div className="page">
      {/* ==================== SITE HEADER ==================== */}
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="/" aria-label="Mangamarketplace — home">
            <span className="brand__mark" aria-hidden="true">
              ✦
            </span>
            <span className="brand__name">Mangamarketplace</span>
          </a>

          <nav className="primary-nav" aria-label="Primary">
            <ul className="primary-nav__list">
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/series">Series</a>
              </li>
              <li>
                <a href="/genres">Genres</a>
              </li>
              <li>
                <a href="/sell">Sell</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <form className="site-search" role="search" action="/search">
              <label className="site-search__label" htmlFor="site-search-input">
                Search manga
              </label>
              <input
                id="site-search-input"
                className="site-search__input"
                type="search"
                name="q"
                placeholder="Search titles, series, authors…"
              />
              <button className="site-search__submit" type="submit">
                Search
              </button>
            </form>

            <a className="account-link" href="/account">
              Account
            </a>

            <a className="cart-link" href="/cart">
              Cart
              <span className="cart-link__count" aria-label="0 items in cart">
                0
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="main" id="main-content">
        {/* ---------- Hero ---------- */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__content">
            <p className="hero__eyebrow">New &amp; second-hand</p>
            <h1 className="hero__heading" id="hero-heading">
              Buy and sell manga — new releases and pre-loved volumes
            </h1>
            <p className="hero__lede">
              Thousands of titles from shōnen classics to the latest seinen,
              every copy graded by condition. Find your next read, or sell the
              volumes on your shelf.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="/shop">
                Browse the shop
              </a>
              <a className="button button--secondary" href="/sell">
                Sell your manga
              </a>
            </div>
          </div>
          <figure className="hero__media">
            <img
              src="/placeholder-hero.jpg"
              alt="A shelf of assorted manga volumes"
              width={640}
              height={480}
            />
          </figure>
        </section>

        {/* ---------- Featured genres ---------- */}
        <section className="categories" aria-labelledby="categories-heading">
          <header className="section-header">
            <h2 className="section-header__title" id="categories-heading">
              Browse by genre
            </h2>
            <a className="section-header__link" href="/genres">
              View all
            </a>
          </header>

          <ul className="category-list">
            <li className="category-card">
              <a href="/shop?genre=shonen">
                <h3>Shōnen</h3>
                <p>Action and adventure for young readers.</p>
              </a>
            </li>
            <li className="category-card">
              <a href="/shop?genre=shojo">
                <h3>Shōjo</h3>
                <p>Romance and drama, character-driven.</p>
              </a>
            </li>
            <li className="category-card">
              <a href="/shop?genre=seinen">
                <h3>Seinen</h3>
                <p>Mature stories for adult readers.</p>
              </a>
            </li>
            <li className="category-card">
              <a href="/shop?genre=josei">
                <h3>Josei</h3>
                <p>Slice-of-life and romance for grown-ups.</p>
              </a>
            </li>
          </ul>
        </section>

        {/* ---------- Product grid ---------- */}
        <section className="product-listing" aria-labelledby="listing-heading">
          <header className="section-header">
            <h2 className="section-header__title" id="listing-heading">
              Featured volumes
            </h2>

            <form className="listing-filters" aria-label="Filter and sort">
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

          <ul className="product-grid">
            <li className="product-card">
              <article aria-labelledby="product-1-title">
                <a className="product-card__media-link" href="/product/1">
                  <figure className="product-card__media">
                    <img
                      src="/placeholder-product.jpg"
                      alt="Cover of Blade of the Meridian, Volume 3"
                      width={400}
                      height={400}
                    />
                  </figure>
                </a>
                <div className="product-card__body">
                  <h3 className="product-card__title" id="product-1-title">
                    <a href="/product/1">Blade of the Meridian, Vol. 3</a>
                  </h3>
                  <p className="product-card__author">
                    by <a href="/authors/k-tanaka">K. Tanaka</a>
                  </p>
                  <p className="product-card__condition" data-condition="new">
                    <span className="visually-hidden">Condition:</span>
                    New
                  </p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Price:</span>
                    <data value="9.99">$9.99</data>
                  </p>
                  <button className="button button--primary" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            </li>

            <li className="product-card">
              <article aria-labelledby="product-2-title">
                <a className="product-card__media-link" href="/product/2">
                  <figure className="product-card__media">
                    <img
                      src="/placeholder-product.jpg"
                      alt="Cover of Paper Lanterns, Volume 1"
                      width={400}
                      height={400}
                    />
                  </figure>
                </a>
                <div className="product-card__body">
                  <h3 className="product-card__title" id="product-2-title">
                    <a href="/product/2">Paper Lanterns, Vol. 1</a>
                  </h3>
                  <p className="product-card__author">
                    by <a href="/authors/m-sato">M. Satō</a>
                  </p>
                  <p className="product-card__condition" data-condition="used">
                    <span className="visually-hidden">Condition:</span>
                    Second-hand · Like new
                  </p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Price:</span>
                    <data value="5.50">$5.50</data>
                  </p>
                  <button className="button button--primary" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            </li>

            <li className="product-card">
              <article aria-labelledby="product-3-title">
                <a className="product-card__media-link" href="/product/3">
                  <figure className="product-card__media">
                    <img
                      src="/placeholder-product.jpg"
                      alt="Cover of Last Train North, Volume 7"
                      width={400}
                      height={400}
                    />
                  </figure>
                </a>
                <div className="product-card__body">
                  <h3 className="product-card__title" id="product-3-title">
                    <a href="/product/3">Last Train North, Vol. 7</a>
                  </h3>
                  <p className="product-card__author">
                    by <a href="/authors/j-park">J. Park</a>
                  </p>
                  <p className="product-card__condition" data-condition="used">
                    <span className="visually-hidden">Condition:</span>
                    Second-hand · Good
                  </p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Price:</span>
                    <data value="4.00">$4.00</data>
                  </p>
                  <button className="button button--primary" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            </li>

            <li className="product-card">
              <article aria-labelledby="product-4-title">
                <a className="product-card__media-link" href="/product/4">
                  <figure className="product-card__media">
                    <img
                      src="/placeholder-product.jpg"
                      alt="Cover of Tidepool, Volume 2"
                      width={400}
                      height={400}
                    />
                  </figure>
                </a>
                <div className="product-card__body">
                  <h3 className="product-card__title" id="product-4-title">
                    <a href="/product/4">Tidepool, Vol. 2</a>
                  </h3>
                  <p className="product-card__author">
                    by <a href="/authors/l-mendez">L. Méndez</a>
                  </p>
                  <p className="product-card__condition" data-condition="new">
                    <span className="visually-hidden">Condition:</span>
                    New
                  </p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Price:</span>
                    <data value="10.99">$10.99</data>
                  </p>
                  <button className="button button--primary" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            </li>
          </ul>

          <nav className="pagination" aria-label="Product pages">
            <a className="pagination__prev" href="/shop?page=1" aria-disabled="true">
              Previous
            </a>
            <ol className="pagination__list">
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
            <a className="pagination__next" href="/shop?page=2">
              Next
            </a>
          </nav>
        </section>

        {/* ---------- Newsletter CTA ---------- */}
        <section className="newsletter" aria-labelledby="newsletter-heading">
          <h2 className="newsletter__heading" id="newsletter-heading">
            New arrivals every week
          </h2>
          <p className="newsletter__lede">
            Get an email when fresh stock and restocks land. No spam,
            unsubscribe anytime.
          </p>
          <form className="newsletter__form" action="/subscribe" method="post">
            <label className="visually-hidden" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
            <button className="button button--primary" type="submit">
              Subscribe
            </button>
          </form>
        </section>
      </main>

      {/* ==================== SITE FOOTER ==================== */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <nav className="footer-nav" aria-label="Shop">
            <h2 className="footer-nav__title">Shop</h2>
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

          <nav className="footer-nav" aria-label="Company">
            <h2 className="footer-nav__title">Company</h2>
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

          <nav className="footer-nav" aria-label="Legal">
            <h2 className="footer-nav__title">Legal</h2>
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

        <div className="site-footer__base">
          <p className="site-footer__copyright">
            <small>© 2026 Mangamarketplace. All rights reserved.</small>
          </p>
        </div>
      </footer>
    </div>
  );
}
