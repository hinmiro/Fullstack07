import { useState, useEffect, useRef, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import NotificationContext from './components/NotificationContext'
import Notification from './components/Notification.jsx'
import NewBlogForm from './components/NewBlogForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Toggleable from './components/Toggleable.jsx'
import blogService from './services/blogs.js'

const App = () => {
  const { dispatch } = useContext(NotificationContext)
  const [user, setUser] = useState(null)
  const toggleableFromRef = useRef()

  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('appUser')
    const parseUser = JSON.parse(loggedUser)
    if (parseUser === null) {
      return
    }
    setUser(parseUser)
  }, [])

  if (isLoading) {
    return <div>Loading data...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const blogs = [...data].sort((a, b) => b.likes - a.likes)

  const handleBlogCreate = async (newBlog) => {
    try {
      const createdBlog = await blogService.createNewBlog(newBlog)
      const newBlogs = blogs.concat(createdBlog)
      const updatedUser = { ...user, blogs: newBlogs }
      setUser(updatedUser)
      window.localStorage.setItem('appUser', JSON.stringify(updatedUser))
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          message: `A new blog created "${newBlog.title}"`,
          red: false,
        },
      })
      toggleableFromRef.current.toggleVisibility()
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
    } catch (err) {
      dispatch({
        payload: { message: 'Error occurred making a new blog', red: true },
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
    }
  }

  return (
    <div>
      <Notification />
      <h1>blogApp 1.0</h1>
      {user && <BlogForm user={user} setUser={setUser} blogs={blogs} />}
      <br />
      <br />
      {user && (
        <Toggleable buttonLabel={'new blog'} ref={toggleableFromRef}>
          <NewBlogForm handleBlogCreate={handleBlogCreate} setUser={setUser} />
        </Toggleable>
      )}

      {!user && <LoginForm setUser={setUser} />}
    </div>
  )
}

export default App
