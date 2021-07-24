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
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let stringHours = hours.toString().padStart(2, "0");
    let stringMinutes = minutes.toString().padStart(2, "0");
    let formattedTime = "";
    if (hours > 12) {
      formattedTime =
        (stringHours - 12).toString().padStart(2, "0") +
        ":" +
        stringMinutes +
        " AM";
    } else {
      formattedTime = stringHours + ":" + stringMinutes + " PM";
    }
    console.log(formattedTime);
    setCommentTime(formattedTime);
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
          <Col md="2" className="commentTime">
            <p>{commentTime}</p>
          </Col>
          <Col md="2" className="reply">
            <p>Reply</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Comment;
