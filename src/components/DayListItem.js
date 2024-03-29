import React from "react";
import "styles/DayListItem.scss";
import classnames from "classnames";

const formatSpots = function(num) {
  let spotsMssg; 
  if (num > 2) {
    spotsMssg = `${num} spots remaining`;
  }else if (num === 2) {
    spotsMssg = '2 spots remaining';
  } else if (num === 1) {
    spotsMssg = '1 spot remaining';
  } else if(num === 0) {
    spotsMssg = 'no spots remaining';
  }
  return spotsMssg;
};

export default function DayListItem(props) {

  const daylist = classnames('day-list__item', 
  {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : !props.spots,
  });
  
  return (
    <li className={daylist} onClick={() => props.setDay(props.name)} data-testid="daylist">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};