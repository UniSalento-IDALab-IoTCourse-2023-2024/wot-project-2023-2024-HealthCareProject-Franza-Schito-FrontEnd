import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styled, { keyframes } from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const HealthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 2rem;
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

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 2000px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.6s ease-out;
  box-sizing: border-box;
  margin: 0 auto;
  
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

const Title2 = styled.h4`
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
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 320px;
  width: 100%;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(0, 212, 255, 0.2);
  border-top: 4px solid #00d4ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
  
  canvas {
    border-radius: 10px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1.5rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.2rem;
  text-align: center;
  flex: 1;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #00d4ff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

function HeartRate() {
  const [apigClient, setApigClient] = useState(null);
  const [rateArray, setRateArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!apigClient) return;
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const params = {
          Authorization: `Bearer ${token}`,
          date: "2024-09-16",
        };
        const body = {};
        const additionalParams = {};
        const result = await apigClient.apiV1ParametersHeartRateSearchByDateGet(
          params,
          body,
          additionalParams
        );
        if (
          result.data &&
          Array.isArray(result.data.list) &&
          result.data.list.length > 0 &&
          Array.isArray(result.data.list[0].rate)
        ) {
          setRateArray(result.data.list[0].rate);
        } else {
          setRateArray([]);
        }
      } catch (error) {
        setRateArray([]);
        console.error("Errore nel recupero dei dati:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apigClient]);

  const yMin = rateArray.length > 0 ? Math.min(...rateArray) - 10 : 40;
  const yMax = rateArray.length > 0 ? Math.max(...rateArray) + 10 : 180;

  const totalSamples = rateArray.length;
  const hourLabels = rateArray.map((_, i) => {
    const hour = 1 + ((i * 23) / (totalSamples - 1));
    return parseFloat(hour.toFixed(2));
  });

  const avgRate = rateArray.length > 0 ? Math.round(rateArray.reduce((a, b) => a + b, 0) / rateArray.length) : 0;
  const minRate = rateArray.length > 0 ? Math.min(...rateArray) : 0;
  const maxRate = rateArray.length > 0 ? Math.max(...rateArray) : 0;

  const chartData = {
    labels: hourLabels,
    datasets: [
      {
        label: "Battiti cardiaci",
        data: rateArray,
        borderColor: "#00d4ff",
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 320);
          gradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
          return gradient;
        },
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#00d4ff",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#00d4ff",
        pointHoverBorderWidth: 3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        beginAtZero: false,
        min: yMin,
        max: yMax,
        title: {
          display: true,
          text: "BPM",
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Ora del giorno",
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          callback: function (value, index) {
            const hour = hourLabels[index];
            return Number.isInteger(hour) ? hour : "";
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 0.9)",
          font: {
            size: 14,
            weight: 'bold',
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#00d4ff",
        bodyColor: "#ffffff",
        borderColor: "#00d4ff",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      },
    },
  };

  if (loading) {
    return (
      <HealthWrapper>
        <ChartContainer>
          <Title2>Caricamento dati...</Title2>
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        </ChartContainer>
      </HealthWrapper>
    );
  }

  return (
    <HealthWrapper>
      <ChartContainer>
        <Title2>Andamento Battiti Cardiaci</Title2>
        <ChartWrapper>
          <Line data={chartData} options={chartOptions} />
        </ChartWrapper>
        <StatsContainer>
          <StatCard>
            <StatValue>{minRate}</StatValue>
            <StatLabel>Min BPM</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{avgRate}</StatValue>
            <StatLabel>Media BPM</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{maxRate}</StatValue>
            <StatLabel>Max BPM</StatLabel>
          </StatCard>
        </StatsContainer>
      </ChartContainer>
    </HealthWrapper>
  );
}

export default HeartRate;