import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
   const { reset: resetContent, ...content } = useField('text')
   const { reset: resetAuthor, ...author } = useField('text')
   const { reset: resetInfo, ...info } = useField('text')
   const navigate = useNavigate()

   const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
         content: content.value,
         author: author.value,
         info: info.value,
         votes: 0,
      })
      props.setNotification(`a new anecdote: ${content.value}, was created`)
      setTimeout(() => {
         props.setNotification(null)
      }, 5000)
      navigate('/')
   }

   const handleReset = (event) => {
      event.preventDefault()
      resetContent()
      resetAuthor()
      resetInfo()
   }

   return (
      <div>
         <h2>create a new anecdote</h2>
         <form onSubmit={handleSubmit} onReset={handleReset}>
            <div>
               content
               <input {...content} />
            </div>
            <div>
               author
               <input {...author} />
            </div>
            <div>
               url for more info
               <input {...info} />
            </div>
            <button>create</button>
            <button type="reset">reset</button>
         </form>
      </div>
   )
}

export default CreateNew
