import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import {
  User,
  Activity,
  HeartPulse,
  MessageSquare,
  LogOut,
  UserPen,
  Apple,
  Moon,
  Ruler,
  Bike
} from 'lucide-react';

function Sidebar({ onLogout, userRole }) {
  return (
    <div className="sidebar">
      <div className="brand">
        <HeartPulse size={28} />
        <h2>MediCare</h2>
      </div>

      <nav className="nav-links">
         <NavLink to="/datiUtente">
          <User size={20} /> Dati utente
        </NavLink>
        <NavLink to="/SpO2BPM">
          <Activity size={20} /> SpO2 & BPM
        </NavLink>
        <NavLink to="/messages">
          <MessageSquare size={20} /> Notifiche
        </NavLink>
        <NavLink to="/alimentazione">
          <Apple size={20} /> Alimentazione
        </NavLink>
        <NavLink to="/sleep">
          <Moon size={20} /> Sonno
        </NavLink>
         <NavLink to="/activityChart">
          <Bike size={20} /> Attività
        </NavLink>
        <NavLink to="/profile">
          <UserPen size={20} /> Profilo
        </NavLink>
      </nav>

      <div className="logout">
        <button onClick={onLogout} className="logout-button">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;