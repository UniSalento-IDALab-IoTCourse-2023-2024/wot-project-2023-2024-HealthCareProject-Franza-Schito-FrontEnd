import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const slideInLeft = keyframes`
  0% { opacity: 0; transform: translateX(-30px);}
  100% { opacity: 1; transform: translateX(0);}
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.95);}
  100% { opacity: 1; transform: scale(1);}
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);}
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);}
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInLeft} 0.6s ease-out, ${pulseGlow} 3s ease-in-out infinite;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
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
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 1.2rem;
  font-size: 1rem;
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
  font-size: 1rem;
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
  margin-top: 1rem;

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
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 212, 255, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;


const ButtonRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;


const BackButton = styled.button`
  padding: 0.7rem 1.2rem;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #00d4ff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: ${pulseGlow} 2.5s ease-in-out infinite;
  margin-bottom: 1.5rem;

  &:hover {
    background: rgba(0, 212, 255, 0.2);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
    color: #ffffff;
  }

  &:active {
    transform: translateY(0) scale(0.95);
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

const LinkedUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [apigClient, setApigClient] = useState(null);

  React.useEffect(() => {
    if (window.apigClientFactory) {
      setApigClient(window.apigClientFactory.newClient());
    }
  }, []);

  const notifySuccess = () => toast.success('Caregiver associato con successo!');
  const notifyError = () => toast.error('Operazione fallita!');

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!apigClient) {
    notifyError();
    return;
  }
  
  try {
    const allUsersRes = await apigClient.apiV1UsersGet({}, {}, {});
    const users = allUsersRes.data && Array.isArray(allUsersRes.data.list) ? allUsersRes.data.list : [];
    const lastUser = users.length > 0 ? users[users.length - 1] : null;
    const lastUserId = lastUser ? lastUser.id : null;
    if (!lastUserId) {
      notifyError();
      return;
    }
    console.log("Ultimo utente (dottore):", lastUserId);

    const caregiverRes = await apigClient.apiV1UsersSearchByEmailGet(
      { email: email },
      {},
      {}
    );
    const caregiverId = caregiverRes.data && caregiverRes.data.id ? caregiverRes.data.id : null;
    if (!caregiverId) {
      notifyError();
      return;
    }
    console.log("Caregiver trovato:", caregiverId);
    console.log("email:", email);

    await apigClient.apiV1UsersLinkedUserIdDoctorIdCaregiverPut(
      { idDoctor: lastUserId, idCaregiver: caregiverId },
      {},
      {}
    );
    notifySuccess();
    setTimeout(() => navigate('/home'), 1500);
  } catch (error) {
    notifyError();
    console.error("Error", error);
  }
};

  return (
    <PageWrapper>
      <FormWrapper>
        <Title>Associa Caregiver</Title>
        <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label htmlFor="email">Email del Caregiver</Label>
    <Input
      id="email"
      type="email"
      placeholder="Inserisci l'email del caregiver"
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
    />
  </FormGroup>
  <ButtonRow>
    <Button type="submit">
      Associa
    </Button> 
  </ButtonRow>
</Form>
        <StyledToastContainer />
      </FormWrapper>
    </PageWrapper>
  );
};

export default LinkedUser;