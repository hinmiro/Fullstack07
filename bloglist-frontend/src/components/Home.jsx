import React, { useRef } from 'react'
import BlogForm from './BlogForm.jsx'
import Toggleable from './Toggleable.jsx'
import NewBlogForm from './NewBlogForm.jsx'
import LoginForm from './LoginForm.jsx'

const Home = ({ user, setUser, blogs }) => {
  const toggleableFromRef = useRef()

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
