import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const { state } = useContext(NotificationContext)

  const style = {
    color: state.red ? 'firebrick' : 'forestgreen',
    backgroundColor: state.red ? 'lightcoral' : 'lightgreen',
    borderRadius: '10px',
    margin: '10px 0',
    padding: '10px',
  }

  return (
    <div>
      {state.message && (
        <p className="error" style={style}>
          {state.message}
        </p>
      )}
    </div>
  )
}

export default Notification
