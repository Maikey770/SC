// News card that shows a short update or announcement
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/lib/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class NewsCard extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      .card {
        border-radius: var(--ddd-radius-lg, 16px);
        border: 1px solid var(--ddd-theme-border, rgba(155, 177, 212, 0.4));
        padding: var(--ddd-spacing-3, 12px);
        background: var(--ddd-theme-surface, rgba(5, 7, 11, 0.9));
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-2, 8px);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
      }

      .meta {
        font-size: 0.8rem;
        opacity: 0.8;
      }

      h3 {
        margin: 0;
        font-size: 1rem;
      }

      p {
        margin: 0;
        font-size: 0.85rem;
        opacity: 0.9;
      }
    `
  ];

  render() {
    return html`
      <d-d-d>
        <article class="card">
          <div class="meta">Nov 26 · Association Update</div>
          <h3>Silver Chariot Winter Skills Camp Announced</h3>
          <p>
            Small ice groups to work on edges, control, and game sense for
            U10–U16 players.
          </p>
        </article>
      </d-d-d>
    `;
  }
}

customElements.define("news-card", NewsCard);
