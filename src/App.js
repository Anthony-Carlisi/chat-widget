import { Routes, Route, MemoryRouter } from 'react-router-dom'
import Chat from './components/Chat'
import Form from './components/Form'
import { ChatIcon, DownArrow } from './assets/Icons'
import { useState } from 'react'
// import socketIO from 'socket.io-client'
import { io } from 'socket.io-client'

// const socket = socketIO.connect('http://localhost:4000')
const URL = 'http://localhost:4000'
const socket = io(URL, { autoConnect: false })

const App = () => {
  const [isActive, setIsActive] = useState(true)

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
    <MemoryRouter>
      <div className='fixed'>
        {/* Chat box start */}
        <div
          onClick={handleToggle}
          className={isActive ? 'chat-icon-wrapper' : 'no-display'}
        >
          <h3 className='chat-icon-text'>Chat</h3>
          <ChatIcon className='chat-icon' alt='chat-icon' />
        </div>

        {/* Chat header */}
        <div className={isActive ? 'no-display' : 'chat-window-container'}>
          <div className='chat-window-header'>
            <h2 className='chat-window-header-text'> Get in touch</h2>
            <DownArrow
              className='chat-window-header-icon'
              alt='chat-icon-downarrow'
              onClick={handleToggle}
            />
          </div>
          {/* Chat Body */}
          <div>test 18</div>
          <Routes>
            <Route path='/' element={<Form />} />
            <Route path='/chat' element={<Chat socket={socket} />} />
          </Routes>
        </div>
      </div>
    </MemoryRouter>
  )
}

export default App
