import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoggedUser = ({ user, setUser }) => {
  const navigate = useNavigate()
  const handleLogout = (evt) => {
    evt.preventDefault()
    window.localStorage.clear()
    setUser(null)
    navigate('/')
  }

  return (
    <p>
      {user.username} logged in <button onClick={handleLogout}>Logout</button>
    </p>
  )
}

export default LoggedUser
