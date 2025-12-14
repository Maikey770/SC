import { LitElement, html, css } from "lit";

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

    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data && data.items ? data.items : [];
        this._initGroups();
      })
      .catch((err) => {
        console.error("mobile menu load error", err);
      });

    window.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeyDown);
    super.disconnectedCallback();
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--ddd-font-primary);
    }

    .bg {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      display: none;
      z-index: 40;
    }

    :host([open]) .bg {
      display: block;
    }

    .panel {
      background: var(--ddd-theme-default-black);
      color: var(--ddd-theme-default-white);
      padding: var(--ddd-spacing-4);
      border-bottom-left-radius: var(--ddd-radius-lg);
      border-bottom-right-radius: var(--ddd-radius-lg);
      border-bottom: var(--ddd-border-sm) solid var(--ddd-theme-default-beaver70);
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

    button {
      background: transparent;
      border: var(--ddd-border-sm) solid transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
      border-radius: var(--ddd-radius-md);
      cursor: pointer;
      width: 100%;
    }

    button:focus-visible {
      outline: var(--ddd-border-md) solid var(--ddd-theme-default-beaverBlue);
      outline-offset: 2px;
    }

    .group {
      margin-top: var(--ddd-spacing-3);
      border: var(--ddd-border-sm) solid var(--ddd-theme-default-beaver70);
      border-radius: var(--ddd-radius-md);
      overflow: hidden;
    }

    .group-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      background: var(--ddd-theme-default-beaver80);
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-2);
      padding: var(--ddd-spacing-3);
    }

    .link {
      border-color: var(--ddd-theme-default-beaver70);
      background: transparent;
    }

    .link[data-active="true"] {
      border-color: var(--ddd-theme-default-beaverBlue);
      background: var(--ddd-theme-default-beaver80);
    }

    @media (min-width: 769px) {
      .bg {
        display: none !important;
      }
    }
  `;

  _onKeyDown(e) {
    if (!this.open) return;
    if (e.key === "Escape") this._close();
  }

  _initGroups() {
    const next = {};
    for (let i = 0; i < this.menuItems.length; i++) {
      const g = this.menuItems[i];
      if (g && g.label) {
        next[g.label] = g.label === "Main";
      }
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
      new CustomEvent("close-menu", {
        bubbles: true,
        composed: true
      })
    );
  }

  _go(id) {
    this.dispatchEvent(
      new CustomEvent("nav-change", {
        detail: id,
        bubbles: true,
        composed: true
      })
    );
    this._close();
  }

  render() {
    return html`
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
            <button type="button" @click=${() => this._close()}>Close</button>
          </div>

          ${this.menuItems.map((group) => {
            const label = group && group.label ? group.label : "Group";
            const children = group && Array.isArray(group.children) ? group.children : [];
            const isOpen = !!this.openGroups[label];

            return html`
              <div class="group">
                <button
                  class="group-head"
                  type="button"
                  aria-expanded=${isOpen ? "true" : "false"}
                  @click=${() => this._toggleGroup(label)}
                >
                  <span>${label}</span>
                  <span>${isOpen ? "Hide" : "Show"}</span>
                </button>

                ${isOpen
                  ? html`
                      <div class="links">
                        ${children.map(
                          (item) => html`
                            <button
                              class="link"
                              type="button"
                              data-active=${this.page === item.id}
                              @click=${() => this._go(item.id)}
                            >
                              ${item.label}
                            </button>
                          `
                        )}
                      </div>
                    `
                  : ""}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define("mobile-menu", MobileMenu);
