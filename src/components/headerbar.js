import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class HeaderBar extends LitElement {
  static properties = {
    page: { type: String },       // current page
    menuItems: { type: Array },   // menu data from api
    scrolled: { type: Boolean },  // used for header style
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

    // load menu items
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data?.items ?? [];
      });

    // watch scroll
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._onScroll();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll);
    super.disconnectedCallback();
  }

  // shrink header
  _onScroll() {
    this.scrolled = (window.scrollY || 0) > 16;
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: var(--ddd-theme-bg);
        border-bottom: 1px solid var(--ddd-theme-primary);
        font-family: var(--ddd-font-primary);
      }

      :host([data-scrolled="true"]) {
        box-shadow: var(--ddd-boxShadow-sm);
      }

      header {
        max-width: 1200px;
        margin: 0 auto;
        padding: 14px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      :host([data-scrolled="true"]) header {
        padding: 10px 16px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .logo {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid var(--ddd-theme-primary);
        overflow: hidden;
      }

      .logo-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .right {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      nav {
        display: flex;
        gap: 8px;
      }

      .nav-pill {
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        padding: 8px 16px;
        border-radius: 9999px;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
      }

      .nav-pill[data-active="true"] {
        background: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg);
      }

      .icon-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        cursor: pointer;
      }

      .menu-toggle {
        display: none;
      }

      .theme-toggle {
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        padding: 8px 14px;
        border-radius: 9999px;
        cursor: pointer;
      }

      @media (max-width: 768px) {
        nav {
          display: none;
        }

        .menu-toggle {
          display: inline-flex;
          border: 1px solid var(--ddd-theme-primary);
          padding: 8px 16px;
          border-radius: 9999px;
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
    this.dispatchEvent(
      new CustomEvent("open-menu", { bubbles: true, composed: true })
    );
  }

  _onSearchClick() {
    this.dispatchEvent(
      new CustomEvent("search-open", { bubbles: true, composed: true })
    );
  }

  _onThemeClick() {
    this.dispatchEvent(
      new CustomEvent("toggle-theme", { bubbles: true, composed: true })
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
                alt="logo"
              />
            </div>
            <span>Silver Chariot</span>
          </div>

          <div class="right">
            <nav>
              ${this.menuItems.map((item) => {
                const id = item.page || item.id;
                return html`
                  <button
                    class="nav-pill"
                    data-active=${this.page === id}
                    @click=${() => this._onNavClick(id)}
                  >
                    ${item.label}
                  </button>
                `;
              })}
            </nav>

            <button class="theme-toggle" @click=${this._onThemeClick}>
              Switch mode
            </button>

            <button class="icon-btn" @click=${this._onSearchClick}>🔍</button>

            <button class="menu-toggle" @click=${this._openMenu}>
              Menu
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
