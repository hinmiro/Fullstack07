import React, { useContext, useRef } from 'react'
import BlogForm from './BlogForm.jsx'
import Toggleable from './Toggleable.jsx'
import NewBlogForm from './NewBlogForm.jsx'
import LoginForm from './LoginForm.jsx'
import UserContext from './UserContext.jsx'
import BlogsContext from './BlogsContext.jsx'

const Home = () => {
  const toggleableFromRef = useRef()
  const { user, setUser } = useContext(UserContext)
  const { blogs } = useContext(BlogsContext)

  return (
    <>
      {user && <BlogForm user={user} setUser={setUser} blogs={blogs} />}
      <br />
      <br />
      {user && (
        <Toggleable buttonLabel={'new blog'} ref={toggleableFromRef}>
          <NewBlogForm setUser={setUser} />
        </Toggleable>
      )}
      {!user && <LoginForm setUser={setUser} />}
    </>
  )
}

export default Home
