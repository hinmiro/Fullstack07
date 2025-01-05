import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext.jsx'

const LoggedUser = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const handleLogout = (evt) => {
    evt.preventDefault()
    window.localStorage.clear()
    setUser(null)
    navigate('/')
  }

  return (
    <p>
      Logged in as <i>{user.username}</i>
      <button style={{ marginLeft: '1rem' }} onClick={handleLogout}>
        Logout
      </button>
    </p>
  )
}

export default LoggedUser
