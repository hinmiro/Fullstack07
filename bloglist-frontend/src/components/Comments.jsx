import React, { useContext, useState } from 'react'
import BlogsContext from './BlogsContext.jsx'
import NotificationContext from './NotificationContext.jsx'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Comments = ({ blog }) => {
  const { blogs } = useContext(BlogsContext)
  const [comment, setComment] = useState('')
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const commentMutation = useMutation({
    mutationFn: (newComment) => blogService.commentBlog(newComment, blog.id),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: 'Comment added' },
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
    },
  })

  const onSubmit = async (evt) => {
    evt.preventDefault()
    const newComment = { comment }
    setComment('')
    commentMutation.mutate(newComment)
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <input
            id={'commentInputId'}
            aria-label={'Comment: '}
            type={'text'}
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button style={{ marginLeft: '1rem' }} type={'submit'}>
            Add comment
          </button>
        </div>
      </form>
      <ul>
        {blog.comments.length > 0 ? (
          blog.comments.map((c, i) => <li key={i}>{c}</li>)
        ) : (
          <p>Blog has no comments...</p>
        )}
      </ul>
    </div>
  )
}

export default Comments
