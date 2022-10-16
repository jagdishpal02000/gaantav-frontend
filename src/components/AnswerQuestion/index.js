import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AnswerQuestion = ({ title, id }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [answerData, setAnswerData] = useState({
    answer: "",
  });

  const handleSubmit = () => {
    // Make API Call to send the data.
    if (answerData.answer) {
      console.log(answerData);
      setShow(false);
    } else {
      console.warn("error");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-group">
            <h3>{title}</h3>
            <textarea
              cols="30"
              name="summery"
              rows="5"
              className="form-control"
              placeholder="Describe The Answer"
              value={answerData.summery}
              onInput={(e) => {
                setAnswerData((prev) => {
                  return { ...prev, answer: e.target.value };
                });
              }}
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Answer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AnswerQuestion;
