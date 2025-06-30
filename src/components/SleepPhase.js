import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { jwtDecode } from "jwt-decode";
import styled, { keyframes } from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

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

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(0, 212, 255, 0.2); }
  50% { box-shadow: 0 0 25px rgba(0, 212, 255, 0.4); }
`;

const SleepWrapper = styled.div`
  width: 100%;
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

const SleepContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 3rem;
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

const SleepTitle = styled.h4`
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 3rem;
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
    margin-bottom: 2rem;
  }
`;

const SleepStagesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  justify-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const DoughnutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: ${fadeInScale} 0.6s ease-out;
  animation-delay: ${props => props.index * 0.1}s;
  animation-fill-mode: both;
`;

const DoughnutContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: ${glow} 3s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.5}s;
  
  &:hover {
    transform: scale(1.05);
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
  }
  
  canvas {
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const CenteredPercentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  z-index: 10;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StageLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: rgba(0, 212, 255, 0.3);
    color: #ffffff;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
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

const NoDataMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  font-weight: 500;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
`;

const STAGE_LABELS = ["Sveglio", "Leggero", "Profondo", "REM"];
const STAGE_COLORS = [
  "#00d4ff", // Sveglio - azzurro tema
  "#00ff88", // Leggero - verde acqua
  "#4169e1", // Profondo - blu reale
  "#ff6b6b"  // REM - rosso corallo
];

function parseDurationToMinutes(durationStr) {
  if (!durationStr) return 0;
  const match = durationStr.match(/(\d+)h\s*(\d+)?m?/);
  if (!match) return 0;
  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  return hours * 60 + minutes;
}

const SleepPhase = () => {
  const [apigClient, setApigClient] = useState(null);
  const [latestSleep, setLatestSleep] = useState(null);
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
        const token = localStorage.getItem("token");
        const decoded = token ? jwtDecode(token) : {};
        const idCaregiver = decoded.id || decoded.u_id || decoded.userId || decoded.sub;
        const params = {
          idCaregiver,
          Authorization: `Bearer ${token}`
        };
        const result = await apigClient.apiV1ParametersSleepGet(params, {}, {});
        const list = result.data || [];
        if (list.length > 0) {
          const latest = list.reduce((a, b) =>
            new Date(a.date) > new Date(b.date) ? a : b
          );
          setLatestSleep(latest);
        }
      } catch (error) {
        console.error("Errore nel caricamento dati sonno:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSleepData();
  }, [apigClient]);

  if (loading) {
    return (
      <SleepWrapper>
        <SleepContainer>
          <SpinnerWrapper>
            <Spinner />
            <LoadingText>Caricamento fasi del sonno...</LoadingText>
          </SpinnerWrapper>
        </SleepContainer>
      </SleepWrapper>
    );
  }

  if (!latestSleep) {
    return (
      <SleepWrapper>
        <SleepContainer>
          <SleepTitle>Fasi del Sonno</SleepTitle>
          <NoDataMessage>
            Nessun dato disponibile
          </NoDataMessage>
        </SleepContainer>
      </SleepWrapper>
    );
  }

  const totalMinutes = parseDurationToMinutes(latestSleep.duration);
  const stages = latestSleep.stages || [0, 0, 0, 0];
  const percentages = stages.map(stageMin =>
    totalMinutes > 0 ? Math.round((stageMin / totalMinutes) * 100) : 0
  );

  const doughnutData = (idx) => ({
    labels: [STAGE_LABELS[idx], "Altro"],
    datasets: [
      {
        data: [percentages[idx], 100 - percentages[idx]],
        backgroundColor: [STAGE_COLORS[idx], "rgba(255, 255, 255, 0.05)"],
        borderWidth: 0,
        borderRadius: 8,
      }
    ]
  });

  const doughnutOptions = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: { 
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00d4ff',
        bodyColor: '#ffffff',
        borderColor: '#00d4ff',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  return (
    <SleepWrapper>
      <SleepContainer>
        <SleepTitle>Fasi del Sonno - {latestSleep.date}</SleepTitle>
        <SleepStagesRow>
          {STAGE_LABELS.map((label, idx) => (
            <DoughnutWrapper key={label} index={idx}>
              <DoughnutContainer index={idx}>
                <Doughnut data={doughnutData(idx)} options={doughnutOptions} />
                <CenteredPercentage>{percentages[idx]}%</CenteredPercentage>
              </DoughnutContainer>
              <StageLabel>{label}</StageLabel>
            </DoughnutWrapper>
          ))}
        </SleepStagesRow>
      </SleepContainer>
    </SleepWrapper>
  );
};

export default SleepPhase;