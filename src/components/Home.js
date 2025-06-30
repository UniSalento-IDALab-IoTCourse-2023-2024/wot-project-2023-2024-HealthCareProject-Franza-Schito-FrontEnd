import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="home-container"
      style={{ backgroundImage: `url(/images/background-doctor.jpg)` }}
    >
      <div className="home-right">
        <h2>Benvenuto!</h2>
        <p>
          MediCare è un'applicazione web che ti permette di gestire e visualizzare
          le dashboard del tuo paziente, come medico o caregiver.
        </p>
        <p>
          Puoi registrarti per creare un account e iniziare a utilizzare
          l'applicazione, oppure accedere se hai già un account.
        </p>
        <div className="home-buttons">
          <button onClick={() => navigate('/login')} className="btn login">Accedi</button>
          <button onClick={() => navigate('/registration')} className="btn register">Registrati</button>
        </div>
      </div>
    </div>
  );
};

export default Home;