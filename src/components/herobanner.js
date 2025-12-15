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
        min-height: 460px;
        border-radius: var(--ddd-radius-lg);
        overflow: hidden;
        border: 1px solid var(--ddd-theme-border);
      }

      /* full-width background */
      .bg {
        position: absolute;
        inset: 0;
        background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpSbrbgjihtQI3YNnQEXLLxKTz6C3Z3J5RQ&s");
        background-size: cover;
        background-position: center;
        filter: brightness(0.45);
      }

      /* gradient so right side text stays readable */
      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.75) 0%,
          rgba(0, 0, 0, 0.45) 40%,
          rgba(0, 0, 0, 0.85) 100%
        );
      }

      .content {
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        align-items: center;
        padding: var(--ddd-spacing-8);
        max-width: 1200px;
        margin: 0 auto;
      }

      .text {
        max-width: 640px;
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.75rem;
        color: var(--ddd-theme-text-secondary);
        margin-bottom: var(--ddd-spacing-2);
      }

      h1 {
        margin: 0;
        font-size: clamp(2.4rem, 4vw, 3.4rem);
        font-weight: 900;
        line-height: 1.05;
        color: var(--ddd-theme-text-primary);
      }

      @media (max-width: 768px) {
        .hero {
          min-height: 340px;
        }

        .content {
          padding: var(--ddd-spacing-5);
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
            <div class="text">
              <div class="eyebrow">ICEking presents</div>
              <h1>Silver Chariot Youth Hockey Association</h1>
            </div>
          </div>
        </section>
      </d-d-d>
    `;
  }
}

customElements.define("hero-banner", HeroBanner);
