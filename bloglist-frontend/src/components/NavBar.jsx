import React from 'react'
import LoggedUser from './LoggedUser.jsx'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'ThreeDShadow',
          borderRadius: '10px',
        }}
      >
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        <LoggedUser />
      </div>
    </div>
  )
}

export default NavBar
