import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment (props) {
  // console.log("appt props", props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(()=> { transition(SHOW) });
  }
  
  function deleteAppt() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => { transition(EMPTY) })
  }

  return (
  <article className="appointment" >
    <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
    <Show
      id={props.id}
      time={props.time}
      interview={props.interview}
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer.name}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
    />
    )}
    {mode === CREATE && 
    <Form 
      id={props.id}
      interviewers={props.interviewers}
      interviewer={null}
      interview={props.interview}
      onSave={save}
      bookInterview={props.bookInterview}
      onCancel={() => back(EMPTY)}
    />}
    {mode === EDIT &&
    <Form
      id={props.id}
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer.id}
      interview={props.interview}
      name={props.interview.student}
      onSave={save}
      bookInterview={props.bookInterview}
      onCancel={() => back(SHOW)}
    />}
    {mode === SAVING && <Status message='Saving...' />}
    {mode === DELETING && <Status message='Deleting...' />}
    {mode === CONFIRM && 
    <Confirm 
    message="Delete the appointment?" 
    onCancel={() => back(SHOW)} 
    onConfirm={deleteAppt} 
    />}
  </article>
  )
}

