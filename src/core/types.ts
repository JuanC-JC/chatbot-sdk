export interface Message {
  id: string;
  timestamp: number;
  role: 'user' | 'assistant';
  content: string;
  status?: 'pending' | 'sent' | 'error';
}

export interface ChatConfig {
  apiUrl?: string;
  apiKey?: string;
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  maxHeight?: number;
  placeholder?: string;
}

export interface ChatSDKInstance {
  init(containerId: string, config?: ChatConfig): void;
  destroy(): void;
  sendMessage(message: string): void;
  on(event: string, callback: EventCallback): void;
  off(event: string, callback: EventCallback): void;
}

export type EventCallback = (data?: unknown) => void;

export interface ChatState {
  messages: Message[];
  isVisible: boolean;
  isLoading: boolean;
  config: ChatConfig;
} 