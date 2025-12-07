// slide down menu for small screens
import { LitElement, html, css } from "https://esm.run/lit";

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
  }

  connectedCallback() {
    super.connectedCallback();
    // use same JSON as header
    fetch("/api/menu.json")
      .then((res) => res.json())
      .then((data) => {
        this.menuItems = data && data.items ? data.items : [];
      })
      .catch((err) => {
        console.error("mobile menu load error", err);
      });
  }

  static styles = css`
    :host {
      display: block;
    }

    .bg {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: none;
      z-index: 40;
    }

    :host([open]) .bg {
      display: block;
    }

    .panel {
      background: #05070b;
      padding: 16px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      border-bottom: 1px solid rgba(155, 177, 212, 0.4);
    }

    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 0.9rem;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 6px;
    }

    button {
      background: none;
      border: none;
      color: #f5f7fb;
      font: inherit;
      text-align: left;
      padding: 8px 4px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    button[data-active="true"] {
      background: rgba(55, 111, 255, 0.28);
    }

    @media (min-width: 769px) {
      .bg {
        display: none !important;
      }
    }
  `;

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
      <div class="bg" role="dialog" aria-modal="true">
        <div class="panel">
          <div class="top-row">
            <span>Silver Chariot</span>
            <button @click=${() => this._close()}>Close</button>
          </div>
          <div class="links">
            ${this.menuItems.map(
              (item) => html`
                <button
                  data-active=${this.page === item.id}
                  @click=${() => this._go(item.id)}
                >
                  ${item.label}
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("mobile-menu", MobileMenu);
