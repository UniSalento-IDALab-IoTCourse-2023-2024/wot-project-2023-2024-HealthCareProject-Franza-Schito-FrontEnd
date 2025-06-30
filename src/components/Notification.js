import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './Notification.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const slideInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.6); }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  box-sizing: border-box;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const MainContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 1200px;
  height: 80vh; /* Altezza fissa per consentire lo scroll */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
    animation: ${shimmer} 2s infinite;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
  background: linear-gradient(45deg, #00d4ff, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  flex-shrink: 0; /* Non si riduce quando lo spazio è limitato */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 0 0 30px 0;
  flex-wrap: wrap;
  flex-shrink: 0; /* Non si riduce quando lo spazio è limitato */
`;

const Button = styled.button`
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(45deg, #0099cc, #007aa3);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 212, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const NotificationScrollContainer = styled.div`
  flex: 1; /* Prende tutto lo spazio disponibile */
  overflow-y: auto;
  padding-right: 10px;
  
  /* Stile personalizzato per la scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #00d4ff, #0099cc);
    border-radius: 10px;
    transition: background 0.3s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #0099cc, #007aa3);
  }
  
  /* Per Firefox */
  scrollbar-width: thin;
  scrollbar-color: #00d4ff rgba(255, 255, 255, 0.05);
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 20px;
`;

const NotificationCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${props => props.index * 0.1}s;
  animation-fill-mode: both;
  width: 100%;
  box-sizing: border-box;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #0099cc);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 212, 255, 0.2);
    border-color: rgba(0, 212, 255, 0.3);
    background: rgba(255, 255, 255, 0.12);
    
    &::before {
      opacity: 1;
    }
  }
`;

const MessageText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 400;
`;

const AuthorText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  
  strong {
    color: #00d4ff;
    font-weight: 600;
  }
`;

const DeleteButton = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: linear-gradient(45deg, #dc3545, #c82333);
  color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(220, 53, 69, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(45deg, #c82333, #a71e2a);
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(220, 53, 69, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  width: 100%;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.6);
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ConfirmDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 200%;
  min-width: 200px;
  max-width: 300px;
  margin: 0 auto;
`;

const ConfirmDeleteText = styled.p`
  margin-bottom: 20px;
  width: 100%;
  color: #ffffff;
  font-size: 1rem;
`;

const ConfirmDeleteButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const ConfirmButton = styled(Button)`
  padding: 0.8rem 1.2rem;
  font-size: 0.9rem;
`;

const CancelButton = styled(Button)`
  background: linear-gradient(45deg, #6c757d, #545b62);
  
  &:hover {
    background: linear-gradient(45deg, #545b62, #495057);
  }
`;

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
  
  .Toastify__toast--success {
    background: rgba(40, 167, 69, 0.2);
    border-color: rgba(40, 167, 69, 0.3);
  }
  
  .Toastify__toast--error {
    background: rgba(220, 53, 69, 0.2);
    border-color: rgba(220, 53, 69, 0.3);
  }
  
  .Toastify__progress-bar {
    background: #00d4ff;
  }
`;

const ConfirmDelete = ({ onConfirm, onCancel }) => (
  <ConfirmDeleteContainer>
    <ConfirmDeleteText>Il messaggio verrà eliminato.</ConfirmDeleteText>
    <ConfirmDeleteButtons>
      <ConfirmButton onClick={onConfirm}>Conferma</ConfirmButton>
      <CancelButton onClick={onCancel}>Annulla</CancelButton>
    </ConfirmDeleteButtons>
  </ConfirmDeleteContainer>
);

function Notification() {

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formState, setFormState] = useState({});
  const [apigClient, setApigClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(0);

  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    } else {
      console.error('apigClientFactory non è definito');
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }

  }, []);

  useEffect(() => {
    if (apigClient) {
      getFunction();
    }
  }, [apigClient]);

  const getFunction = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const destinatarioId = decodedToken.u_id;

    const params = {
      id: destinatarioId,
      Authorization: `Bearer ${token}`
    };
    const body = {};
    const additionalParams = {};

    try {
      const result = await apigClient.apiV1ParametersMessageDestinatarioIdGet(params, body, additionalParams);

      if (result.data.list && result.data.list.length >= 0) {
        let filteredList = result.data.list;

        if (userRole === "Doctor") {
          const seen = new Set();
          filteredList = result.data.list.filter(notification => {
            const key = `${notification.topic}_${notification.date}`;
            console.log("Key:", key);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        }
        console.log("Filtered notifications:", filteredList);
        setNotifications(filteredList.reverse());

        filteredList.forEach(notification => { 
          getNameFunction(notification.mittenteId);
          console.log("Notification: ", notification);
        });
      } else {
        console.log('La lista è vuota o non definita');
      }
    } catch (error) {
      console.error("Error", error);
      notifyError("Errore nel recupero delle notifiche");
    }
  };

  const getNameFunction = (mittenteId) => {
    const token = localStorage.getItem('token');

    const params = {
      id: mittenteId,
      Authorization: `Bearer ${token}`
    };

    if (!params.Authorization) {
      console.error('Authorization header mancante');
      return;
    }

    const body = {};
    const additionalParams = {};

    apigClient.apiV1UsersIdGet(params, body, additionalParams)
      .then(function (result) {
        const userInfo = {
          userId: mittenteId,
          nome: result.data.nome,
          cognome: result.data.cognome
        };
        setUsersInfo(prevUsers => [...prevUsers, userInfo]);
      }).catch(function (result) {
        console.error("Error", result);
      });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    toast(<ConfirmDelete onConfirm={() => confirmDelete(index)} onCancel={cancelDelete} />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      pauseOnHover: true,
      hideProgressBar: true,
      transition: Slide,
      style: { fontSize: '16px', padding: '0px', width: '150%', height: '100%' }
    });
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const confirmDelete = (index) => {
    const notifyId = notifications[index].id;
    deleteFunction(notifyId);
    toast.dismiss();
  };

  const cancelDelete = () => {
    toast.dismiss();
  };

  const deleteFunction = (notifyId) => {
    const token = localStorage.getItem('token');

    const params = {
      idMessage: notifyId,
      Authorization: `Bearer ${token}`
    };
    const body = {};
    const additionalParams = {};

    if (!params.Authorization) {
      console.error('Authorization header');
      return;
    }

    apigClient.apiV1ParametersMessageDeleteIdMessageDelete(params, body, additionalParams)
      .then(function (result) {
        notifySuccess("Cancellazione in corso ...");
        setTimeout(function () {
          getFunction();
        }, 1000);
      }).catch(function (result) {
        console.error("Error", result);
        notifyError("Errore nell'eliminazione della risorsa");
      });
  }

  const submitFunction = () => {
    navigate("/SendMessage", { state: { role: user.role } });
  }

  return (
    <PageWrapper>
      <MainContainer>
        <Title>Notifiche</Title>
        
        <ButtonContainer>
          <Button onClick={getFunction}>Aggiorna</Button>
          {userRole === "Doctor" && (
            <Button onClick={submitFunction}>Invia messaggio</Button>
          )}
        </ButtonContainer>
        
        <NotificationScrollContainer>
          {notifications.length === 0 ? (
            <EmptyState>
              Non c'è nessun messaggio
            </EmptyState>
          ) : (
            <NotificationList>
              {notifications.map((notification, index) => {
                const userInfo = usersInfo.find(user => user.userId === notification.mittenteId);

                return (
                  <NotificationCard key={index} index={index}>
                    <MessageText>{notification.message}.</MessageText>
                    <AuthorText>
                      Effettuato da
                      {userInfo && (
                        <strong> {userInfo.nome} {userInfo.cognome}</strong>
                      )}
                    </AuthorText>
                    <DeleteButton onClick={() => handleDeleteClick(index)}>
                      Elimina
                    </DeleteButton>
                  </NotificationCard>
                );
              })}
            </NotificationList>
          )}
        </NotificationScrollContainer>
      </MainContainer>
      
      <StyledToastContainer />
    </PageWrapper>
  );
}

export default Notification;