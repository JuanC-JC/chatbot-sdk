/**
 * DOM utility functions for chat widget SDK
 */

export const createContainer = (containerId: string): HTMLElement => {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }
  return container;
};

export const removeAllChildren = (element: HTMLElement): void => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const injectStyles = (): void => {
  // Inject base styles to prevent conflicts with host page
  const styleId = 'chat-sdk-base-styles';
  
  if (document.getElementById(styleId)) {
    return; // Already injected
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* Reset styles for chat widget to prevent inheritance */
    [data-chat-sdk] *, [data-chat-sdk] *::before, [data-chat-sdk] *::after {
      box-sizing: border-box;
    }
    
    [data-chat-sdk] {
      /* Prevent text selection on widget container */
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    [data-chat-sdk] input, [data-chat-sdk] textarea {
      /* Allow text selection in inputs */
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
  `;
  
  document.head.appendChild(style);
};

export const isValidContainerId = (containerId: string): boolean => {
  return typeof containerId === 'string' && containerId.length > 0;
}; 