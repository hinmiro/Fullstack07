import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from '@mui/material/Button'

const Toggleable = forwardRef((props, ref) => {
  const { buttonLabel } = props
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div id="newBlogButtonId">
        <div style={hideWhenVisible}>
          <Button variant="contained" size="small" onClick={toggleVisibility}>
            {buttonLabel}
          </Button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <Button
            variant="contained"
            size="small"
            onClick={toggleVisibility}
            style={{ marginBottom: '1rem' }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  )
})

export default Toggleable
