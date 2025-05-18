import React, { useState, useEffect, useRef } from 'react';
import '../styles/Pomodoro.css';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [duration, setDuration] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [mode, setMode] = useState('Work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setSessionsCompleted((count) => count + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const setPreset = (label, minutes) => {
    const sec = minutes * 60;
    setMode(label);
    setTimeLeft(sec);
    setDuration(sec);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(duration);
    setIsRunning(false);
  };
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
  
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
  
    window.addEventListener('mousemove', moveCursor);
  
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const startCustomTimer = () => {
    const sec = customMinutes * 60;
    setTimeLeft(sec);
    setDuration(sec);
    setMode('Custom');
    setIsRunning(true);
  };

  const progress = (1 - timeLeft / duration) * 100;

  return (
    <div className="pomodoro-bg">
      <div className="pomodoro-card">
        <h1 className="pomodoro-title">Pomodoro Focus</h1>
        <p className="pomodoro-sub">Stay productive with focused sessions</p>

        {/* Circular Timer */}
        <div className="circle-timer">
          <svg className="progress-ring" width="160" height="160">
            <circle
              className="progress-ring__circle"
              stroke=" #2c003e"
              strokeWidth="10"
              strokeOpacity={"50%"}
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
              style={{
                strokeDasharray: 440,
                strokeDashoffset: 440 - (progress / 100) * 440,
                transition: 'stroke-dashoffset 0.5s ease',
              }}
            />
          </svg>
          <div className="timer-center-text">{formatTime(timeLeft)}</div>
        </div>

        {/* Controls */}
        <div className="control-buttons">
          <button onClick={() => setIsRunning(true)}>Start</button>
          <button onClick={() => setIsRunning(false)}>Pause</button>
          <button onClick={resetTimer}>Reset</button>
        </div>

        {/* Presets */}
        <div className="preset-buttons">
          <button onClick={() => setPreset('Work', 25)}>Work</button>
          <button onClick={() => setPreset('Short Break', 5)}>Short</button>
          <button onClick={() => setPreset('Long Break', 15)}>Long</button>
        </div>

        {/* Custom Duration */}
        <div className="custom-input">
          <input
            type="number"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(Number(e.target.value))}
            min="1"
          />
          <button onClick={startCustomTimer}>Custom</button>
        </div>

        {/* Session Count */}
        <div className="session-count">
          ✅ Completed Sessions: <strong>{sessionsCompleted}</strong>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
