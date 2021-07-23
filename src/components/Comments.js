import { useEffect, useState } from "react";
import Comment from "./Comment";
import Container from "react-bootstrap/Container";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Container className="comments">
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {comments &&
        comments.map((comment) => {
          return <Comment comment={comment} key={comment.timestamp} />;
        })}
    </Container>
  );
};

export default Comments;
