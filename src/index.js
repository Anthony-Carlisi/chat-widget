import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Create div in index
const Div = document.createElement('div')

// Assign class name to widget
Div.className = 'chat-widget'

// Add div to html
document.body.appendChild(Div)

// Inject our React App into each
if (Div) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    Div
  )
}
