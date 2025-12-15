// Mobile drawer menu for navigation on smaller screens
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class MobileMenu extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    page: { type: String },
    menuItems: { type: Array }
  };

  constructor() {
    super();
    this.open = false;
    this.page = "home";
    this.menuItems = [];
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data?.items ?? [];
      })
      .catch((err) => console.error("mobile menu load error", err));

    window.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeyDown);
    super.disconnectedCallback();
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-primary);
      }

      /* Overlay */
      .bg {
        position: fixed;
        inset: 0;
        background: color-mix(in srgb, black 55%, transparent);
        display: none;
        z-index: 1000;
      }

      :host([open]) .bg {
        display: block;
      }

      /* Left drawer */
      .panel {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: min(86vw, 360px);
        background: var(--ddd-theme-bg);
        color: var(--ddd-theme-text-primary);
        border-right: 1px solid var(--ddd-theme-primary);
        padding: 18px 16px;
        transform: translateX(-110%);
        transition: transform 180ms ease;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      :host([open]) .panel {
        transform: translateX(0);
      }

      .top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--ddd-theme-primary);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        white-space: nowrap;
      }

      .close-btn {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        color: var(--ddd-theme-text-primary);
        display: grid;
        place-items: center;
        cursor: pointer;
      }

      .close-btn:hover {
        transform: translateY(-1px);
      }

      .icon {
        width: 18px;
        height: 18px;
        display: block;
      }

      .links {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 6px;
      }

      .link {
        appearance: none;
        text-align: left;
        width: 100%;
        border: 1px solid var(--ddd-theme-primary);
        background: transparent;
        color: var(--ddd-theme-text-primary);
        padding: 12px 14px;
        border-radius: 12px;
        font-family: var(--ddd-font-primary);
        font-size: 0.95rem;
        font-weight: 800;
        letter-spacing: 0.02em;
        text-transform: none;
        cursor: pointer;
      }

      .link[data-active="true"] {
        background: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg);
      }

      .spacer {
        flex: 1;
      }

      .secondary {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 8px;
      }

      @media (min-width: 769px) {
        .bg {
          display: none !important;
        }
      }
    `
  ];

  _onKeyDown(e) {
    if (!this.open) return;
    if (e.key === "Escape") this._close();
  }

  _close() {
    this.dispatchEvent(
      new CustomEvent("close-menu", { bubbles: true, composed: true })
    );
  }

  _go(id) {
    this.dispatchEvent(
      new CustomEvent("nav-change", { detail: id, bubbles: true, composed: true })
    );
    this._close();
  }

  _toggleTheme() {
    this.dispatchEvent(
      new CustomEvent("toggle-theme", { bubbles: true, composed: true })
    );
    this._close();
  }

  _flatLinks() {
    // Supports both:
    // 1) [{label:"Main", children:[...]}]
    // 2) [{id:"home", label:"Home"}, ...]
    const groups = Array.isArray(this.menuItems) ? this.menuItems : [];

    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      if (g && Array.isArray(g.children) && g.children.length) {
        return g.children;
      }
    }
    return groups.filter((x) => x && x.id && x.label);
  }

  render() {
    const links = this._flatLinks();

    return html`
      <d-d-d>
        <div
          class="bg"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          @click=${() => this._close()}
        >
          <div class="panel" @click=${(e) => e.stopPropagation()}>
            <div class="top-row">
              <div class="brand">
                <span>Silver Chariot</span>
              </div>

              <button class="close-btn" aria-label="Close menu" @click=${() => this._close()}>
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.29l6.3 6.3 6.3-6.3 1.41 1.42Z"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="links">
              ${links.map((item) => {
                const active = this.page === item.id;
                return html`
                  <button class="link" data-active=${active} @click=${() => this._go(item.id)}>
                    ${item.label}
                  </button>
                `;
              })}
            </div>

            <div class="spacer"></div>

            <div class="secondary">
              <button class="link" @click=${() => this._toggleTheme()}>
                Switch mode
              </button>
            </div>
          </div>
        </div>
      </d-d-d>
    `;
  }
}

customElements.define("mobile-menu", MobileMenu);
