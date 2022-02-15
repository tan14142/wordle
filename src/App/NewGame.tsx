import { Modal, ModalProps, Button } from 'react-bootstrap';

interface NewGameProps extends ModalProps {
  handleClickConfirm: () => void
  handleClickClose: () => void
}

export default function NewGame({
  handleClickClose,
  handleClickConfirm,
  ...props
}: NewGameProps) {
  return (
    <Modal
     {...props}
     id="newgame"
     centered>
      <Modal.Body>
        <p>Do you want to start a new game?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
         onClick={handleClickClose}
         variant="secondary">
           Close
        </Button>
        <Button
         onClick={handleClickConfirm}
         variant="warning">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}