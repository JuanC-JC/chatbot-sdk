# Chat SDK - Hybrid Trigger Approach Guide

## Overview

The Chat SDK now supports a **hybrid approach** for trigger buttons, giving you the flexibility to choose between:

1. **Built-in Trigger Button** - SDK provides a professional floating action button (FAB)
2. **Custom Trigger Button** - You implement your own trigger with complete design control
3. **Mixed Approach** - Use both or switch between them dynamically

## 🎯 Quick Start

### Option 1: Built-in Trigger (Recommended for most cases)

```javascript
// Initialize with built-in trigger (default behavior)
ChatSDK.init('chat-container', {
  showTrigger: true,           // Enable built-in trigger (default: true)
  triggerPosition: 'bottom-right',
  triggerIcon: '💬',
  triggerColor: '#007bff',
  triggerSize: 60
});
```

### Option 2: Custom Trigger

```javascript
// Initialize without built-in trigger
ChatSDK.init('chat-container', {
  showTrigger: false    // Disable built-in trigger
});

// Implement your own trigger
document.getElementById('my-custom-trigger').addEventListener('click', () => {
  ChatSDK.toggle();
});
```

## 📝 Configuration Options

### Core Trigger Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showTrigger` | `boolean` | `true` | Enable/disable built-in trigger button |
| `triggerPosition` | `string` | `'bottom-right'` | Position of trigger button |
| `triggerIcon` | `string` | `'💬'` | Emoji or text icon for trigger |
| `triggerText` | `string` | `''` | Optional text next to icon |
| `triggerColor` | `string` | `primaryColor` | Background color of trigger |
| `triggerSize` | `number` | `60` | Size in pixels (width/height) |

### Position Options

- `'bottom-right'` (default)
- `'bottom-left'`
- `'top-right'`
- `'top-left'`

## 🎨 Styling Examples

### Basic Configuration

```javascript
ChatSDK.init('chat-container', {
  showTrigger: true,
  triggerPosition: 'bottom-right',
  triggerIcon: '💬',
  primaryColor: '#007bff'
});
```

### Custom Styled Trigger

```javascript
ChatSDK.init('chat-container', {
  showTrigger: true,
  triggerPosition: 'bottom-left',
  triggerIcon: '🤖',
  triggerText: 'Help',
  triggerColor: '#28a745',
  triggerSize: 80
});
```

### Minimal Design

```javascript
ChatSDK.init('chat-container', {
  showTrigger: true,
  triggerIcon: '💭',
  triggerSize: 50,
  triggerColor: '#6c757d'
});
```

## 🔧 Advanced Usage

### Dynamic Trigger Control

```javascript
// Initialize with built-in trigger
ChatSDK.init('chat-container', { showTrigger: true });

// Programmatically control visibility
ChatSDK.show();    // Show chat widget (hides trigger)
ChatSDK.hide();    // Hide chat widget (shows trigger)
ChatSDK.toggle();  // Toggle between states

// Check current state
const isVisible = ChatSDK.isVisible();
```

### Custom Trigger with SDK Methods

```html
<!-- Your custom trigger buttons -->
<button id="open-chat">💬 Chat with us</button>
<button id="close-chat">✕ Close</button>
<button id="toggle-chat">⚡ Toggle Chat</button>

<script>
// Initialize without built-in trigger
ChatSDK.init('chat-container', { showTrigger: false });

// Bind custom triggers
document.getElementById('open-chat').onclick = () => ChatSDK.show();
document.getElementById('close-chat').onclick = () => ChatSDK.hide();
document.getElementById('toggle-chat').onclick = () => ChatSDK.toggle();
</script>
```

### Framework Integration Examples

#### React

```jsx
import { useEffect, useState } from 'react';

function ChatTrigger() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize without built-in trigger
    ChatSDK.init('chat-container', { showTrigger: false });
    
    // Listen for visibility changes
    ChatSDK.on('visibility:changed', (data) => {
      setIsVisible(data.visible);
    });
  }, []);

  return (
    <button 
      onClick={() => ChatSDK.toggle()}
      className={`chat-trigger ${isVisible ? 'hidden' : 'visible'}`}
    >
      💬 Chat Support
    </button>
  );
}
```

#### Vue

```vue
<template>
  <button 
    @click="toggleChat" 
    v-show="!isChatVisible"
    class="chat-trigger"
  >
    💬 Need Help?
  </button>
</template>

<script>
export default {
  data() {
    return {
      isChatVisible: false
    };
  },
  mounted() {
    ChatSDK.init('chat-container', { showTrigger: false });
    ChatSDK.on('visibility:changed', (data) => {
      this.isChatVisible = data.visible;
    });
  },
  methods: {
    toggleChat() {
      ChatSDK.toggle();
    }
  }
};
</script>
```

## 🎯 Use Cases & Recommendations

### When to Use Built-in Trigger

✅ **Perfect for:**
- Quick implementation and testing
- Consistent design across applications
- Standard chat widget behavior
- MVP and prototyping

```javascript
// Simple setup for most use cases
ChatSDK.init('chat-container', {
  triggerPosition: 'bottom-right',
  triggerIcon: '💬',
  primaryColor: '#007bff'
});
```

### When to Use Custom Trigger

✅ **Perfect for:**
- Matching existing app design system
- Complex trigger interactions
- Multiple trigger locations
- Custom animations or behaviors

```javascript
// Disable built-in, implement custom
ChatSDK.init('chat-container', { showTrigger: false });

// Your custom implementation
function createCustomTrigger() {
  const trigger = document.createElement('button');
  trigger.innerHTML = 'Chat with AI Assistant';
  trigger.className = 'btn btn-primary btn-lg';
  trigger.onclick = () => ChatSDK.show();
  document.body.appendChild(trigger);
}
```

## 🛠️ Best Practices

### 1. Accessibility

```javascript
// Built-in trigger includes accessibility features by default
ChatSDK.init('chat-container', {
  showTrigger: true
  // Includes: aria-label, title, keyboard navigation
});

// For custom triggers, add accessibility
const trigger = document.getElementById('custom-trigger');
trigger.setAttribute('aria-label', 'Open chat support');
trigger.setAttribute('role', 'button');
trigger.setAttribute('tabindex', '0');
```

### 2. Responsive Design

```javascript
// Adjust trigger size for mobile
const isMobile = window.innerWidth < 768;

ChatSDK.init('chat-container', {
  triggerSize: isMobile ? 50 : 60,
  triggerPosition: isMobile ? 'bottom-right' : 'bottom-right'
});
```

### 3. Theme Integration

```javascript
// Match your app's theme
const theme = getAppTheme(); // Your theme system

ChatSDK.init('chat-container', {
  showTrigger: true,
  triggerColor: theme.primary,
  primaryColor: theme.primary,
  triggerIcon: theme.chatIcon || '💬'
});
```

## 🔍 Troubleshooting

### Trigger Not Showing

1. Check `showTrigger` is `true`
2. Verify widget is not already visible
3. Check CSS positioning conflicts

### Trigger Positioning Issues

1. Ensure container has proper `position` CSS
2. Check for z-index conflicts
3. Verify viewport size on mobile

### Custom Trigger Not Working

1. Initialize SDK with `showTrigger: false`
2. Use `ChatSDK.toggle()`, `show()`, or `hide()` methods
3. Listen for `visibility:changed` events

## 🚀 Migration Guide

### From v1.0 (No Trigger) to v2.0 (Hybrid)

```javascript
// Old way (v1.0)
ChatSDK.init('chat-container');
// Widget always visible, no trigger

// New way (v2.0) - equivalent behavior
ChatSDK.init('chat-container', {
  showTrigger: false  // Disable trigger, widget starts visible
});

// New way (v2.0) - with trigger
ChatSDK.init('chat-container', {
  showTrigger: true   // Enable trigger, widget starts hidden
});
```

## 📊 Performance Notes

- Built-in trigger adds ~2KB to bundle size
- No performance impact when `showTrigger: false`
- Trigger animations use CSS transforms (GPU accelerated)
- Event listeners are properly cleaned up on `destroy()`

## 🎉 Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Chat SDK Hybrid Example</title>
</head>
<body>
  <!-- Option 1: Use built-in trigger -->
  <div id="chat-with-builtin"></div>

  <!-- Option 2: Use custom trigger -->
  <div id="chat-with-custom"></div>
  <button id="my-custom-trigger" style="position: fixed; top: 20px; right: 20px;">
    🤖 Custom Chat
  </button>

  <script src="./dist/chat-sdk.umd.cjs"></script>
  <script>
    // Built-in trigger example
    ChatSDK.init('chat-with-builtin', {
      showTrigger: true,
      triggerPosition: 'bottom-right',
      triggerIcon: '💬',
      triggerColor: '#007bff',
      primaryColor: '#007bff'
    });

    // Custom trigger example  
    // ChatSDK.init('chat-with-custom', {
    //   showTrigger: false,
    //   primaryColor: '#28a745'
    // });
    
    // document.getElementById('my-custom-trigger').onclick = () => {
    //   ChatSDK.toggle();
    // };
  </script>
</body>
</html>
```

---

**Need help?** Open an issue or check the demo.html file for live examples! 