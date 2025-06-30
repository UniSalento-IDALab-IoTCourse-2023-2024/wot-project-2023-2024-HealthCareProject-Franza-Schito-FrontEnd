import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled, { keyframes } from 'styled-components';
import 'react-calendar/dist/Calendar.css';

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
  min-height: 100vh;
  width: 100vw;
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
    pointer-events: none;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 1500px;
  min-width: 1000px;
  max-width: 2000px;
  margin: 3rem auto 0 auto;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
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

const StyledCalendar = styled(Calendar)`
  background: rgba(255,255,255,0.07);
  border-radius: 16px;
  border: 1px solid rgba(0,212,255,0.13);
  box-shadow: 0 2px 12px rgba(0,212,255,0.07);
  color: #fff;
  padding: 1.5rem;
  font-size: 1.1rem;
  margin: 0 auto;
  width: 100%;

  abbr[title] {
    text-decoration: none;
    color: #00d4ff;
    font-weight: 600;
  }

  .react-calendar__navigation {
    margin-bottom: 1rem;
    button {
      background: none;
      color: #00d4ff;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 8px;
      border: none;
      transition: background 0.2s;
      &:hover, &:focus {
        background: rgba(0,212,255,0.08);
        color: #fff;
      }
    }
  }

  .react-calendar__tile {
    background: none;
    border-radius: 8px;
    color: #fff;
    transition: background 0.2s, color 0.2s;
    &:hover, &:focus {
      background: rgba(0,212,255,0.13);
      color: #00d4ff;
    }
  }

  .react-calendar__tile--active,
  .react-calendar__tile--now {
    background: linear-gradient(45deg, #00d4ff, #0099cc);
    color: #fff;
    font-weight: 700;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #ff6384;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd,
  .react-calendar__tile--range {
    background: rgba(0,212,255,0.18);
    color: #fff;
  }
`;

function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <PageWrapper>
      <Card>
        <Title>Calendario Attività</Title>
        <StyledCalendar
          onChange={setDate}
          value={date}
        />
      </Card>
    </PageWrapper>
  );
}

export default CalendarPage;