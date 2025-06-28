import { describe, it, expect, beforeEach } from 'vitest';
import { useChatStore } from '../core/store';

describe('Chat Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useChatStore.getState().clearMessages();
    useChatStore.getState().setVisible(true);
    useChatStore.getState().setLoading(false);
  });

  it('initializes with empty messages', () => {
    const { messages } = useChatStore.getState();
    expect(messages).toHaveLength(0);
  });

  it('adds a message correctly', () => {
    const { addMessage } = useChatStore.getState();
    
    addMessage({
      role: 'user',
      content: 'Hello world'
    });

    // Get updated state
    const { messages } = useChatStore.getState();
    
    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      role: 'user',
      content: 'Hello world'
    });
    expect(messages[0].id).toBeDefined();
    expect(messages[0].timestamp).toBeDefined();
  });

  it('updates message status', () => {
    const { addMessage, updateMessage } = useChatStore.getState();
    
    addMessage({
      role: 'user',
      content: 'Test message',
      status: 'pending'
    });

    // Get the message ID from updated state
    const messageId = useChatStore.getState().messages[0].id;
    
    updateMessage(messageId, { status: 'sent' });

    const updatedMessages = useChatStore.getState().messages;
    expect(updatedMessages[0].status).toBe('sent');
  });

  it('manages visibility state', () => {
    const { setVisible, isVisible } = useChatStore.getState();
    
    expect(isVisible).toBe(true);
    
    setVisible(false);
    expect(useChatStore.getState().isVisible).toBe(false);
    
    setVisible(true);
    expect(useChatStore.getState().isVisible).toBe(true);
  });

  it('manages loading state', () => {
    const { setLoading, isLoading } = useChatStore.getState();
    
    expect(isLoading).toBe(false);
    
    setLoading(true);
    expect(useChatStore.getState().isLoading).toBe(true);
    
    setLoading(false);
    expect(useChatStore.getState().isLoading).toBe(false);
  });

  it('clears all messages', () => {
    const { addMessage, clearMessages } = useChatStore.getState();
    
    // Add some messages
    addMessage({ role: 'user', content: 'Message 1' });
    addMessage({ role: 'assistant', content: 'Message 2' });
    
    // Check messages were added
    expect(useChatStore.getState().messages).toHaveLength(2);
    
    clearMessages();
    
    const clearedMessages = useChatStore.getState().messages;
    expect(clearedMessages).toHaveLength(0);
  });
}); 