import "./TimerControls.scss";

function TimerControls({isTimerActive, resetTimer, toggleTimer}) {
  const toggleText = isTimerActive ? "Stop" : "Start";

  return (
    <div id="timer-controls">
      <button id="start_stop" onClick={toggleTimer}>{toggleText}</button>
      <button id="reset" onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default TimerControls;