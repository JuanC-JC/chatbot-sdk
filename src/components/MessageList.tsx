import React from 'react';
import styled from '@emotion/styled';
import { useChatStore } from '../core/store';
import type { Message } from '../core/types';

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
`;

const MessageBubble = styled.div<{ role: 'user' | 'assistant' }>`
  max-width: 75%;
  padding: 16px 20px;
  border-radius: 20px;
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 15px;
  text-align: left;
  align-self: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
  background: ${props => props.role === 'user' ? '#1f2937' : '#f3f4f6'};
  color: ${props => props.role === 'user' ? 'white' : '#1f2937'};
  position: relative;
  box-shadow: ${props => props.role === 'user' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)'};
  margin: ${props => props.role === 'user' ? '0 0 0 auto' : '0 auto 0 0'};
  
  /* More specific border radius for speech bubble effect */
  border-bottom-right-radius: ${props => props.role === 'user' ? '6px' : '20px'};
  border-bottom-left-radius: ${props => props.role === 'assistant' ? '6px' : '20px'};
`;

const MessageStatus = styled.div<{ status?: string }>`
  font-size: 11px;
  margin-top: 6px;
  opacity: 0.6;
  color: ${props => {
    switch (props.status) {
      case 'error': return '#ef4444';
      case 'pending': return '#f59e0b';
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
  color: #9ca3af;
  text-align: center;
  padding: 48px 24px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.8;
`;

const EmptyText = styled.p`
  font-size: 16px;
  margin: 0;
  font-weight: 500;
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  color: #6b7280;
  font-size: 14px;
  align-self: flex-start;
  background: #f3f4f6;
  border-radius: 20px;
  border-bottom-left-radius: 6px;
  margin: 0 auto 0 0;
  
  &::after {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid #e5e7eb;
    border-top-color: #3b82f6;
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
          <EmptyIcon>👋</EmptyIcon>
          <EmptyText>Welcome! How can I help you today?</EmptyText>
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