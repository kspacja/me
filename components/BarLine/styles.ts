import styled from "styled-components";
import { MOBILE } from "common/consts";
import { LeftColumn } from "components/Columns";

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
