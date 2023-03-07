import { useState } from 'react'
import '../App.css'
import { ChatIcon, DownArrow } from '../src/assets/Icons'
import Form from '../src/components/Form'

const Widget = () => {
  const [isActive, setIsActive] = useState(true)

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
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
        <Form />
      </div>
    </div>
  )
}

export default Widget
