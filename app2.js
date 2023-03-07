import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Widget from './components/Widget'
import Chat from './components/Chat'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Widget />}></Route>
          <Route path='/chat' element={<Chat />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
