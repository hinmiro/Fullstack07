import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
   const id = useParams().id
   const anecdote = anecdotes.find((a) => a.id === Number(id))

   return (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
         <li>
            <h2>{anecdote.content}</h2>
         </li>
         <li>has {anecdote.votes} votes</li>
         <li>
            for more info see <a href={anecdote.info}>{anecdote.info}</a>
         </li>
      </ul>
   )
}

export default Anecdote
