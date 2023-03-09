import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Error = ({ socket }) => {
  const [attempt, setAttempt] = useState(0)
  const navigate = useNavigate()

  // useEffect(() => {
  //   socket.connect()

  //   socket.on('connect', () => {
  //     console.log('reconnected')
  //     navigate('/chat')
  //   })

  //   // On connection error redirect to error apge
  //   socket.on('connect_error', () => {
  //     setAttempt(attempt + 1)
  //     console.log('connect error error')
  //   })
  // })

  // On connection error redirect to error apge
  socket.on('connect_error', () => {
    setAttempt(attempt + 1)
    console.log('connect error error')
  })

  socket.on('connect', () => {
    navigate('/chat')
  })

  const testClick = () => {
    navigate('/chat')
  }

  const handelReconnect = () => {
    socket.connect()
  }

  return (
    <div>
      Sorry chat is not available right now attempt {attempt}
      <div>
        <button onClick={testClick}>To chat</button>
        <button onClick={handelReconnect}>Try Reconnecting</button>
      </div>
    </div>
  )
}

export default Error
