const Notification = ({ text }) => {
   if (!text) {
      return null
   }

   return (
      <div
         style={{
            borderStyle: 'solid',
            padding: '10px',
            backgroundColor: 'lightgreen',
            borderColor: 'darkgreen',
            borderRadius: '10px',
         }}
      >
         <p>{text}</p>
      </div>
   )
}

export default Notification
