// Image gallery section that highlights moments from games and practices
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/lib/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class ImageGallery extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      h2 {
        margin: 0 0 12px;
        font-size: 1.1rem;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: var(--ddd-spacing-3, 12px);
      }

      .thumb {
        position: relative;
        padding-top: 62%;
        border-radius: var(--ddd-radius-lg, 16px);
        overflow: hidden;
        background:
          radial-gradient(
            circle at top,
            rgba(80, 130, 220, 0.6),
            transparent 55%
          ),
          linear-gradient(
            135deg,
            var(--ddd-theme-surface, #101728),
            var(--ddd-theme-background, #05070b)
          );
        border: 1px solid var(--ddd-theme-border, rgba(155, 177, 212, 0.4));
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .thumb:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
      }

      .thumb-label {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 10px;
        font-size: 0.8rem;
        color: var(--ddd-theme-text-primary, #f5f7fb);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      }
    `
  ];

  render() {
    return html`
      <d-d-d>
        <section aria-label="Game and practice gallery">
          <h2>Rink Moments</h2>
          <div class="grid">
            <div class="thumb">
              <div class="thumb-label">U12 team huddle before faceoff</div>
            </div>
            <div class="thumb">
              <div class="thumb-label">Goalie warmup drills</div>
            </div>
            <div class="thumb">
              <div class="thumb-label">Parents cheering from the stands</div>
            </div>
          </div>
        </section>
      </d-d-d>
    `;
  }
}

customElements.define("image-gallery", ImageGallery);
