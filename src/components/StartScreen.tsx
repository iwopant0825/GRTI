import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppViewStore } from '../store/viewStore';

export function StartScreen() {
  const setView = useAppViewStore((s) => s.setView);

  const handleStart = () => {
    setView('scene');
    const canvas = document.querySelector('canvas');
    canvas?.requestPointerLock?.();
  };

  return (
    <Root initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Backdrop />
      <Header>
        <Brand>
          <Logo />
          GRTI
        </Brand>
      </Header>
      <Hero
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <Kicker>믿고 바꾸는 재활용 제품, GR</Kicker>
        <Title>환경보호, GR과 함께</Title>
        <Sub>우리집에서 시작하는 교체 여행. 찾고, 바꾸고, 배우고, 공유하세요.</Sub>
        <CTA>
          <StartButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
          >
            시작하기
          </StartButton>
        </CTA>
      </Hero>

      <Guide>
        <GuideRow>
          <KeyRow>
            <Keycap>W</Keycap>
            <Keycap>A</Keycap>
            <Keycap>S</Keycap>
            <Keycap>D</Keycap>
          </KeyRow>
          <GuideLabel>이동</GuideLabel>
        </GuideRow>
        <GuideRow>
          <Keycap wide>Space</Keycap>
          <GuideLabel>점프</GuideLabel>
        </GuideRow>
        <GuideRow>
          <MouseBox>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="7"
                y="2"
                width="10"
                height="20"
                rx="5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line x1="12" y1="6" x2="12" y2="11" stroke="currentColor" strokeWidth="2" />
            </svg>
          </MouseBox>
          <GuideLabel>시점 변경</GuideLabel>
        </GuideRow>
      </Guide>
    </Root>
  );
}

const Root = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: auto;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 6vh 6vw;
  place-items: stretch;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(8px) saturate(0.9);
  background: radial-gradient(60% 60% at 20% 20%, rgba(10, 12, 14, 0.4), rgba(10, 12, 14, 0.28));
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #d7e6e1;
  font-weight: 700;
`;

const Logo = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: linear-gradient(180deg, #00d084, #00b478);
  box-shadow: 0 0 0 4px rgba(0, 208, 132, 0.12);
  display: inline-block;
`;

const Hero = styled(motion.section)`
  position: relative;
  max-width: 820px;
  color: #e9f1ee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  justify-self: center;
  align-items: center;
  text-align: center;
`;

const Kicker = styled.span`
  color: #93b8ad;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: 13px;
`;

const Title = styled.h1`
  margin: 10px 0 8px;
  font-size: clamp(36px, 6vw, 56px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.2px;
`;

const Sub = styled.p`
  margin: 0 0 18px;
  color: #c9d7d2;
  font-size: 15px;
`;

const CTA = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const StartButton = styled(motion.button)`
  padding: 13px 20px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(0, 208, 132, 0.95), rgba(0, 180, 120, 0.95));
  color: #082014;
  font-weight: 800;
  border: none;
  cursor: pointer;
`;

const Guide = styled.div`
  position: absolute;
  left: clamp(16px, 4vw, 40px);
  bottom: clamp(16px, 4vh, 40px);
  display: grid;
  gap: 10px;
  color: #7f8d88;
`;

const GuideRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const KeyRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Keycap = styled.span<{ wide?: boolean }>`
  min-width: ${(p) => (p.wide ? 68 : 36)}px;
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #e6eeeb;
  display: grid;
  place-items: center;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const MouseBox = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #ffffff;
  display: grid;
  place-items: center;
`;

const GuideLabel = styled.span`
  color: #ffffff;
  font-size: 14px;
`;
