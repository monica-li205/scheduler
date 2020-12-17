// returns an array of the appointments for the selected day
export function getAppointmentsForDay(state, day) {
  let apptsForTheDay = [];
  let index = 0;

  if (!state.days.length) {
    return [];
  } else {
    while (index < state.days.length) {
      if (state.days[index].name === day) {
        const currentday = state.days.filter(item => item.name === day);
        const currentDayAppts = currentday[0].appointments;
        for (let appt of currentDayAppts) {
          apptsForTheDay.push(state.appointments[appt]);
        }
      }
      index++;
    }
  }
  return apptsForTheDay;
};

// returns an array of the interviewers for the selected day
export function getInterviewersForDay(state, day) {
  let interviewersForTheDay = [];
  let index = 0;

  if (!state.days.length) {
    return [];
  } else {
    while (index < state.days.length) {
      if (state.days[index].name === day) {
        const currentday = state.days.filter(item => item.name === day);
        const currentDayInterviewers = currentday[0].interviewers;
        for (let interviewer of currentDayInterviewers) {
          interviewersForTheDay.push(state.interviewers[interviewer]);
        };
      };
      index++;
    };
  };
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