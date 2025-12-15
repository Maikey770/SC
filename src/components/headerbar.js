import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class HeaderBar extends LitElement {
  static properties = {
    page: { type: String },
    menuItems: { type: Array },
    scrolled: { type: Boolean },
    theme: { type: String }
  };

  constructor() {
    super();
    this.page = "home";
    this.menuItems = [];
    this.scrolled = false;
    this.theme = "dark";
    this._onScroll = this._onScroll.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data?.items ?? [];
      })
      .catch((err) => console.error("menu load error", err));

    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._onScroll();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll);
    super.disconnectedCallback();
  }

  _onScroll() {
    const next = (window.scrollY || 0) > 16;
    if (next !== this.scrolled) this.scrolled = next;
  }

  static styles = [
    dddGlobal,
    css`
      /* ===== CRITICAL FIX (Option A) ===== */
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 999999; /* force header above all content */
        pointer-events: auto;
        font-family: var(--ddd-font-primary);
        background: var(--ddd-theme-bg);
        border-bottom: 1px solid var(--ddd-theme-primary);
      }

      :host([data-scrolled="true"]) {
        box-shadow: var(--ddd-boxShadow-sm);
      }

      header {
        position: relative;
        z-index: 999999;
        pointer-events: auto;

        max-width: 1200px;
        margin: 0 auto;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        transition: padding 160ms ease;
      }

      :host([data-scrolled="true"]) header {
        padding: 10px 16px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.95rem;
        white-space: nowrap;
        color: var(--ddd-theme-text-primary);
      }

      .logo {
        width: 28px;
        height: 28px;
        border-radius: 9999px;
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        display: grid;
        place-items: center;
        overflow: hidden;
        transition: transform 160ms ease, width 160ms ease, height 160ms ease;
      }

      :host([data-scrolled="true"]) .logo {
        width: 24px;
        height: 24px;
        transform: scale(0.98);
      }

      .logo-img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }

      .right {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        justify-content: flex-end;
      }

      nav {
        display: none;
      }

      .icon-btn {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        color: var(--ddd-theme-text-primary);
        display: grid;
        place-items: center;
        cursor: pointer;
        transition: transform 140ms ease;
      }

      :host([data-scrolled="true"]) .icon-btn {
        width: 38px;
        height: 38px;
      }

      .icon-btn:hover {
        transform: translateY(-1px);
      }

      .icon {
        width: 18px;
        height: 18px;
        display: block;
      }

      .menu-toggle {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        color: var(--ddd-theme-text-primary);
        display: grid;
        place-items: center;
        cursor: pointer;
        transition: transform 140ms ease;
      }

      :host([data-scrolled="true"]) .menu-toggle {
        width: 38px;
        height: 38px;
      }

      .menu-toggle:hover {
        transform: translateY(-1px);
      }

      .theme-toggle {
        display: none;
      }
    `
  ];

  _openMenu() {
    this.dispatchEvent(
      new CustomEvent("open-menu", { bubbles: true, composed: true })
    );
  }

  _onSearchClick() {
    this.dispatchEvent(
      new CustomEvent("search-open", { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <d-d-d>
        <header>
          <div class="brand">
            <div class="logo">
              <img
                class="logo-img"
                src="https://i.pinimg.com/736x/68/94/52/6894529f86950e241d553776142f9176.jpg"
                alt="Silver Chariot Club logo"
                loading="eager"
              />
            </div>
            <span>Silver Chariot</span>
          </div>

          <div class="right">
            <button class="icon-btn" aria-label="Search" @click=${this._onSearchClick}>
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M10 18a8 8 0 1 1 5.293-14.293A8 8 0 0 1 10 18Zm0-2a6 6 0 1 0-4.243-1.757A6 6 0 0 0 10 16Zm9.707 4.293-4.2-4.2 1.414-1.414 4.2 4.2-1.414 1.414Z"
                />
              </svg>
            </button>

            <button class="menu-toggle" aria-label="Open menu" @click=${this._openMenu}>
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
          </div>
        </header>
      </d-d-d>
    `;
  }

  updated(changed) {
    if (changed.has("scrolled")) {
      this.toggleAttribute("data-scrolled", this.scrolled);
    }
  }
}

customElements.define("header-bar", HeaderBar);
