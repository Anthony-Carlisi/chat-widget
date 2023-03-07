import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Find all widget divs

let div = document.createElement('div')
div.className = 'chat-widget'

document.body.appendChild(div)
const WidgetDivs = document.querySelectorAll('.chat-widget')

// Inject our React App into each
WidgetDivs.forEach((Div) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    Div
  )
})
