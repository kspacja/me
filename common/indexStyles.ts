"use client";

import styled, { css } from "styled-components";

import { MOBILE, SMALL_MOBILE } from "common/consts";
import { LeftColumn, RightColumn } from "components/Columns";

export const firstRow = css`
  padding-top: 4rem;

  @media print {
    padding-bottom: 0;
  }
`;

export const LayoutLeftColumn = styled(LeftColumn)`
  padding-top: 4rem;
  min-height: 100vh;
`;

export const LayoutRightColumn = styled(RightColumn)`
  padding-top: 4rem;

  @media screen and (max-width: ${MOBILE}px) {
    .night & {
      padding-top: 0rem;
    }
  }
`;

export const Contact = styled(LeftColumn)`
  ${firstRow}

  line-height: 1.3;

  @media screen and (max-width: ${MOBILE}px) {
    grid-row: 2;
    padding-bottom: 0rem;
  }

  @media screen and (max-width: ${SMALL_MOBILE}px) {
    padding-bottom: 0rem;
  }

  @media print {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      top: 90%;
      left: 0;
      right: 0;
      height: 75px;
      z-index: 5;
      background-color: var(--left-column-bg);
    }
  }
`;

export const Head = styled(RightColumn)`
  ${firstRow}

  @media screen and (max-width: ${MOBILE}px) {
    grid-row: 1;
    padding-top: 4rem;
  }

  @media screen and (max-width: ${SMALL_MOBILE}px) {
    padding-top: 3rem;
  }
`;

export const ShortInformations = styled(LeftColumn)`
  @media screen and (max-width: ${MOBILE}px) {
    grid-row: 3;
    padding-top: 1rem;
  }
`;

export const LongInformations = styled(RightColumn)`
  @media screen and (max-width: ${MOBILE}px) {
    .grid-row: 4;
  }
`;
