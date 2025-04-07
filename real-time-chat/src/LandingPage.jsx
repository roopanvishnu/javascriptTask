import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = ({ onSetUsername }) => {
  const [inputUsername, setInputUsername] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputUsername.trim()) {
      onSetUsername(inputUsername)
      navigate('/chat')
    }
  }

  return (
    <div className="landing-container">
      <h1>Welcome to Chat Simulator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Start Chatting</button>
      </form>
    </div>
  )
}

export default LandingPage