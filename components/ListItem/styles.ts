"use client";

import { MOBILE } from "common/consts";
import { LeftColumn } from "components/Columns";
import styled from "styled-components";

export const Title = styled.div`
  font-size: var(--font-size-l);
  font-weight: 500;
  margin-bottom: 0.15rem;
`;

export const Subtitle = styled.div`
  font-size: var(--font-size-s);
`;

export const Text = styled.div`
  font-size: var(--font-size-xs);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  break-inside: avoid;

  ${LeftColumn} & {
    @media (min-width: ${MOBILE + 1}px) {
      align-items: flex-end;
    }
  }

  padding-bottom: 0.9rem;
`;
