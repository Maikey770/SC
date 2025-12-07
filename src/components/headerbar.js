// Main desktop header
import { LitElement, html, css } from "https://esm.run/lit";

export class HeaderBar extends LitElement {
  static properties = {
    page: { type: String },
    menu: { type: Array }
  };

  constructor() {
    super();
    this.page = "home";
    this.menu = [];
  }

  // Load menu data from API
  connectedCallback() {
    super.connectedCallback();
    fetch("/api/menu.json")
      .then((res) => res.json())
      .then((data) => (this.menu = data.items));
  }

  static styles = css`
    :host {
      display: block;
      background: #0b1020;
      color: white;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }
    header {
      max-width: 1200px;
      margin: 0 auto;
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      display: flex;
      gap: 8px;
      font-weight: bold;
      text-transform: uppercase;
    }
    nav {
      display: flex;
      gap: 12px;
    }
    button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 8px;
    }
    button[data-active="true"] {
      background: #376fff;
    }
    .menu-toggle {
      display: none;
    }
    @media (max-width: 768px) {
      nav {
        display: none;
      }
      .menu-toggle {
        display: block;
      }
    }
  `;

  go(id) {
    this.dispatchEvent(new CustomEvent("nav-change", { detail: id }));
  }

  openMenu() {
    this.dispatchEvent(new CustomEvent("open-menu"));
  }

  render() {
    return html`
      <header>
        <div class="brand">Silver Chariot</div>

        <nav>
          ${this.menu.map(
            (item) => html`
              <button
                data-active=${this.page === item.id}
                @click=${() => this.go(item.id)}
              >
                ${item.label}
              </button>
            `
          )}
        </nav>

        <button class="menu-toggle" @click=${this.openMenu}>Menu</button>
      </header>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
