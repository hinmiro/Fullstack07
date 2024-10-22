import Blog from './Blog.jsx'
import { useContext } from 'react'
import NotificationContext from './NotificationContext.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogForm = ({ user, setUser, blogs }) => {
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.addLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleLogout = (evt) => {
    evt.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const updateBlog = (blog) => {
    likeBlogMutation.mutate(blog)
  }

  const removeBlog = (id) => {
    removeBlogMutation.mutate(id)
  }

  return (
    <>
      <p>
        {user.username} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <br />
      <br />
      <table
        id="blogsTableId"
        style={{ border: '1px solid black', borderCollapse: 'collapse' }}
      >
        <tbody>
          {(Array.isArray(blogs) ? blogs : []).map((blog) => (
            <tr key={blog.id} style={{ border: '1px solid black' }}>
              <td>
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                  user={user}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default BlogForm
