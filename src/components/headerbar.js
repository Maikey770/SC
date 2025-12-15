import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/d-d-d/d-d-d-button.js";
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
    // Load menu items from API
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data?.items ?? [];
      })
      .catch((err) => console.error("menu load error", err));
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
        background: #000;
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      }

      header {
        max-width: 1400px;
        margin: 0 auto;
        padding: 12px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .brand {
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
      }

      nav {
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
        min-width: 480px;
      }

      d-d-d-button {
        --ddd-button-background: transparent;
        --ddd-button-color: white;
        --ddd-button-border: 1px solid rgba(255, 255, 255, 0.25);
      }

      @media (max-width: 768px) {
        nav {
          display: none;
        }
      }
    `
  ];

  _onNavClick(id) {
    this.dispatchEvent(
      new CustomEvent("nav-change", {
        detail: id,
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <d-d-d>
        <header>
          <div class="brand">SC SILVER CHARIOT</div>

          <nav>
            ${this.menuItems.map(
              (item) => html`
                <d-d-d-button
                  @click=${() => this._onNavClick(item.page)}
                >
                  ${item.label}
                </d-d-d-button>
              `
            )}
          </nav>
        </header>
      </d-d-d>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
