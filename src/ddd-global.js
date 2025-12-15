import { css } from "lit";

export const dddGlobal = css`
  /* Global DDD theme overrides */
  :root,
  html {
    /* Primary brand color */
    --ddd-theme-primary: silver;
    --ddd-theme-primary-highlight: white;

    /* Borders use the same silver tone */
    --ddd-theme-border: silver;
  }

  /* Dark theme tuning */
  html[data-theme="dark"] {
    --ddd-theme-primary: silver;
    --ddd-theme-primary-highlight: white;
    --ddd-theme-border: silver;
  }

  /* Light theme tuning */
  html[data-theme="light"] {
    --ddd-theme-primary: dimgray;
    --ddd-theme-primary-highlight: black;
    --ddd-theme-border: dimgray;
  }
`;
