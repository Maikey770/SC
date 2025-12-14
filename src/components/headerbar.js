import { LitElement, html, css } from "lit";

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
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data && data.items ? data.items : [];
      })
      .catch((err) => {
        console.error("menu load error", err);
      });
  }

  static styles = css`
    :host {
      display: block;
      background: var(--ddd-theme-default-black);
      color: var(--ddd-theme-default-white);
      border-bottom: var(--ddd-border-sm) solid var(--ddd-theme-default-beaver70);
      font-family: var(--ddd-font-primary);
    }

    header {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ddd-spacing-3);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: var(--ddd-spacing-2);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: var(--ddd-font-size-s);
    }

    .logo {
      width: var(--ddd-spacing-7);
      height: var(--ddd-spacing-7);
      border-radius: var(--ddd-radius-circle);
      border: var(--ddd-border-sm) solid var(--ddd-theme-default-beaver70);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--ddd-font-size-xs);
    }

    nav {
      display: flex;
      gap: var(--ddd-spacing-2);
      align-items: center;
    }

    button {
      background: transparent;
      border: var(--ddd-border-sm) solid transparent;
      color: inherit;
      cursor: pointer;
      padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
      border-radius: var(--ddd-radius-pill);
      font-size: var(--ddd-font-size-s);
    }

    button[data-active="true"] {
      border-color: var(--ddd-theme-default-beaverBlue);
      background: var(--ddd-theme-default-beaver80);
    }

    .menu-toggle {
      border-color: var(--ddd-theme-default-beaver70);
    }

    button:focus-visible {
      outline: var(--ddd-border-md) solid var(--ddd-theme-default-beaverBlue);
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      nav {
        display: none;
      }
    }
  `;

  _onNavClick(id) {
    this.dispatchEvent(
      new CustomEvent("nav-change", {
        detail: id,
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

  _getFlatMainItems() {
    const groups = Array.isArray(this.menuItems) ? this.menuItems : [];
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      const kids = g && Array.isArray(g.children) ? g.children : null;
      if (kids && kids.length) return kids;
    }
    return [];
  }

  render() {
    const items = this._getFlatMainItems();

    return html`
      <header>
        <div class="brand">
          <div class="logo">SC</div>
          <span>Silver Chariot</span>
        </div>

        <nav aria-label="Primary navigation">
          ${items.map(
            (item) => html`
              <button
                data-active=${this.page === item.id}
                @click=${() => this._onNavClick(item.id)}
              >
                ${item.label}
              </button>
            `
          )}
        </nav>

        <button
          class="menu-toggle"
          type="button"
          aria-label="Open menu"
          @click=${() => this._openMenu()}
        >
          Menu
        </button>
      </header>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
