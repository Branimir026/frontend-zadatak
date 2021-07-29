import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <Row className="inputForm">
      <Col md="1">
        <p className="plusSign">+</p>
      </Col>
      <Col md="8">
        <Form.Control type="text" placeholder="Enter your message..." />
      </Col>
      <Col md="3">
        <Button>
          <FontAwesomeIcon icon={faPaperPlane} className="paperPlaneIcon" />
          Send message
        </Button>
      </Col>
    </Row>
  );
}

export default App;
