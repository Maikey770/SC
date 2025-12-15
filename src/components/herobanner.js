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
        padding: var(--ddd-spacing-6);
        border-radius: var(--ddd-radius-lg);
        color: var(--ddd-theme-text-primary);

        background:
          radial-gradient(circle at top, var(--ddd-theme-primary) 0%, transparent 55%),
          linear-gradient(to bottom, var(--ddd-theme-surface), var(--ddd-theme-bg));

        border: 1px solid var(--ddd-theme-border);
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.75rem;
        opacity: 0.8;
        margin-bottom: var(--ddd-spacing-2);
        color: var(--ddd-theme-text-secondary);
      }

      h1 {
        margin: 0 0 var(--ddd-spacing-3);
        font-size: clamp(1.8rem, 3vw, 2.4rem);
        line-height: 1.05;
      }

      p {
        margin: 0 0 var(--ddd-spacing-4);
        max-width: 40rem;
        color: var(--ddd-theme-text-secondary);
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
