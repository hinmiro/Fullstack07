import axios from 'axios'

const baseUrl = '/api/blogs'
const usersUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const all = axios.get(baseUrl).then((res) => res.data)
  console.log(all)
  return all
}

const getBlogById = async (id) => {
  const req = await axios.get(baseUrl + `/${id}`)
  return req.data
}

const getUserBlogs = async (token) => {
  const req = await axios.get(baseUrl)
  return req.data
}

const createNewBlog = async (blog) => {
  const conf = {
    headers: { Authorization: token },
  }
  const req = await axios.post(baseUrl, blog, conf)
  return req.data
}

const addLike = async (blog) => {
  const req = await axios.put(baseUrl + `/${blog.id}`, blog)
  return req.data
}

const deleteBlog = async (id) => {
  const conf = {
    headers: { Authorization: token },
  }
  const req = await axios.delete(baseUrl + `/${id}`, conf)
  return req.data
}

const getAllUsers = async () => {
  const conf = {
    headers: { Authorization: token },
  }

  const req = await axios.get(usersUrl)
  console.log(req.data)
  return req.data
}

export default {
  getAll,
  getUserBlogs,
  getBlogById,
  setToken,
  createNewBlog,
  addLike,
  deleteBlog,
  getAllUsers,
}
