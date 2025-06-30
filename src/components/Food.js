import React, { useEffect, useState, useCallback } from "react";
import styled, { keyframes } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

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

const slideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
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
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
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

const MainContent = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Cambiato da center a flex-start */
  justify-content: center;
  padding: 2rem 0 2rem 4vw; /* Aggiunto padding-left per centrare rispetto a sinistra */
  position: relative;
  width: 100vw;
  box-sizing: border-box;
`;

const CaregiverLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  width: 100%;
  max-width: 1600px;
  padding: 2rem 0;
  align-items: start;
  justify-items: start; /* Allinea i contenuti a sinistra */

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    justify-items: start;
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
    gap: 1.5rem;
  }
`;

const DoctorLayout = styled.div`
  display: flex;
  justify-content: flex-start; /* Cambiato da center a flex-start */
  align-items: flex-start;
  width: 100%;
  max-width: 1400px;
  padding: 2rem 0 2rem 4vw; /* Aggiunto padding-left */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem 0 1rem 2vw;
  }
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInLeft} 0.6s ease-out;

  @media (max-width: 1400px) {
    max-width: 700px;
  }
`;

const ChartWrapperCaregiver = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInRight} 0.8s ease-out;

  @media (max-width: 1400px) {
    max-width: 1000px;
  }
`;

const ChartWrapperDoctor = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 1200px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ChartContainer = styled.div`
  height: ${props => props.isDoctor ? '600px' : '500px'};
  width: 100%;
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 1200px) {
    height: ${props => props.isDoctor ? '500px' : '400px'};
  }

  @media (max-width: 768px) {
    height: 350px;
    padding: 0.5rem;
  }
`;

const FormTitle = styled.h1`
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

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const ChartTitle = styled.h2`
  font-size: ${props => props.isDoctor ? '2.5rem' : '2rem'};
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
  background: linear-gradient(45deg, #00d4ff, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);

  @media (max-width: 768px) {
    font-size: ${props => props.isDoctor ? '2rem' : '1.7rem'};
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
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

const Select = styled.select`
  padding: 1.2rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &:hover {
    border-color: rgba(0, 212, 255, 0.5);
  }
  
  option {
    background: #1a1a2e;
    color: #ffffff;
    padding: 10px;
  }
`;

const SubmitButton = styled.button`
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  animation: ${pulseGlow} 2s infinite;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
`;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Food = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [apigClient, setApigClient] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [credentials2, setCredentials2] = useState({});
  const [userRole, setUserRole] = useState(null);
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [caloriesThreshold, setCaloriesThreshold] = useState(0);

  const mealTypes = [
    { label: "Colazione", value: 1 },
    { label: "Snack mattutino", value: 2 },
    { label: "Pranzo", value: 3 },
    { label: "Snack pomeridiano", value: 4 },
    { label: "Cena", value: 5 }
  ];

  const fetchFoodData = useCallback(() => {
    if (!apigClient) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token non trovato');
      setIsLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.u_id;

      const params = {
        idCaregiver: userId,
        Authorization: `Bearer ${token}`
      };

      apigClient.apiV1ParametersFoodGet(params, {}, {})
        .then(function (result) {
          const data = result.data || [];
          setFoodData(data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.error("Errore nel fetch dei dati alimentari:", error);
          setFoodData([]);
          setIsLoading(false);
        });
    } catch (error) {
      console.error('Errore nel decodificare il token:', error);
      setIsLoading(false);
    }
  }, [apigClient]);

  const getFunction = useCallback(() => {
    if (!apigClient) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token non trovato');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.u_id;

      const params = {
        id: userId,
        Authorization: `Bearer ${token}`
      };

      apigClient.apiV1UsersIdGet(params, {}, {})
        .then(function (result) {
          setCredentials(result.data || {});
        })
        .catch(function (error) {
          console.error("Errore nel fetch delle credenziali:", error);
          setCredentials({});
        });
    } catch (error) {
      console.error('Errore nel decodificare il token:', error);
    }
  }, [apigClient]);

  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    } else {
      console.error('apigClientFactory is not defined');
      setIsLoading(false);
    }

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error('Errore nel decodificare il token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (apigClient) {
      getFunction();
      fetchFoodData();
    }
  }, [apigClient, getFunction, fetchFoodData]);

  useEffect(() => {
    if (!apigClient) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    if (userRole !== "Caregiver") {
      const linkedUserId = credentials?.linkedUserId;
      if (!linkedUserId) return;
      const params2 = {
        id: linkedUserId,
        Authorization: `Bearer ${token}`
      };
      apigClient.apiV1UsersIdGet(params2, {}, {})
        .then(function (result) {
          setCredentials2(result.data || {});
          setCaloriesThreshold(parseInt(result.data?.caloriesThreshold) || 0);
        })
        .catch(function (error) {
          console.error("Errore nel fetch delle credenziali:", error);
        });
    } else {
      setCaloriesThreshold(parseInt(credentials?.caloriesThreshold) || 0);
    }
  }, [apigClient, userRole, credentials]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const notifySuccess = () => toast.success('Pasto inserito con successo!');
  const notifyError = () => toast.error('Operazione fallita!');

  const submitFunction = (apiFunction, e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      notifyError();
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.u_id;

      const params = {
        idCaregiver: userId,
        date: new Date().toISOString().split('T')[0],
        Authorization: `Bearer ${token}`
      };
      
      const body = {
        foodName: formState.nome,
        calories: parseInt(formState.calorie) || 0,
        mealTypeId: Number(formState.mealType)
      };

      apiFunction(params, body, {})
        .then(function (result) {
          notifySuccess();
          setFormState({});
          fetchFoodData();
        })
        .catch(function (error) {
          console.error("Errore nell'inserimento del pasto:", error);
          notifyError();
        });

      if (body.mealTypeId === 5) {
        apigClient.apiV1ParametersFoodDeficitIdCaregiverGet(params, {}, {})
          .then(function (result) {
          })
          .catch(function (error) {
            console.error("Errore nel calcolo del deficit:", error);
          });
      }
    } catch (error) {
      console.error('Errore nel submit:', error);
      notifyError();
    }
  };

  const handleBackToHome = () => {
    navigate('/datiUtente');
  };

  const prepareChartData = () => {
    if (!Array.isArray(foodData) || foodData.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    const sortedData = [...foodData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const last30 = sortedData.slice(-30);

    const labels = last30.map(day => {
      const date = new Date(day.date);
      return date.toLocaleDateString('it-IT');
    });

    const caloriesPerDay = last30.map(day => {
      if (!Array.isArray(day.foods)) {
        return 0;
      }
      return day.foods.reduce((sum, food) => {
        const calories = parseInt(food.calories) || 0;
        return sum + calories;
      }, 0);
    });

    const thresholdArray = last30.map(() => caloriesThreshold);

    return {
      labels,
      datasets: [
        {
          label: "Calorie assunte",
          data: caloriesPerDay,
          backgroundColor: "rgba(0, 212, 255, 0.7)",
          borderColor: "#00d4ff",
          borderWidth: 2,
        },
        {
          label: "Soglia giornaliera",
          data: thresholdArray,
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          borderColor: "#ff6384",
          borderWidth: 2,
        },
      ],
    };
  };

  const chartData = prepareChartData();
  const isDoctor = userRole !== "Caregiver";

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "top",
        display: true,
        labels: {
          color: '#ffffff',
          font: {
            size: isDoctor ? 16 : 14
          }
        }
      },
      title: { 
        display: false
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { 
          display: true, 
          text: "Calorie (kcal)",
          color: '#ffffff',
          font: {
            size: isDoctor ? 16 : 14
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: isDoctor ? 14 : 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        title: { 
          display: true, 
          text: "Data",
          color: '#ffffff',
          font: {
            size: isDoctor ? 16 : 14
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: isDoctor ? 14 : 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
    },
  };

  const ChartComponent = () => {
    if (isLoading) {
      return <LoadingMessage>Caricamento dati...</LoadingMessage>;
    }

    if (chartData.labels.length === 0) {
      return <NoDataMessage>Nessun dato disponibile per il grafico</NoDataMessage>;
    }

    return (
      <ChartContainer isDoctor={isDoctor}>
        <Bar data={chartData} options={chartOptions} />
      </ChartContainer>
    );
  };

  return (
    <PageWrapper>
      <MainContent>

        {userRole === "Caregiver" ? (
          // Layout per Caregiver: form + grafico affiancati
          <CaregiverLayout>
            <FormWrapper>
              <FormTitle>Inserisci Pasto</FormTitle>
              <Form>
                <FormGroup>
                  <Label>Calorie (kcal)</Label>
                  <Input 
                    type="number" 
                    name="calorie" 
                    placeholder="Inserisci le calorie"
                    onChange={handleChange} 
                    value={formState.calorie || ''} 
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Nome pasto</Label>
                  <Input 
                    type="text" 
                    name="nome" 
                    placeholder="Inserisci il nome del pasto"
                    onChange={handleChange} 
                    value={formState.nome || ''} 
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Tipologia di pasto</Label>
                  <Select
                    name="mealType"
                    value={formState.mealType || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Seleziona tipologia</option>
                    {mealTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </Select>
                </FormGroup>
                <SubmitButton 
                  onClick={(e) => submitFunction(apigClient?.apiV1ParametersFoodCreatePost, e)}
                  disabled={!apigClient}
                >
                  Inserisci Pasto
                </SubmitButton>
              </Form>
            </FormWrapper>

            <ChartWrapperCaregiver>
              <ChartTitle isDoctor={false}>Andamento Calorie</ChartTitle>
              <ChartComponent />
            </ChartWrapperCaregiver>
          </CaregiverLayout>
        ) : (
          <DoctorLayout>
            <ChartWrapperDoctor>
              <ChartTitle isDoctor={true}>Andamento Calorie Giornaliere</ChartTitle>
              <ChartComponent />
            </ChartWrapperDoctor>
          </DoctorLayout>
        )}
      </MainContent>

      <StyledToastContainer />
    </PageWrapper>
  );
};

export default Food;