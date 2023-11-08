"use client";

import styled from "styled-components";

const ProjectDesc = styled.p`
  font-size: var(--font-size-s);
  padding-top: 0.25rem;
  opacity: 0.5;
  transition: opacity 0.1s ease;

  &:hover {
    opacity: 1;
  }
`;

export default ProjectDesc;
