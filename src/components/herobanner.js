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
        min-height: 420px;

        /* layout */
        display: grid;
        grid-template-columns: 1.4fr 1fr;
        align-items: stretch;

        /* DDD surface */
        background: var(--ddd-theme-background);
      }

      /* background image */
      .bg {
        position: absolute;
        inset: 0;
        background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpSbrbgjihtQI3YNnQEXLLxKTz6C3Z3J5RQ&s");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      /* DDD-only overlay (no rgba, no hex) */
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
        padding: var(--ddd-spacing-8);
        max-width: 640px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--ddd-spacing-4);
      }

      .eyebrow {
        font-size: var(--ddd-font-size-xs);
        letter-spacing: var(--ddd-letter-spacing-wide);
        text-transform: uppercase;
        color: var(--ddd-theme-text-secondary);
      }

      h1 {
        margin: 0;
        font-size: var(--ddd-font-size-xxl);
        line-height: var(--ddd-line-height-tight);
        color: var(--ddd-theme-text-primary);
      }

      /* right side placeholder (future content) */
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
