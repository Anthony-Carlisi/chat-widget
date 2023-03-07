import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
const Chat = ({ socket }) => {
  const location = useLocation()
  const { message } = location.state
  console.log(message)
  useEffect(() => {
    // Update the document title using the browser API
    socket.emit('intialMessage', { text: message })
  })

  const handleClick = () => {
    socket.emit('intialMessage', { hello: 'world' })
  }

  return (
    <div>
      <button onClick={handleClick}>test</button>
    </div>
  )
}

export default Chat
