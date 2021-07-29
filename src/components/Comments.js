import { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Container from "react-bootstrap/Container";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComments, setNewComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/data`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data.");
        }
        return res.json();
      })
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let formattedComments = [];
    comments.forEach((comment) => {
      if (!comment.hasOwnProperty("parent_id")) {
        comment.children = [];
        formattedComments.push(comment);
      } else {
        formattedComments
          .find((comm) => comm.id === comment.parent_id)
          .children.push(comment);
      }
    });
    console.log(formattedComments);
    setNewComments(formattedComments);
  }, [comments]);

  return (
    <Container className="comments">
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {newComments &&
        newComments.map((comment) => {
          return <Comment comment={comment} key={comment.timestamp} />;
        })}
      <CommentInput />
    </Container>
  );
};

export default Comments;
