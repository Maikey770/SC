// Simple news card
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class NewsCard extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-primary);
      }

      /* Card wrapper */
      .card {
        border-radius: var(--ddd-radius-lg);
        border: 1px solid var(--ddd-theme-border);
        padding: var(--ddd-spacing-3);
        background: var(--ddd-theme-surface);
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-2);
        transition: transform 160ms ease, box-shadow 160ms ease;
      }

      /* Hover lift */
      .card:hover {
        transform: translateY(-4px);
        box-shadow: var(--ddd-boxShadow-md);
      }

      /* Small date line */
      .meta {
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-text-secondary);
      }

      h3 {
        margin: 0;
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-text-primary);
      }

      p {
        margin: 0;
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-text-secondary);
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
