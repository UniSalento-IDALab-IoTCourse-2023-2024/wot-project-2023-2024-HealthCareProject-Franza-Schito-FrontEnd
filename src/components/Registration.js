import './Registration.css';
import styled, { keyframes } from 'styled-components';
import React, { useEffect, useState } from "react"; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom"; 
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
  max-width: 650px;
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

const Select = styled.select`
  padding: 1rem 1.25rem;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
  
  option {
    background: #1a1a2e;
    color: #ffffff;
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

const Button = styled.button`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  color: white;
  border-radius: 12px;
  min-width: 200px;
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
  
  @media (max-width: 768px) {
    width: 100%;
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

const Register = () => { 
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

  const notifySuccess = () => toast.success('Registrazione completata!'); 
  const notifyError = () => toast.error('Registrazione fallita!'); 

  const handleRegisterCaregiver = (e) => { 
    e.preventDefault(); 
    
    if (!apigClient) {
      notifyError();
      return;
    }
    
    const params = {}; 
    const body = { ...formState }; 
    const additionalParams = {}; 

    apigClient.apiV1RegistrationCaregiverPost(params, body, additionalParams) 
      .then(function (result) { 
        notifySuccess(); 
        console.log("Success:", result); 
        setTimeout(() => navigate('/home'), 2000);
      }).catch(function (error) { 
        notifyError(); 
        console.error("Error", error); 
      }); 
  }; 

  const handleRegisterDoctor = (e) => { 
    e.preventDefault(); 
    
    if (!apigClient) {
      notifyError();
      return;
    }
    
    const params = {}; 
    const body = { ...formState }; 
    const additionalParams = {}; 

    apigClient.apiV1RegistrationDoctorPost(params, body, additionalParams) 
      .then(function (result) { 
        notifySuccess(); 
        console.log("Success:", result); 
        setTimeout(() => navigate('/linkedUser'), 0);
      }).catch(function (error) { 
        notifyError(); 
        console.error("Error", error); 
      }); 
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
        <Title>Registrazione</Title>
        <Form>
          <Label>
            Nome
            <Input 
              name="nome" 
              value={formState.nome || ''} 
              onChange={handleChange} 
              placeholder="Inserisci il tuo nome"
              required 
            />
          </Label>
          <Label>
            Cognome
            <Input 
              name="cognome" 
              value={formState.cognome || ''} 
              onChange={handleChange} 
              placeholder="Inserisci il tuo cognome"
              required 
            />
          </Label>
          <Label>
            Sesso
            <Select name="sex" value={formState.sex || ''} onChange={handleChange} required>
              <option value="">Seleziona...</option>
              <option value="M">Maschio</option>
              <option value="F">Femmina</option>
            </Select>
          </Label>
          <Label>
            Email
            <Input 
              type="email" 
              name="email" 
              value={formState.email || ''} 
              onChange={handleChange} 
              placeholder="Inserisci la tua email"
              required 
            />
          </Label>
          <Label>
            Città
            <Input 
              name="city" 
              value={formState.city || ''} 
              onChange={handleChange}
              placeholder="Inserisci la tua città"
            />
          </Label>
          <Label>
            Indirizzo
            <Input 
              name="address" 
              value={formState.address || ''} 
              onChange={handleChange}
              placeholder="Inserisci il tuo indirizzo"
            />
          </Label>
          <Label>
            Data di nascita
            <Input 
              type="date" 
              name="birthdate" 
              value={formState.birthdate || ''} 
              onChange={handleChange} 
              required 
            />
          </Label>
          <Label>
            Password
            <Input 
              type="password" 
              name="password" 
              value={formState.password || ''} 
              onChange={handleChange} 
              placeholder="Inserisci la tua password"
              required 
            />
          </Label>
          <Label>
            Numero di telefono
            <Input 
              name="telephoneNumber" 
              value={formState.telephoneNumber || ''} 
              onChange={handleChange}
              placeholder="Inserisci il tuo numero di telefono"
            />
          </Label>
          
          <ButtonRow>
            <Button type="button" onClick={handleRegisterCaregiver}>
              Registrati come Caregiver
            </Button> 
            <Button type="button" onClick={handleRegisterDoctor}>
              Registrati come Dottore
            </Button> 
            </ButtonRow>
        </Form>
      </FormContainer>
      
      <StyledToastContainer />
    </FormWrapper> 
  );
}; 

export default Register;