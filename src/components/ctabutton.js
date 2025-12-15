// Simple CTA button component
import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";
import { dddGlobal } from "../ddd-global.js";

export class CtaButton extends LitElement {
  static properties = {
    // Button text
    label: { type: String }
  };

  constructor() {
    super();
    // Default label
    this.label = "Learn more";
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: inline-block;
      }

    
      d-d-d-button {
        --ddd-button-font-weight: var(--ddd-font-weight-semibold);
        --ddd-button-text-transform: uppercase;
        --ddd-button-letter-spacing: var(--ddd-letter-spacing-normal);
      }
    `
  ];

  render() {
    return html`
      <d-d-d-button .label=${this.label}></d-d-d-button>
    `;
  }
}

customElements.define("cta-button", CtaButton);
