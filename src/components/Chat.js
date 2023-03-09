import { useEffect, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useLocation } from 'react-router-dom'

const Chat = ({ socket }) => {
  const navigate = useNavigate()

  console.log(null)
  const [message, setMessage] = useState()
  const [messages, setMessages] = useState([])
  const [attempt, setAttempt] = useState(0)

  const ref = useRef()
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })

  const [connected, setConnected] = useState(0) // 1 connected, 2 connect timedout

  useEffect(() => {
    socket.connect()
    //https://stackoverflow.com/questions/14649590/how-to-catch-socket-io-errors-and-prevent-them-from-showing-up-in-the-console
    socket.once('connect', () => {
      console.log('connected')
      const roomId = sessionStorage.getItem('roomId')
        ? JSON.parse(sessionStorage.getItem('roomId'))
        : uuidv4()
      socket.emit('join', roomId)
      !sessionStorage.getItem('roomId') &&
        sessionStorage.setItem('roomId', JSON.stringify(roomId))
    })

    socket.on('reconnect', () => {
      console.log('reconnect')
    })

    // On connection error redirect to error apge
    socket.on('connect_error', () => {
      // navigate('/error')
      console.log('connect error chat')
      setAttempt(attempt + 1)
      console.log('attempt')
    })

    return () => {
      // // socket.disconnect()
      // socket.off('connect')
    }
  }, [socket])

  // redirect if form not filled out
  if (!sessionStorage.getItem('form')) {
    console.log('no form')
    navigate('/')
  }

  const handleEnd = () => {
    sessionStorage.clear()
    navigate('/')
  }

  const handleError = () => {
    navigate('/error')
  }

  const handleClick = (e) => {
    socket.emit('message', { text: message })
    setMessage()
    autosize()
  }

  const handleChange = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  // Auto resizes Textarea
  const autosize = () => {
    setTimeout(() => {
      ref.current.style = 'height:auto;padding:0'
      ref.current.style = 'height:' + ref.current.scrollHeight + 'px'
    }, 0)
  }

  return (
    <div>
      <button onClick={handleEnd}>End Chat</button>
      <button onClick={handleClick}>Send Message</button>
      <button onClick={handleError}>Redirect to error</button>
      <div className='flex-column'>
        <label className='input-label' htmlFor='question'>
          Message
        </label>
        {renderCount.current}
        <textarea
          className='textarea'
          rows='1'
          type='text'
          name='question'
          onChange={handleChange}
          onKeyDown={autosize}
          value={message || ''}
          ref={ref}
        ></textarea>
      </div>
    </div>
  )
}

export default Chat
