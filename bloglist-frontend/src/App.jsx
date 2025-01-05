import { Container } from '@mui/material'
import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Notification from './components/Notification.jsx'
import UserContext from './components/UserContext.jsx'
import Users from './components/Users.jsx'
import Home from './components/Home.jsx'
import User from './components/User.jsx'
import BlogPage from './components/BlogPage.jsx'
import { BlogsProvider } from './components/BlogsContext.jsx'
import NavBar from './components/NavBar.jsx'

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <Container>
      <BlogsProvider>
        <Router>
          <div>
            <Notification />
            {user && (
              <div>
                <NavBar />
                <h1>blogApp 1.0</h1>
              </div>
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path={'/users/:id'} element={<User />} />
              <Route path={'/blogs/:id'} element={<BlogPage />} />
            </Routes>
          </div>
        </Router>
      </BlogsProvider>
    </Container>
  )
}

export default App
