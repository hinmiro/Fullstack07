const LikeButton = ({ handleLikes }) => {
  return (
    <button
      style={{
        height: '2rem',
        marginInlineStart: '1rem',
        marginTop: '5px',
      }}
      className="likeButton"
      onClick={handleLikes}
    >
      like
    </button>
  )
}

export default LikeButton
