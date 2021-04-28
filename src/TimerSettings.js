import React from "react";
import "./TimerSettings.scss";


function TimerSettings({breakLength, setBreakLength, sessionLength, setSessionLength}) {
  const min = 1;
  const max = 60;

  const incrementBreakLength = () => {
    if(breakLength < max){
      setBreakLength(breakLength + 1);
    }
  };
  
  const decrementBreakLength = () => {
    if(breakLength > min){
      setBreakLength(breakLength - 1);
    }
  };
  
  const incrementSessionLength = () => {
    if(sessionLength < max){
      setSessionLength(sessionLength + 1);
    }
  };
  
  const decrementSessionLength = () => {
    if(sessionLength > min){
      setSessionLength(sessionLength - 1);
    }
  };


  const upArrow = <i className="fa fa-arrow-up" aria-hidden="true"></i>;
  const downArrow = <i className="fa fa-arrow-down" aria-hidden="true"></i>;

  return (
    <div id="timer-settings">
      <div className="length-setting">
        <div className="labels">
          <h2 id="break-label">Break Length</h2>
          <p className="length" id="break-length">{breakLength}</p>
        </div>
        <div className="button-container">
          <button id="break-increment" onClick={incrementBreakLength}>{upArrow}</button>
          <button id="break-decrement" onClick={decrementBreakLength}>{downArrow}</button>
        </div>
      </div>
      <div className="length-setting">
        <div className="labels">
          <h2 id="session-label">Session Length</h2>
          <p className="length" id="session-length">{sessionLength}</p>
        </div>
        <div className="button-container">
          <button id="session-increment" onClick={incrementSessionLength}>{upArrow}</button>
          <button id="session-decrement" onClick={decrementSessionLength}>{downArrow}</button>
        </div>
      </div>
    </div>
  );
}

export default TimerSettings