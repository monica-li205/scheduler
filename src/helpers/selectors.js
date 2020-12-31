// returns an array of the appointments for the selected day
export function getAppointmentsForDay(state, day) {
  let apptsForTheDay = [];

  if (!state.days.length) {
    return [];
  } else {
    for (let dayName of state.days) {
      if (dayName.name === day) {
        const currentday = state.days.filter(item => item.name === day);
        const currentDayAppts = currentday[0].appointments;
        for (let appt of currentDayAppts) {
          apptsForTheDay.push(state.appointments[appt]);
        }
      }
    }
  }
  return apptsForTheDay;
};

// returns an array of the interviewers for the selected day
export function getInterviewersForDay(state, day) {
  let interviewersForTheDay = [];

  if (!state.days.length) {
    return [];
  } else {
    for (let dayName of state.days) {
      if (dayName.name === day) {
        const currentday = state.days.filter(item => item.name === day);
        const currentDayInterviewers = currentday[0].interviewers;
        for (let interviewer of currentDayInterviewers) {
          interviewersForTheDay.push(state.interviewers[interviewer]);
        }
      }
    }
  }
  return interviewersForTheDay;
};

// returns an object containing the student name and the selected interviewer object for an interview
export function getInterview(state, interview) {
  let newObj = {};

  if (!interview) {
    return null;
  } else {
    for (let interviewer in state.interviewers) {
      if (interview.interviewer === state.interviewers[interviewer].id) {
        newObj.student = interview.student
        newObj.interviewer = state.interviewers[interviewer]
        return newObj;
      };
    };
  };
};

// returns the number of empty spots for a day
export function getSpotsForDay (state, dayName) {
  const activeDay = state.days.find((day) => { return day.name === dayName })
  .appointments.filter((appointment) => { return state.appointments[appointment].interview === null}).length;
  
  return activeDay;
};