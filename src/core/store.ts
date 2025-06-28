import { create } from 'zustand'
import type { ChatState, Message, ChatConfig } from './types'

interface ChatActions {
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  setLoading: (loading: boolean) => void;
  setVisible: (visible: boolean) => void;
  setConfig: (config: ChatConfig) => void;
  clearMessages: () => void;
}

export type ChatStore = ChatState & ChatActions;

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const useChatStore = create<ChatStore>((set) => ({
  // State
  messages: [],
  isVisible: false,
  isLoading: false,
  config: {},

  // Actions
  addMessage: (messageData) => {
    const message: Message = {
      ...messageData,
      id: generateId(),
      timestamp: Date.now(),
    };

    set((state) => ({
      messages: [...state.messages, message]
    }));
  },

  updateMessage: (id, updates) => {
    set((state) => ({
      messages: state.messages.map(msg => 
        msg.id === id ? { ...msg, ...updates } : msg
      )
    }));
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setVisible: (visible) => set({ isVisible: visible }),

  setConfig: (config) => set({ config }),

  clearMessages: () => set({ messages: [] })
}));