import { useEffect, useState } from 'react'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Button from '@mui/material/Button'

const NewBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const { setUser } = props
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createNewBlog,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: `Created blog "${newBlog.title}"`, red: false },
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
    },
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('appUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [setUser])

  const onSubmit = async (evt) => {
    evt.preventDefault()
    const newBlog = { title, url }
    setTitle('')
    setUrl('')
    newBlogMutation.mutate(newBlog)
  }

  return (
    <>
      <br />
      <br />
      <h3>Create new blog</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title:</label>
          <input
            id="titleInputId"
            aria-label={'Title:'}
            type={'text'}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Url:</label>
          <input
            id="urlInputId"
            aria-label={'Url:'}
            type={'text'}
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          variant="contained"
          size="small"
          type={'submit'}
          id="submitBlogButton"
        >
          Create
        </Button>
      </form>
    </>
  )
}

export default NewBlogForm
