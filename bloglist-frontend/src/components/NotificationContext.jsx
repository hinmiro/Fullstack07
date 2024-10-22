import { createContext, useReducer } from 'react'
import { notificationReducer } from '../reducers/notificationReducer'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: null,
    red: false,
  })

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
