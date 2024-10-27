import React from 'react'

const LoggedUser = ({ user, setUser }) => {
  const handleLogout = (evt) => {
    evt.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <p>
      {user.username} logged in <button onClick={handleLogout}>Logout</button>
    </p>
  )
}

export default LoggedUser
