import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import "./ddd-global.js";

// App components
import "./components/headerbar.js";
import "./components/mobilemenu.js";
import "./components/gamecard.js";
import "./components/newscard.js";
import "./components/footersection.js";
import "./components/infoband.js";
import "./components/imagegallery.js";
import "./components/herobanner.js";
import "./components/schedulerow.js";

export class SilverChariotApp extends LitElement {
  static properties = {
    page: { type: String },
    mobileMenuOpen: { type: Boolean },
    schedule: { type: Array }
  };

  constructor() {
    super();
    this.page = this._getPageFromUrl();
    this.mobileMenuOpen = false;
    this.schedule = [];
    this._onPopState = this._onPopState.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Fetch schedule data from API
    fetch("/api/schedule", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.schedule = Array.isArray(data?.upcoming) ? data.upcoming : [];
      })
      .catch((err) => console.error("schedule load error", err));

    window.addEventListener("popstate", this._onPopState);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this._onPopState);
    super.disconnectedCallback();
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      color: var(--ddd-theme-default-white);
      background: var(--ddd-theme-default-black);
      font-family: var(--ddd-font-primary);
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--ddd-spacing-6) var(--ddd-spacing-4) var(--ddd-spacing-10);
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-8);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-4);
      margin-top: var(--ddd-spacing-5);
    }
  `;

  _getPageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || "home";
  }

  _setUrlForPage(id) {
    const url = id === "home" ? "/" : `/?page=${id}`;
    window.history.pushState({}, "", url);
  }

  _onPopState() {
    this.page = this._getPageFromUrl();
  }

  // Navigation handler
  changePage(e) {
    const id = e.detail;
    this.page = id;
    this._setUrlForPage(id);

    if (this.mobileMenuOpen) this.mobileMenuOpen = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  _renderSchedulePage() {
    return html`
      <section>
        <schedule-row
          heading="Upcoming Games"
          .games=${this.schedule}
        ></schedule-row>

        ${this.schedule.length === 0
          ? html`<p>No games in the list right now.</p>`
          : html`
              <div class="list">
                ${this.schedule.map(
                  (g) => html`<game-card compact .game=${g}></game-card>`
                )}
              </div>
            `}
      </section>
    `;
  }

  _renderNewsPage() {
    return html`
      <section>
        <h2>Silver Chariot News</h2>
        <news-card></news-card>
      </section>
    `;
  }

  _renderParentsPage() {
    return html`
      <section>
        <h2>Parent Information</h2>
        <p>
          Silver Chariot is a youth hockey club focused on player development,
          balance, and long-term growth.
        </p>
      </section>
    `;
  }

  _renderHomePage() {
    const rail = this.schedule.slice(0, 8);
    const list = this.schedule.slice(0, 2);

    return html`
      <hero-banner></hero-banner>
      <info-band></info-band>

      <section id="upcoming">
        <schedule-row
          heading="Upcoming Games"
          .games=${rail}
        ></schedule-row>

        ${list.length === 0
          ? html`<p>No games in the list right now.</p>`
          : html`
              <div class="list">
                ${list.map(
                  (g) => html`<game-card compact .game=${g}></game-card>`
                )}
              </div>
            `}
      </section>

      <image-gallery></image-gallery>
    `;
  }

  _renderPageBody() {
    if (this.page === "schedule") return this._renderSchedulePage();
    if (this.page === "news") return this._renderNewsPage();
    if (this.page === "parents") return this._renderParentsPage();
    return this._renderHomePage();
  }

  render() {
    return html`
      <header-bar
        .page=${this.page}
        @nav-change=${this.changePage}
        @open-menu=${this.toggleMenu}
      ></header-bar>

      <mobile-menu
        ?open=${this.mobileMenuOpen}
        .page=${this.page}
        @nav-change=${this.changePage}
        @close-menu=${this.toggleMenu}
      ></mobile-menu>

      <main>${this._renderPageBody()}</main>

      <footer-section></footer-section>
    `;
  }
}

customElements.define("silver-chariot-app", SilverChariotApp);
