import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";
import "./ctabutton.js";

export class HeroBanner extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      .hero {
        position: relative;
        min-height: 480px;
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
        filter: brightness(0.45) contrast(0.85);
      }

      /* gradient overlay to preserve DDD text legibility */
      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          var(--ddd-theme-bg) 15%,
          transparent 45%,
          var(--ddd-theme-bg) 85%
        );
      }

      /* content sits on top */
      .content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding: var(--ddd-spacing-6) var(--ddd-spacing-4);
        gap: var(--ddd-spacing-3);
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.75rem;
        opacity: 0.85;
        color: var(--ddd-theme-text-secondary);
      }

      h1 {
        margin: 0;
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 900;
        color: var(--ddd-theme-text-primary);
        line-height: 1.1;
      }

      p {
        margin: 0;
        max-width: 40rem;
        font-size: var(--ddd-font-size-m);
        color: var(--ddd-theme-text-secondary);
      }

      .actions {
        margin-top: var(--ddd-spacing-4);
        display: flex;
        gap: var(--ddd-spacing-3);
      }

      .btn {
        border: 1px solid var(--ddd-theme-primary);
        border-radius: var(--ddd-radius-md);
        background: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg);
        padding: var(--ddd-spacing-3) var(--ddd-spacing-5);
        font-size: var(--ddd-font-size-m);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: transform 160ms ease;
      }

      .btn:hover {
        transform: translateY(-2px);
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
            <p>
              A focused hub for parents, players, and volunteers. Important
              information like upcoming games and key news is always easy to find.
            </p>

            <div class="actions">
              <button class="btn">Get Started</button>
              <button class="btn">Learn More</button>
            </div>
          </div>
        </section>
      </d-d-d>
    `;
  }
}

customElements.define("hero-banner", HeroBanner);
