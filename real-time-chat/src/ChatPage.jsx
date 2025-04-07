import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatPage = ({ username }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!username) {
      navigate('/')
    }
  }, [username, navigate])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const botResponses = [
      "Hi there! How can I help you today?",
      "That's interesting! Tell me more.",
      "I understand what you mean.",
      "Could you elaborate on that?",
      "I'm not sure I follow. Can you explain differently?",
      "That's a great point!",
      "Let me think about that for a moment.",
      "I appreciate your patience.",
      "That's a complex topic.",
      "I'm here anytime you need to chat."
    ]

    if (username && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(`Hello ${username}! Welcome to the chat. How are you today?`)
      }, 1000)
    }

    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.sender === username) {
      const randomTime = Math.floor(Math.random() * 2000) + 1000
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      
      const typingTimeout = setTimeout(() => {
        setBotTyping(true)
        
        const responseTimeout = setTimeout(() => {
          setBotTyping(false)
          addBotMessage(randomResponse)
        }, 1500)
        
        return () => clearTimeout(responseTimeout)
      }, randomTime)
      
      return () => clearTimeout(typingTimeout)
    }
  }, [messages, username])

  const [botTyping, setBotTyping] = useState(false)

  const getTimestamp = () => {
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
  }

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'Bot',
      timestamp: getTimestamp()
    }])
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (newMessage.trim() === '') return
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: newMessage,
      sender: username,
      timestamp: getTimestamp()
    }])
    
    setNewMessage('')
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with Bot</h2>
        <p>Logged in as: {username}</p>
      </div>
      
      <div className="messages-container">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === username ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-header">
              <span className="sender">{message.sender}</span>
              <span className="timestamp">{message.timestamp}</span>
            </div>
            <p>{message.text}</p>
          </div>
        ))}
        
        {botTyping && (
          <div className="message bot-message typing">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatPage