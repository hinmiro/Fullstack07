import axios from 'axios'
import blogService from './blogs.js'

const baseUrl = '/api/login'

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  const blogPromises = res.data.blogs.map((blogId) =>
    blogService.getBlogById(blogId.toString())
  )
  const blogs = await Promise.all(blogPromises)
  return { ...res.data, blogs }
}

export default { login }
