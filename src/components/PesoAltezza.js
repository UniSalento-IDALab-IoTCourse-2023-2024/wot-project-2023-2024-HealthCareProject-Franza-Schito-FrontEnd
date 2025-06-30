import React, { useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { FaArrowLeft } from 'react-icons/fa';

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

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.6); }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 50vh;
  width: 50vw;
  padding: 2rem 0;
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
`;

const TopBar = styled.div`
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  min-height: 80px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 500px;
  min-width: 320px;
  margin: 0 auto;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.6s ease-out, ${pulseGlow} 3s ease-in-out infinite;

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

  @media (max-width: 700px) {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
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

const Input = styled.input`
  padding: 1.5rem;
  font-size: 1.1rem;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: #ffffff;
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

const PesoAltezza = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [apigClient, setApigClient] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    } else {
      console.error('apigClientFactory is not defined');
    }

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        setUserRole(null);
      }
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

  const notifySuccess = () => toast.success('Peso e altezza aggiornati correttamente!');
  const notifyError = () => toast.error('Operazione fallita!');

  const submitFunction = async (apiFunction, e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.u_id;

    const params = {
        Authorization: `Bearer ${token}`
    };
    const body = {
        weight: formState.weight,
        height: formState.height,
        date: new Date().toISOString(),
     };
    const additionalParams = {};

    try {
      await apiFunction(params, body, additionalParams);
      notifySuccess();
      await apigClient.apiV1ParametersWeightCheckIdCaregiverGet(
        {
          Authorization: `Bearer ${token}`,
          idCaregiver: userId,
          date: new Date().toISOString().slice(0, 10)
        },
        {},
        {}
      );
    } catch (error) {
      notifyError();
      console.error("Error", error);
    }
  };

  const handleBackToHome = () => {
    navigate('/datiUtente');
  };

  if (userRole !== "Caregiver") {
    return null;
  }

  return (
    <PageWrapper>
      <Card>
        <Title>Aggiorna Peso e Altezza</Title>
        <Form>
          <FormGroup>
            <Label htmlFor="weight">Peso [kg]</Label>
            <Input
              type="number"
              name="weight"
              id="weight"
              placeholder={credentials.weight}
              onChange={handleChange}
              value={formState.weight || ''}
              min="0"
              step="0.1"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="height">Altezza [cm]</Label>
            <Input
              type="number"
              name="height"
              id="height"
              placeholder={credentials.height}
              onChange={handleChange}
              value={formState.height || ''}
              min="0"
              step="0.1"
            />
          </FormGroup>
          <Button onClick={(e) => submitFunction(apigClient.apiV1ParametersWeightCreatePost, e)}>
            Inserisci
          </Button>
        </Form>
        <StyledToastContainer />
      </Card>
    </PageWrapper>
  );
};

export default PesoAltezza;