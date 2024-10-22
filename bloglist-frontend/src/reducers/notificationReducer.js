export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.payload.message, red: action.payload.red }
    case 'HIDE_NOTIFICATION':
      return { message: null, red: false }
    default:
      return state
  }
}
