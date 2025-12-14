import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/d-d-d/d-d-d-button.js";
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

    fetch("/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        this.schedule = data && data.upcoming ? data.upcoming : [];
      })
      .catch((err) => {
        console.error("schedule load error", err);
      });

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

    h3 {
      margin: var(--ddd-spacing-4) 0 var(--ddd-spacing-2);
      font-size: var(--ddd-font-size-m);
    }

    p,
    li {
      font-size: var(--ddd-font-size-s);
      line-height: 1.5;
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

    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
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

        <h3>Fees and Gear</h3>
        <ul>
          <li>Fees cover ice time, referees, and league costs.</li>
          <li>Players bring skates and full gear.</li>
          <li>Team jerseys are loaned and returned at the end.</li>
        </ul>

        <h3>How Parents Help</h3>
        <ul>
          <li>Help with clock, score sheet, or logistics when needed.</li>
          <li>Arrive about 30 minutes before ice time.</li>
          <li>Contact the team manager if you have questions.</li>
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
    return html`
      <section>
        <hero-banner></hero-banner>
      </section>
      <section>
        <info-band></info-band>
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
