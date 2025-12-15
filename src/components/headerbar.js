import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/d-d-d/d-d-d-button.js";
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

    // Load menu from API
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = Array.isArray(data?.items) ? data.items : [];
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
        z-index: 2000;

        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--ddd-theme-border);

        font-family: var(--ddd-font-primary);
      }

      :host([data-scrolled="true"]) {
        background: rgba(0, 0, 0, 0.72);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      }

      header {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ddd-spacing-4);

        position: relative;
        z-index: 1; /* ensure clickable */
      }

      :host([data-scrolled="true"]) header {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-size: 0.9rem;
        color: var(--ddd-theme-text-primary);
        white-space: nowrap;
      }

      .logo {
        width: 28px;
        height: 28px;
        border-radius: 9999px;
        border: 1px solid var(--ddd-theme-border);
        background: var(--ddd-theme-surface);
        display: grid;
        place-items: center;
        font-size: 0.75rem;
        font-weight: 700;
      }

      .right {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
      }

      nav {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
      }

      .nav-btn {
        --ddd-button-padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-weight: 700;
      }

      .nav-btn[data-active="true"] {
        filter: saturate(1.1);
      }

      .theme-btn {
        --ddd-button-padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
        font-weight: 600;
      }

      .menu-toggle {
        display: none;
      }

      @media (max-width: 768px) {
        nav {
          display: none;
        }

        .menu-toggle {
          display: inline-flex;
          --ddd-button-padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          font-weight: 700;
        }
      }
    `
  ];

  _navTo(target) {
    this.dispatchEvent(
      new CustomEvent("nav-change", {
        detail: target,
        bubbles: true,
        composed: true
      })
    );
  }

  _openMenu() {
    this.dispatchEvent(
      new CustomEvent("open-menu", {
        bubbles: true,
        composed: true
      })
    );
  }

  _toggleTheme() {
    this.dispatchEvent(
      new CustomEvent("toggle-theme", {
        bubbles: true,
        composed: true
      })
    );
  }

  updated(changed) {
    if (changed.has("scrolled")) {
      this.toggleAttribute("data-scrolled", this.scrolled);
    }
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
                  <d-d-d-button
                    class="nav-btn"
                    data-active=${active}
                    .label=${item.label}
                    @click=${() => this._navTo(target)}
                  ></d-d-d-button>
                `;
              })}
            </nav>

            <!-- Switch mode button -->
            <d-d-d-button
              class="theme-btn"
              .label=${"Switch mode"}
              @click=${this._toggleTheme}
            ></d-d-d-button>

            <!-- Mobile menu toggle -->
            <d-d-d-button
              class="menu-toggle"
              .label=${"Menu"}
              @click=${this._openMenu}
            ></d-d-d-button>
          </div>
        </header>
      </d-d-d>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
