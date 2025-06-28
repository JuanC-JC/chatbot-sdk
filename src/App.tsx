import { useState, useMemo } from 'react'
import { ChatWidget } from './core/ChatWidget'
import { useChatStore } from './core/store'
import './App.css'
import type { ChatConfig } from './core/types'

function App() {
  const { isVisible, setVisible, addMessage, clearMessages } = useChatStore()
  const [primaryColor, setPrimaryColor] = useState('#007bff')
  const [position, setPosition] = useState<ChatConfig['position']>('bottom-right')
  const [placeholder, setPlaceholder] = useState('Type your message...')
  const [chatInitialized, setChatInitialized] = useState(true) // In React mode, it's always "initialized"
  const [eventLog, setEventLog] = useState<string[]>(['📄 React development mode loaded'])

  // Memoize config to prevent infinite re-renders
  const config = useMemo(() => ({
    primaryColor,
    position,
    placeholder
  }), [primaryColor, position, placeholder])

  // Event logging helper
  const log = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logEntry = `[${timestamp}] ${message}`
    setEventLog(prev => [...prev, logEntry])
  }

  // Control functions (simulating SDK behavior in React mode)
  const initializeChat = () => {
    setChatInitialized(true)
    setVisible(true)
    log('✅ Chat initialized successfully')
  }

  const destroyChat = () => {
    setChatInitialized(false)
    setVisible(false)
    clearMessages()
    log('🗑️ Chat destroyed')
  }

  const showChat = () => {
    if (chatInitialized) {
      setVisible(true)
      log('👁️ Chat shown')
    } else {
      log('❌ Chat not initialized')
    }
  }

  const hideChat = () => {
    if (chatInitialized) {
      setVisible(false)
      log('🙈 Chat hidden')
    } else {
      log('❌ Chat not initialized')
    }
  }

  const toggleChat = () => {
    if (chatInitialized) {
      setVisible(!isVisible)
      log(`🔄 Chat toggled - now ${!isVisible ? 'visible' : 'hidden'}`)
    } else {
      log('❌ Chat not initialized')
    }
  }

  const sendTestMessage = () => {
    if (chatInitialized) {
      const messages = [
        'Hello from the demo!',
        'This is a test message',
        'How are you doing?',
        '🚀 This SDK is working great!',
        'Testing the chat functionality',
        'React development mode is awesome!'
      ]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      addMessage({
        role: 'user',
        content: randomMessage,
        status: 'sent'
      })
      log(`📨 Sent test message: "${randomMessage}"`)

      // Simulate assistant response
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          content: 'Thanks for the test message! I received it successfully.',
          status: 'sent'
        })
        log('📥 Assistant responded to test message')
      }, 1000)
    } else {
      log('❌ Chat not initialized')
    }
  }

  const clearLog = () => {
    setEventLog([])
    log('🧹 Log cleared')
  }

  // Button style
  const buttonStyle = {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer' as const,
    fontSize: '14px',
    transition: 'background 0.3s ease'
  }

  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🤖 Chat SDK Development</h1>

      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '12px', 
        padding: '20px', 
        marginBottom: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3>Configuration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label>Primary Color:</label>
            <input 
              type="color" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Position:</label>
            <select 
              value={position} 
              onChange={(e) => setPosition(e.target.value as ChatConfig['position'])}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </select>
          </div>
          <div>
            <label>Placeholder:</label>
            <input 
              type="text" 
              value={placeholder} 
              onChange={(e) => setPlaceholder(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>
      </div>

             <div style={{ 
         background: 'rgba(255, 255, 255, 0.1)', 
         borderRadius: '12px', 
         padding: '20px', 
         marginBottom: '20px',
         backdropFilter: 'blur(10px)'
       }}>
         <h3>Controls</h3>
         <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
           <button onClick={initializeChat} style={buttonStyle}>
             Initialize Chat
           </button>
           <button onClick={destroyChat} style={buttonStyle}>
             Destroy Chat
           </button>
           <button onClick={showChat} style={buttonStyle}>
             Show
           </button>
           <button onClick={hideChat} style={buttonStyle}>
             Hide
           </button>
           <button onClick={toggleChat} style={buttonStyle}>
             Toggle
           </button>
           <button onClick={sendTestMessage} style={buttonStyle}>
             Send Test Message
           </button>
           <button onClick={clearLog} style={buttonStyle}>
             Clear Log
           </button>
         </div>
       </div>

       <div style={{ 
         background: 'rgba(255, 255, 255, 0.1)', 
         borderRadius: '12px', 
         padding: '20px', 
         marginBottom: '20px',
         backdropFilter: 'blur(10px)'
       }}>
         <h3>Event Log</h3>
         <div style={{
           background: 'rgba(0, 0, 0, 0.3)',
           borderRadius: '6px',
           padding: '15px',
           maxHeight: '200px',
           overflowY: 'auto',
           fontFamily: 'monospace',
           fontSize: '12px',
           whiteSpace: 'pre-wrap'
         }}>
           {eventLog.join('\n')}
         </div>
       </div>

       <p>✨ <strong>Hot reloading enabled!</strong> Edit components and see changes instantly.</p>

       {/* Chat Widget */}
       <ChatWidget config={config} />
    </div>
  )
}

export default App
