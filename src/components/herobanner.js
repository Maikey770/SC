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
      }

      /* background image */
      .bg {
        position: absolute;
        inset: 0;
        background-image: url("https://i.pinimg.com/736x/9c/2d/9b/9c2d9be1ed3b4bd4f8090738273c19b8.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      /* overlay for readability */
      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to right,
          var(--ddd-theme-background),
          transparent
        );
      }

      /* LEFT: title only */
      .content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--ddd-spacing-8);
        gap: var(--ddd-spacing-4);
        max-width: 520px;
      }

      .eyebrow {
        font-size: var(--ddd-font-size-xs);
        letter-spacing: var(--ddd-letter-spacing-wide);
        text-transform: uppercase;
        color: var(--ddd-theme-text-primary);
      }

      h1 {
        margin: 0;
        font-size: var(--ddd-font-size-xxl);
        line-height: var(--ddd-line-height-tight);
        color: var(--ddd-theme-text-primary);
      }

      /* RIGHT: next game only */
      .side {
        position: relative;
        z-index: 1;
        padding: var(--ddd-spacing-8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--ddd-spacing-3);
        color: var(--ddd-theme-text-primary);
      }

      .label {
        font-size: var(--ddd-font-size-xs);
        letter-spacing: var(--ddd-letter-spacing-wide);
        text-transform: uppercase;
        opacity: 0.8;
      }

      .title {
        font-size: var(--ddd-font-size-l);
        font-weight: 700;
      }

      .match {
        font-weight: 700;
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

          <!-- LEFT -->
          <div class="content">
            <div class="eyebrow">ICEKING PRESENTS</div>
            <h1>Silver Chariot</h1>
          </div>

          <!-- RIGHT -->
          <div class="side">
            <div class="label">Theme night</div>
            <div class="title">Next game</div>
            <div class="match">U12 &nbsp; VS &nbsp; NORTH RIDGE</div>
            <div>2025-09-06 08:30 AM</div>
            <div>State College Ice Pavilion</div>
          </div>
        </section>
      </d-d-d>
    `;
  }
}

customElements.define("hero-banner", HeroBanner);
