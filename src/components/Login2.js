import './Login.css';
import styled, { keyframes } from 'styled-components';
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
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

const FormWrapper = styled.div`
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

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 450px;
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
  gap: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 1rem 1.25rem;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 
      0 0 0 2px rgba(0, 212, 255, 0.2),
      0 0 20px rgba(0, 212, 255, 0.1);
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Button = styled.button`
  padding: 1rem 1.25rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  color: white;
  border-radius: 12px;
  width: 100%;
  margin-top: 1rem;
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

const BackButton = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #00d4ff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: ${glow} 3s ease-in-out infinite;
  
  &:hover {
    background: rgba(0, 212, 255, 0.2);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
    color: #ffffff;
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
  
  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    width: 50px;
    height: 50px;
    font-size: 1rem;
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

const Login2 = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [apigClient, setApigClient] = useState(null);

  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    } else {
      console.error('apigClientFactory non è definito');
    }
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const notifySuccess = () => toast.success('Accesso avvenuto con successo!');
  const notifyError = () => toast.error('Accesso fallito!');

  const loginFunction = async (apiFunction, e) => {
    e.preventDefault();

    const params = {};
    const body = {
      email: formState.email,
      password: formState.password,
    };
    const additionalParams = {};

    try {
      const result = await apiFunction(params, body, additionalParams);
      notifySuccess();
      const jwt = result.data.jwt;
      localStorage.setItem('token', jwt);

      const decodedToken = jwtDecode(jwt);
      onLogin({
        name: decodedToken.name || 'Utente',
        role: decodedToken.role,
        email: decodedToken.sub,
      });

      if (decodedToken.role === 'Caregiver') {
        const idCaregiver = decodedToken.id || decodedToken.u_id || decodedToken.userId || decodedToken.sub;
        const authHeader = { Authorization: `Bearer ${jwt}` };

        console.log("Chiamo apiV1ParametersHeartRateGet...");
        const heartListRes = await apigClient.apiV1ParametersHeartRateGet(
          { idCaregiver, ...authHeader }, {}, {}
        );
        console.log("Risposta apiV1ParametersHeartRateGet:", heartListRes);
        const heartDates = (heartListRes.data?.list || []).map(item => item.date);
        const mostRecentHeartDate = heartDates.length
          ? heartDates.sort((a, b) => new Date(b) - new Date(a))[0]
          : null;

        if (mostRecentHeartDate) {
          const paramsHeartCheck = {
            id: idCaregiver,
            date: mostRecentHeartDate,
            ...authHeader
          };
          console.log("Chiamo apiV1ParametersHeartRateCheckIdGet con params:", paramsHeartCheck);
          const heartCheckRes = await apigClient.apiV1ParametersHeartRateCheckIdGet(paramsHeartCheck, {}, {});
          console.log("Risposta apiV1ParametersHeartRateCheckIdGet:", heartCheckRes);
        } else {
          console.log("Nessuna data trovata per heart rate.");
        }

        console.log("Chiamo apiV1ParametersSpo2Get...");
        const spo2ListRes = await apigClient.apiV1ParametersSpo2Get(
          { idCaregiver, ...authHeader }, {}, {}
        );
        console.log("Risposta apiV1ParametersSpo2Get:", spo2ListRes);
        const spo2Dates = (spo2ListRes.data?.list || []).map(item => item.date);
        const mostRecentSpo2Date = spo2Dates.length
          ? spo2Dates.sort((a, b) => new Date(b) - new Date(a))[0]
          : null;

        if (mostRecentSpo2Date) {
          const paramsSpo2Check = {
            idCaregiver,
            date: mostRecentSpo2Date,
            ...authHeader
          };
          console.log("Chiamo apiV1ParametersSpo2CheckIdCaregiverGet con params:", paramsSpo2Check);
          const spo2CheckRes = await apigClient.apiV1ParametersSpo2CheckIdCaregiverGet(paramsSpo2Check, {}, {});
          console.log("Risposta apiV1ParametersSpo2CheckIdCaregiverGet:", spo2CheckRes);
        } else {
          console.log("Nessuna data trovata per spo2.");
        }

        console.log("Chiamo apiV1ParametersActivityGet...");
        const stepsListRes = await apigClient.apiV1ParametersActivityGet(
          { idCaregiver, ...authHeader }, {}, {}
        );
        console.log("Risposta apiV1ParametersActivityGet:", stepsListRes);
        const stepsDates = (stepsListRes.data?.list || []).map(item => item.date);
        const mostRecentStepsDate = stepsDates.length
          ? stepsDates.sort((a, b) => new Date(b) - new Date(a))[0]
          : null;

        if (mostRecentStepsDate) {
          const paramsStepsCheck = {
            idCaregiver,
            date: mostRecentStepsDate,
            ...authHeader
          };
          console.log("Chiamo apigClient.apiV1ParametersActivityStepIdCaregiverGet con params:", paramsStepsCheck);
          const stepsCheckRes = await apigClient.apiV1ParametersActivityStepIdCaregiverGet(paramsStepsCheck, {}, {});
          console.log("Risposta apigClient.apiV1ParametersActivityStepIdCaregiverGet:", stepsCheckRes);
        } else {
          console.log("Nessuna data trovata per steps.");
        }

        console.log("Chiamo apigClient.apiV1ParametersSleepGet...");
        const sleepListRes = await apigClient.apiV1ParametersSleepGet(
          { idCaregiver, ...authHeader }, {}, {}
        );
        console.log("Risposta apigClient.apiV1ParametersSleepGet:", sleepListRes);
        const sleepDates = (sleepListRes.data).map(item => item.date); 
        console.log("Sleep dates:", sleepDates);
        const mostRecentSleepDate = sleepDates.length
          ? sleepDates.sort((a, b) => new Date(b) - new Date(a))[0]
          : null;
        console.log("Most recent sleep date:", mostRecentSleepDate);
        if (mostRecentSleepDate) {
          const paramsSleepCheck = {
            idCaregiver,
            date: mostRecentSleepDate,
            ...authHeader
          };
          console.log("Chiamo apigClient.apiV1ParametersSleepCheckIdCaregiverGet con params:", paramsSleepCheck);
          const sleepCheckRes = await apigClient.apiV1ParametersSleepCheckIdCaregiverGet(paramsSleepCheck, {}, {});
          console.log("Risposta apigClient.apiV1ParametersSleepCheckIdCaregiverGet:", sleepCheckRes);
        } else {
          console.log("Nessuna data trovata per sleep.");
        }
      }
      

      if (decodedToken.role === 'Doctor') {
        navigate('/datiUtente');
      } else if (decodedToken.role === 'Caregiver') {
        navigate('/datiUtente');
      }
    } catch (result) {
      notifyError();
      console.error("Error", result);
      console.log(JSON.stringify(result, '', 2));
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <FormWrapper>
      <BackButton onClick={handleBackToHome}>
        <FaArrowLeft />
      </BackButton>
      
      <FormContainer>
        <Title>Accesso</Title>
        <Form>
          <Label>
            Email
            <Input
              type="text"
              name="email"
              placeholder="Inserisci la tua email"
              onChange={handleChange}
              value={formState.email || ''}
            />
          </Label>
          <Label>
            Password
            <Input
              type="password"
              name="password"
              placeholder="Inserisci la tua password"
              onChange={handleChange}
              value={formState.password || ''}
            />
          </Label>
          <Button onClick={(e) => loginFunction(apigClient.apiV1UsersAuthenticatePost, e)}>
            Accedi
          </Button>
        </Form>
      </FormContainer>
      
      <StyledToastContainer />
    </FormWrapper>
  );
};

export default Login2;