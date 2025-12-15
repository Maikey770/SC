import { LitElement, html, css } from "lit";
import { dddGlobal } from "../ddd-global.js";

export class GameCard extends LitElement {
  static properties = {
    game: { type: Object },
    compact: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.game = {};
    this.compact = false;
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      /* Use the same tokens as .surface in ddd-global.js */
      .card {
        background: var(--ddd-theme-surface);
        border: 1px solid var(--ddd-theme-border);
        border-radius: var(--ddd-radius-lg);
        padding: var(--ddd-spacing-4);
        color: var(--ddd-theme-text-primary);
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: var(--ddd-spacing-3);
      }

      :host([compact]) .card {
        border-radius: var(--ddd-radius-lg);
        padding: var(--ddd-spacing-3);
      }

      .logos {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-3);
      }

      .logo {
        width: 44px;
        height: 44px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--ddd-theme-surface);
        border: 1px solid var(--ddd-theme-border);
        font-weight: 800;
        font-size: 14px;
        color: var(--ddd-theme-text-primary);
      }

      :host([compact]) .logo {
        width: 40px;
        height: 40px;
      }

      .vs {
        font-weight: 900;
        font-size: 12px;
        color: var(--ddd-theme-text-primary);
        opacity: 0.8;
      }

      .meta {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .dt {
        font-weight: 900;
        font-size: 14px;
      }

      .sub {
        font-size: 12px;
        opacity: 0.8;
      }

      @media (max-width: 520px) {
        .card {
          grid-template-columns: 1fr;
        }
      }
    `
  ];

  _initials(name) {
    if (!name) return "SC";
    if (/^u\d+/i.test(name)) return name.toUpperCase();
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }

  render() {
    const g = this.game || {};
    const dateTime = `${g.date || ""} ${g.time || ""}`.trim();

    return html`
      <div class="card">
        <div class="logos" aria-label="Matchup">
          <div class="logo">${this._initials(g.team)}</div>
          <div class="vs">VS</div>
          <div class="logo">${this._initials(g.opponent)}</div>
        </div>

        <div class="meta">
          <div class="dt">${dateTime || "TBD"}</div>
          <div class="sub">${g.location || ""}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("game-card", GameCard);
