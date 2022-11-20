import { Link } from "react-router-dom";
import { useState } from "react";
import "./suggestions.css";

const Suggestions = ({ titleData }) => {
  const questionTitle = titleData.title.split(" ").join("-");
  return (
    <>
            <a href={questionTitle} target="_blank" className="suggestion-title">
        <div className="suggestion-box">
          <h6>{titleData.title}</h6>
           <p className="suggestion-description">{titleData.summery.slice(0,40)}.....</p>
        </div>
            </a>
    </>
  );
};

export default Suggestions;
