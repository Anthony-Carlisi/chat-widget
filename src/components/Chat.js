import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const Chat = ({ socket }) => {
  // const location = useLocation()
  // const { message } = location.state
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])

  // Make sure the Socket is connected
  if (!socket.socket) {
    socket.connect()
  }

  // redirect if form not filled out
  if (!sessionStorage.getItem('form')) {
    console.log('no form')
    navigate('/')
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
    socket.emit('message', { hello: 'world' })
  }

  return (
    <div>
      <button onClick={handleClick}>test</button>
    </div>
  )
}

export default Chat
