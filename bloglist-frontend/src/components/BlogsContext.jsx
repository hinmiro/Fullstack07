import { createContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs.js'

const BlogsContext = createContext()

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])

  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  useEffect(() => {
    if (data) {
      setBlogs([...data].sort((a, b) => b.likes - a.likes))
    }
  }, [data])

  if (isLoading) {
    return <div>Loading data...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <BlogsContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogsContext.Provider>
  )
}

export default BlogsContext
