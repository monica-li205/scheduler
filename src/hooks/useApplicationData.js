import { useState, useEffect } from "react";
import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  useEffect(()=> {  
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }))
      })
    }, [])

  const setDay = day => { 
    setState({ ...state, day })
  }
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(()=> { 
      const newState = { ...state, appointments }
      const days = state.days.map((day) => {
        if(day.name === state.day) {
          return {
            ...day,
            spots: getSpotsForDay(newState, day.name)
          }
        } else {
          return day;
        }
      })
      setState((state) => ({...state, appointments, days })) 
  })
  }
  
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(()=> { 
      const newState = { ...state, appointments }
      const days = state.days.map((day) => {
        if(day.name === state.day) {
          return {
            ...day,
            spots: getSpotsForDay(newState, day.name)
          }
        } else {
          return day;
        }
      })
      setState((state) => ({...state, appointments, days })) 
    })
  }

  const data = 
  {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

  return data;
}
