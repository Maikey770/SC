// Top header with logo and navigation buttons
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class HeaderBar extends LitElement {
  static properties = {
    page: { type: String },
    menuItems: { type: Array },
    scrolled: { type: Boolean }
  };

  constructor() {
    super();
    this.page = "home";
    this.menuItems = [];
    this.scrolled = false;

    // bind scroll function
    this._onScroll = this._onScroll.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // load menu data
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data?.items ?? [];
      });

    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._onScroll();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll);
    super.disconnectedCallback();
  }

  // check if page is scrolled
  _onScroll() {
    this.scrolled = (window.scrollY || 0) > 16;
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
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
        padding: var(--ddd-spacing-4);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ddd-spacing-4);
      }

      /* logo and title */
      .brand {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
        font-weight: 700;
        text-transform: uppercase;
        color: var(--ddd-theme-text-primary);
      }

      .logo {
        width: 28px;
        height: 28px;
        border-radius: 999px;
        border: 1px solid var(--ddd-theme-primary);
        overflow: hidden;
        display: grid;
        place-items: center;
      }

      .logo-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* nav buttons */
      nav {
        display: flex;
        gap: var(--ddd-spacing-2);
        flex-wrap: wrap;
      }

      .nav-pill {
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        color: var(--ddd-theme-text-primary);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-radius: 999px;
        font-family: var(--ddd-font-primary);
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
      }

      /* current page */
      .nav-pill[data-active="true"] {
        background: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg);
      }

      @media (max-width: 768px) {
        nav {
          display: none;
        }
      }
    `
  ];

  // send page change event
  _onNavClick(target) {
    this.dispatchEvent(
      new CustomEvent("nav-change", {
        detail: target,
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const items = Array.isArray(this.menuItems) ? this.menuItems : [];

    return html`
      <d-d-d>
        <header>
  
          <div class="brand">
            <div class="logo">
              <img
                class="logo-img"
                src="https://i.pinimg.com/736x/68/94/52/6894529f86950e241d553776142f9176.jpg"
                alt="Silver Chariot logo"
              />
            </div>
            <span>Silver Chariot</span>
          </div>

          <nav>
            ${items.map((item) => {
              const target = item.page || item.id;
              return html`
                <button
                  class="nav-pill"
                  data-active=${this.page === target}
                  @click=${() => this._onNavClick(target)}
                >
                  ${item.label}
                </button>
              `;
            })}
          </nav>
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
