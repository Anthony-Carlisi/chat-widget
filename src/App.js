import { useEffect, useState } from 'react'
import './App.css'
import Test from './components/Test'
import ChatIcon from './assets/ChatIcon'
// Render each post
function renderPost(post) {
  const {
    data: { title, url, author, id },
  } = post
  const authorUrl = `https://www.reddit.com/u/${author}`

  return (
    <div className='reddit_widget__post' key={id}>
      <div className='reddit_widget__posted_by'>
        posted by{' '}
        <a
          href={authorUrl}
          className='reddit_widget__posted_by'
          target='_blank'
          rel='noopener noreferrer'
        >
          u/{author}
        </a>
      </div>
      <a
        href={url}
        className='reddit_widget__title'
        target='_blank'
        rel='noopener noreferrer'
      >
        {title}
      </a>
    </div>
  )
}

function App({ domElement }) {
  const subreddit = domElement.getAttribute('data-subreddit')
  const [loading, setLoading] = useState()
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Fetch data from reddit
    setLoading(true)
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setData(data.data.children.slice(0, 10))
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
        setError('error fetching from reddit')
      })
  }, [subreddit])

  // const ChatBubble = () => {
  //   return <div className={isActive ? 'active' : 'inactive'}>test123</div>
  // }

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  const handleChange = (e) => {
    // e.preventDefault()
    console.log(e.target.value)
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
        <div>body</div>
        <input
          className='chat-window-input'
          type='text'
          onChange={handleChange}
        />
        <textarea
          name=''
          id=''
          cols='30'
          rows='10'
          onChange={handleChange}
        ></textarea>
        <div
          className='chat-window-input'
          type='textarea'
          contentEditable='true'
          onChange={handleChange}
        >
          This is an example text
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
