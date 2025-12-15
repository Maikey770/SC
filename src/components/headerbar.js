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
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 1000;
        font-family: var(--ddd-font-primary);
        background: var(--ddd-theme-bg);
        border-bottom: 1px solid var(--ddd-theme-primary);
      }

      :host([data-scrolled="true"]) {
        box-shadow: var(--ddd-boxShadow-sm);
      }

      header {
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

      /* Logo wrapper */
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

      /* Logo image */
      .logo img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
      }

      :host([data-scrolled="true"]) .logo {
        width: 24px;
        height: 24px;
        transform: scale(0.98);
      }

      .right {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        justify-content: flex-end;
      }

      nav {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
      }

      .nav-pill {
        appearance: none;
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        color: var(--ddd-theme-text-primary);
        padding: 8px 16px;
        border-radius: 9999px;
        font-family: var(--ddd-font-primary);
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        cursor: pointer;
        transition: transform 140ms ease;
        white-space: nowrap;
      }

      :host([data-scrolled="true"]) .nav-pill {
        padding: 7px 14px;
        font-size: 0.82rem;
      }

      .nav-pill:hover {
        transform: translateY(-1px);
      }

      .nav-pill[data-active="true"] {
        background: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg);
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
        display: none;
      }

      .theme-toggle {
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        color: var(--ddd-theme-text-primary);
        padding: 8px 14px;
        border-radius: 9999px;
        font-family: var(--ddd-font-primary);
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        cursor: pointer;
        transition: transform 140ms ease;
        white-space: nowrap;
      }

      .theme-toggle:hover {
        transform: translateY(-1px);
      }

      @media (max-width: 768px) {
        nav {
          display: none;
        }

        .menu-toggle {
          display: inline-flex;
          border: 1px solid var(--ddd-theme-primary);
          background: transparent;
          color: var(--ddd-theme-text-primary);
          padding: 8px 16px;
          border-radius: 9999px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .theme-toggle {
          display: none;
        }
      }
    `
  ];

  _onNavClick(target) {
    this.dispatchEvent(
      new CustomEvent("nav-change", {
        detail: target,
        bubbles: true,
        composed: true
      })
    );
  }

  _openMenu() {
    this.dispatchEvent(new CustomEvent("open-menu", { bubbles: true, composed: true }));
  }

  _onSearchClick() {
    this.dispatchEvent(new CustomEvent("search-open", { bubbles: true, composed: true }));
  }

  _onThemeClick() {
    this.dispatchEvent(new CustomEvent("toggle-theme", { bubbles: true, composed: true }));
  }

  render() {
    const items = Array.isArray(this.menuItems) ? this.menuItems : [];

    return html`
      <d-d-d>
        <header>
          <div class="brand">
            <div class="logo">
              <img src="/assets/silver-chariot-logo.png" alt="Silver Chariot Club logo" />
            </div>
            <span>Silver Chariot</span>
          </div>

          <div class="right">
            <nav aria-label="Primary navigation">
              ${items.map((item) => {
                const target = item.page || item.id;
                const active = this.page === target;
                return html`
                  <button
                    class="nav-pill"
                    data-active=${active}
                    @click=${() => this._onNavClick(target)}
                  >
                    ${item.label}
                  </button>
                `;
              })}
            </nav>

            <button class="theme-toggle" @click=${() => this._onThemeClick()}>
              Switch mode
            </button>

            <button class="icon-btn" aria-label="Search" @click=${() => this._onSearchClick()}>
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M10 18a8 8 0 1 1 5.293-14.293A8 8 0 0 1 10 18Zm0-2a6 6 0 1 0-4.243-1.757A6 6 0 0 0 10 16Zm9.707 4.293-4.2-4.2 1.414-1.414 4.2 4.2-1.414 1.414Z"
                />
              </svg>
            </button>

            <button class="menu-toggle" @click=${() => this._openMenu()}>Menu</button>
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
