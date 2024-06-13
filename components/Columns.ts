"use client";

import { SMALL_MOBILE, MOBILE } from "common/consts";
import styled from "styled-components";
import { neonText, neonTextH1 } from "common/stylingUtils";

export const Column = styled.section`
  padding: 3rem;

  @media (max-width: ${SMALL_MOBILE}) {
    padding: 1.5rem;
  }

  @media print {
    float: left;
    position: relative;
  }
`;

export const LeftColumn = styled(Column)`
  text-align: right;
  font-weight: 300;

  background: var(--left-column-bg);
  color: var(--left-column-color);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--left-headings-font-color);
  }

  @media (prefers-color-scheme: dark) {
    .night & {
      h1 {
        ${neonTextH1("var(--left-column-color)")}
      }

      h2,
      h3,
      h4,
      h5,
      h6 {
        ${neonText("var(--left-column-color)")}
      }
    }
  }

  @media screen and (max-width: ${MOBILE}px) {
    text-align: left;
  }

  @media print {
    width: 33%;

    &:after {
      content: "";
      background: var(--left-column-bg);
      position: absolute;
      top: 99%;
      left: 0;
      right: 0;
      height: 110vh;
    }
  }
`;

export const RightColumn = styled(Column)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--right-headings-font-color);
  }

  @media (prefers-color-scheme: dark) {
    .night & {
      h1 {
        ${neonTextH1("var(--font-color)")}
      }

      h2,
      h3,
      h4,
      h5,
      h6 {
        ${neonText("var(--font-color)")}
      }
    }
  }

  @media print {
    width: 66%;
  }
`;
