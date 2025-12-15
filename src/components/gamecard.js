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

      /* Main layout */
      .surface {
        padding: var(--ddd-spacing-4);
      }

      :host([compact]) .surface {
        padding: var(--ddd-spacing-3);
      }

      .card {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: flex-start; /* top align so rows look straight */
        gap: var(--ddd-spacing-4); /* more breathing room */
      }

      /* Team bubbles */
      .logos {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-4);
      }

      .logo {
        width: 44px;
        height: 44px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--ddd-theme-surface);
        border: 1px solid var(--ddd-theme-border);
        color: var(--ddd-theme-text-primary);
        font-weight: 800;
        font-size: var(--ddd-font-size-s);
      }

      :host([compact]) .logo {
        width: 40px;
        height: 40px;
      }

      .vs {
        font-weight: 900;
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-text-secondary);
      }

      /* Text block */
      .meta {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
        min-width: 0;
      }

      .dt {
        font-weight: 900;
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-text-primary);
      }

      .sub {
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-text-secondary);
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
    if (/^u\d+/i.test(name)) return String(name).toUpperCase();
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }

  render() {
    const g = this.game || {};
    const dateTime = `${g.date || ""} ${g.time || ""}`.trim();

    return html`
      <div class="surface">
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
      </div>
    `;
  }
}

customElements.define("game-card", GameCard);
