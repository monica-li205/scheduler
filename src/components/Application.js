import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import "components/Appointment/styles.scss";
import "components/Appointment"
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index";
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Leslie Knope",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "April Ludgate",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];



export default function Application(props) {
  const [days, setDays] = useState([]);

  useEffect(()=> {
    const url = "/api/days";
    axios.get(url)
      .then(response => {
        console.log(response);
        setDays([...response.data]);
      });
  }, [])
  
  const newAppts = appointments.map(appointment => 
      <Appointment key={appointment.id} {...appointment} />
    );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={days}
          day={days.name}
          setDay={setDays}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {newAppts}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
