// import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Create div in index
const Div = document.createElement('div')

// Assign class name to widget
Div.className = 'chat-widget'

// Add div to html
document.body.appendChild(Div)
const root = createRoot(Div)

// Inject our React App into each
if (Div) {
  root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  )
}
