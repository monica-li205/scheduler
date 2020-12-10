// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }
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
}

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
      }
    }
  }
}