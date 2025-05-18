import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Smart Hub</h2>
      <nav>
        <NavLink to="/flashcards" activeClassName="active">
          🧠 <span>Flashcards</span>
        </NavLink>
        <NavLink to="/pomodoro" activeClassName="active">
          ⏱️ <span>Pomodoro</span>
        </NavLink>
        <NavLink to="/notes" activeClassName="active">
          📄 <span>Notes</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
