"use client";

import { keyframes } from "styled-components";

export function neonText(color: string) {
  return `
    text-shadow:
      .1em .1em 0 hsl(var(--white-hsl) / 0.1),
      0 0 8px var(--white),
      0 0 52px ${color};
  `;
}

export function neonTextH1(color: string) {
  return `
    text-shadow:
      .05em .05em 0 hsl(var(--white-hsl) / 0.1),
      0 0 15px var(--white),
      0 0 52px ${color};
  `;
}

export const pulsating = keyframes`
  100% {
    opacity: 1
  }

  90% {
    opacity: 0.9;
  }

  80% {
    opacity: 0.6;
  }

  70% {
    opacity: 0.9;
  }

  60% {
    opacity: 0.6;
  }

  40% {
    opacity: 0.7;
  }

  20% {
    opacity: 0.6;
  }

  10% {
    opacity: 0.9;
  }

  0% {
    opacity: 0;
  }
`;
