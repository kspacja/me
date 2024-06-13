"use client";

import { MOBILE } from "common/consts";
import styled from "styled-components";

export const Canvas = styled.div`
  background: var(--canvas);
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1100px;

  position: relative;
  z-index: 3;

  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-template-rows: auto auto;

  box-shadow: var(--canvas-shadow);

  @media screen and (max-width: ${MOBILE}px) {
    grid-template-columns: 1fr;
  }

  @media print {
    display: block;
    min-height: 200vh;
    overflow: hidden;
    box-shadow: none;
  }
`;

export const CanvasWrapper = styled.div`
  position: relative;

  // &:before {
  //   content: "";
  //   display: var(--canvas-wrapper-shadow-display);
  //   position: absolute;
  //   max-width: 300px;
  //   margin: auto;

  //   left: 0;
  //   right: 0;
  //   top: 3rem;
  //   bottom: 20%;

  //   background: hsl(var(--shadow-color) / 1);
  //   filter: blur(8px);

  //   transform: skew(7deg) translate(-140%, 0);

  //   @media screen and (max-width: ${MOBILE}px) {
  //     display: none;
  //   }
  // }
`;
