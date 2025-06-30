import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import './ProfileInventoryTable.css';

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

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
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

const ProfileContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 500px;
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

const Details = styled.div`
  margin-bottom: 2rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.08rem;
  color: #fff;
  border-bottom: 1px solid rgba(0,212,255,0.08);
  padding-bottom: 0.5rem;
`;

const DetailTitle = styled.span`
  font-weight: 500;
  color: #00d4ff;
`;

const DetailValue = styled.span`
  font-weight: 400;
  color: #fff;
`;

const Button = styled.button`
  padding: 1rem 1.25rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  color: white;
  border-radius: 12px;
  width: 100%;
  margin-top: 1rem;
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
`;

const ProfileInventoryTable = () => {
  const [apigClient, setApigClient] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    } else {
      console.error('apigClientFactory non è definito');
    }
  }, []);

  useEffect(() => {
    if (apigClient) {
      getFunction();
    }
  }, [apigClient]);

  const getFunction = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.u_id;

    const params = {
      id: userId,
      Authorization: `Bearer ${token}`
    };
    const body = {};
    const additionalParams = {};

    if (!params.Authorization) {
      console.error('Authorization header');
      return;
    }

    apigClient.apiV1UsersIdGet(params, body, additionalParams)
      .then(function (result) {
        setUser(result.data);
      }).catch(function (result) {
        console.error("Error", result);
      });
  };

  const submitFunction = () => {
    navigate("/UpdateProfileForm", { state: { role: user.role } });
  };

  return (
    <PageWrapper>
      <ProfileContainer>
        <Title>Dati Utente</Title>
        <Details>
          <DetailRow>
            <DetailTitle>Nome:</DetailTitle>
            <DetailValue>{user.nome}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Cognome:</DetailTitle>
            <DetailValue>{user.cognome}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Sesso:</DetailTitle>
            <DetailValue>{user.sex}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Email:</DetailTitle>
            <DetailValue>{user.email}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Data di Nascita:</DetailTitle>
            <DetailValue>{user.birthdate}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Telefono:</DetailTitle>
            <DetailValue>{user.telephoneNumber}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Indirizzo:</DetailTitle>
            <DetailValue>{user.address}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Città:</DetailTitle>
            <DetailValue>{user.city}</DetailValue>
          </DetailRow>
        </Details>
        <Button onClick={submitFunction}>Modifica Anagrafica</Button>
      </ProfileContainer>
    </PageWrapper>
  );
};

export default ProfileInventoryTable;