import loginService from '../services/login.js'
import { useState, useContext } from 'react'
import NotificationContext from './NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (newUser) => {
      setUser(newUser)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: 'Logged in', red: false },
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
      window.localStorage.setItem('appUser', JSON.stringify(newUser))
      navigate('/')
    },
    onError: (error) => {
      console.error('Login failed:', error)
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: `Login failed: ${error.message}`, red: true },
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
    },
  })

  const handleLogin = async (evt) => {
    evt.preventDefault()
    loginMutation.mutate({ username, password })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            id="usernameId"
            label="Username"
            variant="outlined"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            id="passwordId"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            style={{ marginTop: '5%' }}
          />
          <Button type="submit" endIcon={<LoginTwoToneIcon />}>
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
