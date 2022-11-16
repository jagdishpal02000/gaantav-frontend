import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';


const AnswerQuestion = ({ title, questionId,updateAnswers }) => {
  const {isLogin,token} = useSelector((state)=>state);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [answerData, setAnswerData] = useState({
    answerBody: "",
  });

  const apiURL= 'http://localhost:5000/api/v1/';
  const handleSubmit = async () => {
    // Make API Call to send the data.
    if (answerData.answerBody) {
      console.log(answerData);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const formData = {
        questionId,
        answerBody:answerData.answerBody,
      };
       try {
        await axios.post(apiURL+'answer',formData,config);
        setShow(false);
        updateAnswers(questionId); 
      } catch (error) {
        console.warn(error);
      }

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
              value={answerData.answerBody}
              onInput={(e) => {
                setAnswerData((prev) => {
                  return { ...prev, answerBody: e.target.value };
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
