import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useChatStore } from '../core/store';

const InputContainer = styled.div`
  padding: 24px;
  background: #f8f9fa;
  border-radius: 0 0 16px 16px;
  border-top: 1px solid #e9ecef;
`;

const TextInput = styled.textarea<{ hasContent: boolean }>`
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  min-height: 50px;
  max-height: 120px;
  outline: none;
  background: white;
  color: #1f2937;
  line-height: 1.4;
  transition: all 0.2s ease;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:focus {
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
    background: #fff;
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }

  &:disabled {
    background: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

const InputHint = styled.div<{ visible: boolean }>`
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.2s ease;
  text-align: center;
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 2px;
  
  span {
    width: 4px;
    height: 4px;
    background: #007bff;
    border-radius: 50%;
    animation: loading 1.4s infinite ease-in-out;
    
    &:nth-of-type(1) { animation-delay: -0.32s; }
    &:nth-of-type(2) { animation-delay: -0.16s; }
  }

  @keyframes loading {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

interface MessageInputProps {
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { addMessage, isLoading } = useChatStore();

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    
    if (!trimmedValue || isLoading) return;

    // Add user message
    addMessage({
      role: 'user',
      content: trimmedValue,
      status: 'sent'
    });

    setInputValue('');

    // Simulate API response (we'll implement real API later)
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: 'Thank you for your message! This is a simulated response.',
        status: 'sent'
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const hasContent = inputValue.trim().length > 0;
  const showHint = isFocused || hasContent;

  return (
    <InputContainer>
      <TextInput
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder || 'Type your message... (Press Enter to send)'}
        disabled={isLoading}
        hasContent={hasContent}
        rows={1}
      />
      
      {isLoading ? (
        <LoadingIndicator>
          <span>Sending</span>
          <LoadingDots>
            <span></span>
            <span></span>
            <span></span>
          </LoadingDots>
        </LoadingIndicator>
      ) : (
        <InputHint visible={showHint}>
          Press Enter to send • Shift + Enter for new line
        </InputHint>
      )}
    </InputContainer>
  );
}; 