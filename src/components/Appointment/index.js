import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {
  // console.log("appt props", props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(()=> { transition(SHOW) })
    .catch(() => { transition(ERROR_SAVE, true) })
  }
  
  function deleteAppt() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => { transition(EMPTY) })
    .catch((err) => { transition(ERROR_DELETE, true) })
  }

  return (
  <article className="appointment" data-testid="appointment" >
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
      onCancel={() => back()}
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
      onCancel={() => back()}
    />}
    {mode === SAVING && <Status message='Saving...' />}
    {mode === DELETING && <Status message='Deleting...' />}
    {mode === CONFIRM && 
    <Confirm 
    message="Delete the appointment?" 
    onCancel={() => back()} 
    onConfirm={deleteAppt} 
    />}
    {mode === ERROR_DELETE && <Error message='Could not cancel appointment' onClose={() => transition(SHOW) } />}
    {mode === ERROR_SAVE && <Error message='Could not book appointment' onClose={() => back() } />}
  </article>
  )
}

