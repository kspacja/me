"use client";

import styled from "styled-components";
import { MOBILE } from "common/consts";

export const Button = styled.button`
  position: fixed;
  bottom: 3rem;
  right: 5rem;
  z-index: 5;

  border-radius: 50%;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--night-switch-bg);
  color: var(--night-switch-color);
  box-shadow: var(--canvas-shadow);

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  @media (max-width: ${MOBILE}px) {
    right: 2rem;
    bottom: 2rem;
  }

  @media print {
    display: none;
  }
`;
