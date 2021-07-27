import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Comment = ({ comment }) => {
  const [commentTime, setCommentTime] = useState("");
  const [newCommentText, setNewCommentText] = useState(``);

  useEffect(() => {
    convertTimestampToTime(comment.timestamp);
  }, [comment.timestamp]);

  useEffect(() => {
    const regex =
      /((http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?.*/;
    const found = comment.text.match(regex);
    if (found) {
      setNewCommentText(
        comment.text.replace(found[0], `<a href=${found[0]}> ${found[0]} </a>`)
      );
    } else {
      setNewCommentText(comment.text);
    }
  }, [comment.text, newCommentText]);

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
    setCommentTime(formattedTime);
  };

  return (
    <Row className="comment">
      <Col md="1" className="profileImageContainer">
        <img
          src={comment.author.picture}
          alt="Commentator"
          className="profileImage"
        />
      </Col>
      <Col md="11">
        <Row className="nameAndText">
          <p className="authorName">{comment.author.name}</p>
          <p
            className="commentText"
            dangerouslySetInnerHTML={{ __html: newCommentText }}
          ></p>
        </Row>
        <Row className="timeAndReply">
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
