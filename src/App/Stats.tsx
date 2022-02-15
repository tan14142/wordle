import { Modal, ModalProps, Row } from "react-bootstrap";
import Chart from "./Chart";
import stats from './getStats';

export default function Stats(props: ModalProps) {
  return (
    <Modal
      {...props}
      id="stats"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
       closeButton
       closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">
          STATISTICS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <span className="col">{stats.played}</span>
          <span className="col">{Math.floor((stats.wins / stats.played) * 100 || 0)}</span>
          <span className="col">{stats.curStreak}</span>
          <span className="col">{stats.maxStreak}</span>
        </Row>
        <Row>
          <span className="col">Played</span>
          <span className="col">Win %</span>
          <span className="col">Current<br />Streak</span>
          <span className="col">Max<br />Streak</span>
        </Row>
      </Modal.Body>
      <div className="modal-body">
        <p className="h5">GUESS DISTRIBUTION</p>
        <Chart />
      </div>
    </Modal>
  );
}