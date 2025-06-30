import React, { useEffect, useState } from "react";
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

const shimmer = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
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

const ProfileContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem 1.5rem;
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

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #00d4ff;
  margin: 0 auto 12px auto;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,212,255,0.08);
  animation: ${pulseGlow} 2.5s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.7rem;
  color: #ffffff;
  background: linear-gradient(45deg, #00d4ff, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
`;

const UserEmail = styled.div`
  font-size: 1rem;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 1rem;
  word-break: break-all;
`;

const Details = styled.div`
  margin-top: 6px;
  margin-bottom: 1.2rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7rem;
  font-size: 0.98rem;
  color: #fff;
  border-bottom: 1px solid rgba(0,212,255,0.08);
  padding-bottom: 0.3rem;
`;

const DetailTitle = styled.span`
  font-weight: 500;
  color: #00d4ff;
`;

const DetailValue = styled.span`
  font-weight: 400;
  color: #fff;
`;

const UserProfile = () => {
  const [apigClient, setApigClient] = useState(null);
  const [user, setUser] = useState({});
  
  useEffect(() => {
    if (window.apigClientFactory) {
      const client = window.apigClientFactory.newClient();
      setApigClient(client);
    }
  }, []);

  useEffect(() => {
    if (apigClient) {
      getProfileData();
    }
    // eslint-disable-next-line
  }, [apigClient]);

  const getProfileData = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.u_id;

    const params = { id: userId, Authorization: `Bearer ${token}` };

    apigClient.apiV1UsersIdGet(params, {}, {})
      .then(result => {
        if (result.data.role === 'Doctor' && result.data.linkedUserId) {
          const linkedParams = { id: result.data.linkedUserId, Authorization: `Bearer ${token}` };
          apigClient.apiV1UsersIdGet(linkedParams, {}, {})
            .then(linkedResult => setUser(linkedResult.data))
            .catch(() => setUser(result.data)); 
        } else {
          setUser(result.data);
        }
      })
      .catch(() => {});
  };

  return (
    <PageWrapper>
      <ProfileContainer>
        <Avatar>
          <span role="img" aria-label="user">👤</span>
        </Avatar>
        <Title>{user.nome} {user.cognome}</Title>
        <UserEmail>{user.email}</UserEmail>
        <Details>
          <DetailRow>
            <DetailTitle>Telefono:</DetailTitle>
            <DetailValue>{user.telephoneNumber}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Sesso:</DetailTitle>
            <DetailValue>{user.sex}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailTitle>Data di nascita:</DetailTitle>
            <DetailValue>{user.birthdate}</DetailValue>
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
      </ProfileContainer>
    </PageWrapper>
  );
};

export default UserProfile;