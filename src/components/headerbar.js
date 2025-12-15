import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class HeaderBar extends LitElement {
  static properties = {
    page: { type: String },
    menuItems: { type: Array }
  };

  constructor() {
    super();
    this.page = "home";
    this.menuItems = [];
  }

  connectedCallback() {
    super.connectedCallback();
    // Load menu from API
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data?.items ?? [];
      })
      .catch((err) => console.error("menu load error", err));
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
        background: var(--ddd-theme-background, #000);
        color: var(--ddd-theme-text-primary, #fff);
        border-bottom: 1px solid var(--ddd-theme-border, rgba(255, 255, 255, 0.12));
        font-family: var(--ddd-font-primary, system-ui);
      }

      header {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--ddd-spacing-3, 12px) var(--ddd-spacing-4, 16px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ddd-spacing-4, 16px);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2, 8px);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: var(--ddd-font-size-s, 0.95rem);
        white-space: nowrap;
      }

      .logo {
        width: var(--ddd-spacing-7, 28px);
        height: var(--ddd-spacing-7, 28px);
        border-radius: 9999px;
        border: 1px solid var(--ddd-theme-border, rgba(255, 255, 255, 0.18));
        display: grid;
        place-items: center;
        font-size: var(--ddd-font-size-xs, 0.8rem);
        background: var(--ddd-theme-surface, rgba(255, 255, 255, 0.06));
      }

      /* Right side layout */
      .right {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2, 8px);
        flex: 1;
        justify-content: flex-end;
      }

      nav {
        display: flex;
        gap: var(--ddd-spacing-2, 8px);
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      /* CTA button style (matches your reference image) */
      .nav-pill {
        appearance: none;
        border: 1px solid rgba(255, 255, 255, 0.55);
        background: transparent;
        color: var(--ddd-theme-text-primary, #fff);
        padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-4, 16px);
        border-radius: 9999px;
        font-family: var(--ddd-font-primary, system-ui);
        font-size: var(--ddd-font-size-xs, 0.85rem);
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        cursor: pointer;
        transition: border-color 140ms ease, background 140ms ease, transform 140ms ease;
        white-space: nowrap;
      }

      .nav-pill:hover {
        border-color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.06);
        transform: translateY(-1px);
      }

      .nav-pill[data-active="true"] {
        border-color: rgba(255, 255, 255, 1);
        background: rgba(255, 255, 255, 0.1);
      }

      /* Icon button (search) */
      .icon-btn {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.55);
        background: transparent;
        color: #fff;
        display: grid;
        place-items: center;
        cursor: pointer;
        transition: border-color 140ms ease, background 140ms ease, transform 140ms ease;
      }

      .icon-btn:hover {
        border-color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.06);
        transform: translateY(-1px);
      }

      .icon {
        width: 18px;
        height: 18px;
        display: block;
      }

      /* Mobile: hide pills, use menu button */
      .menu-toggle {
        display: none;
      }

      @media (max-width: 768px) {
        nav {
          display: none;
        }
        .menu-toggle {
          display: inline-flex;
          border: 1px solid rgba(255, 255, 255, 0.55);
          background: transparent;
          color: #fff;
          padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-4, 16px);
          border-radius: 9999px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
        }
      }
    `
  ];

  _onNavClick(target) {
    // Notify app to change page
    this.dispatchEvent(
      new CustomEvent("nav-change", {
        detail: target,
        bubbles: true,
        composed: true
      })
    );
  }

  _openMenu() {
    // Open mobile menu
    this.dispatchEvent(
      new CustomEvent("open-menu", { bubbles: true, composed: true })
    );
  }

  _onSearchClick() {
    // Placeholder action
    this.dispatchEvent(
      new CustomEvent("search-open", { bubbles: true, composed: true })
    );
  }

  render() {
    const items = Array.isArray(this.menuItems) ? this.menuItems : [];

    return html`
      <d-d-d>
        <header>
          <div class="brand">
            <div class="logo">SC</div>
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
}

customElements.define("header-bar", HeaderBar);
