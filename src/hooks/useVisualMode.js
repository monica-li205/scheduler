import { useState } from "react";

export default function useVisualMode (initial) {  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transitions from one component to another 
  const transition = function (nextMode, replace = false) {
    const historyStack = [...history];
    // skips a component when transitioning i.e. error component
    if (replace) {
      historyStack.pop();
      setHistory(historyStack);
    };
    historyStack.push(nextMode);
    setMode(nextMode);
    setHistory(historyStack);
  };
  
  // switches back to the previous component
  const back = function() {
    const historyStack = [...history];

    if (history.length >= 1) {
      historyStack.pop();
      let currentMode = historyStack[historyStack.length - 1];
      setMode(currentMode);
      setHistory(historyStack);
    } else {
      return;
    };
  }; 
  return { mode, transition, back };
};