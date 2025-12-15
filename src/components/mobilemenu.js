// Mobile menu overlay for navigation on smaller screens
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class MobileMenu extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    page: { type: String },
    menuItems: { type: Array },
    openGroups: { type: Object }
  };

  constructor() {
    super();
    this.open = false;
    this.page = "home";
    this.menuItems = [];
    this.openGroups = {};
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Load menu configuration
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data && data.items ? data.items : [];
        this._initGroups();
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

      /* Full-screen overlay */
      .bg {
        position: fixed;
        inset: 0;
        background: color-mix(
          in srgb,
          var(--ddd-theme-background) 55%,
          transparent
        );
        display: none;
        z-index: 40;
      }

      :host([open]) .bg {
        display: block;
      }

      /* Menu panel */
      .panel {
        background: var(--ddd-theme-background);
        color: var(--ddd-theme-text-primary);
        padding: var(--ddd-spacing-4);
        border-bottom-left-radius: var(--ddd-radius-lg);
        border-bottom-right-radius: var(--ddd-radius-lg);
        border-bottom: 1px solid var(--ddd-theme-border);
        max-width: 720px;
        margin: 0 auto;
      }

      .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--ddd-spacing-3);
        font-size: var(--ddd-font-size-s);
      }

      d-d-d-button {
        --ddd-button-padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
      }

      .group {
        margin-top: var(--ddd-spacing-3);
        border: 1px solid var(--ddd-theme-border);
        border-radius: var(--ddd-radius-md);
        overflow: hidden;
        background: var(--ddd-theme-surface);
      }

      .group-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        width: 100%;
      }

      .links {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-3);
      }

      .link[data-active="true"] {
        filter: saturate(1.05);
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

  _initGroups() {
    const next = {};
    for (let i = 0; i < this.menuItems.length; i++) {
      const g = this.menuItems[i];
      if (g && g.label) next[g.label] = g.label === "Main";
    }
    this.openGroups = next;
  }

  _toggleGroup(label) {
    const next = { ...this.openGroups };
    next[label] = !next[label];
    this.openGroups = next;
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

  render() {
    const groups = this.menuItems || [];

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
              <span>Silver Chariot</span>
              <d-d-d-button
                .label=${"Close"}
                @click=${() => this._close()}
              ></d-d-d-button>
            </div>

            ${groups.map((group) => {
              const label = group && group.label ? group.label : "Group";
              const children =
                group && Array.isArray(group.children) ? group.children : [];
              const isOpen = !!this.openGroups[label];

              return html`
                <div class="group">
                  <d-d-d-button
                    class="group-head"
                    .label=${`${label} ${isOpen ? "Hide" : "Show"}`}
                    aria-expanded=${isOpen ? "true" : "false"}
                    @click=${() => this._toggleGroup(label)}
                  ></d-d-d-button>

                  ${isOpen
                    ? html`
                        <div class="links">
                          ${children.map((item) => {
                            const active = this.page === item.id;
                            return html`
                              <d-d-d-button
                                class="link"
                                data-active=${active}
                                .label=${item.label}
                                @click=${() => this._go(item.id)}
                              ></d-d-d-button>
                            `;
                          })}
                        </div>
                      `
                    : ""}
                </div>
              `;
            })}
          </div>
        </div>
      </d-d-d>
    `;
  }
}

customElements.define("mobile-menu", MobileMenu);
