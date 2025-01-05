import Blog from './Blog.jsx'
import { useContext } from 'react'
import BlogsContext from './BlogsContext.jsx'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

const BlogForm = () => {
  const { blogs } = useContext(BlogsContext)

  return (
    <>
      <TableContainer
        component={Paper}
        variant="outlined"
        color="primary"
        style={{
          backgroundColor: 'lightskyblue',
          borderRadius: '10px',
          border: '2px solid blueviolet',
          boxShadow: '0 0 1px 2px lightblue',
        }}
      >
        <Table>
          <TableBody>
            {(Array.isArray(blogs) ? blogs : []).map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog key={blog.id} blog={blog} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BlogForm
