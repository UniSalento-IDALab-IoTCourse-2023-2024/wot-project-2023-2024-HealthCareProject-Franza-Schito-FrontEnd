import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { jwtDecode } from 'jwt-decode';

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
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.18); }
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.32); }
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

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 500px;
  min-width: 0;
  margin: 0 auto;
  height: 550px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.18),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.6s ease-out, ${pulseGlow} 3s ease-in-out infinite;

  @media (max-width: 900px) {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
`;

const Title = styled.h2`
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

const HorizontalLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const ImgCol = styled.div`
  flex: 0 0 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  @media (max-width: 900px) {
    margin-bottom: 1.5rem;
  }
`;

const CorpoImg = styled.img`
  width: 120px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,212,255,0.08);
  background: #e0e7ff;
`;

const DataBlock = styled.div`
  flex: 1;
  background: rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  min-width: 250px;
  box-shadow: 0 2px 12px rgba(0,212,255,0.07);
  animation: ${fadeIn} 0.8s;
`;

const DataTitle = styled.h3`
  font-size: 1.3rem;
  color: #00d4ff;
  margin-bottom: 1.2rem;
  font-weight: 600;
  text-align: left;
`;

const DataList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DataItem = styled.li`
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;

  strong {
    color: #00d4ff;
    margin-right: 0.5rem;
    font-weight: 500;
    min-width: 90px;
    display: inline-block;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  animation: ${pulseGlow} 2s infinite;
`;

function HealthStats() {
  const [apigClient, setApigClient] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [role, setUserRole] = useState(null);
  const [linkedUserId, setLinkedUserId] = useState(null);

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

      if (decodedToken.role && decodedToken.role.includes("Doctor")) {
        if (window.apigClientFactory) {
          const client = window.apigClientFactory.newClient();
          client.apiV1UsersIdGet(
            {
              Authorization: `Bearer ${token}`,
              id: decodedToken.u_id
            },
            {},
            {}
          ).then(res => {
            setLinkedUserId(res.data.linkedUserId);
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (apigClient) fetchMetrics();
  }, [apigClient]);

  const fetchMetrics = async () => {
    const token = localStorage.getItem('token');

    try {
      const params = {
        Authorization: `Bearer ${token}`
      };
      const body = {};
      const additionalParams = {};

      const result = await apigClient.apiV1ParametersWeightGet(params, body, additionalParams);
      if (result.data.list && result.data.list.length > 0) {
        const sorted = result.data.list.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMetrics(sorted[0]); // Ultimo valore
      } else {
        setMetrics(null);
      }
    } catch (error) {
      setMetrics(null);
      console.error('Errore nel recupero dei dati:', error);
    }
  };

  const handleCheckCaregiverWeight = async () => {
    if (!apigClient || !linkedUserId) return;
    const token = localStorage.getItem('token');
    try {
      const res = await apigClient.apiV1ParametersWeightCheckIdCaregiverGet(
        {
          Authorization: `Bearer ${token}`,
          idCaregiver: linkedUserId,
          date: metrics.date
        },
        {},
        {}
      );
      alert("Risposta API: " + JSON.stringify(res.data));
    } catch (err) {
      alert("Errore chiamata API");
    }
  };

  return (
    <PageWrapper>
      <Card>
        <Title>Parametri corporei</Title>
        <HorizontalLayout>
          <ImgCol>
            <CorpoImg
              src="/corpo_umano.png"
              alt="corpo_umano"
            />
          </ImgCol>
          <DataBlock>
            <DataTitle>Dati recenti</DataTitle>
            {metrics ? (
              <DataList>
                <DataItem><strong>Peso:</strong> {metrics.weight} kg</DataItem>
                <DataItem><strong>Altezza:</strong> {metrics.height} cm</DataItem>
                <DataItem><strong>Data:</strong> {new Date(metrics.date).toLocaleDateString()}</DataItem>
              </DataList>
            ) : (
              <LoadingMessage>Caricamento in corso...</LoadingMessage>
            )}
          </DataBlock>
        </HorizontalLayout>
      </Card>
    </PageWrapper>
  );
}

export default HealthStats;