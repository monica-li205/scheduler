import React from "react";
import "styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList (props) {


  const newItems = props.interviewers.map(interviewer => 
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id===props.interviewer}
    setInterviewer={event => props.setInterviewer(interviewer.id)}
    />
    );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{newItems}</ul>
    </section>
  )
}