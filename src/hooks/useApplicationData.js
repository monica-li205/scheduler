import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  console.log("useAppData")

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  useEffect(()=> {  
    console.log("useeefceet")
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log("get", all)
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data }))
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
    .then((res)=> { setState(state => ({...state, appointments})) })
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
    .then((res)=> { setState(state => ({...state, appointments})) })
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
