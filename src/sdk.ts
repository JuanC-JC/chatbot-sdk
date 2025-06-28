import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChatWidget } from './core/ChatWidget';
import { useChatStore } from './core/store';
import { createContainer, removeAllChildren, injectStyles, isValidContainerId } from './utils/dom';
import type { ChatSDKInstance, ChatConfig, EventCallback } from './core/types';

class ChatSDK implements ChatSDKInstance {
  private root: ReactDOM.Root | null = null;
  private container: HTMLElement | null = null;
  private eventListeners: Map<string, Set<EventCallback>> = new Map();
  private config: ChatConfig = {};
  private unsubscribeStore?: () => void;

  init(containerId: string, config: ChatConfig = {}): void {
    try {
      // Validate inputs
      if (!isValidContainerId(containerId)) {
        throw new Error('Invalid container ID provided');
      }

      // Clean up existing instance
      this.destroy();

      // Store config with defaults
      this.config = { 
        showTrigger: true, // Default to showing trigger
        ...config 
      };

      // Get container element
      this.container = createContainer(containerId);
      this.container.setAttribute('data-chat-sdk', '');

      // Inject base styles
      injectStyles();

      // Clear container
      removeAllChildren(this.container);

      // Set initial visibility based on config
      // If trigger is disabled, show the widget immediately
      const initialVisibility = this.config.showTrigger === false;
      useChatStore.getState().setVisible(initialVisibility);
      useChatStore.getState().setConfig(this.config);

      // Create React root and render
      this.root = ReactDOM.createRoot(this.container);
      this.root.render(React.createElement(ChatWidget, { config: this.config }));

      // Set up store listeners for events
      this.setupStoreListeners();

      // Emit init event
      this.emit('init', { config: this.config });

    } catch (error) {
      console.error('[ChatSDK] Initialization failed:', error);
      throw error;
    }
  }

  destroy(): void {
    try {
      if (this.root) {
        this.root.unmount();
        this.root = null;
      }

      if (this.container) {
        removeAllChildren(this.container);
        this.container.removeAttribute('data-chat-sdk');
        this.container = null;
      }

      // Clean up store subscription
      if (this.unsubscribeStore) {
        this.unsubscribeStore();
        this.unsubscribeStore = undefined;
      }

      // Clear event listeners
      this.eventListeners.clear();

      // Reset store
      useChatStore.getState().clearMessages();

      // Emit destroy event
      this.emit('destroy');

    } catch (error) {
      console.error('[ChatSDK] Destroy failed:', error);
    }
  }

  sendMessage(message: string): void {
    try {
      if (!message || typeof message !== 'string') {
        throw new Error('Invalid message provided');
      }

      const trimmedMessage = message.trim();
      if (!trimmedMessage) {
        throw new Error('Empty message provided');
      }

      // Add message to store
      useChatStore.getState().addMessage({
        role: 'user',
        content: trimmedMessage,
        status: 'sent'
      });

      // Emit message event
      this.emit('message:sent', { message: trimmedMessage, role: 'user' });

    } catch (error) {
      console.error('[ChatSDK] Send message failed:', error);
      throw error;
    }
  }

  on(event: string, callback: EventCallback): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(callback);
  }

  off(event: string, callback: EventCallback): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) {
        this.eventListeners.delete(event);
      }
    }
  }

  // Public methods for widget control
  show(): void {
    useChatStore.getState().setVisible(true);
    this.emit('visibility:changed', { visible: true });
  }

  hide(): void {
    useChatStore.getState().setVisible(false);
    this.emit('visibility:changed', { visible: false });
  }

  toggle(): void {
    const { isVisible, setVisible } = useChatStore.getState();
    const newVisibility = !isVisible;
    setVisible(newVisibility);
    this.emit('visibility:changed', { visible: newVisibility });
  }

  // Get current configuration
  getConfig(): ChatConfig {
    return { ...this.config };
  }

  // Check if widget is currently visible
  isVisible(): boolean {
    return useChatStore.getState().isVisible;
  }

  // Private methods
  private emit(event: string, data?: unknown): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[ChatSDK] Event listener error for "${event}":`, error);
        }
      });
    }
  }

  private setupStoreListeners(): void {
    // Subscribe to store changes for events
    this.unsubscribeStore = useChatStore.subscribe((state, prevState) => {
      // Emit events based on state changes
      if (state.messages.length !== prevState.messages.length) {
        const newMessage = state.messages[state.messages.length - 1];
        if (newMessage && newMessage.role === 'assistant') {
          this.emit('message:received', { message: newMessage.content, role: 'assistant' });
        }
      }

      if (state.isVisible !== prevState.isVisible) {
        this.emit('visibility:changed', { visible: state.isVisible });
      }
    });
  }
}

// Create global instance
const chatSDK = new ChatSDK();

// Export for ES modules
export default chatSDK;

// Global window object for UMD builds
declare global {
  interface Window {
    ChatSDK: ChatSDK;
  }
}

if (typeof window !== 'undefined') {
  window.ChatSDK = chatSDK;
} 