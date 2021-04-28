import "./TimerDisplay.scss";

function TimerDisplay({mode, timeRemaining}) {
  const modeDisplay = mode === "session" ? "Session" : "Break";
  const {minutes, seconds} = timeRemaining;
  const formattedMinutes = ("0" + minutes).slice(-2);
  const formattedSeconds = ("0" + seconds).slice(-2);

  return (
    <div id="timer">
      <h2 id="timer-label">{modeDisplay}</h2>
      <p id="time-left">{formattedMinutes}:{formattedSeconds}</p>
    </div>
  );
}

export default TimerDisplay;