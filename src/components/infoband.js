// Info band that shows a few key highlights about the association
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/lib/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class InfoBand extends LitElement {
  static styles = [
    dddGlobal,
    css`
      :host {
        display: block;
      }

      .band {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--ddd-spacing-3, 12px);
      }

      .item {
        padding: var(--ddd-spacing-3, 12px);
        border-radius: var(--ddd-radius-lg, 12px);
        background-color: var(--ddd-theme-surface, rgba(15, 26, 56, 0.85));
        border: 1px solid var(--ddd-theme-border, rgba(155, 177, 212, 0.4));
      }

      .label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        opacity: 0.7;
        margin-bottom: 4px;
      }

      .value {
        font-size: 1rem;
        font-weight: 600;
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
