import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatWidget } from '../core/ChatWidget';
import type { ChatConfig } from '../core/types';

describe('ChatWidget', () => {
  const defaultConfig: ChatConfig = {
    primaryColor: '#007bff',
    placeholder: 'Type a message...'
  };

  it('renders chat widget with header', () => {
    render(<ChatWidget config={defaultConfig} />);
    
    expect(screen.getByText('Chat Assistant')).toBeInTheDocument();
    expect(screen.getByLabelText('Close chat')).toBeInTheDocument();
  });

  it('renders empty state when no messages', () => {
    render(<ChatWidget config={defaultConfig} />);
    
    expect(screen.getByText('Welcome! How can I help you today?')).toBeInTheDocument();
    expect(screen.getByText('👋')).toBeInTheDocument();
  });

  it('renders message input with placeholder', () => {
    render(<ChatWidget config={defaultConfig} />);
    
    const input = screen.getByPlaceholderText('Type a message...');
    expect(input).toBeInTheDocument();
  });

  it('applies custom primary color', () => {
    const customConfig: ChatConfig = {
      primaryColor: '#ff6b6b'
    };
    
    render(<ChatWidget config={customConfig} />);
    
    const header = screen.getByText('Chat Assistant').parentElement;
    expect(header).toHaveStyle({ background: '#ff6b6b' });
  });
}); 