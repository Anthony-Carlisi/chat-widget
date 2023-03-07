import '../App.css'
import { useState, useEffect } from 'react'
import {
  minMaxLength,
  numericOnly,
  lettersOnly,
  phoneValue,
} from '../utils/Validations'
import { useNavigate } from 'react-router-dom'

const Form = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    question: '',
  })

  // redirect if form is filled to chat
  useEffect(() => {
    sessionStorage.getItem('form') && navigate('/chat')
  })

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

  const autosize = (e) => {
    const { currentTarget } = e
    setTimeout(() => {
      currentTarget.style = 'height:auto;padding:0'
      currentTarget.style = 'height:' + currentTarget.scrollHeight + 'px'
    }, 0)
  }

  const handleSubmit = () => {
    sessionStorage.setItem('form', JSON.stringify(form))
    navigate('/chat', { state: { message: form.question } })
  }

  return (
    <div>
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
          onClick={handleSubmit}
        >
          <h3> Start Chat</h3>
        </button>
      </div>
    </div>
  )
}

export default Form
