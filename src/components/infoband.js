// Info band with basic highlights
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class InfoBand extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-primary);
      }

      /* layout */
      .band {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--ddd-spacing-3);
      }

      /* each item */
      .item {
        padding: var(--ddd-spacing-3);
        border-radius: var(--ddd-radius-lg);
        background: var(--ddd-theme-surface);
        border: 1px solid var(--ddd-theme-border);
      }

      /* small label */
      .label {
        font-size: var(--ddd-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--ddd-theme-text-secondary);
        margin-bottom: var(--ddd-spacing-1);
      }

      /* main text */
      .value {
        font-size: var(--ddd-font-size-s);
        font-weight: 600;
        color: var(--ddd-theme-text-primary);
      }
    `
  ];

  render() {
    return html`
      <d-d-d>
        <div class="band" aria-label="Association highlights">
          <div class="item">
            <div class="label">Teams</div>
            <div class="value">8 active teams U8–U16</div>
          </div>

          <div class="item">
            <div class="label">Focus</div>
            <div class="value">Player growth and serious fun</div>
          </div>

          <div class="item">
            <div class="label">Season</div>
            <div class="value">Fall 2025 registration now open</div>
          </div>
        </div>
      </d-d-d>
    `;
  }
}

customElements.define("info-band", InfoBand);
