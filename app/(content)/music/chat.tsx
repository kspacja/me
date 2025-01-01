"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import { MarkdownMessage, Message } from "components/message";
import { useScrollToBottom } from './use-scroll-to-bottom';
import styled from "styled-components";
import Loader from "components/Loader";
import {saveLastMessage, useInputHistory} from 'lib/chat-history/utils';

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
`

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [lastInput, moveHistoryIndex] = useInputHistory();

  const inputRef = useRef<HTMLInputElement>(null);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div>
      <div>
        <h3>Chat - search through the page with assistant</h3>
        <div ref={messagesContainerRef}>
          {messages.filter((message) => message.content.length > 0).map((message) => 
            <MarkdownMessage key={message.id} content={message.content} role={message.role} />
          )}
          {isLoading && <Message role="assistant"><Loader marginTop={8} /></Message>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={(data) => {
          saveLastMessage(input);
          handleSubmit(data);
          moveHistoryIndex(0);
        }}>
          <Input
            ref={inputRef}
            placeholder="Ask me about music stuff..."
            value={input}
            onChange={handleInputChange}
            onKeyUp={(e) => {
              if (e.key === 'ArrowUp') {
                handleInputChange({ target: { value: lastInput } } as React.ChangeEvent<HTMLInputElement>);
                moveHistoryIndex(1);
              } else if (e.key === 'ArrowDown') {
                handleInputChange({ target: { value: lastInput } } as React.ChangeEvent<HTMLInputElement>);
                moveHistoryIndex(-1);
              }
            }
          }
          />
        </form>
      </div>
    </div>
  );
}