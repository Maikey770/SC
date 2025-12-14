// Footer section that displays site info and secondary links
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/lib/d-d-d-button.js";
import { dddGlobal } from "../ddd-global.js";

export class FooterSection extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
        margin-top: var(--ddd-spacing-7, 32px);
        background: var(--ddd-theme-background, #05070b);
        color: var(--ddd-theme-text-primary, #f5f7fb);
        border-top: 1px solid var(--ddd-theme-border, rgba(155, 177, 212, 0.3));
      }

      footer {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--ddd-spacing-4, 16px);
        display: flex;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-4, 16px);
        justify-content: space-between;
        font-size: 0.8rem;
      }

      .col {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      a {
        color: inherit;
        text-decoration: none;
        opacity: 0.8;
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
