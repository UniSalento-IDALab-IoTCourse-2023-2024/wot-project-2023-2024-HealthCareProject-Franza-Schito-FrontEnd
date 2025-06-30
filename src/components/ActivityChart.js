import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import styled, { keyframes } from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement);

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
  align-items: flex-start; /* shift a sinistra */
  justify-content: flex-start;
  min-height: 100vh;
  width: 100vw;
  padding: 2rem 0 2rem 20vw; /* padding-left per spostare a sinistra */
  box-sizing: border-box;
  position: relative;

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* shift a sinistra */
  width: 100vw;
  max-width: 1800px;
  gap: 2.5rem;
  margin: 0;
`;

const ChartWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 1000px;
  min-width: 350px;
  max-width: 1200px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 1400px) {
    width: 90vw;
    max-width: 100vw;
    min-width: 0;
    padding: 2rem 0.5rem;
  }
`;

const ChartTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #ffffff;
  background: linear-gradient(45deg, #00d4ff, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
`;

const ChartContainer = styled.div`
  height: 550px;
  width: 100%;
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 900px) {
    height: 400px;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  padding: -2rem;
  margin-bottom: 10px;
  animation: ${slideInUp} 0.8s ease-out forwards;
`;

const StatBox = styled.div`
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(0,212,255,0.15);
  border-radius: 20px;
  padding: 20px 30px;
  min-width: 200px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #fff;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 24px rgba(0, 212, 255, 0.13);
    border-color: #00d4ff;
  }
`;


const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #b2ebf2;
  margin-bottom: 10px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #00d4ff;
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

const ActivityChart = () => {
  const [apigClient, setApigClient] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stepsThreshold, setStepsThreshold] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (window.apigClientFactory) {
      setApigClient(window.apigClientFactory.newClient());
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!apigClient) return;
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};
        const userId = decodedToken.u_id;
        setUserRole(decodedToken.role);

        const params = { idCaregiver: userId, Authorization: `Bearer ${token}` };
        const result = await apigClient.apiV1ParametersActivityGet(params, {}, {});
        setActivityData(result.data?.list || []);
        
      } catch (err) {
        setActivityData([]);
        setStepsThreshold(null);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [apigClient]);

  const sortedData = [...activityData].sort((a, b) => new Date(a.date) - new Date(b.date));
  const last30 = sortedData.slice(-30);

  const labels = last30.map(item => new Date(item.date).toLocaleDateString('it-IT'));
  const steps = last30.map(item => item.step);
  const thresholdArray = stepsThreshold ? Array(last30.length).fill(stepsThreshold) : [];
  const last = last30[last30.length - 1] || {};

  const chartData = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: steps,
        backgroundColor: "rgba(0, 212, 255, 0.7)",
        borderColor: "#00d4ff",
        borderWidth: 2,
        order: 1,
      },
    ],
  };

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
            size: 14
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
          text: "Steps",
          color: '#ffffff',
          font: {
            size: 14
          }
        },
        ticks: {
          color: '#ffffff'
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
            size: 14
          }
        },
        ticks: {
          color: '#ffffff'
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
      <ChartContainer>
        <Bar data={chartData} options={chartOptions} />
      </ChartContainer>
    );
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <BoxContainer>
          <StatBox>
            <StatLabel>Data</StatLabel>
            <StatValue>{last.date ? new Date(last.date).toLocaleDateString('it-IT') : "-"}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>Steps</StatLabel>
            <StatValue>{last.step ?? "-"}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>Calorie bruciate</StatLabel>
            <StatValue>{last.caloriesOut ?? "-"}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>Minuti sedentari</StatLabel>
            <StatValue>{last.sedentaryMinutes ?? "-"}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>Distanza (km)</StatLabel>
            <StatValue>{last.distances ?? "-"}</StatValue>
          </StatBox>
        </BoxContainer>
        <ChartWrapper>
          <ChartTitle>Andamento Steps giornalieri</ChartTitle>
          <ChartComponent />
        </ChartWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ActivityChart;