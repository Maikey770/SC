import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d-button.js";
import { dddGlobal } from "../ddd-global.js";

export class CtaButton extends LitElement {
  static properties = {
    label: { type: String }
  };

  constructor() {
    super();
    this.label = "Learn more";
  }

  static styles = [
    dddGlobal,
    css`
      :host {
        display: inline-block;
      }

      /*controls the appearance of the CTA button */
      d-d-d-button {
        --ddd-button-font-weight: 600;
        --ddd-button-text-transform: uppercase;
        --ddd-button-letter-spacing: 0.04em;
      }
    `
  ];

  render() {
    return html`<d-d-d-button .label=${this.label}></d-d-d-button>`;
  }
}

customElements.define("cta-button", CtaButton);
