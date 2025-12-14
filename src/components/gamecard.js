// Show a single game entry with basic details and status
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/d-d-d/d-d-d-button.js";
import { dddGlobal } from "../ddd-global.js";

export class GameCard extends LitElement {
  static properties = {
    game: { type: Object }
  };

  constructor() {
    super();
    this.game = {};
  }

  static styles = [
    dddGlobal,
    css`
      .card {
        background: var(--ddd-theme-surface, #111726);
        border: 1px solid var(--ddd-theme-border, rgba(255, 255, 255, 0.15));
        border-radius: var(--ddd-radius-lg, 14px);
        padding: var(--ddd-spacing-3, 12px);
        color: var(--ddd-theme-text-primary, white);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
      }

      .meta {
        font-size: 0.8rem;
        opacity: 0.8;
        display: flex;
        justify-content: space-between;
      }

      .teams {
        font-weight: 600;
        margin: 6px 0;
      }

      .tag {
        padding: 2px 8px;
        border-radius: 12px;
        border: 1px solid var(--ddd-theme-border, rgba(255, 255, 255, 0.3));
        font-size: 0.7rem;
      }
    `
  ];

  render() {
    const g = this.game || {};

    return html`
      <d-d-d>
        <div class="card">
          <div class="meta">
            <span>${g.date} • ${g.time}</span>
            <span class="tag">${g.home ? "Home" : "Away"}</span>
          </div>

          <div class="teams">${g.teams}</div>

          <div class="meta">
            <span>${g.location}</span>
            <span>${g.type}</span>
          </div>
        </div>
      </d-d-d>
    `;
  }
}

customElements.define("game-card", GameCard);
