// Hero section that introduces the site and highlights the main call to action
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
        padding: var(--ddd-spacing-6, 24px);
        border-radius: var(--ddd-radius-lg, 16px);
        background: radial-gradient(
          circle at top,
          var(--ddd-theme-primary, #1b3570) 0,
          var(--ddd-theme-background, #05070b) 55%
        );
        color: var(--ddd-theme-text-primary, #f5f7fb);
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.75rem;
        opacity: 0.8;
        margin-bottom: 8px;
      }

      h1 {
        margin: 0 0 12px;
        font-size: clamp(1.8rem, 3vw, 2.4rem);
      }

      p {
        margin: 0 0 16px;
        max-width: 40rem;
        opacity: 0.9;
      }
    `
  ];

  render() {
    return html`
      <d-d-d>
        <section class="hero">
          <div class="eyebrow">ICEking presents</div>
          <h1>Silver Chariot Youth Hockey Association</h1>
          <p>
            A focused hub for parents, players, and volunteers. Important information
            like upcoming games and key news is always easy to find.
          </p>
          <cta-button label="Register for the season"></cta-button>
        </section>
      </d-d-d>
    `;
  }
}

customElements.define("hero-banner", HeroBanner);
