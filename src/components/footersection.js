// Footer with basic links
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class FooterSection extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
        margin-top: var(--ddd-spacing-7);
        background: var(--ddd-theme-bg);
        color: var(--ddd-theme-text-primary);
        border-top: 1px solid var(--ddd-theme-border);
        font-family: var(--ddd-font-primary);
      }

      footer {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--ddd-spacing-4);
        display: flex;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-4);
        justify-content: space-between;
        font-size: var(--ddd-font-size-xs);
      }

      .col {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
      }

      a {
        color: inherit;
        text-decoration: none;
        opacity: 0.85;
      }

      a:hover {
        opacity: 1;
        text-decoration: underline;
      }
    `
  ];

  render() {
    return html`
      <d-d-d>
        <footer>
          <div class="col">
            <strong>Silver Chariot Youth Hockey</strong>
            <span>Home rink: State College Ice Pavilion</span>
            <span>ICEking Digital · Brand &amp; Site Design</span>
          </div>

          <div class="col">
            <a href="#">Contact</a>
            <a href="#">Volunteer</a>
            <a href="#">Policies</a>
          </div>
        </footer>
      </d-d-d>
    `;
  }
}

customElements.define("footer-section", FooterSection);
