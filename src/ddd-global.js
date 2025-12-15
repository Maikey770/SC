import { css } from "lit";

/* Global DDD theme */

export const dddGlobal = css`
  :host,
  :root {
    /* Base */
    --ddd-theme-bg: var(--ddd-theme-default-black);

    /* Text */
    --ddd-theme-text-primary: var(--ddd-theme-default-white);
    --ddd-theme-text-secondary: color-mix(
      in srgb,
      var(--ddd-theme-default-white) 70%,
      transparent
    );

    /* Silver tone */
    --ddd-theme-border: color-mix(
      in srgb,
      var(--ddd-theme-default-white) 18%,
      transparent
    );
    --ddd-theme-primary: var(--ddd-theme-border);
    --ddd-theme-primary-highlight: var(--ddd-theme-text-primary);

    /* Surface */
    --ddd-theme-surface: color-mix(
      in srgb,
      var(--ddd-theme-default-white) 6%,
      transparent
    );

    /* Font */
    --ddd-font-primary: var(--ddd-font-navigation);
  }

  /* Text outline */
  .ddd-text-outline {
    text-shadow:
      -1px -1px 0 var(--ddd-theme-bg),
       1px -1px 0 var(--ddd-theme-bg),
      -1px  1px 0 var(--ddd-theme-bg),
       1px  1px 0 var(--ddd-theme-bg);
  }

  /* Silver outline */
  .ddd-text-outline-silver {
    text-shadow:
      -1px -1px 0 var(--ddd-theme-border),
       1px -1px 0 var(--ddd-theme-border),
      -1px  1px 0 var(--ddd-theme-border),
       1px  1px 0 var(--ddd-theme-border);
  }
`;
