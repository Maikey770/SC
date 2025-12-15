import { LitElement, html, css } from "lit";
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

      .wrap {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        padding: 18px;
        background: rgba(255, 255, 255, 0.04);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      }

      .top {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      }

      h2 {
        margin: 0;
        font-size: 40px;
        line-height: 1.05;
        letter-spacing: -0.02em;
      }

      .hint {
        font-size: 0.9rem;
        opacity: 0.75;
        white-space: nowrap;
      }

      /* Horizontal scroll rail */
      .rail {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 10px 6px 14px;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
      }

      /* Hide scrollbar (still scrollable) */
      .rail::-webkit-scrollbar {
        height: 8px;
      }
      .rail::-webkit-scrollbar-track {
        background: transparent;
      }
      .rail::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.18);
        border-radius: 9999px;
      }

      /* Make slotted cards behave like snap items */
      ::slotted(game-card) {
        flex: 0 0 auto;
        width: 320px;
        scroll-snap-align: start;
      }

      @media (max-width: 520px) {
        ::slotted(game-card) {
          width: 280px;
        }
        h2 {
          font-size: 32px;
        }
      }
    `
  ];

  render() {
    return html`
      <section class="wrap">
        <div class="top">
          <h2>${this.heading}</h2>
          <div class="hint">Swipe to view →</div>
        </div>
        <div class="rail" aria-label="Upcoming games scroller">
          <slot></slot>
        </div>
      </section>
    `;
  }
}

customElements.define("schedule-row", ScheduleRow);
