// Mobile drop-down menu
import { LitElement, html, css } from "https://esm.run/lit";

export class MobileMenu extends LitElement {
  static properties = {
    open: { type: Boolean },
    page: { type: String },
    menu: { type: Array }
  };

  constructor() {
    super();
    this.open = false;
    this.page = "home";
    this.menu = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetch("/api/menu.json")
      .then((res) => res.json())
      .then((data) => (this.menu = data.items));
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
    }
    :host([open]) .bg {
      display: block;
    }
    .panel {
      background: #0b1020;
      padding: 16px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    button {
      background: none;
      color: white;
      border: none;
      padding: 10px 4px;
      width: 100%;
      text-align: left;
    }
    button[data-active="true"] {
      background: rgba(55, 111, 255, 0.3);
    }
  `;

  close() {
    this.dispatchEvent(new CustomEvent("close-menu"));
  }

  go(id) {
    this.dispatchEvent(new CustomEvent("nav-change", { detail: id }));
    this.close();
  }

  render() {
    return html`
      <div class="bg">
        <div class="panel">
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
          <button @click=${this.close}>Close</button>
        </div>
      </div>
    `;
  }
}

customElements.define("mobile-menu", MobileMenu);
