import { useState } from "react";
import {Link} from 'react-router-dom';
import "./index.css";
import AnswerQuestion from "../AnswerQuestion";
const Card = ({
  id,
  title,
  summery,
  image,
  authorName,
  authorImage,
  tags,
  upVotes,
  downVotes,
  authorUsername,
}) => {
  const [showAnswerQuestion, setShowAnswerQuestion] = useState(false);
  const downVote = () =>{
    console.log('down'+id);
}
const upVote = () =>{
    console.log('up'+id);
  }
  const parsedTitle=title.split(' ').join('-');
  // useEffect to get 2 recent or most upvotes answer.
  const answers = [
    {
        id:1,
        username:'raja babu',
        userImg:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=20&h=30&dpr=2',
        answer:'hii this is my first answer',
    },
    {
        id:2,
        username:'ram',
        userImg:'',
        answer:'hii this is my second answer',
    },
  ]

  return (
    <div className="card mt-3" style={{ width: "100%" }}>
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
        {showAnswerQuestion && <AnswerQuestion title={title} id={id} />}
        <li className="col">
          {upVotes}
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
        <li className="col">
          {downVotes}
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
                    <div className="answers" key={ans.id}>
                        <img src={ans.userImg} className="ans-profile" alt=""/>
                        <span>{ans.username}</span>
                        <p>
                        {ans.answer}
                        </p>
                    </div>
                );
          })}
      
    
    </div>
  );
};

export default Card;
