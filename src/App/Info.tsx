import { Modal, ModalProps, Row, Col } from "react-bootstrap";

export default function Info(props: ModalProps) {
  return (
    <Modal
     {...props}
     id="info"
     aria-labelledby="contained-modal-title-vcenter"
     centered>
      <Modal.Header
       closeButton
       closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">
          HOW TO PLAY
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Guess the <strong>WORDLE</strong> in 6 tries.</p>
        <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>
        <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
      </Modal.Body>
      <div className="modal-body">
        <p>
          <strong>Examples</strong>
        </p>
        <Row>
          <Col className="tile correct rotateX">W</Col>
          <Col className="tile">E</Col>
          <Col className="tile">A</Col>
          <Col className="tile">R</Col>
          <Col className="tile">Y</Col>
        </Row>
        <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
        <Row>
          <Col className="tile">P</Col>
          <Col className="tile present rotateX">I</Col>
          <Col className="tile">L</Col>
          <Col className="tile">L</Col>
          <Col className="tile">S</Col>
        </Row>
        <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
        <Row>
          <Col className="tile">V</Col>
          <Col className="tile">A</Col>
          <Col className="tile">G</Col>
          <Col className="tile absent rotateX">U</Col>
          <Col className="tile">E</Col>
        </Row>
        <p>The letter <strong>U</strong> is not in the word in any spot.</p>
      </div>
    </Modal>
  );
}