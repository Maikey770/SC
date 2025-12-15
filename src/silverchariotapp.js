import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import "./ddd-global.js";

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

    // Load schedule from API
    fetch("/api/schedule", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.schedule = data && data.upcoming ? data.upcoming : [];
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
      gap: var(--ddd-spacing-6);
    }

    h2 {
      margin: 0;
      font-size: var(--ddd-font-size-l);
      line-height: 1.2;
    }

    /* Home anchor button */
    .jump-wrap {
      display: flex;
      gap: var(--ddd-spacing-3);
      flex-wrap: wrap;
      align-items: center;
    }

    .jump-btn {
      appearance: none;
      border: 1px solid rgba(255, 255, 255, 0.55);
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
      padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
      border-radius: 9999px;
      font-family: var(--ddd-font-primary);
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform 140ms ease, background 140ms ease, border-color 140ms ease;
    }

    .jump-btn:hover {
      border-color: rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }

    .subtle-link {
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      font-size: var(--ddd-font-size-s);
    }

    .subtle-link:hover {
      color: rgba(255, 255, 255, 1);
      text-decoration: underline;
    }
  `;

  _getPageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    return page ? page : "home";
  }

  _setUrlForPage(id) {
    const url = id === "home" ? "/" : `/?page=${id}`;
    window.history.pushState({}, "", url);
  }

  _onPopState() {
    this.page = this._getPageFromUrl();
  }

  changePage(e) {
    const id = e.detail;
    this.page = id;
    this._setUrlForPage(id);

    if (this.mobileMenuOpen) this.mobileMenuOpen = false;

    // If user goes home, allow normal scrolling
    if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // Smooth scroll to Upcoming Games on Home
  scrollToUpcoming() {
    const el = this.renderRoot?.querySelector("#upcoming");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  _renderSchedulePage() {
    return html`
      <section>
        <schedule-row heading="Upcoming Games"></schedule-row>
        ${this.schedule.length === 0
          ? html`<p>No games in the list right now.</p>`
          : this.schedule.map((g) => html`<game-card .game=${g}></game-card>`)}
      </section>
    `;
  }

  _renderParentsPage() {
    return html`
      <section>
        <h2>Parent Information</h2>
        <p>
          Silver Chariot is a youth hockey club. We want kids to play serious hockey
          but also keep up with school, health, and friends.
        </p>

        <h3>Season Basics</h3>
        <ul>
          <li>Season runs from early September to late March.</li>
          <li>Most weeks have two practices and one game.</li>
          <li>Home rink is State College Ice Pavilion.</li>
        </ul>
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

  _renderHomePage() {
    const preview = Array.isArray(this.schedule) ? this.schedule.slice(0, 2) : [];

    return html`
      <section>
        <hero-banner></hero-banner>

        <div class="jump-wrap">
          <button class="jump-btn" @click=${() => this.scrollToUpcoming()}>
            View Upcoming Games
          </button>

          <a class="subtle-link" href="/?page=schedule" @click=${(e) => { e.preventDefault(); this.changePage({ detail: "schedule" }); }}>
            Open full schedule
          </a>
        </div>
      </section>

      <section>
        <info-band></info-band>
      </section>

      <!-- Anchor target on home -->
      <section id="upcoming">
        <schedule-row heading="Upcoming Games"></schedule-row>
        ${preview.length === 0
          ? html`<p>No games in the list right now.</p>`
          : preview.map((g) => html`<game-card .game=${g}></game-card>`)}
      </section>

      <section>
        <image-gallery></image-gallery>
      </section>
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
        @nav-change=${(e) => this.changePage(e)}
        @open-menu=${() => this.toggleMenu()}
      ></header-bar>

      <mobile-menu
        ?open=${this.mobileMenuOpen}
        .page=${this.page}
        @nav-change=${(e) => this.changePage(e)}
        @close-menu=${() => this.toggleMenu()}
      ></mobile-menu>

      <main>${this._renderPageBody()}</main>

      <footer-section></footer-section>
    `;
  }
}

customElements.define("silver-chariot-app", SilverChariotApp);
