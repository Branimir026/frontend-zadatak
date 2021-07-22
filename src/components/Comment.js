const Comment = ({ comment }) => {
  return (
    <div>
      <img src={comment.author.picture} alt="Commentator" />
      <h3>{comment.author.name}</h3>
      <p>{comment.text}</p>
      <p>{comment.timestamp}</p>
    </div>
  );
};

export default Comment;
