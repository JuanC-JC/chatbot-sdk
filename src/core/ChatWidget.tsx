import React from 'react';
import styled from '@emotion/styled';
import { useChatStore } from './store';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import type { ChatConfig } from './types';

const WidgetContainer = styled.div<{ isVisible: boolean; config: ChatConfig }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 380px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(100%)'};
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: all 0.3s ease-in-out;

  ${props => {
    const position = props.config.position || 'bottom-right';
    const [vertical, horizontal] = position.split('-');

    return `
      ${vertical}: 20px;
      ${horizontal}: 20px;
    `;
  }}
`;

const Header = styled.div<{ primaryColor?: string }>`
  background: ${props => props.primaryColor || '#007bff'};
  color: white;
  padding: 16px 20px;
  border-radius: 12px 12px 0 0;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ChatBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

interface ChatWidgetProps {
  config: ChatConfig;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  const { isVisible, setVisible } = useChatStore();

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <WidgetContainer isVisible={isVisible} config={config}>
      <Header primaryColor={config.primaryColor}>
        <span>Chat Assistant</span>
        <CloseButton onClick={handleClose} aria-label="Close chat">
          ×
        </CloseButton>
      </Header>
      <ChatBody>
        <MessageList />
        <MessageInput placeholder={config.placeholder} />
      </ChatBody>
    </WidgetContainer>
  );
}; 