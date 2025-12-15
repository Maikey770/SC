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

      .card {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.04);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        overflow: hidden;
      }

      /* ---------- Compact (list) ---------- */
      .compact {
        padding: 14px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .compact-left {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .meta {
        opacity: 0.85;
        font-size: 0.95rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .loc {
        opacity: 0.8;
        font-size: 0.95rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .chip {
        border: 1px solid rgba(255, 255, 255, 0.25);
        background: rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.9);
        padding: 4px 10px;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        white-space: nowrap;
      }

      /* ---------- Featured (slider) ---------- */
      .featured {
        padding: 18px;
      }

      .featured-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
      }

      .featured-meta {
        opacity: 0.85;
        font-size: 0.95rem;
        font-weight: 600;
      }

      .teams {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 14px;
        align-items: center;
        margin-bottom: 14px;
      }

      .side {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .side.right {
        justify-content: flex-end;
        text-align: right;
        flex-direction: row-reverse;
      }

      .logo {
        width: 46px;
        height: 46px;
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.06);
        display: grid;
        place-items: center;
        overflow: hidden;
        flex: 0 0 auto;
      }

      .logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .logo-text {
        font-weight: 900;
        letter-spacing: 0.06em;
        font-size: 0.9rem;
      }

      .names {
        min-width: 0;
      }

      .name {
        font-weight: 800;
        font-size: 1.05rem;
        line-height: 1.1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .sub {
        opacity: 0.75;
        font-size: 0.9rem;
        margin-top: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .vs {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .vs-text {
        font-weight: 900;
        letter-spacing: 0.12em;
        opacity: 0.9;
      }

      .featured-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-top: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .location {
        opacity: 0.85;
        font-size: 0.95rem;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
  ];

  // Build initials for placeholder logos
  _initials(text) {
    const t = (text || "").trim();
    if (!t) return "SC";
    const parts = t.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() || "").join("");
  }

  render() {
    const g = this.game || {};
    const date = g.date || "";
    const time = g.time || "";
    const location = g.location || "";
    const status = g.status || "Scheduled";

    // Data mapping
    // Left = Silver Chariot side (team), Right = opponent side
    const leftName = "Silver Chariot";
    const leftSub = g.team ? `Team ${g.team}` : "Team";
    const rightName = g.opponent || "Opponent";
    const rightSub = g.location ? "Away" : "";

    // Optional logo urls (if you add them later)
    const leftLogo = g.homeLogo || g.leftLogo || "";
    const rightLogo = g.awayLogo || g.rightLogo || "";

    // Compact list view
    if (this.compact) {
      return html`
        <div class="card compact" role="listitem" aria-label="Game">
          <div class="compact-left">
            <div class="meta">${date} · ${time}</div>
            <div class="loc">${location}</div>
          </div>
          <div class="chip">${rightSub || "Away"}</div>
        </div>
      `;
    }

    // Featured card view (for the big panel / slider)
    return html`
      <div class="card featured" role="group" aria-label="Featured game">
        <div class="featured-top">
          <div class="featured-meta">${date} · ${time}</div>
          <div class="chip">${status}</div>
        </div>

        <div class="teams">
          <div class="side left">
            <div class="logo" aria-label="Home logo">
              ${leftLogo
                ? html`<img src="${leftLogo}" alt="Silver Chariot logo" />`
                : html`<div class="logo-text">${this._initials(leftName)}</div>`}
            </div>
            <div class="names">
              <div class="name">${leftName}</div>
              <div class="sub">${leftSub}</div>
            </div>
          </div>

          <div class="vs" aria-hidden="true">
            <div class="vs-text">VS</div>
            <div class="chip">Away</div>
          </div>

          <div class="side right">
            <div class="logo" aria-label="Away logo">
              ${rightLogo
                ? html`<img src="${rightLogo}" alt="${rightName} logo" />`
                : html`<div class="logo-text">${this._initials(rightName)}</div>`}
            </div>
            <div class="names">
              <div class="name">${rightName}</div>
              <div class="sub">${rightSub || "Away game"}</div>
            </div>
          </div>
        </div>

        <div class="featured-bottom">
          <div class="location">${location}</div>
          <div class="chip">${g.team || "U"}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("game-card", GameCard);
