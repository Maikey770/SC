import { css } from "lit";

export const dddGlobal = css`
  :host {
    /* Typography */
    font-family: var(--ddd-font-primary);
    color: var(--ddd-theme-text-primary);
    background: var(--ddd-theme-background);

    /* ===== DDD DERIVED TOKENS (NO RAW COLORS) ===== */

    /*
      Surface color:
      Derived ONLY from DDD primary + background
      Matches Focus card blue through the same system
    */
    --ddd-theme-surface: color-mix(
      in srgb,
      var(--ddd-theme-primary) 18%,
      var(--ddd-theme-background)
    );

    /*
      Border color:
      Slightly stronger mix of primary
    */
    --ddd-theme-border: color-mix(
      in srgb,
      var(--ddd-theme-primary) 40%,
      transparent
    );

    /* Text hierarchy */
    --ddd-theme-text-secondary: color-mix(
      in srgb,
      var(--ddd-theme-text-primary) 80%,
      transparent
    );
  }

  /* ===== COMMON SURFACE (CARDS / BANDS) ===== */
  .surface {
    background: var(--ddd-theme-surface);
    border: 1px solid var(--ddd-theme-border);
    border-radius: var(--ddd-radius-lg);
    padding: var(--ddd-spacing-4);
  }

  /* ===== LAYOUT HELPERS ===== */
  .stack {
    display: grid;
    gap: var(--ddd-spacing-3);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--ddd-spacing-3);
  }

  /* ===== LINKS ===== */
  a {
    color: var(--ddd-theme-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
