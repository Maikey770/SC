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
    this.changePage = this.changePage.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

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

    h2 {
      margin: 0 0 var(--ddd-spacing-4) 0;
      font-size: var(--ddd-font-size-l);
    }

    h3 {
      margin: var(--ddd-spacing-6) 0 var(--ddd-spacing-3) 0;
      font-size: var(--ddd-font-size-m);
    }

    p {
      max-width: 75ch;
      opacity: 0.9;
    }

    ul {
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

    .card {
      border: 1px solid var(--ddd-theme-border);
      border-radius: var(--ddd-radius-lg);
      padding: var(--ddd-spacing-4);
      background: var(--ddd-theme-surface);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(220px, 1fr));
      gap: var(--ddd-spacing-4);
    }

    @media (max-width: 980px) {
      .grid {
        grid-template-columns: 1fr;
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

  /* ---------------- PAGES ---------------- */

  _renderSchedulePage() {
    return html`
      <section>
        <schedule-row heading="Upcoming Games" .games=${this.schedule}></schedule-row>
        ${this.schedule.length
          ? html`
              <div class="list">
                ${this.schedule.map(
                  (g) => html`<game-card compact .game=${g}></game-card>`
                )}
              </div>
            `
          : html`<p>No games in the list right now.</p>`}
      </section>
    `;
  }

  _renderNewsPage() {
    const updates = [
      {
        date: "Nov 26",
        tag: "Association Update",
        title: "Silver Chariot Winter Skills Camp Announced",
        desc:
          "Small ice groups to work on edges, control, and game sense for U10–U16 players."
      },
      {
        date: "Dec 02",
        tag: "Volunteer",
        title: "Game-Day Volunteers Needed",
        desc:
          "Help with check-in, timekeeping, and locker room flow. Training provided."
      },
      {
        date: "Dec 06",
        tag: "Policy",
        title: "Updated Travel & Arrival Guidelines",
        desc:
          "Please arrive 30 minutes early and confirm rink rules."
      }
    ];

    return html`
      <section>
        <h2>Silver Chariot News</h2>
        <news-card></news-card>

        <div class="list">
          ${updates.map(
            (u) => html`
              <div class="card">
                <div style="opacity:.8">${u.date} · ${u.tag}</div>
                <div style="font-weight:800; margin-top:6px">${u.title}</div>
                <div style="opacity:.9; margin-top:6px">${u.desc}</div>
              </div>
            `
          )}
        </div>
      </section>

      <section>
        <h2>Quick Links</h2>
        <div class="grid">
          <a class="card" href="/?page=schedule">View Schedule</a>
          <a class="card" href="/?page=information">Information & Notices</a>
          <a class="card" href="/?page=home">Rink Moments</a>
        </div>
      </section>

      <section>
        <h2>Contact</h2>
        <div class="card">
          <div><strong>Email:</strong> info@silverchariot.hockey</div>
          <div><strong>Home rink:</strong> State College Ice Pavilion</div>
        </div>
      </section>
    `;
  }

  _renderInformationPage() {
    return html`
      <section>
        <h2>Information</h2>
        <p>Important notices and guidelines for families.</p>

        <h3>General Notices</h3>
        <ul>
          <li>Arrive 30 minutes early for games.</li>
          <li>Full equipment required at all times.</li>
          <li>Check schedule for updates.</li>
        </ul>

        <h3>Parent Guidelines</h3>
        <ul>
          <li>Positive cheering only.</li>
          <li>No coaching from the stands.</li>
          <li>Respect officials and staff.</li>
        </ul>

        <h3>Safety</h3>
        <ul>
          <li>No food or drink on ice.</li>
          <li>Follow rink rules.</li>
          <li>Report injuries immediately.</li>
        </ul>
      </section>
    `;
  }

  _renderHomePage() {
    return html`
      <hero-banner></hero-banner>
      <info-band></info-band>

      <section>
        <schedule-row
          heading="Upcoming Games"
          .games=${this.schedule.slice(0, 6)}
        ></schedule-row>
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
