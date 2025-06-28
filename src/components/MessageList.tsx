import React from 'react';
import styled from '@emotion/styled';
import { useChatStore } from '../core/store';
import type { Message } from '../core/types';

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageBubble = styled.div<{ role: 'user' | 'assistant' }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  align-self: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
  background: ${props => props.role === 'user' ? '#007bff' : '#f1f3f5'};
  color: ${props => props.role === 'user' ? 'white' : '#212529'};
  position: relative;
`;

const MessageStatus = styled.div<{ status?: string }>`
  font-size: 11px;
  margin-top: 4px;
  opacity: 0.7;
  color: ${props => {
    switch (props.status) {
      case 'error': return '#dc3545';
      case 'pending': return '#ffc107';
      default: return 'inherit';
    }
  }};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #6c757d;
  text-align: center;
  padding: 32px 16px;
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  color: #6c757d;
  font-size: 14px;
  
  &::after {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid #dee2e6;
    border-top-color: #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <MessageBubble role={message.role}>
      {message.content}
      {message.status && message.status !== 'sent' && (
        <MessageStatus status={message.status}>
          {message.status === 'pending' ? 'Sending...' : 
           message.status === 'error' ? 'Failed to send' : message.status}
        </MessageStatus>
      )}
    </MessageBubble>
  );
};

export const MessageList: React.FC = () => {
  const { messages, isLoading } = useChatStore();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0 && !isLoading) {
    return (
      <MessagesContainer>
        <EmptyState>
          <div>👋</div>
          <p>Welcome! How can I help you today?</p>
        </EmptyState>
      </MessagesContainer>
    );
  }

  return (
    <MessagesContainer>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator>Assistant is typing</LoadingIndicator>}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
}; 