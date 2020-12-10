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