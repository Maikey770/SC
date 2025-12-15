import { LitElement, html, css } from "lit";
import { dddGlobal } from "../ddd-global.js";

export class ScheduleRow extends LitElement {
  static properties = {
    heading: { type: String },
    games: { type: Array }
  };

  constructor() {
    super();
    this.heading = "Upcoming Games";
    this.games = [];
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      .wrap {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 22px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.04);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      }

      h2 {
        margin: 0 0 14px 0;
        font-size: 44px;
        line-height: 1.05;
        letter-spacing: -0.02em;
      }

      .layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        align-items: start;
      }

      .left {
        display: grid;
        grid-template-columns: repeat(2, minmax(220px, 320px));
        gap: 16px;
        align-content: start;
      }

      .right {
        min-height: 140px;
      }

      .empty {
        opacity: 0.75;
        font-size: 0.95rem;
        padding: 8px 2px;
      }

      game-card {
        width: 100%;
        max-width: 320px;
      }

      @media (max-width: 980px) {
        .layout {
          grid-template-columns: 1fr;
        }
        .right {
          display: none;
        }
        .left {
          grid-template-columns: 1fr;
        }
        game-card {
          max-width: 100%;
        }
      }

      @media (max-width: 520px) {
        h2 {
          font-size: 34px;
        }
      }
    `
  ];

  render() {
    const list = Array.isArray(this.games) ? this.games.slice(0, 2) : [];

    return html`
      <section class="wrap">
        <h2>${this.heading}</h2>
        <div class="layout">
          <div class="left">
            ${list.length
              ? list.map((g) => html`<game-card .game=${g}></game-card>`)
              : html`<div class="empty">No games available.</div>`}
          </div>
          <div class="right" aria-hidden="true"></div>
        </div>
      </section>
    `;
  }
}

customElements.define("schedule-row", ScheduleRow);
