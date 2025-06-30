import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './HealthConditions.css';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
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
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
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
  
  canvas {
    border-radius: 10px;
  }
`;

function HealthConditions() {
  const [apigClient, setApigClient] = useState(null);
  const [spo2, setSpo2] = useState([]);
  const [role, setUserRole] = useState(null);
  const [yMin, setYMin] = useState(88);
  const [yMax, setYMax] = useState(100);

  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    } else {
      console.error('apigClientFactory non è definito');
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, []);

  useEffect(() => {
    if (apigClient) {
      getFunction();
    }
  }, [apigClient]);

  const getFunction = async () => {
    const token = localStorage.getItem('token');

    try {
      const params = {
        Authorization: `Bearer ${token}`
      };
      const body = {};
      const additionalParams = {};

      const result = await apigClient.apiV1ParametersSpo2Get(params, body, additionalParams);
      if (result.data.list && result.data.list.length > 0) {
        setSpo2(result.data.list);
        const last10 = getLast10Data(result.data.list);
        const minVal = Math.floor(Math.min(...last10.map(item => item.min)));
        const maxVal = Math.ceil(Math.max(...last10.map(item => item.max)));
        setYMin(minVal);
        setYMax(maxVal);
      } else {
        console.log('La lista è vuota o non definita');
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getLast10Data = (data = spo2) => {
    const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.slice(0, 30).reverse();
  };

  const getChartData = () => {
    const data = getLast10Data();
    return {
      labels: data.map(item => item.date),
      datasets: [
        {
          label: 'Media',
          data: data.map(item => item.avg),
          borderColor: '#00d4ff',
          backgroundColor: ctx => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
            return gradient;
          },
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 8,
          tension: 0.4,
          pointBackgroundColor: '#00d4ff',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#00d4ff',
          pointHoverBorderWidth: 3
        },
        {
          label: 'Massimo',
          data: data.map(item => item.max),
          borderColor: '#48ca55',
          backgroundColor: 'rgba(72, 202, 85, 0.1)',
          borderDash: [6, 4],
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#48ca55',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2
        },
        {
          label: 'Minimo',
          data: data.map(item => item.min),
          borderColor: '#f53737',
          backgroundColor: 'rgba(245, 55, 55, 0.1)',
          borderDash: [6, 4],
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#f53737',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2
        },
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: { 
            size: 14,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00d4ff',
        bodyColor: '#ffffff',
        borderColor: '#00d4ff',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        },
        border: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      y: {
        beginAtZero: false,
        min: yMin,
        max: yMax,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        },
        border: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      }
    }
  };

  return (
    <HealthWrapper>
      <ChartContainer>
        <Title2>
          Saturazione Ossigeno (SpO₂)
        </Title2>
        {spo2.length === 0 ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <ChartWrapper>
            <Line
              data={getChartData()}
              options={chartOptions}
            />
          </ChartWrapper>
        )}
      </ChartContainer>
    </HealthWrapper>
  );
}

export default HealthConditions;