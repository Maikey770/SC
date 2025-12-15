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
    schedule: { type: Array },
    theme: { type: String }
  };

  constructor() {
    super();
    this.page = this._getPageFromUrl();
    this.mobileMenuOpen = false;
    this.schedule = [];
    this.theme = localStorage.getItem("theme") || "dark";

    // Bind once so events behave the same every time
    this._onPopState = this._onPopState.bind(this);
    this.changePage = this.changePage.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Set the saved theme on first load
    document.documentElement.setAttribute("data-theme", this.theme);

    // Pull schedule data from the Vercel API route
    fetch("/api/schedule", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.schedule = Array.isArray(data?.upcoming) ? data.upcoming : [];
      })
      .catch((err) => console.error("schedule load error", err));

    // Support back/forward browser navigation
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

    h2 {
      margin: 0 0 var(--ddd-spacing-4) 0;
      font-size: var(--ddd-font-size-l);
      line-height: 1.2;
    }

    h3 {
      margin: var(--ddd-spacing-6) 0 var(--ddd-spacing-3) 0;
      font-size: var(--ddd-font-size-m);
      line-height: 1.2;
    }

    p {
      margin: 0 0 var(--ddd-spacing-4) 0;
      max-width: 75ch;
      opacity: 0.9;
    }

    ul {
      margin: 0;
      padding-left: var(--ddd-spacing-6);
      display: grid;
      gap: var(--ddd-spacing-2);
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
    // When user hits back/forward, update the page view
    this.page = this._getPageFromUrl();
  }

  // Handles top nav + mobile nav clicks
  changePage(e) {
    const id = e.detail;
    this.page = id;
    this._setUrlForPage(id);

    // If the mobile menu is open, close it after navigating
    if (this.mobileMenuOpen) this.mobileMenuOpen = false;

    // Keeps the page change feeling clean
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // "Switch mode" button logic (dark <-> light)
  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
    localStorage.setItem("theme", this.theme);
  }

  _renderSchedulePage() {
    return html`
      <section>
        <schedule-row heading="Upcoming Games" .games=${this.schedule}></schedule-row>

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

  // Information page (parents + general guidelines)
  _renderInformationPage() {
    return html`
      <section>
        <h2>Information</h2>
        <p>
          Important notices and guidelines for parents, players, and families in the
          Silver Chariot Youth Hockey Association.
        </p>

        <h3>General Notices</h3>
        <ul>
          <li>Please arrive at the rink at least 30 minutes before game time.</li>
          <li>Players must wear full gear for practices and games.</li>
          <li>Check the schedule regularly for updates or changes.</li>
        </ul>

        <h3>Parent Guidelines</h3>
        <ul>
          <li>Cheer positively and avoid coaching from the stands.</li>
          <li>Respect referees, coaches, and rink staff.</li>
          <li>Notify coaches early if a player cannot attend.</li>
        </ul>

        <h3>Safety & Conduct</h3>
        <ul>
          <li>No food or drinks on the ice surface.</li>
          <li>Follow all rink safety rules and posted signage.</li>
          <li>Report injuries or concerns to a coach immediately.</li>
        </ul>
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
        <schedule-row heading="Upcoming Games" .games=${rail}></schedule-row>

        ${list.length === 0
          ? html`<p>No games in the list right now.</p>`
          : html`
              <div class="list">
                ${list.map((g) => html`<game-card compact .game=${g}></game-card>`)}
              </div>
            `}
      </section>

      <image-gallery></image-gallery>
    `;
  }

  _renderPageBody() {
    if (this.page === "schedule") return this._renderSchedulePage();
    if (this.page === "news") return this._renderNewsPage();
    if (this.page === "information") return this._renderInformationPage();
    return this._renderHomePage();
  }

  render() {
    return html`
      <header-bar
        .page=${this.page}
        .theme=${this.theme}
        @toggle-theme=${this.toggleTheme}
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
