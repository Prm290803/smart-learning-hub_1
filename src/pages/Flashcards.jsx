import React, { useState } from 'react';
import '../styles/Flashcard.css';
import { useEffect } from 'react';

const flashcards = [
  { question: "What is React?", answer: "A JS library for building UIs" },
  { question: "What is JSX?", answer: "A syntax extension for JavaScript" },
  { question: "What is useState?", answer: "A React hook for state" },
  { question: "What is a component?", answer: "A reusable UI piece" },
  { question: "What is props?", answer: "Data passed to components" },
  { question: "What is useEffect?", answer: "A React hook for side effects" },
  { question: "What is a hook?", answer: "A special function in React" },
  { question: "What is Virtual DOM?", answer: "An abstraction of the DOM" },
  { question: "What is a key prop?", answer: "Unique identifier in lists" },
  { question: "What is state?", answer: "Data that changes over time" },
];

export default function FlashcardApp() {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState([]);

  const handleFlip = () => setFlipped(!flipped);

  const markMastered = () => {
    if (!mastered.includes(current)) {
      setMastered([...mastered, current]);
    }
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
  const resetProgress = () => {
    setCurrent(0);
    setFlipped(false);
    setMastered([]);
  };

  return (
    <div className="container">
      <h1>🚀 React Flashcards</h1>
      <p>Click the card to flip and test your knowledge!</p>

      <div className="card-box">
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="front">{flashcards[current].question}</div>
          <div className="back">{flashcards[current].answer}</div>
        </div>
        <div className="click-text">Click to Flip</div>
      </div>

      <div className="controls">
        <button disabled={current === 0} onClick={() => setCurrent(current - 1)}>Previous</button>
        <button onClick={() => markMastered()}>✔️ I Know This!</button>
        <button disabled={current === flashcards.length - 1} onClick={() => setCurrent(current + 1)}>Next</button>
      </div>

      <div className="progress-bar">
        <div style={{ width: `${((current + 1) / flashcards.length) * 100}%` }} />
      </div>

      <p>Card {current + 1} of {flashcards.length}</p>
      <p>Mastered: <strong>{mastered.length}</strong> / {flashcards.length}</p>

      <button className="reset-btn" onClick={resetProgress}>Reset Progress</button>
    </div>
  );
}
