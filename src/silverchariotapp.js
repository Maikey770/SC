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
    schedule: { type: Array },
    theme: { type: String }
  };

  constructor() {
    super();
    this.page = this._getPageFromUrl();
    this.mobileMenuOpen = false;
    this.schedule = [];
    this.theme = localStorage.getItem("theme") || "dark";

    this._onPopState = this._onPopState.bind(this);
    this.changePage = this.changePage.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.documentElement.setAttribute("data-theme", this.theme);

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
      color: var(--ddd-theme-text-primary);
      background: var(--ddd-theme-bg);
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
      color: var(--ddd-theme-text-secondary);
    }

    ul {
      margin: 0;
      padding-left: var(--ddd-spacing-6);
      display: grid;
      gap: var(--ddd-spacing-2);
      color: var(--ddd-theme-text-secondary);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-4);
      margin-top: var(--ddd-spacing-5);
    }

    .heroShell {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: var(--ddd-spacing-6);
      align-items: stretch;
    }

    .heroLeft {
      border-radius: var(--ddd-radius-lg);
      overflow: hidden;
    }

    .heroRight {
      border-radius: var(--ddd-radius-lg);
      border: 1px solid var(--ddd-theme-border);
      background: var(--ddd-theme-surface);
      padding: var(--ddd-spacing-5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--ddd-spacing-5);
    }

    .ngTop {
      display: grid;
      gap: var(--ddd-spacing-2);
    }

    .ngLabel {
      font-weight: 800;
      letter-spacing: var(--ddd-letter-spacing-wide);
      text-transform: uppercase;
      font-size: var(--ddd-font-size-xs);
      color: var(--ddd-theme-text-secondary);
    }

    .ngTitle {
      font-weight: 900;
      font-size: var(--ddd-font-size-l);
      color: var(--ddd-theme-text-primary);
    }

    .ngMeta {
      display: grid;
      gap: var(--ddd-spacing-1);
      color: var(--ddd-theme-text-secondary);
      font-size: var(--ddd-font-size-s);
    }

    .ngTeams {
      display: flex;
      align-items: center;
      gap: var(--ddd-spacing-3);
      font-weight: 900;
      color: var(--ddd-theme-text-primary);
    }

    .ngTeamPill {
      border: 1px solid var(--ddd-theme-border);
      border-radius: 999px;
      padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
      background: var(--ddd-theme-surface);
    }

    .railWrap {
      border-radius: var(--ddd-radius-lg);
      border: 1px solid var(--ddd-theme-border);
      background: var(--ddd-theme-surface);
      padding: var(--ddd-spacing-4);
      display: grid;
      gap: var(--ddd-spacing-3);
    }

    .railTitle {
      font-weight: 900;
      font-size: var(--ddd-font-size-s);
      letter-spacing: var(--ddd-letter-spacing-wide);
      text-transform: uppercase;
      color: var(--ddd-theme-text-secondary);
    }

    .rail {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(260px, 320px);
      gap: var(--ddd-spacing-4);
      overflow-x: auto;
      padding-bottom: var(--ddd-spacing-1);
      scroll-snap-type: x mandatory;
    }

    .rail > * {
      scroll-snap-align: start;
    }

    @media (max-width: 980px) {
      .heroShell {
        grid-template-columns: 1fr;
      }
      .rail {
        grid-auto-columns: minmax(240px, 1fr);
      }
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

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
    localStorage.setItem("theme", this.theme);
  }

  _renderNextGameCard() {
    const g = Array.isArray(this.schedule) && this.schedule.length ? this.schedule[0] : null;

    if (!g) {
      return html`
        <section class="heroRight">
          <div class="ngTop">
            <div class="ngLabel">Next game</div>
            <div class="ngTitle">No upcoming games</div>
            <div class="ngMeta">Check back soon for updates.</div>
          </div>
        </section>
      `;
    }

    const dateTime = `${g.date || ""} ${g.time || ""}`.trim();

    return html`
      <section class="heroRight">
        <div class="ngTop">
          <div class="ngLabel">Theme night</div>
          <div class="ngTitle">Next game</div>

          <div class="ngTeams" aria-label="Matchup">
            <span class="ngTeamPill">${String(g.team || "SC").toUpperCase()}</span>
            <span>VS</span>
            <span class="ngTeamPill">${String(g.opponent || "TBD").toUpperCase()}</span>
          </div>

          <div class="ngMeta">
            <div>${dateTime || "TBD"}</div>
            <div>${g.location || ""}</div>
          </div>
        </div>
      </section>
    `;
  }

  _renderSchedulePage() {
    return html`
      <section>
        <schedule-row heading="Upcoming Games" .games=${this.schedule}></schedule-row>

        ${this.schedule.length === 0
          ? html`<p>No games in the list right now.</p>`
          : html`
              <div class="list">
                ${this.schedule.map((g) => html`<game-card compact .game=${g}></game-card>`)}
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
    const rail = this.schedule.slice(0, 10);

    return html`
      <section class="heroShell">
        <div class="heroLeft">
          <hero-banner></hero-banner>
        </div>
        ${this._renderNextGameCard()}
      </section>

      <info-band></info-band>

      <section class="railWrap" aria-label="Upcoming games strip">
        <div class="railTitle">Upcoming games</div>
        <div class="rail">
          ${rail.length
            ? rail.map((g) => html`<game-card compact .game=${g}></game-card>`)
            : html`<div>No games available.</div>`}
        </div>
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
