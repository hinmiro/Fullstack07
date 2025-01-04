import React, { useContext } from 'react'
import userContext from './UserContext.jsx'
import LoggedUser from './LoggedUser.jsx'

const User = () => {
  const { user, blogs } = useContext(userContext)
  console.log(blogs)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <LoggedUser user={user}></LoggedUser>
      <h1>{user.username}</h1>
      <h3>Added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
