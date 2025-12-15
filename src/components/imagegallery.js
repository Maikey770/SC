import { LitElement, html, css } from "lit";
import { dddGlobal } from "../ddd-global.js";

export class ImageGallery extends LitElement {
  static properties = {
    items: { type: Array }
  };

  constructor() {
    super();
    // Rink Moments data (your URLs)
    this.items = [
      {
        title: "U12 team huddle before faceoff",
        src: "https://i.pinimg.com/1200x/36/d7/4e/36d74e47acc0219cbdc8b88ecf719f55.jpg",
        alt: "Youth hockey team huddle before faceoff"
      },
      {
        title: "Goalie warmup drills",
        src: "https://cdn1.sportngin.com/attachments/photo/f770-154672070/GoalieAcademy_large.jpg",
        alt: "Youth hockey goalie warmup drills on the ice"
      },
      {
        title: "Parents cheering from the stands",
        src: "https://i.pinimg.com/1200x/3d/05/7f/3d057f0b1cd54226b1f9108563735b39.jpg",
        alt: "Parents cheering from the stands at a youth hockey game"
      }
    ];
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      h2 {
        margin: 0 0 var(--ddd-spacing-4) 0;
        font-size: var(--ddd-font-size-l, 28px);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(220px, 1fr));
        gap: var(--ddd-spacing-4, 16px);
      }

      .card {
        position: relative;
        overflow: hidden;
        border-radius: var(--ddd-radius-lg, 16px);
        border: 1px solid var(--ddd-theme-border);
        background: var(--ddd-theme-surface);
        min-height: 220px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transform: scale(1.02);
      }

      /* DDD-only overlay (derived from tokens) */
      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--ddd-theme-primary) 22%, transparent),
          color-mix(in srgb, var(--ddd-theme-background) 55%, transparent)
        );
        pointer-events: none;
      }

      .label {
        position: absolute;
        left: var(--ddd-spacing-4, 16px);
        bottom: var(--ddd-spacing-4, 16px);
        right: var(--ddd-spacing-4, 16px);
        color: var(--ddd-theme-text-primary);
        font-weight: 800;
        font-size: var(--ddd-font-size-s, 16px);
        line-height: 1.2;
        text-shadow: 0 2px 10px color-mix(in srgb, var(--ddd-theme-background) 70%, transparent);
      }

      @media (max-width: 980px) {
        .grid {
          grid-template-columns: 1fr;
        }
        .card {
          min-height: 200px;
        }
      }
    `
  ];

  render() {
    return html`
      <section>
        <h2>Rink Moments</h2>
        <div class="grid">
          ${this.items.map(
            (it) => html`
              <div class="card">
                <img src=${it.src} alt=${it.alt} loading="lazy" />
                <div class="overlay" aria-hidden="true"></div>
                <div class="label">${it.title}</div>
              </div>
            `
          )}
        </div>
      </section>
    `;
  }
}

customElements.define("image-gallery", ImageGallery);
