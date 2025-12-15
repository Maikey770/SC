// Image gallery section
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class ImageGallery extends LitElement {
  static properties = {
    items: { type: Array }
  };

  constructor() {
    super();

    // sample images
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
        font-family: var(--ddd-font-primary);
      }

      h2 {
        margin: 0 0 var(--ddd-spacing-4) 0;
        font-size: var(--ddd-font-size-l);
        color: var(--ddd-theme-text-primary);
      }

      /* image grid */
      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(220px, 1fr));
        gap: var(--ddd-spacing-4);
      }

      /* image card */
      .card {
        position: relative;
        overflow: hidden;
        border-radius: var(--ddd-radius-lg);
        border: 1px solid var(--ddd-theme-border);
        background: var(--ddd-theme-surface);
        min-height: calc(var(--ddd-spacing-6) * 6);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* dark overlay */
      .overlay {
        position: absolute;
        inset: 0;
        background: var(--ddd-theme-bg);
        opacity: 0.45;
        pointer-events: none;
      }

      /* image label */
      .label {
        position: absolute;
        left: var(--ddd-spacing-4);
        bottom: var(--ddd-spacing-4);
        right: var(--ddd-spacing-4);
        color: var(--ddd-theme-text-primary);
        font-weight: 800;
        font-size: var(--ddd-font-size-s);
        line-height: 1.2;
      }

      @media (max-width: 980px) {
        .grid {
          grid-template-columns: 1fr;
        }

        .card {
          min-height: calc(var(--ddd-spacing-6) * 5);
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
