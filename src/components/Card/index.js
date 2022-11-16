import { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import "./index.css";
import {useSelector,useDispatch} from 'react-redux';
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
  const [answers,setAnswers] = useState([]);
  const {isLogin,token} = useSelector((state)=>state);
  const [repoCount,setRepoCount]= useState(repo);
  // const [upVotesCount,setUpVotesCount] = useState(upVotes);
  // const [downVotesCount,setDownVotesCount] = useState(downVotes);
  const apiURL='http://localhost:5000/public/api/v1/';
  const privateApiURL='http://localhost:5000/api/v1/';
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const downVote = async() =>{
    axios.post(`${privateApiURL}downVote`,{questionId},config).then((res)=>{
        if(res.status === 200){
          // increment down value and decrease up value   

          // setUpVotesCount(res.data.upVote);
          // setDownVotesCount(res.data.downVote);
          console.log(res.data);
          setRepoCount(res.data.repo);
        }
      });
    }
    const upVote = async () =>{
      axios.post(`${privateApiURL}upVote`,{questionId},config).then((res)=>{
        if(res.status === 200){
          // increment up value.      
          // setUpVotesCount(res.data.upVote);
          // setDownVotesCount(res.data.downVote);
          console.log(res.data);

          setRepoCount(res.data.repo);

            }
        });
  }
  const parsedTitle=title.split(' ').join('-');
  // useEffect to get 2 recent or most upvotes answer.
 useEffect(() => {
  axios.get(`${apiURL}answers/${questionId}`).then((res)=>{
    setAnswers(res.data);
    });
    }, []);
  return (
    <div className="card mt-3" ref={innerRef} style={{ width: "100%" }}>
      <Link to={`/profile/${authorUsername}`} target="_blank">
      <div className="row">
        {authorImage && (
          <img
            src={authorImage}
            alt=""
            className="autherImg col-6 m-3 me-0 mt-0"
          />
        )}
        <p className="authorName col-2">{authorName}</p>
       
      </div>
      </Link>
      <hr />
      <div className="card-body">
        <Link to={`/${parsedTitle}`} target="_blank">
        <h5 className="card-title">{title}</h5>
        </Link>
        <p className="card-text">{summery}</p>
      </div>
      {image && (
        <img src={image} className="card-img-top card-img" alt="image" />
      )}
      <ul className="card-points row ms-auto me-auto">
        <li className="col">{tags}</li>
        <li
          className="col"
          onClick={() => {
            setShowAnswerQuestion((prev) => !prev);
          }}
        >
          Give A Solution
        </li>
        {showAnswerQuestion && <AnswerQuestion title={title} questionId={questionId} />}
        <li className="col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-up-circle-fill m-2 upVotes"
            viewBox="0 0 16 16"
            onClick={upVote}
          >
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
          </svg>
        </li>
          <li className="col">{repoCount}</li>
        <li className="col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-down-circle-fill m-2 downVotes"
            viewBox="0 0 16 16"
            onClick={downVote}
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
          </svg>
        </li>
      </ul>

          {answers.map((ans)=>{
                return (
                    <div className="answers" key={ans.answerId}>
                        <img src={ans.userImg} className="ans-profile" alt=""/>
                        <span>{ans.username}</span>
                        <p>
                        {ans.answerBody}
                        </p>
                    </div>
                );
          })}
      
    
    </div>
  );
};

export default Card;
