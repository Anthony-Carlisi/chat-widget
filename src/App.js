import { useState } from 'react'
import './App.css'
import ChatIcon from './assets/ChatIcon'
import {
  minMaxLength,
  currencyValue,
  validEmail,
  findObject,
  findInArray,
  numericOnly,
  lettersOnly,
  phoneValue,
  findEmptyValues,
} from './utils/Validations'

function App({ domElement }) {
  const [loading, setLoading] = useState()
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([])
  const [isActive, setIsActive] = useState(true)
  const [toggle, setToggle] = useState(true)
  const [form, setForm] = useState({})
  const [formErrors, setFormErrors] = useState({})

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  const handleChange = (e, input, field) => {
    let name = field ? field : e.target.name
    let value = input ? input : e.target.value
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
    if (!error && formErrors[name]) delete formErrors[name]
    // Sets Values
    setForm({ ...form, [name]: value })
  }

  const handleKeyDown = (e) => {
    console.log(e.target.scrollHeight)
    console.log(e.target.style.height)

    // e.target.style.height = '40px'
    // e.target.style.height = `${e.target.scrollHeight}px`
    const limit = 60

    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`
  }

  const newChat = () => {
    setToggle(!toggle)
  }

  return (
    <div className='fixed'>
      <div
        onClick={handleToggle}
        className={isActive ? 'chat-icon-wrapper' : 'no-display'}
      >
        <div className='chat-icon-text'>Chat</div>
        <ChatIcon className='chat-icon' alt='chat-icon' />
      </div>

      <div className={isActive ? 'no-display' : 'chat-window-container'}>
        <div className='chat-window-header'>top</div>
        {loading && 'Loading...'}
        {error && error}

        {/* new chat form */}
        <div className={toggle ? '' : 'no-display'}>
          <div className='flex-column'>
            <label htmlFor='name'>Enter your full name</label>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              value={form.name || ''}
            />
          </div>
          <div className='flex-column'>
            <label htmlFor='phone'>Enter your phone number</label>
            <input
              type='text'
              name='phone'
              onChange={handleChange}
              value={form.phone || ''}
            />
          </div>
          <div className='flex-column'>
            <label htmlFor='question'>Enter your question</label>
            <input
              type='text'
              name='question'
              onChange={handleChange}
              value={form.question || ''}
            />
          </div>
          <button onClick={newChat}>Start Chat</button>
        </div>

        {/* chat window */}
        <div className={toggle ? 'no-display' : ''}>
          <textarea
            className='chat-window-input'
            // rows='1'
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          ></textarea>
        </div>

        <button onClick={handleToggle}>toggle</button>
      </div>
    </div>
  )
  // return (
  //   <div>
  //     <div className={isActive ? 'active' : 'inactive'}>Chat with us</div>
  //     <ChatIcon className='chat-icon' alt='chat-icon' />
  //     <h1>Test Header</h1>
  //     <div className={!isActive ? 'active' : 'inactive'}>
  //       {loading && 'Loading...'}
  //       {error && error}
  //       <div>Test body</div>
  //     </div>
  //     <button onClick={handleToggle}>toggle</button>
  //     <p>footer</p>
  //   </div>
  // )
}

export default App
