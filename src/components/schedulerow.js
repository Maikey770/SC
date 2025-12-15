import { LitElement, html, css } from "lit";
import { dddGlobal } from "../ddd-global.js";
import "./gamecard.js";

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
        border: 1px solid var(--ddd-theme-border);
        border-radius: var(--ddd-radius-lg);
        padding: var(--ddd-spacing-5);
        background: var(--ddd-theme-surface);
        display: grid;
        gap: var(--ddd-spacing-4);
      }

      h2 {
        margin: 0;
        font-size: var(--ddd-font-size-xl);
        line-height: 1.05;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(220px, 1fr));
        gap: var(--ddd-spacing-4);
      }

      @media (max-width: 980px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ];

  render() {
    const list = Array.isArray(this.games) ? this.games.slice(0, 2) : [];

    return html`
      <section class="wrap">
        <h2>${this.heading}</h2>
        <div class="grid">
          ${list.length
            ? list.map((g) => html`<game-card .game=${g}></game-card>`)
            : html`<div>No games available.</div>`}
        </div>
      </section>
    `;
  }
}

customElements.define("schedule-row", ScheduleRow);
