"use client";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import styled from 'styled-components';
import { components } from "./markdownComponents";

export const MessageStyleContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  ol {
    list-style-position: outside;
    padding-left: 1rem;
  }
`;

export const MessageIcon = styled.div`
  flex-shrink: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  
  font-weight: bold;
  text-transform: uppercase;
  font-family: monospace;
  box-shadow: 0 0 0 0.1rem var(--font-color);
  padding: 0.5rem;

  margin-top: -0.15rem;
`;

export const ContentContainer = styled.div`
  width: 100%;
`;

export const Message = ({
  role,
  children,
}: {
  role: "assistant" | "user" | "system" | "error" | "info" | "data";
  children: React.ReactNode;
}) => {
  return (
    <MessageStyleContainer>
      <MessageIcon>
        {role === "assistant" ? 'A' : 'U'}
      </MessageIcon>
      <ContentContainer>
        {children}
      </ContentContainer>
    </MessageStyleContainer>
  );
}

export const MarkdownMessage = ({
  role,
  content,
}: {
  role: "assistant" | "user" | "system" | "error" | "info" | "data";
  content: string;
}) => {

  return (
    <Message role={role}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </Message>
  );
};
