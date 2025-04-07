import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import ChatPage from './ChatPage'
import './App.css'

function App() {
  const [username, setUsername] = useState('')

  const handleSetUsername = (name) => {
    setUsername(name)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onSetUsername={handleSetUsername} />} />
        <Route path="/chat" element={<ChatPage username={username} />} />
      </Routes>
    </Router>
  )
}

export default App