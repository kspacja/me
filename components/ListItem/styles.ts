import { MOBILE } from "common/consts";
import { LeftColumn } from "components/Columns";
import styled from "styled-components";

export const Title = styled.div`
  font-size: var(--font-size-l);
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

  padding-bottom: 0.5rem;
`;

export const Bar = styled.div<{ visible: boolean; level: number }>`
  height: 0.2rem;
  margin: 0.2rem 0 0.7rem;
  width: 80%;
  position: relative;

  @media print {
    margin-left: 20%;
  }

  &:after,
  &:before {
    content: "";
    position: absolute;
    background: currentColor;
    height: 100%;
    left: 0;

    ${LeftColumn} & {
      @media (min-width: ${MOBILE + 1}px) {
        right: 0;
        left: unset;
      }
    }
  }

  &:before {
    width: 100%;
    opacity: 0.3;
  }

  &:after {
    width: ${(props) => (props.visible ? ((props.level + 1) / 5) * 100 : 0)}%;
    transition: width ease 2s;

    ${LeftColumn} & {
      @media print {
        position: static;
        float: right;
      }
    }
  }
`;
