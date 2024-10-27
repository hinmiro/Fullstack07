import React, { useEffect, useState } from 'react'
import LoggedUser from './LoggedUser.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const Users = ({ user, setUser }) => {
  const queryClient = useQueryClient()
  const [users, setUsers] = useState([])

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

  return (
    <div>
      <LoggedUser user={user} setUser={setUser} />
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
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
