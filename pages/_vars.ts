import { MOBILE, SMALL_MOBILE } from "common/consts";

export const NIGHT_VARS = `
  --background: var(--black);
  --canvas: var(--black);
  --left-column-bg: var(--black);
  --left-column-color: var(--neon-pink);
  --font-color: var(--neon-blue);

  --body-background-image: url('/brick.jpeg');
  --body-background-size: 50%;

  --canvas-wrapper-shadow-display: none;

  --left-headings-font-color: var(--white);
  --right-headings-font-color: var(--white);

  --night-switch-bg: var(--black);
  --night-switch-color: var(--neon-pink);

  --canvas-shadow: 0 0 2px var(--white),
                   0 0 10px var(--night-shadow),
                   0 0 15px var(--night-shadow),
                   0 0 35px var(--night-shadow);
`;

export const DAY_VARS = `
  --background: var(--redish-grey);
  --canvas: var(--linen);
  --left-column-bg: var(--cedar-chest);
  --left-column-color: var(--maximum-yellow-red);
  --font-color: var(--black);

  --body-background-image: none;
  --body-background-size: unset;
  --canvas-wrapper-shadow-display: block;
  --left-headings-font-color: var(--left-column-color);
  --right-headings-font-color: var(--black);

  --night-shadow: var(--neon-pink);

  --night-switch-bg: var(--cedar-chest);
  --night-switch-color: var(--maximum-yellow-red);

  --canvas-shadow: var(--shadow-elevation-medium);
`;

export const BASE_VARS = `
  --font: 'DM Sans', sans-serif;
  --heading-font: 'DM Serif Display', serif;

  --font-size-l: 1.1rem;
  --font-size-s: 0.8rem;
  --font-size-xs: 0.7rem;

  --mobile: ${MOBILE}px;
  --mobile-s: ${SMALL_MOBILE}px;

  --maximum-yellow-red: #f6bd60;
  --linen: #f7ede2;
  --redish-grey: #baa;
  --cedar-chest: #c8553d;
  --mauve-taupe: #805e73;

  --white: #fff;
  --white-hsl: 360deg 100% 100%;
  --black: #000;
  --neon-blue: #4cc9f0;
  --neon-pink: #f20089;

  --shadow-color: 0deg 8% 39%;
  --shadow-elevation-low:
    -0.3px 0.4px 0.5px hsl(var(--shadow-color) / 0.44),
    -0.5px 0.7px 0.9px -1.4px hsl(var(--shadow-color) / 0.41),
    -1.4px 1.9px 2.5px -2.8px hsl(var(--shadow-color) / 0.38);
  --shadow-elevation-medium:
    -0.3px 0.4px 0.5px hsl(var(--shadow-color) / 0.47),
    -1px 1.5px 1.9px -0.9px hsl(var(--shadow-color) / 0.44),
    -2.8px 3.8px 5.1px -1.9px hsl(var(--shadow-color) / 0.42),
    -6.9px 9.6px 12.8px -2.8px hsl(var(--shadow-color) / 0.39);
  --shadow-elevation-high:
    -0.3px 0.4px 0.5px hsl(var(--shadow-color) / 0.43),
    -1.9px 2.6px 3.5px -0.4px hsl(var(--shadow-color) / 0.42),
    -3.6px 5px 6.7px -0.8px hsl(var(--shadow-color) / 0.41),
    -6.2px 8.5px 11.4px -1.2px hsl(var(--shadow-color) / 0.4),
    -10.1px 14px 18.6px -1.6px hsl(var(--shadow-color) / 0.39),
    -16.1px 22.3px 29.7px -2px hsl(var(--shadow-color) / 0.38),
    -24.8px 34.4px 45.8px -2.4px hsl(var(--shadow-color) / 0.36),
    -36.9px 51.1px 68.1px -2.8px hsl(var(--shadow-color) / 0.35);
`;
