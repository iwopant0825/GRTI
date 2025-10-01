import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppViewStore } from '../store/viewStore';

function MainTitle() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const isG = i === 0;
      const delay = isG ? 0.55 : 0.7 + (i - 1) * 0.1;
      const duration = isG ? 1.5 : 1.05;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      width="100%"
      viewBox="0 0 323 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: 720 }}
    >
      {/* G */}
      <motion.path
        d="M85.0316 29.781C85.0316 22.3619 82.8495 16.7321 78.4853 12.8916C74.1211 8.96388 67.0511 7 57.2754 7C50.2927 7 42.8299 9.79308 34.8871 15.3792C27.0316 20.8781 20.398 28.2099 14.9865 37.3747C9.66215 46.4522 7 56.0098 7 66.0474C7 74.5139 9.44394 81.6711 14.3318 87.5191C19.2197 93.3672 26.9007 96.2912 37.3747 96.2912C44.6192 96.2912 51.471 94.7637 57.93 91.7088C64.389 88.5665 69.626 84.2024 73.641 78.6162C77.6561 72.9428 79.6636 66.4402 79.6636 59.1083C79.6636 56.3153 79.4454 54.0459 79.009 52.3002C78.5726 50.4672 77.4815 48.9398 75.7359 47.7178C74.0775 46.4086 71.459 45.7539 67.8803 45.7539C63.6907 45.7539 58.7155 46.2776 52.9548 47.325C47.2814 48.3724 42.2626 49.4635 37.8984 50.5982"
        stroke="#159950"
        strokeWidth={13}
        strokeLinecap="round"
        variants={draw}
        custom={0}
      />
      {/* R - 전체를 하나의 연속 경로로 */}
      <motion.path
        d="M108 93.6932 L118.053 53.1932 L125.5 23.1932 C127 11.1932 173.5 -0.306768 173.5 28.6932 C173.5 44.0477 157.309 50.4666 141 52.6172 L168.5 96.1934"
        stroke="#159950"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={1}
      />
      {/* T - 상단 바 (좌→우) */}
      <motion.path
        d="M197 15L257 11"
        stroke="#159950"
        strokeWidth={14}
        strokeLinecap="round"
        variants={draw}
        custom={2}
      />
      {/* T - 세로 기둥 */}
      <motion.path
        d="M227 13L207.5 101.5"
        stroke="#159950"
        strokeWidth={14}
        strokeLinecap="round"
        variants={draw}
        custom={3}
      />
      {/* I - 상단 바 (좌→우) */}
      <motion.path
        d="M277 17.5854L316 11"
        stroke="#159950"
        strokeWidth={14}
        strokeLinecap="round"
        variants={draw}
        custom={4}
      />
      {/* I - 중심 기둥 */}
      <motion.path
        d="M281.5 97.7073L296.5 14.2927"
        stroke="#159950"
        strokeWidth={14}
        strokeLinecap="round"
        variants={draw}
        custom={5}
      />
      {/* I - 하단 바 (좌→우) */}
      <motion.path
        d="M261 101L301 94.9634"
        stroke="#159950"
        strokeWidth={14}
        strokeLinecap="round"
        variants={draw}
        custom={6}
      />
    </motion.svg>
  );
}

export function StartScreen() {
  const setView = useAppViewStore((s) => s.setView);
  const loaded = useAppViewStore((s) => s.loaded);
  const progress = useAppViewStore((s) => s.progress);

  const handleStart = () => {
    if (!loaded) return;
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
        <Title aria-label="GRTI logo title">
          <MainTitle />
        </Title>
        {!loaded && (
          <ProgressWrap
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
          >
            <ProgressBar>
              <ProgressFill style={{ width: `${progress}%` }} />
            </ProgressBar>
            <ProgressText>{progress}%</ProgressText>
          </ProgressWrap>
        )}
        <Sub>우리집에서 시작하는 교체 여행. 찾고, 바꾸고, 배우고, 공유하세요.</Sub>
        <CTA>
          <StartButton
            whileHover={loaded ? { scale: 1.02 } : undefined}
            whileTap={loaded ? { scale: 0.98 } : undefined}
            disabled={!loaded}
            onClick={handleStart}
          >
            {loaded ? '시작하기' : '로딩 중...'}
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
  z-index: 2;
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
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  justify-self: center;
  align-items: center;
  text-align: center;
`;

const Kicker = styled.span`
  color: #ffffff;
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
  color: #ffffff;
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
  opacity: ${(p) => ((p as any).disabled ? 0.6 : 1)};
  cursor: ${(p) => ((p as any).disabled ? 'not-allowed' : 'pointer')};
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

const ProgressWrap = styled(motion.div)`
  display: grid;
  gap: 10px;
  margin: 8px 0 12px;
  place-items: center;
`;

const ProgressBar = styled.div`
  width: min(420px, 60vw);
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.28);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00d084, #00b478);
  border-radius: inherit;
  transition: width 0.2s ease;
`;

const ProgressText = styled.span`
  color: #e6eeeb;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;
