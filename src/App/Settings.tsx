import { useEffect, useRef, useState } from 'react';
import { Modal, ModalProps, Form } from "react-bootstrap";
import getItem from './getItem';

interface SettingsProps extends ModalProps {
  fade: () => void
  setNumTiles: (n: number) => void
  showMessage: (s: string) => void
}

export default function Settings({fade, setNumTiles, showMessage, ...props}: SettingsProps) {
  const [dark, setDark] = useState(true);
  const [blind, setBlind] = useState(false);
  const triggers = useRef(0);
  const pos = getItem("pos", {
    row: 0,
    col: 0
  });

  useEffect(() => {
    if (triggers.current > 1) {
      if (dark) {
        document.body.className = document.body.className.replace("light", "");
      }
      else {
        document.body.className += " light";
      }
      localStorage.setItem('dark', "" + dark);
      fade();
    }
    triggers.current += 1;
  }, [dark, fade]);

  useEffect(() => {
    if (triggers.current > 1) {
      if (blind) {
        document.body.className += " contrast";
      }
      else {
        document.body.className = document.body.className.replace("contrast", "");
      }
      localStorage.setItem('blind', "" + blind);
      fade();
    }
    triggers.current += 1;
  }, [blind, fade]);

  return (
    <Modal
     {...props}
     id="settings"
     aria-labelledby="contained-modal-title-vcenter"
     centered>
      <Modal.Header
       closeButton
       closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">
          SETTINGS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <span className="h5">Hard Mode</span>
          <p>Any revealed hints must be used in subsequent guesses</p>
        </div>
        <Form>
          <Form.Check
           onClick={e => {
            const target = e.target as HTMLInputElement;

            if (target.checked && pos.row > 0) {
              e.preventDefault();
              showMessage("Hard mode can only be enabled\nat the start of a round");
            }
            else {
              localStorage.setItem("hard", "" + target.checked);
            }
           }}
           defaultChecked={getItem("hard", false)}
           type="switch" />
        </Form>
      </Modal.Body>
      <div className="modal-body">
        <div>
          <span className="h5">6 letters</span>
          <p>Most common words from Collins Scrabble Words 2019</p>
        </div>
        <Form>
          <Form.Check 
           onClick={e => {
            const target = e.target as HTMLInputElement;

            if (pos.row > 0) {
              e.preventDefault();
              showMessage("Modes can only be switched\nat the start of a round");
            }
            else {
              localStorage.setItem("six", "" + target.checked);
              setNumTiles(target.checked ? 6 : 5);
            }
           }}
           defaultChecked={getItem("six", false)}
           type="switch" />
        </Form>
      </div>
      <div className="modal-body">
        <div>
          <span className="h5">Dark Theme</span>
        </div>
        <Form>
          <Form.Check 
           onChange={e => setDark(e.target.checked)}
           defaultChecked={dark}
           type="switch" />
        </Form>
      </div>
      <div className="modal-body">
        <div>
          <span className="h5">Color Blind Mode</span>
          <p>High contrast colors</p>
        </div>
        <Form>
          <Form.Check 
           onChange={e => setBlind(e.target.checked)}
           defaultChecked={blind}
           type="switch" />
        </Form>
      </div>
    </Modal>
  );
}