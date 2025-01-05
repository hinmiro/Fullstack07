import React, { useContext } from 'react'
import LoggedUser from './LoggedUser.jsx'
import BlogsContext from './BlogsContext.jsx'
import UserContext from './UserContext.jsx'

const User = () => {
  const { user } = useContext(UserContext)
  const { blogs } = useContext(BlogsContext)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <LoggedUser />
      <h1>{user.username}</h1>
      <h3>Added blogs</h3>
      <ul>
        {blogs.length > 0 ? (
          blogs.map((b) => <li key={b.id}>{b.title}</li>)
        ) : (
          <p>User has no blogs</p>
        )}
      </ul>
    </div>
  )
}

export default User
