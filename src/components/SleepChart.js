import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { jwtDecode } from 'jwt-decode';
import styled, { keyframes } from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, annotationPlugin);

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

const ChartWrapper = styled.div`
  width: 100vw;
  min-height: 50vh;
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
  max-width: 100vw;
  width: 100%;
  box-sizing: border-box;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
    animation: ${shimmer} 3s infinite;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }
`;

const ChartTitle = styled.h4`
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
  background: linear-gradient(45deg, #00d4ff, #ffffff, #00d4ff);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  animation: ${shimmer} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  flex-direction: column;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #00d4ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  letter-spacing: 1px;
`;

const ChartCanvasWrapper = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  canvas {
    border-radius: 12px;
  }
`;

function parseDuration(durationStr) {
  if (!durationStr) return 0;
  const match = durationStr.match(/(\d+)h\s*(\d+)?m?/);
  if (!match) return 0;
  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  return hours + minutes / 60;
}

function SleepChart() {
  const [apigClient, setApigClient] = useState(null);
  const [sleepData, setSleepData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.apigClientFactory) {
      setApigClient(window.apigClientFactory.newClient());
    }
  }, []);

  useEffect(() => {
    const fetchSleepData = async () => {
      if (!apigClient) return;
      try {
        const token = localStorage.getItem('token');
        const decoded = token ? jwtDecode(token) : {};
        const idCaregiver = decoded.id || decoded.u_id || decoded.userId || decoded.sub;
        const params = {
          idCaregiver,
          Authorization: `Bearer ${token}`
        };
        const result = await apigClient.apiV1ParametersSleepGet(params, {}, {});
        setSleepData(result.data || []);
      } catch (error) {
        console.error("Errore nel caricamento dati sonno:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSleepData();
  }, [apigClient]);

  const chartData = {
    labels: sleepData.map(item => item.date),
    datasets: [
      {
        label: "Durata sonno (ore)",
        data: sleepData.map(item => parseDuration(item.duration)),
        backgroundColor: "rgba(0, 212, 255, 0.7)",
        borderColor: "#00d4ff",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
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
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      },
      annotation: {
        annotations: {
          line6: {
            type: 'line',
            yMin: 6,
            yMax: 6,
            borderColor: '#ff6b6b',
            borderWidth: 2,
            borderDash: [8, 4],
            label: {
              enabled: true,
              content: '6h (Min)',
              position: 'end',
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              padding: 4,
              borderRadius: 4,
              font: {
                size: 11,
                weight: 'bold'
              }
            }
          },
          line9: {
            type: 'line',
            yMin: 9,
            yMax: 9,
            borderColor: '#ff6b6b',
            borderWidth: 2,
            borderDash: [8, 4],
            label: {
              enabled: true,
              content: '9h (Max)',
              position: 'end',
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              padding: 4,
              borderRadius: 4,
              font: {
                size: 11,
                weight: 'bold'
              }
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { 
          display: true, 
          text: "Ore",
          color: '#ffffff',
          font: {
            size: 14,
            weight: '600'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1
        }
      },
      x: {
        title: { 
          display: true, 
          text: "Data",
          color: '#ffffff',
          font: {
            size: 14,
            weight: '600'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          },
          maxRotation: 45
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          lineWidth: 1
        }
      }
    }
  };

  return (
    <ChartWrapper>
      <ChartContainer>
        <ChartTitle>
          Durata Sonno
        </ChartTitle>
        {loading ? (
          <SpinnerWrapper>
            <Spinner />
            <LoadingText>Caricamento dati sonno...</LoadingText>
          </SpinnerWrapper>
        ) : (
          <ChartCanvasWrapper>
            <Bar
              data={chartData}
              options={chartOptions}
              height={400}
            />
          </ChartCanvasWrapper>
        )}
      </ChartContainer>
    </ChartWrapper>
  );
}

export default SleepChart;