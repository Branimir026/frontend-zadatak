import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Comment = ({ comment }) => {
  const [commentTime, setCommentTime] = useState("");

  useEffect(() => {
    convertTimestampToTime(comment.timestamp);
  }, [comment.timestamp]);

  const convertTimestampToTime = (timestamp) => {
    const dateObj = new Date(timestamp);
    const utcString = dateObj.toUTCString();
    const time = utcString.slice(-12, -7);
    setCommentTime(time);
  };

  return (
    <Row className="comment">
      <Col md="1">
        <img src={comment.author.picture} alt="Commentator" />
      </Col>
      <Col md="11">
        <Row className="nameAndText">
          <p className="authorName">
            <strong>{comment.author.name}</strong>
          </p>
          <p className="commentText">{comment.text}</p>
        </Row>
        <Row>
          <Col md="1">
            <p>{commentTime}</p>
          </Col>
          <Col md="1" className="reply">
            <p>Reply</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Comment;
