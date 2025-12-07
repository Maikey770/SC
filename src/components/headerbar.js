// top header bar with main nav
import { LitElement, html, css } from "https://esm.run/lit";

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
    // load menu from our JSON file
    fetch("/api/menu.json")
      .then((res) => res.json())
      .then((data) => {
        // just in case data is not what we expect
        this.menuItems = data && data.items ? data.items : [];
      })
      .catch((err) => {
        console.error("menu load error", err);
      });
  }

  static styles = css`
    :host {
      display: block;
      background: #0b1020;
      color: #fff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }

    header {
      max-width: 1200px;
      margin: 0 auto;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 0.05em;
    }

    .logo {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid #cfd6e6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
    }

    nav {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.85rem;
    }

    button[data-active="true"] {
      background: #376fff;
      color: #fff;
    }

    .menu-toggle {
      display: none;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 4px 10px;
      font-size: 0.85rem;
      background: none;
      color: inherit;
    }

    @media (max-width: 768px) {
      nav {
        display: none;
      }
      .menu-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  `;

  _onNavClick(id) {
    // send page id to parent
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

  render() {
    return html`
      <header>
        <div class="brand">
          <div class="logo">SC</div>
          <span>Silver Chariot</span>
        </div>

        <nav>
          ${this.menuItems.map(
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

        <button class="menu-toggle" @click=${() => this._openMenu()}>
          Menu
        </button>
      </header>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
