import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment (props) {
  return (
  <article className="appointment">
    <Header time={props.time}/>
    {props.interview ? (
        <Show
        id={props.id}
        time={props.time}
        interview={props.interview}
        interviewer={props.interview["interviewer"]["name"]}
        />
    ) : (
        <Empty/>
    )}
  </article>
  )
}
