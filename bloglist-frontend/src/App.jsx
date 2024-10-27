import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Notification from './components/Notification.jsx'
import blogService from './services/blogs.js'
import { UserProvider } from './components/UserContext.jsx'
import Users from './components/Users.jsx'
import Home from './components/Home.jsx'

const App = () => {
  const [user, setUser] = useState(null)

  const padding = { padding: 5 }

  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('appUser')
    if (loggedUser) {
      const parseUser = JSON.parse(loggedUser)
      setUser(parseUser)
    }
  }, [])

  if (isLoading) {
    return <div>Loading data...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const blogs = [...data].sort((a, b) => b.likes - a.likes)
  console.log(blogs)

  return (
    <UserProvider>
      <Router>
        <div>
          <Notification />
          <h1>blogApp 1.0</h1>
          {user && (
            <div>
              <Link style={padding} to="/">
                Home
              </Link>
              <Link style={padding} to="/users">
                Users
              </Link>
            </div>
          )}
          <Routes>
            <Route
              path="/"
              element={<Home user={user} setUser={setUser} blogs={blogs} />}
            />
            <Route
              path="/users"
              element={<Users user={user} setUser={setUser} />}
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
