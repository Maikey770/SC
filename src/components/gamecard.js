import { LitElement, html, css } from "lit";

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

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: #ffffff;
      color: #0b1220;
      border-radius: 14px;
      padding: 14px 16px;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 14px;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
    }

    :host([compact]) .card {
      padding: 12px 14px;
      border-radius: 12px;
    }

    .left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 160px;
    }

    .logos {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo {
      width: 44px;
      height: 44px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: #f3f5f7;
      border: 1px solid rgba(0, 0, 0, 0.12);
      font-weight: 800;
      font-size: 14px;
    }

    .vs {
      font-weight: 900;
      font-size: 12px;
      opacity: 0.7;
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
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
      opacity: 0.75;
    }

    .buy {
      font-weight: 900;
      font-size: 12px;
      text-transform: uppercase;
      color: #1b6fd6;
      text-decoration: none;
      white-space: nowrap;
    }

    .buy.disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    @media (max-width: 520px) {
      .card {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }
  `;

  _initials(name) {
    if (!name) return "SC";
    if (/^u\d+/i.test(name)) return name.toUpperCase();
    const parts = name.split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  }

  render() {
    const g = this.game || {};
    const dateTime = `${g.date || ""} ${g.time || ""}`.trim();

    return html`
      <div class="card">
        <div class="left">
          <div class="logos">
            <div class="logo">${this._initials(g.team)}</div>
            <div class="vs">VS</div>
            <div class="logo">${this._initials(g.opponent)}</div>
          </div>
        </div>

        <div class="right">
          <div class="meta">
            <div class="dt">${dateTime || "TBD"}</div>
            <div class="sub">${g.location || ""}</div>
          </div>

          <a
            class="buy ${g.ticketUrl ? "" : "disabled"}"
            href=${g.ticketUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            BUY TICKETS
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define("game-card", GameCard);
