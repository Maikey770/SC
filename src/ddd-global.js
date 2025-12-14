import { css } from "lit";

export const dddGlobal = css`
  :host {
    font-family: var(--ddd-font-primary, system-ui);
    color: var(--ddd-theme-text-primary, #fff);
    background: var(--ddd-theme-background, #000);
  }

  /* Common layout tokens */
  .surface {
    background: var(--ddd-theme-surface, rgba(255,255,255,0.06));
    border: 1px solid var(--ddd-theme-border, rgba(255,255,255,0.12));
    border-radius: var(--ddd-radius-lg, 16px);
    padding: var(--ddd-spacing-4, 16px);
  }

  .stack {
    display: grid;
    gap: var(--ddd-spacing-3, 12px);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--ddd-spacing-3, 12px);
  }

  a {
    color: var(--ddd-theme-link, var(--ddd-theme-primary, #7aa7ff));
  }
`;
