import React from "react";
import './App.scss';
import TimerSettings from "./TimerSettings";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      breakLength: 5,
      isTimerActive: false,
      mode: "session",
      sessionLength: 25,
      timeRemaining: {minutes: 25, seconds: 0}
    };

    this.decrementTimer = this.decrementTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  changeMode(){
    this.setState(prevState => {
      const {breakLength, sessionLength, mode} = prevState;

      const newMode = mode === "session" 
        ? "break" 
        : "session";
      const newLength = newMode === "session" 
        ? sessionLength 
        : breakLength;


      return {
        mode: newMode,
        timeRemaining: { minutes: newLength, seconds: 0}
      };
    });
  }

  componentDidUpdate(){
    const {minutes} = this.state.timeRemaining;

    if( minutes === -1 ){
      const sound = document.getElementById("beep");
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      this.changeMode();
    }
  }

  componentWillUnmount(){
    this.stopTimer();
  }

  decrementTimer(){
    this.setState(prevState => {
      const {minutes, seconds} = prevState.timeRemaining;
      let newMinutes;
      let newSeconds;

      if (seconds !== 0){
        newMinutes = minutes;
        newSeconds = seconds - 1;
      }
      else {
        newMinutes = minutes - 1;
        newSeconds = 59;
      }

      return {timeRemaining: {minutes: newMinutes, seconds: newSeconds}};
    });
  }

  resetTimer() {
    if (this.state.isTimerActive){
      this.stopTimer();
    }

    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;

    this.setState({
        breakLength: 5,
        isTimerActive: false,
        mode: "session",
        sessionLength: 25,
        timeRemaining: {minutes: 25, seconds: 0}
    });
  }

  setBreakLength(value){
    if(!this.state.isTimerActive){
      this.setState(prevState => {
        if(prevState.mode === "break"){
          return {
            breakLength: value,
            timeRemaining: {minutes: value, seconds: 0}
          };
        } else {
          return {
            breakLength: value
          };
        }
      });
    }
  }

  setSessionLength(value){
    if(!this.state.isTimerActive){
      this.setState(prevState => {
        if(prevState.mode === "session"){
          return {
            sessionLength: value,
            timeRemaining: {minutes: value, seconds: 0}
          };
        } else {
          return {
            sessionLength: value
          };
        }
      });
    }
  }

  startTimer() {
    this.interval = setInterval(this.decrementTimer, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  toggleTimer() {
    if (this.state.isTimerActive){
      this.stopTimer();
    }
    else {
      this.startTimer();
    }

    this.setState(prevState => {
      return {isTimerActive: !prevState.isTimerActive};
    });
  }

  render() {
    const {breakLength, isTimerActive, mode, sessionLength, timeRemaining} = this.state;

    return (
      <main id="timer-container">
        <h1 id="timer-title">Timer</h1>
        <TimerSettings 
          breakLength={breakLength}
          sessionLength={sessionLength}
          setBreakLength={this.setBreakLength}
          setSessionLength={this.setSessionLength}
        />

        <TimerDisplay
          mode={mode}
          timeRemaining={timeRemaining}
        />

        <TimerControls 
          isTimerActive={isTimerActive}
          resetTimer={this.resetTimer}
          toggleTimer={this.toggleTimer}
        />

        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </main>
    );
  }
}

export default App;
