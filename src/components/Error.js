import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Error = ({ socket }) => {
  const navigate = useNavigate()

  socket.on('connect', () => {
    console.log('reconnected')
    navigate('/chat')
  })

  const testClick = () => {
    navigate('/chat')
  }

  return (
    <div>
      Sorry chat is not available right now
      <div>
        <button onClick={testClick}>To chat</button>
      </div>
    </div>
  )
}

export default Error
