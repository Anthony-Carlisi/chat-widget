import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './components/Chat'
import { useState } from 'react'
import './App.css'
import { ChatIcon, DownArrow } from './assets/Icons'
import { Form } from 'react-router-dom'
const App = () => {
  const [isActive, setIsActive] = useState(true)

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
    <BrowserRouter>
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
          <div>
            <Routes>
              <Route path='/' element={<Form />}></Route>
              <Route path='/chat' element={<Chat />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    {/* </BrowserRouter> */}
  )
}

export default App
