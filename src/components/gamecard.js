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

      /* DDD-only styling: no hex colors */
      .card {
        background: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-black);
        border-radius: var(--ddd-radius-xl, 14px);
        padding: var(--ddd-spacing-4) var(--ddd-spacing-5);
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: var(--ddd-spacing-4);
        border: 1px solid color-mix(in srgb, var(--ddd-theme-default-black) 12%, transparent);
        box-shadow: 0 var(--ddd-spacing-3) var(--ddd-spacing-6)
          color-mix(in srgb, var(--ddd-theme-default-black) 22%, transparent);
      }

      :host([compact]) .card {
        padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-lg, 12px);
      }

      .left {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-3);
        min-width: 160px;
      }

      .logos {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
      }

      .logo {
        width: 44px;
        height: 44px;
        border-radius: var(--ddd-radius-round, 999px);
        overflow: hidden;
        display: grid;
        place-items: center;
        background: color-mix(in srgb, var(--ddd-theme-default-white) 88%, var(--ddd-theme-default-black));
        border: 1px solid color-mix(in srgb, var(--ddd-theme-default-black) 12%, transparent);
      }

      :host([compact]) .logo {
        width: 40px;
        height: 40px;
      }

      .logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .initials {
        font-weight: 800;
        font-size: var(--ddd-font-size-3xs, 12px);
        letter-spacing: 0.02em;
        color: var(--ddd-theme-default-black);
      }

      .vs {
        font-weight: 900;
        font-size: var(--ddd-font-size-4xs, 12px);
        letter-spacing: 0.08em;
        color: color-mix(in srgb, var(--ddd-theme-default-black) 70%, transparent);
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ddd-spacing-4);
        width: 100%;
      }

      .meta {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
      }

      .dt {
        font-weight: 900;
        font-size: var(--ddd-font-size-2xs, 14px);
        letter-spacing: 0.02em;
      }

      .sub {
        font-size: var(--ddd-font-size-3xs, 12px);
        color: color-mix(in srgb, var(--ddd-theme-default-black) 72%, transparent);
      }

      /* CTA link styled with DDD variables */
      .buy {
        font-weight: 900;
        font-size: var(--ddd-font-size-3xs, 12px);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ddd-theme-primary, var(--ddd-theme-default-black));
        text-decoration: none;
        white-space: nowrap;
      }

      .buy:hover {
        text-decoration: underline;
      }

      .buy.disabled {
        opacity: 0.5;
        pointer-events: none;
        cursor: default;
      }

      @media (max-width: 520px) {
        .card {
          grid-template-columns: 1fr;
          gap: var(--ddd-spacing-3);
        }
        .left {
          min-width: 0;
        }
        .right {
          justify-content: space-between;
        }
      }
    `
  ];

  // "U12" -> "U12", "North Ridge" -> "NR"
  _initials(name) {
    if (!name) return "SC";
    const s = String(name).trim();
    if (/^u\d+/i.test(s)) return s.toUpperCase();
    const parts = s.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  render() {
    const g = this.game || {};
    const dt = `${g.date || ""}${g.date && g.time ? " | " : ""}${g.time || ""}`.trim();

    const homeName = g.team || "Silver Chariot";
    const awayName = g.opponent || "Opponent";

    // Optional fields (add later in JSON if you want real logos/links)
    const homeLogo = g.teamLogo || "";
    const awayLogo = g.opponentLogo || "";
    const ticketUrl = g.ticketUrl || "";

    return html`
      <div class="card">
        <div class="left">
          <div class="logos" aria-label="Matchup">
            <div class="logo" title=${homeName}>
              ${homeLogo
                ? html`<img src=${homeLogo} alt=${homeName} />`
                : html`<div class="initials">${this._initials(homeName)}</div>`}
            </div>

            <div class="vs" aria-hidden="true">VS</div>

            <div class="logo" title=${awayName}>
              ${awayLogo
                ? html`<img src=${awayLogo} alt=${awayName} />`
                : html`<div class="initials">${this._initials(awayName)}</div>`}
            </div>
          </div>
        </div>

        <div class="right">
          <div class="meta">
            <div class="dt">${dt || "TBD"}</div>
            <div class="sub">${g.location || ""}</div>
          </div>

          <a
            class="buy ${ticketUrl ? "" : "disabled"}"
            href=${ticketUrl || "#"}
            target=${ticketUrl ? "_blank" : ""}
            rel=${ticketUrl ? "noopener noreferrer" : ""}
            aria-disabled=${ticketUrl ? "false" : "true"}
          >
            BUY TICKETS
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define("game-card", GameCard);
