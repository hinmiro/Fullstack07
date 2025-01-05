import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext.jsx'
import Button from '@mui/material/Button'

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
    <p style={{ marginRight: '1rem', color: 'grey' }}>
      Logged in as <i style={{ color: 'powderblue' }}>{user.username}</i>
      <Button
        variant="outlined"
        onClick={handleLogout}
        style={{ marginLeft: '1rem' }}
      >
        Logout
      </Button>
    </p>
  )
}

export default LoggedUser
