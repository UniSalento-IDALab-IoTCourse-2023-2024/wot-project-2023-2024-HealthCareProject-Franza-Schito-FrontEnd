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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150vh;
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
  max-width: 500px;
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
  font-size: 2.2rem;
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

const FormStyled = styled.form`
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
  padding: 0.9rem 1.6rem;
  font-size: 1.7rem;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: #fff;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(.4,2,.6,1);
  border: 2.5px solid #00d4ff;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.25), 0 0 0 1px rgba(255,255,255,0.08);
  animation: ${glow} 2.5s ease-in-out infinite;
  margin-bottom: 1.5rem;

  &:hover {
    background: linear-gradient(135deg, #0099cc 0%, #00d4ff 100%);
    transform: scale(1.08) translateY(-3px);
    box-shadow: 0 12px 36px rgba(0, 212, 255, 0.35);
    color: #fff;
    border-color: #fff;
  }

  &:active {
    transform: scale(0.97);
  }

  svg {
    font-size: 2.2rem;
    color: #fff;
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 1.2rem;
    padding: 0.7rem 1.1rem;
    svg {
      font-size: 1.5rem;
    }
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

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [apigClient, setApigClient] = useState(null);
  const [credentials, setCredentials] = useState({});

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
    // eslint-disable-next-line
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

  const notifySuccess = () => toast.success('Profilo aggiornato correttamente!');
  const notifyError = () => toast.error('Operazione fallita!');
  const notifyPasswordMismatch = () => toast.error('Le password non corrispondono!');

  const submitFunction = (apiFunction, e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.u_id;

    if (formState.password !== formState.confermaPassword) {
      notifyPasswordMismatch();
      return;
    }

    const params = {
      id: userId,
      Authorization: `Bearer ${token}`
    };
    const body = {
      nome: formState.nome,
      cognome: formState.cognome,
      email: formState.email,
      birthdate: formState.birthdate,
      address: formState.address,
      telephoneNumber: formState.telephoneNumber,
      password: formState.password,
      city: formState.city
    };
    const additionalParams = {};

    apiFunction(params, body, additionalParams)
      .then(function (result) {
        notifySuccess();
      }).catch(function (result) {
        notifyError();
        console.error("Error", result);
      });
  };

  const handleTelephoneNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/\D/g, '').slice(0, 10);
    handleChange({ target: { name: e.target.name, value: formattedValue } });
  };

  const handleBackToHome = () => {
    navigate('/Profile');
  };

  return (
    <FormWrapper>
      <FormContainer>
        <BackButton onClick={handleBackToHome}>
          <FaArrowLeft />
        </BackButton>
        <Title>Modifica Anagrafica</Title>
        <FormStyled>
          <Label>
            Nome
            <Input type="text" name="nome" placeholder={credentials.nome} onChange={handleChange} value={formState.nome || ''} />
          </Label>
          <Label>
            Cognome
            <Input type="text" name="cognome" placeholder={credentials.cognome} onChange={handleChange} value={formState.cognome || ''} />
          </Label>
          <Label>
            Email
            <Input type="text" name="email" placeholder={credentials.email} onChange={handleChange} value={formState.email || ''} />
          </Label>
          <Label>
            Data di Nascita
            <Input type="date" name="birthdate" placeholder={credentials.birthdate} onChange={handleChange} value={formState.birthdate || ''} />
          </Label>
          <Label>
            Indirizzo
            <Input type="text" name="address" placeholder={credentials.address} onChange={handleChange} value={formState.address || ''} />
          </Label>
          <Label>
            Città
            <Input type="text" name="city" placeholder={credentials.city} onChange={handleChange} value={formState.city || ''} />
          </Label>
          <Label>
            Numero di Telefono
            <Input type="text" name="telephoneNumber" placeholder={credentials.telephoneNumber} onChange={handleTelephoneNumberChange} value={formState.telephoneNumber || ''} />
          </Label>
          <Label>
            Inserisci la password:
            <Input type="password" name="password" placeholder="Password" onChange={handleChange} value={formState.password || ''} />
          </Label>
          <Label>
            Inserisci nuovamente la password:
            <Input type="password" name="confermaPassword" placeholder="Conferma Password" onChange={handleChange} value={formState.confermaPassword || ''} />
          </Label>
          <Button onClick={(e) => submitFunction(apigClient.apiV1UsersUpdateIdPut, e)}>Aggiorna</Button>
        </FormStyled>
      </FormContainer>
      <StyledToastContainer />
    </FormWrapper>
  );
};

export default UpdateProfileForm;