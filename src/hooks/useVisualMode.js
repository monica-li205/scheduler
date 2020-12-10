import { useState } from "react";

export default function useVisualMode (initial) {  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = function (nextMode, replace = false) {
    const historyStack = [...history];

    if (replace) {
      historyStack.pop();
      setHistory(historyStack);
    }
    historyStack.push(nextMode);
    setMode(nextMode);
    setHistory(historyStack);
  };
  
  const back = function() {
    const historyStack = [...history];

    if (history.length >= 1) {
      historyStack.pop();
      let currentMode = historyStack[historyStack.length - 1];
      setMode(currentMode)
      setHistory(historyStack);
    } else {
      return;
    }
  }  
  return { mode, transition, back };



  // const [modes, setModes] = useState([initial]);

  // const transition = function (mode, replace) {
  //   const newModes = [...modes];

  //   if (replace) {
  //     newModes.pop();
  //   }

  //   newModes.push(mode);
  //   setModes(newModes);
  // };

  // const back = function () {
  //   if (modes.length < 2) {
  //     return;
  //   }
  // }

  // const newModes = [...modes];
  // newModes.pop();
  // setModes(newModes);

  // const mode = modes[modes.length - 1];
  // return { mode, transition, back };


  
}