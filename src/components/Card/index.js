import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import AnswerQuestion from "../AnswerQuestion";
const Card = ({
  questionId,
  title,
  summery,
  image,
  authorName,
  authorImage,
  tags,
  repo,
  authorUsername,
  innerRef,
}) => {
  const [showAnswerQuestion, setShowAnswerQuestion] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { isLogin, token } = useSelector((state) => state);
  const [repoCount, setRepoCount] = useState(repo);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  // const [upVotesCount,setUpVotesCount] = useState(upVotes);
  // const [downVotesCount,setDownVotesCount] = useState(downVotes);
  const apiURL = "http://localhost:5000/public/api/v1/";
  const privateApiURL = "http://localhost:5000/api/v1/";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const updateRepo = async (voteType) => {
    axios.post(`${privateApiURL}${voteType}`, { questionId }, config).then((res) => {
      if (res.status === 200) {
        // increment up value.
        setRepoCount(res.data.repo);
      }
    });
  };

  const updateAnswers = async (questionId) => {
    console.log('called');
    axios.get(`${apiURL}answers/${questionId}`).then((res) => {
      console.log(res.data);
      setAnswers(res.data);
    });
  };
  
  const parsedTitle = title.split(" ").join("-");
  // useEffect to get 2 recent or most upvotes answer.
  useEffect(() => {
    axios.get(`${apiURL}answers/${questionId}`).then((res) => {
      setAnswers(res.data);
    });
  }, []);
  return (
    <div className="card mt-3" ref={innerRef} style={{ width: "100%" }}>
      <Link to={`/profile/${authorUsername}`} class="link" target="_blank">
        <div className="flex-container">
          {authorImage && (
            <img
              src={authorImage}
              alt="profile picture"
              className="autherImg m-2"
            />
          )}
          <div className="authorName">{authorName}</div>
        </div>
      </Link>
      <hr />
      <div className="card-body">
        <Link to={`/${parsedTitle}`} target="_blank">
          <h5 className="card-title">{title}</h5>
        </Link>
        <p className="card-text">
        <div dangerouslySetInnerHTML={{__html: summery}} /></p>
      </div>
      {image && (
        <img src={image} className="card-img-top card-img" />
      )}
      <div className="card-points">
      <ul className="card-points-i">
        <li className="col">{tags}</li>
        <li
          className="col"
          onClick={() => {
            setShowAnswerQuestion((prev) => !prev);
          }}
        >    
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="currentColor" class="answer-icon bi bi-pencil-square" viewBox="0 0 22 20">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
        </li>
      </ul>
      <ul className="card-points-ii">
        {showAnswerQuestion && (
          <AnswerQuestion title={title} questionId={questionId} updateAnswers={updateAnswers}/>
        )}
        <li className="col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-up-circle-fill m-2 upVotes"
            viewBox="0 0 16 16"
            onClick={()=>updateRepo('upVote')}
          >
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
          </svg>
        </li>
        <li className="col repo-count">{repoCount}</li>
        <li className="col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-down-circle-fill m-2 downVotes"
            viewBox="0 0 16 16"
            onClick={()=>updateRepo('downVote')}
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
          </svg>
        </li>
      </ul>
</div>
      {answers.map((ans,index) => {
        if(index <= 2 || showAllAnswers){
        return (
          <div className="answers" key={ans.answerId}>
            <Link to={`/profile/${ans.username}`} class="link" target="_blank">
            <img src={ans.userImg} className="ans-profile" alt="" />
            <span>{ans.username}</span>
            </Link>
            <p>{ans.answerBody}</p>
          </div>
        );
        }
        else if (index === 3) {
            return (
              <p className="show-more" onClick={()=>setShowAllAnswers((prev)=>!prev)}> Show All..... </p>);
            }
      })}
    </div>
  );
};

export default Card;
