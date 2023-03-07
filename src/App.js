import { useState } from 'react'
import './App.css'
import { ChatIcon, DownArrow } from './assets/Icons'
import {
  minMaxLength,
  numericOnly,
  lettersOnly,
  phoneValue,
} from './utils/Validations'
import socketIO from 'socket.io-client'
const socket = socketIO.connect('http://localhost:4000')
const App = ({ domElement }) => {
  const [loading, setLoading] = useState()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState([])
  const [isActive, setIsActive] = useState(true)
  const [toggle, setToggle] = useState(true)
  const [form, setForm] = useState({})
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    question: '',
  })

  const handleSendMessage = (e) => {
    e.preventDefault()
    socket.emit('message', {
      text: message,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    })
    setMessage('')
  }

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  const handleChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    let error = ''
    // Switch for field names
    switch (name) {
      case 'name':
        value = lettersOnly(value)
        break

      case 'phone':
        value = numericOnly(value)
        if (minMaxLength(value, 10)) error = 'Enter valid phone number'
        value = phoneValue(value)
        break

      default:
        break
    }
    //Global validation checks
    if (minMaxLength(value, 1)) {
      error = 'Cannot be empty'
    }
    // Sets Errors
    if (error) setFormErrors({ ...formErrors, [name]: error })
    // Deletes Errors
    if (!error && formErrors.hasOwnProperty(name)) delete formErrors[name]
    // Sets Values
    setForm({ ...form, [name]: value })
  }

  const startChat = () => {
    // Add emitter here and post form results
    setMessages([...messages, form.question])
    setToggle(!toggle)
  }

  const submitMessage = (e) => {
    setMessages([...messages, message])
    setMessage('')
  }

  const autosize = (e) => {
    const { currentTarget } = e
    setTimeout(() => {
      currentTarget.style = 'height:auto;padding:0'
      currentTarget.style = 'height:' + currentTarget.scrollHeight + 'px'
    }, 0)
  }
  const handleMessage = (e) => {
    setMessage(e.target.value)
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
        {loading && 'Loading...'}
        {/* Chat Form */}
        <div className={toggle ? '' : 'no-display'}>
          <div className='flex-column'>
            <label className='input-label' htmlFor='phone'>
              Name
            </label>
            <input
              className='input'
              type='text'
              name='name'
              onChange={handleChange}
              value={form.name || ''}
            />
            <p className='input-error'>{formErrors.name}</p>
          </div>
          {/* Phone */}
          <div className='flex-column'>
            <label className='input-label' htmlFor='phone'>
              Phone
            </label>
            <input
              className='input'
              type='text'
              name='phone'
              onChange={handleChange}
              value={form.phone || ''}
            />
            <p className='input-error'>{formErrors.phone}</p>
          </div>
          {/* Message */}
          <div className='flex-column'>
            <label className='input-label' htmlFor='question'>
              Message
            </label>
            <textarea
              className='textarea'
              rows='1'
              type='text'
              name='question'
              onChange={handleChange}
              onKeyDown={autosize}
              value={form.question || ''}
            ></textarea>
            <p className='input-error'>{formErrors.question}</p>
          </div>
          <div className='flex-center'>
            <button
              className='input-button flex-center'
              disabled={Object.keys(formErrors).length !== 0}
              onClick={startChat}
            >
              <h3> Start Chat</h3>
            </button>
          </div>
        </div>
        ={/* Chat Body */}
        {messages.map((message, key) => {
          return <div key={key}>{message}</div>
        })}
        <div className={toggle ? 'no-display' : ''}>
          <textarea
            className='textarea'
            name=''
            onChange={handleMessage}
            onKeyDown={autosize}
            rows='1'
            value={message}
          ></textarea>
          <button disabled={!message} onClick={submitMessage}>
            test
          </button>
          <button onClick={handleSendMessage}>send message</button>
          <input type='text' />
          <button>Join room</button>
          Test
        </div>
      </div>
    </div>
  )
}

export default App
