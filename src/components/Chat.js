import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const Chat = ({ socket }) => {
  // const location = useLocation()
  // const { message } = location.state
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState([])

  // redirect if form not filled out
  if (!sessionStorage.getItem('form')) {
    console.log('no form')
    navigate('/')
  }
  socket.connect()

  // On connection create room using UUID only once
  socket.once('connect', () => {
    const id = sessionStorage.getItem('id')
      ? sessionStorage.getItem('id')
      : uuidv4()
    socket.emit('join', id)
    !sessionStorage.getItem('id') &&
      sessionStorage.setItem('id', JSON.stringify(id))
  })

  // On connection error redirect to error apge
  socket.on('connect_error', () => {
    navigate('/error')
    console.log('connect error')
  })

  // // If socket not connected
  // if (!socket.socket) {
  //   // socket.disconnect()
  //   navigate('/error')
  //   console.log('not connected')
  // }

  const handleError = () => {
    navigate('/error')
  }

  const handleClick = () => {
    socket.emit('message', { hello: 'world' })
  }

  return (
    <div>
      <button onClick={handleClick}>Send Message</button>
      <button onClick={handleError}>Redirect to error</button>
    </div>
  )
}

export default Chat
