import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

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
  align-items: center;
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
    background: radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  max-width: 500px;
  gap: 3rem;
  margin: 0 auto;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 480px;
  min-width: 320px;
  max-width: 600px;
  height: 550px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.6s ease-out, ${pulseGlow} 3s ease-in-out infinite;
  margin-bottom: 2rem;

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

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 5rem;
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
  gap: 10rem;
  align-items: center;
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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ExistingValue = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #00d4ff;
  font-size: 1em;
  pointer-events: none;
  background: transparent;
  padding-right: 8px;
  text-align: left;
  font-weight: 500;
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
  padding: 1rem;
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

function Threshold() {
  const [apigClient, setApigClient] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [linkedUserId, setLinkedUserId] = useState(null);
  const [formState, setFormState] = useState({
    caloriesThreshold: "",
    stepsThreshold: ""
  });
  const [existingThresholds, setExistingThresholds] = useState({
    caloriesThreshold: "",
    stepsThreshold: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.apigClientFactory) {
      setApigClient(window.apigClientFactory.newClient());
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (e) {
        console.error("Errore nel decodificare il token:", e);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchLinkedUserAndThresholds = async () => {
      if (!apigClient) return;
      const token = localStorage.getItem("token");
      if (!token) return;
      if (userRole === "Caregiver") return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id || decoded.u_id || decoded.userId || decoded.sub;
        if (!userId) return;

        const paramsUser = {
          id: userId,
          Authorization: `Bearer ${token}`
        };
        const userResult = await apigClient.apiV1UsersIdGet(paramsUser, {}, {});
        const linkedId = userResult.data?.linkedUserId;
        setLinkedUserId(linkedId);

        if (linkedId) {
          const paramsCaregiver = {
            id: linkedId,
            Authorization: `Bearer ${token}`
          };
          const caregiverResult = await apigClient.apiV1UsersIdGet(paramsCaregiver, {}, {});
          setExistingThresholds({
            caloriesThreshold: caregiverResult.data?.caloriesThreshold || "",
            stepsThreshold: caregiverResult.data?.stepsThreshold || ""
          });
          setFormState({
            caloriesThreshold: "",
            stepsThreshold: ""
          });
        }
      } catch (error) {
        console.error("Errore nel fetch di linkedUserId o soglie:", error);
      }
    };
    fetchLinkedUserAndThresholds();
  }, [apigClient, userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormState(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apigClient || !linkedUserId) return;
    const token = localStorage.getItem("token");
    let ok = true;
    try {
      if (formState.caloriesThreshold) {
        const paramsCal = {
          idCaregiver: linkedUserId,
          Authorization: `Bearer ${token}`
        };
        const bodyCal = {
          caloriesThreshold: parseInt(formState.caloriesThreshold, 10)
        };
        await apigClient.apiV1UsersUpdateCaloriesThresholdIdCaregiverPut(paramsCal, bodyCal, {});
      }
    } catch (error) {
      ok = false;
      toast.error("Errore nell'aggiornamento della soglia calorie");
      console.error(error);
    }
    if (ok) {
      toast.success("Soglia aggiornata!");
      setExistingThresholds(prev => ({
        caloriesThreshold: formState.caloriesThreshold || prev.caloriesThreshold,
        stepsThreshold: formState.stepsThreshold || prev.stepsThreshold
      }));
      setFormState({ caloriesThreshold: "", stepsThreshold: "" });
    }
  };

  if (userRole === "Caregiver") {
    return null;
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <ContentWrapper>
          <Card>
            <Title>Caricamento...</Title>
          </Card>
        </ContentWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <Card>
          <Title>Imposta Soglia Calorie</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                Soglia Calorie
                <InputWrapper>
                  <Input
                    type="number"
                    name="caloriesThreshold"
                    min="0"
                    step="1"
                    value={formState.caloriesThreshold}
                    onChange={handleChange}
                    required
                  />
                  {existingThresholds.caloriesThreshold && !formState.caloriesThreshold && (
                    <ExistingValue>
                      {existingThresholds.caloriesThreshold}
                    </ExistingValue>
                  )}
                </InputWrapper>
              </Label>
            </FormGroup>
            <Button type="submit">Aggiorna</Button>
          </Form>
          <StyledToastContainer />
        </Card>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Threshold;