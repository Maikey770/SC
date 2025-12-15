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
        this.menuItems = data && Array.isArray(data.items) ? data.items : [];
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
        gap: var(--ddd-spacing-3, 12px);
        flex-wrap: wrap;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2, 8px);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: var(--ddd-font-size-s, 0.95rem);
        white-space: nowrap;
        flex: 0 0 auto;
      }

      .logo {
        width: var(--ddd-spacing-7, 28px);
        height: var(--ddd-spacing-7, 28px);
        border-radius: 9999px;
        border: 1px solid var(--ddd-theme-border, rgba(255, 255, 255, 0.12));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--ddd-font-size-xs, 0.8rem);
        background: var(--ddd-theme-surface, rgba(255, 255, 255, 0.06));
      }

      /* Desktop nav */
      nav {
        display: flex;
        gap: var(--ddd-spacing-2, 8px);
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        flex: 1 1 420px;
        min-width: 420px;
      }

      d-d-d-button.nav-btn {
        --ddd-button-padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-3, 12px);
      }

      /* Hide menu button on desktop */
      .menu-toggle {
        display: none;
        --ddd-button-padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-3, 12px);
        flex: 0 0 auto;
      }

      /* Mobile behavior */
      @media (max-width: 768px) {
        nav {
          display: none;
        }

        .menu-toggle {
          display: inline-flex;
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
      new CustomEvent("open-menu", {
        bubbles: true,
        composed: true
      })
    );
  }

  _getFlatMainItems() {
    const items = Array.isArray(this.menuItems) ? this.menuItems : [];

    // Group-style menu
    for (let i = 0; i < items.length; i++) {
      const g = items[i];
      if (g && Array.isArray(g.children) && g.children.length) {
        return g.children;
      }
    }

    // Flat menu
    return items;
  }

  render() {
    const items = this._getFlatMainItems();

    const navButtons = items.map((item) => {
      const target = item.page || item.id;
      const active = this.page === target;
      return html`
        <d-d-d-button
          class="nav-btn"
          data-active=${active}
          .label=${item.label}
          @click=${() => this._onNavClick(target)}
        ></d-d-d-button>
      `;
    });

    return html`
      <d-d-d>
        <header>
          <div class="brand">
            <div class="logo">SC</div>
            <span>Silver Chariot</span>
          </div>

          <nav aria-label="Primary navigation">${navButtons}</nav>

          <d-d-d-button
            class="menu-toggle"
            .label=${"Menu"}
            aria-label="Open menu"
            @click=${() => this._openMenu()}
          ></d-d-d-button>
        </header>
      </d-d-d>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
