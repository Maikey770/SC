// Header row that introduces the schedule section
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class ScheduleRow extends LitElement {
  static properties = {
    heading: { type: String }
  };

  constructor() {
    super();
    this.heading = "Upcoming Games";
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--ddd-spacing-2, 8px);
        margin-bottom: var(--ddd-spacing-2, 8px);
      }

      h2 {
        margin: 0;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `
  ];

  render() {
    return html`
      <d-d-d>
        <div class="row">
          <div>
            <h2>${this.heading}</h2>
            <p>Most recent schedule is always visible near the top of the site.</p>
          </div>
        </div>
      </d-d-d>
    `;
  }
}

customElements.define("schedule-row", ScheduleRow);
