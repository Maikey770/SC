import { css } from "lit";

export const dddGlobal = css`
  :root[data-theme="dark"] {
    color-scheme: dark;
    --ddd-theme-background: var(--ddd-theme-default-black);
    --ddd-theme-text-primary: var(--ddd-theme-default-white);
  }

  :root[data-theme="light"] {
    color-scheme: light;
    --ddd-theme-background: var(--ddd-theme-default-white);
    --ddd-theme-text-primary: var(--ddd-theme-default-black);
  }

  :host {
    font-family: var(--ddd-font-primary);
    color: var(--ddd-theme-text-primary);
    background: var(--ddd-theme-background);

    --ddd-theme-surface: color-mix(
      in srgb,
      var(--ddd-theme-primary) 18%,
      var(--ddd-theme-background)
    );

    --ddd-theme-border: color-mix(
      in srgb,
      var(--ddd-theme-primary) 40%,
      transparent
    );

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
