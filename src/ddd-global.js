import { css } from "lit";

export const dddGlobal = css`
  /* Let browser widgets follow theme */
  :root[data-theme="dark"] {
    color-scheme: dark;
  }

  :root[data-theme="light"] {
    color-scheme: light;
  }

  :host {
    /* Typography */
    font-family: var(--ddd-font-primary);
    color: var(--ddd-theme-text-primary);
    background: var(--ddd-theme-background);

    /* ===== DDD DERIVED TOKENS (NO RAW COLORS) ===== */

    /* Surface color derived from DDD tokens */
    --ddd-theme-surface: color-mix(
      in srgb,
      var(--ddd-theme-primary) 18%,
      var(--ddd-theme-background)
    );

    /* Border color derived from DDD tokens */
    --ddd-theme-border: color-mix(
      in srgb,
      var(--ddd-theme-primary) 40%,
      transparent
    );

    /* Text hierarchy derived from DDD tokens */
    --ddd-theme-text-secondary: color-mix(
      in srgb,
      var(--ddd-theme-text-primary) 80%,
      transparent
    );
  }

  .surface {
    background: var(--ddd-theme-surface);
    border: 1px solid var(--ddd-theme-border);
    border-radius: var(--ddd-radius-lg);
    padding: var(--ddd-spacing-4);
  }

  .stack {
    display: grid;
    gap: var(--ddd-spacing-3);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--ddd-spacing-3);
  }

  a {
    color: var(--ddd-theme-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
