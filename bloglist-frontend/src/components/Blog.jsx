import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td className={'blogTitle'}>
              <Link to={`/blogs/${blog.id}`}>{`${blog.title}`}</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Blog
