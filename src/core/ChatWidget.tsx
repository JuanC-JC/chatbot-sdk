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

const TriggerButton = styled.button<{ config: ChatConfig; isVisible: boolean }>`
  position: fixed;
  width: ${props => props.config.triggerSize || 60}px;
  height: ${props => props.config.triggerSize || 60}px;
  border-radius: 50%;
  background: ${props => props.config.triggerColor || props.config.primaryColor || '#007bff'};
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: ${props => props.isVisible ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  z-index: 999;
  font-size: ${props => (props.config.triggerSize || 60) * 0.4}px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  ${props => {
    const position = props.config.triggerPosition || props.config.position || 'bottom-right';
    const [vertical, horizontal] = position.split('-');
    const offset = 20;

    return `
      ${vertical}: ${offset}px;
      ${horizontal}: ${offset}px;
    `;
  }}
`;

const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
  overflow: hidden;
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

  const handleTriggerClick = () => {
    setVisible(true);
  };

  const shouldShowTrigger = config.showTrigger !== false; // Default to true
  const triggerIcon = config.triggerIcon || '💬';
  const triggerText = config.triggerText || '';

  return (
    <>
      {shouldShowTrigger && (
        <TriggerButton
          config={config}
          isVisible={isVisible}
          onClick={handleTriggerClick}
          aria-label="Open chat"
          title="Chat with us"
        >
          <TriggerContent>
            {triggerIcon && <span>{triggerIcon}</span>}
            {triggerText && <span>{triggerText}</span>}
          </TriggerContent>
        </TriggerButton>
      )}
      
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
    </>
  );
}; 