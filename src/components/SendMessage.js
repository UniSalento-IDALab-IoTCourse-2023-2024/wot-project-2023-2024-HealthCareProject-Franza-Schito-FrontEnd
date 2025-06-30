import React, { useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
  justify-content: center;
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

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.6s ease-out;
  
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  padding: 1.5rem;
  font-size: 1.1rem;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: #ffffff;
  min-height: 300px;
  max-height: 500px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &:hover {
    border-color: rgba(0, 212, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 1.2rem 2rem;
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
  align-self: center;
  width: 100%;
  max-width: 300px;
  
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
  position: relative;
  overflow: hidden;
  
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
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(0, 212, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
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

const SendMessage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [apigClient, setApigClient] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [linkedUserId, setLinkedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    } else {
      console.error('apigClientFactory is not defined');
    }
  }, []);

  useEffect(() => {
    if (apigClient) {
      getFunction();
    }
  }, [apigClient]);

  const getFunction = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.u_id;

    const params = {
      id: userId,
      Authorization: `Bearer ${token}`
    };
    const body = {};
    const additionalParams = {};

    apigClient.apiV1UsersIdGet(params, body, additionalParams)
      .then(function (result) {
        setCredentials(result.data);
        setLinkedUserId(result.data.linkedUserId);
        console.log("Success");
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

  const notifySuccess = () => toast.success('Messaggio inviato con successo!');
  const notifyError = () => toast.error('Operazione fallita!');

  const submitFunction = (apiFunction, e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.u_id;

    const params = {
        id: userId,
        Authorization: `Bearer ${token}`
    };
    const body = {
        message: formState.messaggio,
        topic: 'Invio Messaggio',
        mittenteId: userId,
        destinatarioId: linkedUserId || null,
        date: new Date().toISOString()
    };
    const additionalParams = {};

    apiFunction(params, body, additionalParams)
      .then(function (result) {
          notifySuccess();
          console.log("Success");
          setFormState({ messaggio: '' });
      }).catch(function (result) {
        notifyError();
        console.error("Error", result);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const handleBackToHome = () => {
    navigate('/Messages');
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <BackButton onClick={handleBackToHome}>
          <FaArrowLeft />
        </BackButton>
        
        <Title>Invia Messaggio</Title>
        
        <Form>
          <FormGroup>
            <Label>
              Scrivi il tuo messaggio
              <TextArea
                name="messaggio"
                placeholder="Inserisci qui il tuo messaggio..."
                onChange={handleChange}
                value={formState.messaggio || ''}
              />
            </Label>
          </FormGroup>
          
          <Button 
            onClick={(e) => submitFunction(apigClient.apiV1ParametersMessageCreatePost, e)}
            disabled={isLoading || !formState.messaggio?.trim()}
          >
            {isLoading ? 'Invio in corso...' : 'Invia Messaggio'}
          </Button>
        </Form>
        
        <StyledToastContainer />
      </FormWrapper>
    </PageWrapper>
  );
};

export default SendMessage;
