import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useChatStore } from '../core/store';

const InputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #e9ecef;
  background: white;
  border-radius: 0 0 12px 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const TextInput = styled.textarea`
  flex: 1;
  border: 1px solid #ced4da;
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  outline: none;
  
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &::placeholder {
    color: #6c757d;
  }
`;

const SendButton = styled.button<{ disabled: boolean }>`
  background: ${props => props.disabled ? '#e9ecef' : '#007bff'};
  color: ${props => props.disabled ? '#6c757d' : 'white'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: #0056b3;
    transform: scale(1.05);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

interface MessageInputProps {
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const { addMessage, isLoading } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const isDisabled = !inputValue.trim() || isLoading;

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <TextInput
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || 'Type your message...'}
            disabled={isLoading}
            rows={1}
          />
          <SendButton type="submit" disabled={isDisabled}>
            ↑
          </SendButton>
        </InputWrapper>
      </form>
    </InputContainer>
  );
}; 