import React, { useContext, useEffect, useState } from 'react'
import LoggedUser from './LoggedUser.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import UserContext from './UserContext.jsx'
import BlogsContext from './BlogsContext.jsx'

const Users = () => {
  const queryClient = useQueryClient()
  const [users, setUsers] = useState([])
  const { user: contextUser, setUser: setContextUser } = useContext(UserContext)
  const { blogs, setBlogs } = useContext(BlogsContext)

  const usersMutation = useMutation({
    mutationFn: blogService.getAllUsers,
    onSuccess: (users) => {
      setUsers(users)
      queryClient.invalidateQueries(['users'])
    },
  })

  useEffect(() => {
    usersMutation.mutate()
  }, [])

  const handleClick = (user) => {
    setContextUser(user)
    setBlogs(user.blogs)
  }

  return (
    <div>
      <LoggedUser />
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/users/${user.id}`}
                  onClick={() => handleClick(user)}
                >
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
