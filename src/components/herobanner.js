import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class HeroBanner extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      .hero {
        position: relative;
        min-height: 420px;
        border-radius: var(--ddd-radius-lg);
        overflow: hidden;
        background: var(--ddd-theme-bg);
        border: 1px solid var(--ddd-theme-border);
      }

      /* background image */
      .bg {
        position: absolute;
        inset: 0;
        background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpSbrbgjihtQI3YNnQEXLLxKTz6C3Z3J5RQ&s");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: brightness(0.45) contrast(0.9);
      }

      /* dark overlay to ensure text contrast */
      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          var(--ddd-theme-bg),
          transparent 45%,
          var(--ddd-theme-bg)
        );
      }

      /* content layer */
      .content {
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--ddd-spacing-6) var(--ddd-spacing-4);
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.75rem;
        margin-bottom: var(--ddd-spacing-2);
        color: var(--ddd-theme-text-secondary);
      }

      h1 {
        margin: 0;
        font-size: clamp(2.2rem, 4vw, 3.2rem);
        font-weight: 900;
        line-height: 1.1;
        color: var(--ddd-theme-text-primary);
        max-width: 18ch;
      }

      @media (max-width: 768px) {
        .hero {
          min-height: 320px;
        }

        h1 {
          font-size: clamp(1.8rem, 6vw, 2.4rem);
        }
      }
    `
  ];

  render() {
    return html`
      <d-d-d>
        <section class="hero">
          <div class="bg"></div>
          <div class="overlay"></div>

          <div class="content">
            <div class="eyebrow">ICEking presents</div>
            <h1>Silver Chariot Youth Hockey Association</h1>
          </div>
        </section>
      </d-d-d>
    `;
  }
}

customElements.define("hero-banner", HeroBanner);
