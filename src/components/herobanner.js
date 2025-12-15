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

      d-d-d {
        display: block;
      }

      .hero {
        position: relative;
        border-radius: var(--ddd-radius-xl);
        overflow: hidden;
        min-height: 460px;

        display: grid;
        grid-template-columns: 1.4fr 1fr;
        align-items: stretch;

        background: var(--ddd-theme-background);

        /* Force hero text color using DDD tokens only */
        --hero-text-color: var(--ddd-theme-bg);
      }

      .bg {
        position: absolute;
        inset: 0;
        background-image: url("https://i.pinimg.com/736x/c9/d1/9a/c9d19aea11bbc1ef2bcc2aa8de4ff9e2.jpg");
        background-size: cover;
        background-position: center top;
        background-repeat: no-repeat;
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to right,
          var(--ddd-theme-background),
          transparent
        );
      }

      .content {
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--ddd-spacing-8);
        gap: var(--ddd-spacing-4);
        max-width: 640px;
      }

      .eyebrow {
        font-size: var(--ddd-font-size-xs);
        letter-spacing: var(--ddd-letter-spacing-wide);
        text-transform: uppercase;
        color: var(--hero-text-color);
      }

      h1 {
        margin: 0;
        font-size: var(--ddd-font-size-xxl);
        line-height: var(--ddd-line-height-tight);
        color: var(--hero-text-color);
      }

      .side {
        position: relative;
        z-index: 1;
        padding: var(--ddd-spacing-8);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 900px) {
        .hero {
          grid-template-columns: 1fr;
        }

        .side {
          display: none;
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
            <div class="eyebrow">ICEKING PRESENTS</div>
            <h1>Silver Chariot Youth Hockey Association</h1>
          </div>

          <div class="side"></div>
        </section>
      </d-d-d>
    `;
  }
}

customElements.define("hero-banner", HeroBanner);
