import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogContext from './BlogsContext.jsx'
import LoggedUser from './LoggedUser.jsx'
import UserContext from './UserContext.jsx'
import NotificationContext from './NotificationContext.jsx'
import LikeButton from './LikeButton.jsx'
import DeleteButton from './DeleteButton.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs.js'
import Comments from './Comments.jsx'

const BlogPage = () => {
  const { id } = useParams()
  const { blogs, setBlogs } = useContext(BlogContext)
  const { user, setUser } = useContext(UserContext)
  const [blog, setBlog] = useState(null)
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

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

  const updateBlog = (blog) => {
    likeBlogMutation.mutate(blog)
  }

  const removeBlog = (id) => {
    removeBlogMutation.mutate(id)
    navigate('/')
  }

  const handleLikes = async () => {
    try {
      updateBlog(blog)
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: `Liked on blog "${blog.title}"`, red: false },
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
    } catch (err) {
      console.log('Error: ', err.message)
    }
  }

  const handleDelete = async () => {
    const confirmation = window.confirm(`Remove blog: ${blog.title}`)
    if (!confirmation) return
    try {
      removeBlog(blog.id)
    } catch (err) {
      console.log('Error occurred: ', err.message)
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = blogs.find((b) => b.id === id)
      setBlog(blogData)
    }
    fetchBlog()
  }, [blogs, id])

  if (!blog) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <LoggedUser />
      <h1>{blog.title}</h1>
      <br />
      <a href={`${blog.url}`}>{blog.url}</a>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p>{blog.likes} likes</p>
        <LikeButton handleLikes={handleLikes} />
      </div>
      <p style={{ marginTop: 0 }}>Added by {blog.author}</p>
      {blog.user.id === user.id ? (
        <DeleteButton handleDelete={handleDelete} text={'remove'} />
      ) : (
        ''
      )}
      <br />
      <br />
      <div>
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default BlogPage
