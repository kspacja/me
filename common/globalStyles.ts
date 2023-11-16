"use client";

import { createGlobalStyle } from "styled-components";

import { BASE_VARS, DAY_VARS, NIGHT_VARS } from "./vars";
import { MOBILE, SMALL_MOBILE } from "common/consts";

export default createGlobalStyle`
  :root {
    ${BASE_VARS}      
    ${DAY_VARS}
  }

  html,
  body {
    min-height: 100vh;
  }

  button,
  html,
  body,
  input,
  textarea {
    padding: 0;
    margin: 0;
    font-family: var(--font);
    font-weight: 400;
    font-size: 16px;
    color: var(--font-color);
  }

  body {
    padding: 2rem;
    margin: 0;
  
    background: var(--background);
    background-image: var(--body-background-image);
    background-size: var(--body-background-size);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--heading-font);
    margin-top: 0;
  }

  h1 {
    font-size: 4.5rem;
    line-height: 1.1;
    margin: -0.2em 0 0;
  }

  h2 {
    font-size: 2rem;
  }

  a {
    color: inherit;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  figure {
    margin: 0;
  }

  button {
    padding: 0.2rem;
    margin: 0;
    border: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0 0 1rem;
    margin: 0;
  }

  p {
    margin-top: 0;
  }

  path {
    fill: currentColor;
  }

  * {
    box-sizing: border-box;
  }

  .night {
    ${NIGHT_VARS};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      ${NIGHT_VARS}
    }

    .day {
      ${DAY_VARS}
    }
  }

  @media print, (min-width: ${MOBILE + 1}px) {
    .only-mobile {
      display: none;
    }
  }

  @media (max-width: ${SMALL_MOBILE}px) {
    body {
      padding: 0;
    }
  }

  @media screen {
    .clear {
      display: none;
    }

    .page-margin-top {
      display: none;
    }
  }

  @page {
    margin: 0;
  }

  @media print {
    body {
      padding: 0;
    }

    button,
    html,
    body,
    input,
    textarea {
      font-size: 12px;
    }

    .print-page-break {
      page-break-after: always;
    }

    .print-page-margin-top-small {
      padding-top: 3rem;
    }

    .print-page-margin-top {
      padding-top: 5rem;
    }

    .clear {
      height: 1px;
      width: 100%;
      clear: both;
    }
  }

  .mt-0 {
    margin-top: 0;
  }

  .mt-1 {
    margin-top: 1rem;
  }

  .mb-0 {
    margin-bottom: 0;
  }

  .mb-1 {
    margin-bottom: 1rem;
  }

  .page {
    line-height: 1.5;

    ol {
      padding-left: 0;
      margin-left: 0;

      list-style-position: inside;
    }

    img {
      max-width: 100%;
    }
  }
`;
