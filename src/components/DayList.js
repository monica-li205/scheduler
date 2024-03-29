import React from "react";
import DayListItem from "components/DayListItem.js"

export default function DayList(props) {
  const newItems = props.days.map(day => 
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
  );

  return (
    <ul>
      {newItems}
    </ul>
  )
}
