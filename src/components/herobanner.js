// Hero banner section
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class HeroBanner extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-primary);
      }

      d-d-d {
        display: block;
      }

      /* hero container */
      .hero {
        position: relative;
        border-radius: var(--ddd-radius-xl);
        overflow: hidden;
        min-height: calc(var(--ddd-spacing-6) * 10);
        background: var(--ddd-theme-bg);
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

      /* dark overlay */
      .overlay {
        position: absolute;
        inset: 0;
        background: var(--ddd-theme-bg);
        opacity: 0.55;
      }

      /* text area */
      .content {
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--ddd-spacing-8);
        gap: var(--ddd-spacing-3);
        max-width: calc(var(--ddd-spacing-6) * 14);
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
        font-weight: 900;
      }

      .club {
        display: block;
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
            <h1>
              Silver Chariot
              <span class="club">Club</span>
            </h1>
          </div>
        </section>
      </d-d-d>
    `;
  }
}

customElements.define("hero-banner", HeroBanner);
