import { useEffect, useState } from "react";
import Comment from "./Comment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      <Row className="inputForm">
        <Col md="1">
          <p className="plusSign">+</p>
        </Col>
        <Col md="8">
          <Form.Control type="text" placeholder="Enter your message..." />
        </Col>
        <Col md="3">
          <Button>Send message</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Comments;
