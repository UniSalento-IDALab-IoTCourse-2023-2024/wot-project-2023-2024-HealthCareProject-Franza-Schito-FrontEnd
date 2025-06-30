import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import UserProfile from './components/UserProfile';
import HealthStats from './components/HealthStats';
import HealthConditions from './components/HealthConditions';
import Login2 from './components/Login2';
import Home from './components/Home';
import Registration from './components/Registration';
import Profile from './components/ProfileInventoryTable';
import UpdateProfileForm from './components/UpdateProfileForm';
import Notification from './components/Notification';
import SendMessage from './components/SendMessage';
import PesoAltezza from './components/PesoAltezza'; 
import HeartRate from './components/HeartRate';
import Food from './components/Food';
import Threshold from './components/Threshold';
import SleepChart from './components/SleepChart';
import SleepPhase from './components/SleepPhase';
import CalendarPage from './components/CalendarPage';
import ActivityChart from './components/ActivityChart';
import LinkedUser from './components/LinkedUser';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Dashboard accessibile SOLO se loggato
  const SpO2BPM = () => (
    <>
      <div className="top-section">
        <HealthConditions />
      </div>
      <div className="bottom-section">
        <HeartRate />
      </div>
    </>
  );

  const DatiUtente = () => (
    <>
      <div className="top-section">
        <UserProfile user={user} />
        <HealthStats />
        <Threshold />
        <PesoAltezza />
      </div>
      <div className="bottom-section">
        <CalendarPage />
      </div>
    </>
  );

  const Sleep = () => (
    <>
      <div className="top-section">
        <SleepChart />
      </div>
      <div className="bottom-section">
        <SleepPhase />
      </div>
    </>
  );

  return (
  <Router>
    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<Login2 onLogin={setUser} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/linkedUser" element={<LinkedUser/>} />
          <Route path="*" element={<Navigate to="/home" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={
            <div className="app">
              <Sidebar onLogout={() => setUser(null)} />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Navigate to="/datiUtente" />} />
                  <Route path="/SpO2BPM" element={<SpO2BPM />} />
                  <Route path="/datiUtente" element={<DatiUtente />} />
                  <Route path="/conditions" element={<HealthConditions />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/messages" element={<Notification />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/updateProfileForm" element={<UpdateProfileForm />} />
                  <Route path="/sendMessage" element={<SendMessage />} />
                  <Route path="/peso-altezza" element={<PesoAltezza />} />
                  <Route path="/heart-rate" element={<HeartRate />} />
                  <Route path="/alimentazione" element={<Food />} />
                  <Route path="/threshold" element={<Threshold />} />
                  <Route path="/sleep" element={<Sleep />} />
                  <Route path="/sleepChart" element={<SleepChart />} />
                  <Route path="/sleepPhase" element={<SleepPhase />} />
                  <Route path="/activityChart" element={<ActivityChart />} />
                </Routes>
              </main>
            </div>
          } />
        </>
      )}
    </Routes>
  </Router>
  );
}

export default App;
