// main app shell for the site
import { LitElement, html, css } from "https://esm.run/lit";

import "./components/headerbar.js";
import "./components/mobilemenu.js";
import "./components/gamecard.js";
import "./components/newscard.js";
import "./components/footersection.js";
import "./components/infoband.js";
import "./components/imagegallery.js";

export class SilverChariotApp extends LitElement {
  static properties = {
    page: { type: String },
    mobileMenuOpen: { type: Boolean },
    schedule: { type: Array }
  };

  constructor() {
    super();
    this.page = "home";
    this.mobileMenuOpen = false;
    this.schedule = [];
  }

  connectedCallback() {
    super.connectedCallback();
    // load games from our JSON API
    fetch("/api/schedule.json")
      .then((res) => res.json())
      .then((data) => {
        this.schedule = data.upcoming || [];
      });
  }

  static styles = css`
    :host {
      display: block;
      background: #05070b;
      min-height: 100vh;
      color: white;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    h2 {
      margin-top: 0;
    }
  `;

  // change URL and page state
  changePage(e) {
    const id = e.detail;
    this.page = id;
    window.history.pushState({}, "", `/${id}`);
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  renderSchedule() {
    return html`
      <section>
        <h2>Upcoming Games</h2>
        ${this.schedule.map(
          (g) => html`<game-card .game=${g}></game-card>`
        )}
      </section>
    `;
  }

  renderParentInfo() {
    return html`
      <section>
        <h2>Parent Information</h2>
        <p>
          Silver Chariot is a youth hockey club. We care about strong games,
          but also about school, health, and having fun with friends.
        </p>

        <h3>Season Basics</h3>
        <ul>
          <li>Season is from early September to late March.</li>
          <li>Most weeks have two practices and one game.</li>
          <li>Home rink: State College Ice Pavilion.</li>
        </ul>

        <h3>Fees and Gear</h3>
        <ul>
          <li>Fees cover ice time, refs, and league costs.</li>
          <li>Players bring skates and full protective gear.</li>
          <li>Team jerseys are loaned and returned at the end.</li>
        </ul>

        <h3>How Parents Help</h3>
        <ul>
          <li>Volunteer for clock, score sheet, or locker room.</li>
          <li>Try to arrive about 30 minutes before ice time.</li>
          <li>Contact the team manager if you have questions.</li>
        </ul>
      </section>
    `;
  }

  renderPage() {
    if (this.page === "schedule") {
      return this.renderSchedule();
    }

    if (this.page === "news") {
      return html`
        <section>
          <h2>Silver Chariot News</h2>
          <news-card></news-card>
        </section>
      `;
    }

    if (this.page === "parents") {
      return this.renderParentInfo();
    }

    // home page
    return html`
      <section>
        <info-band></info-band>
      </section>
      <section>
        <image-gallery></image-gallery>
      </section>
    `;
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

      <main>${this.renderPage()}</main>

      <footer-section></footer-section>
    `;
  }
}

customElements.define("silver-chariot-app", SilverChariotApp);
