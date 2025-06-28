# Chat SDK

A lightweight, customizable chat widget SDK built with React, TypeScript, and modern tooling.

## 🚀 Features

- **Lightweight**: ~180KB gzipped bundle size
- **Type-safe**: Full TypeScript support
- **Customizable**: Theme colors, positioning, and styling
- **Event-driven**: Listen to chat events and integrate with your app
- **Modern**: Built with React 19, Emotion, and Zustand
- **Zero dependencies**: Everything bundled, no peer dependencies required

## 📦 Installation

### Via Script Tag (UMD)

```html
<script src="https://your-cdn.com/chat-sdk.umd.cjs"></script>
<script>
  ChatSDK.init('my-chat-container', {
    primaryColor: '#007bff',
    position: 'bottom-right'
  });
</script>
```

### Via NPM/Bun (ES Modules)

```bash
bun add chat-sdk
# or
npm install chat-sdk
```

```javascript
import ChatSDK from 'chat-sdk';

ChatSDK.init('my-chat-container', {
  primaryColor: '#007bff',
  position: 'bottom-right'
});
```

## 🎯 Quick Start

1. **Add a container element to your HTML:**

```html
<div id="chat-container"></div>
```

2. **Initialize the chat widget:**

```javascript
ChatSDK.init('chat-container', {
  primaryColor: '#007bff',
  position: 'bottom-right',
  placeholder: 'Type your message...'
});
```

3. **Listen to events:**

```javascript
ChatSDK.on('message:sent', (data) => {
  console.log('User sent:', data.message);
});

ChatSDK.on('message:received', (data) => {
  console.log('Assistant replied:', data.message);
});
```

## 📖 API Reference

### `ChatSDK.init(containerId, config)`

Initialize the chat widget in the specified container.

**Parameters:**
- `containerId` (string): ID of the HTML element to render the chat in
- `config` (object, optional): Configuration options

**Config Options:**
```typescript
interface ChatConfig {
  apiUrl?: string;           // API endpoint for chat backend
  apiKey?: string;           // API authentication key
  theme?: 'light' | 'dark';  // Color theme
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;     // Primary color (hex)
  maxHeight?: number;        // Maximum widget height in pixels
  placeholder?: string;      // Input placeholder text
}
```

### `ChatSDK.destroy()`

Remove the chat widget and clean up all resources.

### `ChatSDK.sendMessage(message)`

Programmatically send a message as the user.

**Parameters:**
- `message` (string): The message text to send

### `ChatSDK.show()` / `ChatSDK.hide()` / `ChatSDK.toggle()`

Control widget visibility.

### Event System

Listen to chat events using `ChatSDK.on(event, callback)`:

```javascript
// Widget initialization
ChatSDK.on('init', (data) => {
  console.log('Chat initialized', data.config);
});

// Message events
ChatSDK.on('message:sent', (data) => {
  console.log('User message:', data.message);
});

ChatSDK.on('message:received', (data) => {
  console.log('Assistant message:', data.message);
});

// Visibility events
ChatSDK.on('visibility:changed', (data) => {
  console.log('Widget visibility:', data.visible);
});

// Widget destruction
ChatSDK.on('destroy', () => {
  console.log('Chat widget destroyed');
});
```

Remove event listeners with `ChatSDK.off(event, callback)`.

## 🎨 Customization

### Styling

The widget uses CSS-in-JS for complete style isolation. Customize the appearance using the config options:

```javascript
ChatSDK.init('chat-container', {
  primaryColor: '#ff6b6b',     // Custom brand color
  position: 'bottom-left',     // Position on page
  maxHeight: 600,              // Custom height
  theme: 'dark'                // Dark theme
});
```

### Advanced Positioning

The widget automatically positions itself based on the `position` config:

- `bottom-right` (default): Bottom right corner
- `bottom-left`: Bottom left corner  
- `top-right`: Top right corner
- `top-left`: Top left corner

## 🧪 Development

### Requirements

- Bun or Node.js 18+
- Modern browser with ES2020 support

### Setup

```bash
git clone <repository>
cd chat-sdk
bun install
```

### Available Scripts

```bash
bun dev          # Start development server
bun build        # Build for production
bun test         # Run tests
bun test:ui      # Run tests with UI
bun preview      # Preview built demo
bun lint         # Lint code
```

### Testing

Run the test suite:

```bash
bun test
```

For interactive testing, open `demo.html` in your browser after building:

```bash
bun build
bun preview
```

## 📏 Bundle Size

| Format | Size | Gzipped |
|--------|------|---------|
| UMD    | 581 KB | 177 KB |
| ES     | 1.5 MB | 282 KB |

*Note: These sizes include React and all dependencies. In production, you might want to externalize React if your app already uses it.*

## 🔧 Architecture

### Tech Stack

- **React 19**: UI components
- **TypeScript**: Type safety
- **Emotion**: CSS-in-JS styling
- **Zustand**: State management
- **Vite**: Build tool
- **Vitest**: Testing

### Project Structure

```
src/
├── sdk.ts              # Public API
├── core/
│   ├── ChatWidget.tsx  # Main React component
│   ├── store.ts        # Zustand store
│   └── types.ts        # TypeScript definitions
├── components/
│   ├── MessageList.tsx # Message display
│   └── MessageInput.tsx# Message input
├── utils/
│   └── dom.ts          # DOM utilities
└── test/
    ├── *.test.tsx      # Component tests
    └── setup.ts        # Test configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🚀 What's Next?

This is Phase 1 of the SDK. Coming in future phases:

- **Phase 2**: API integration and real backend communication
- **Phase 3**: Rich message types (markdown, images, buttons)
- **Phase 4**: Advanced features (file uploads, voice input, analytics)

---

**Built with ❤️ using modern web technologies**
