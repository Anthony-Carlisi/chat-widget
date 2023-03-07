import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
const Chat = ({ socket }) => {
  const location = useLocation()
  const { message } = location.state
  const [messages, setMessages] = useState([])

  // Make sure the Socket is connected
  if (!socket.socket) {
    socket.connect()
  }

  useEffect(() => {
    // if (!socket.socket) {
    socket.connect()
    // }
    // Sends roomId to server
    socket.on('connect', function () {
      socket.emit('create', uuidv4())
    })

    // Update the document title using the browser API
    // socket.emit('intialMessage', { text: message })
    // socket.connect()
  })

  const handleClick = () => {
    socket.emit('intialMessage', { hello: 'world' })
    socket.emit('create', socket.id)
  }

  return (
    <div>
      <button onClick={handleClick}>test</button>
    </div>
  )
}

export default Chat
