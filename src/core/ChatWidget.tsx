import React from 'react';
import styled from '@emotion/styled';
import { useChatStore } from './store';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import type { ChatConfig } from './types';

const WidgetContainer = styled.div<{ isVisible: boolean; config: ChatConfig }>`
  position: fixed;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  transform: ${props => {
    if (props.isVisible) return 'translateY(0)';

    const position = props.config.position || 'bottom-right';
    const [vertical] = position.split('-');

    // Animate from top when positioned at top, from bottom when positioned at bottom
    return vertical === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
  }};
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: all 0.3s ease-in-out;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};

  ${props => {
    const position = props.config.position || 'bottom-right';
    const [vertical, horizontal] = position.split('-');
    const triggerSize = props.config.triggerSize || 60;
    const offset = 20;
    const gap = 10; // Gap between button and chat widget

    // Position the chat widget relative to the trigger button
    let styles = '';

    // Handle vertical positioning
    if (vertical === 'bottom') {
      styles += `bottom: ${offset + triggerSize + gap}px;`;
    } else if (vertical === 'top') {
      styles += `top: ${offset + triggerSize + gap}px;`;
    }

    // Handle horizontal positioning 
    if (horizontal === 'right') {
      styles += `right: ${offset}px;`;
    } else if (horizontal === 'left') {
      styles += `left: ${offset}px;`;
    }

    return styles;
  }}
`;

const TriggerButton = styled.button<{ config: ChatConfig; isVisible: boolean }>`
  position: fixed;
  width: ${props => props.config.triggerSize || 60}px;
  height: ${props => props.config.triggerSize || 60}px;
  border-radius: 50%;
  background: ${props => props.config.triggerColor || props.config.primaryColor || '#007bff'};
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
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

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
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
  width: 100%;
  height: 100%;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  img, svg {
    max-width: 70%;
    max-height: 70%;
    object-fit: contain;
    flex-shrink: 0;
  }
`;

const Header = styled.div<{ primaryColor?: string }>`
  background: #f8f9fa;
  color: #1f2937;
  padding: 20px 24px;
  border-radius: 16px 16px 0 0;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
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
    setVisible(!isVisible);
  };

  const shouldShowTrigger = config.showTrigger !== false; // Default to true
  
  // Determine the icon based on visibility state
  const getButtonContent = () => {
    if (isVisible) {
      // Show close or collapse icon when chat is open
      return config.closeIcon || '↓'; // Down arrow or X
    } else {
      // Show open icon when chat is closed
      return config.triggerIcon || '💬';
    }
  };

  const getButtonTitle = () => {
    return isVisible ? 'Close chat' : 'Open chat';
  };

  return (
    <>
      {shouldShowTrigger && (
        <TriggerButton
          config={config}
          isVisible={isVisible}
          onClick={handleTriggerClick}
          aria-label={getButtonTitle()}
          title={getButtonTitle()}
        >
          <TriggerContent>
            <span>{getButtonContent()}</span>
            {!isVisible && config.triggerText && <span>{config.triggerText}</span>}
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