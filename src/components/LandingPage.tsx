import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MainTitle } from './StartScreen';
import { useAppViewStore } from '../store/viewStore';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export function LandingPage() {
  const setView = useAppViewStore((s) => s.setView);

  const goExplore3D = () => {
    setView('scene');
    const canvas = document.querySelector('canvas');
    canvas?.requestPointerLock?.();
  };

  return (
    <Root>
      {/* 미니멀 헤더 */}
      <Header>
        <HeaderInner>
          <LogoBadge>GR</LogoBadge>
          <Nav>
            <NavDot />
            <NavLink href="#about">소개</NavLink>
            <NavDot />
            <NavLink href="#value">가치</NavLink>
            <NavDot />
            <NavLink href="#data">데이터</NavLink>
          </Nav>
        </HeaderInner>
      </Header>

      {/* 히어로 - 초간결 */}
      <Hero>
        <HeroContent
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <TitleWrap>
            <MainTitle />
          </TitleWrap>
          <Tagline>Good Recycled</Tagline>
          <HeroDesc>정부가 검증한 재활용 제품 인증</HeroDesc>
          <CTARow>
            <PrimaryBtn
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={goExplore3D}
            >
              3D 체험
            </PrimaryBtn>
            <TextBtn as="a" href="#about">
              더 알아보기 →
            </TextBtn>
          </CTARow>
        </HeroContent>
      </Hero>

      {/* What is GR - 핵심 정의 */}
      <Section id="about">
        <Container>
          <SectionLabel
            as={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What is GR?
          </SectionLabel>
          <SectionTitle
            as={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            재활용 원료를 사용한 제품 중<br />
            품질과 안전성을 국가가 보증합니다
          </SectionTitle>
          <Divider />
          <ThreeCol>
            <ColCard
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ColNum>01</ColNum>
              <ColTitle>공인 인증</ColTitle>
              <ColText>환경부와 자원순환산업인증원의 6단계 심사를 통과한 제품</ColText>
            </ColCard>
            <ColCard
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <ColNum>02</ColNum>
              <ColTitle>재활용 원료</ColTitle>
              <ColText>폐기물을 재활용한 원료를 일정 비율 이상 사용</ColText>
            </ColCard>
            <ColCard
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <ColNum>03</ColNum>
              <ColTitle>품질 보증</ColTitle>
              <ColText>공인 시험기관의 성능·안전·내구성 시험 통과</ColText>
            </ColCard>
          </ThreeCol>
        </Container>
      </Section>

      {/* Value - 환경적·경제적 가치 */}
      <Section id="value" style={{ background: '#FAFBFC' }}>
        <Container>
          <SectionLabel
            as={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Value
          </SectionLabel>
          <SectionTitle
            as={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            환경과 경제, 두 가지 가치
          </SectionTitle>
          <Divider />
          <StatGrid>
            <StatCard
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <StatNumber>75%</StatNumber>
              <StatLabel>평균 재활용 원료 비율</StatLabel>
            </StatCard>
            <StatCard
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <StatNumber>40%</StatNumber>
              <StatLabel>탄소 배출 감소</StatLabel>
            </StatCard>
            <StatCard
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <StatNumber>50만톤</StatNumber>
              <StatLabel>연간 폐기물 재활용</StatLabel>
            </StatCard>
          </StatGrid>
          <BenefitsList
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <BenefitTag>공공기관 우선구매</BenefitTag>
            <BenefitTag>조달청 입찰가점</BenefitTag>
            <BenefitTag>친환경건축물 인증연계</BenefitTag>
          </BenefitsList>
        </Container>
      </Section>

      {/* Process - 초간결 타임라인 */}
      <Section>
        <Container>
          <SectionLabel
            as={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Process
          </SectionLabel>
          <SectionTitle
            as={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            6단계 인증 프로세스
          </SectionTitle>
          <Divider />
          <ProcessList>
            {['신청', '서류심사', '현장심사', '제품시험', '종합심의', '인증수여'].map((t, i) => (
              <ProcessItem
                key={i}
                as={motion.div}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ProcessNum>{i + 1}</ProcessNum>
                <ProcessText>{t}</ProcessText>
              </ProcessItem>
            ))}
          </ProcessList>
          <ProcessMeta
            as={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            유효기간 4년 · 연 1회 사후관리
          </ProcessMeta>
        </Container>
      </Section>

      {/* Data - 차트 + 카테고리 */}
      <Section id="data" style={{ background: '#FAFBFC' }}>
        <Container>
          <SectionLabel
            as={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Data
          </SectionLabel>
          <SectionTitle
            as={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            인증 제품 현황
          </SectionTitle>
          <Divider />
          <ChartBox
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Bar
              data={{
                labels: ['플라스틱', '목재', '유리', '금속', '지류', '기타'],
                datasets: [
                  {
                    label: '인증 제품 수',
                    data: [28, 18, 12, 10, 14, 8],
                    backgroundColor: '#000000',
                    borderRadius: 4,
                    barThickness: 32
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: '#000000',
                    padding: 12,
                    displayColors: false,
                    titleFont: { size: 13, weight: 600 },
                    bodyFont: { size: 12 }
                  }
                },
                scales: {
                  x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { color: '#71717A', font: { size: 11, weight: 500 } }
                  },
                  y: {
                    grid: { color: '#F4F4F5' },
                    border: { display: false },
                    ticks: { color: '#71717A', font: { size: 11 }, stepSize: 10 }
                  }
                }
              }}
            />
          </ChartBox>
          <CategoryGrid
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <CategoryCol>
              <CategoryTitle>건설자재</CategoryTitle>
              <CategoryItems>유리대리석 · 콘크리트벽돌 · 합성목재</CategoryItems>
            </CategoryCol>
            <CategoryCol>
              <CategoryTitle>생활용품</CategoryTitle>
              <CategoryItems>분리수거함 · 세탁비누 · 섬유제품</CategoryItems>
            </CategoryCol>
            <CategoryCol>
              <CategoryTitle>산업재</CategoryTitle>
              <CategoryItems>전기통신맨홀 · 트레드타이어 · 카운터웨이트</CategoryItems>
            </CategoryCol>
            <CategoryCol>
              <CategoryTitle>사무지류</CategoryTitle>
              <CategoryItems>전자복사용지 · 사무용품 · 재생섬유</CategoryItems>
            </CategoryCol>
          </CategoryGrid>
        </Container>
      </Section>

      {/* FAQ - 초간결 */}
      <Section>
        <Container>
          <SectionLabel
            as={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            FAQ
          </SectionLabel>
          <SectionTitle
            as={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            자주 묻는 질문
          </SectionTitle>
          <Divider />
          <FAQList>
            {[
              {
                q: 'GR 인증 제품의 품질은?',
                a: '공인 시험기관의 성능·안전·내구성 시험 통과 및 KS 표준 충족. 연 1회 사후관리로 지속 확인.'
              },
              {
                q: '일반 소비자 혜택은?',
                a: '검증된 재활용 제품을 합리적 가격에 구매하며 환경 보호 기여. 공공기관은 의무구매 대상.'
              },
              {
                q: '환경표지와 차이는?',
                a: 'GR은 재활용 원료와 품질 중심, 환경표지는 전 생애주기 환경 영향 평가. 모두 친환경 인증.'
              },
              {
                q: '인증 제품 확인 방법은?',
                a: 'GR 공식 사이트(gr.or.kr)에서 인증번호 조회. 제품 포장 GR 마크 확인.'
              }
            ].map((faq, i) => (
              <FAQItem
                key={i}
                as={motion.div}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <FAQQ>Q. {faq.q}</FAQQ>
                <FAQA>{faq.a}</FAQA>
              </FAQItem>
            ))}
          </FAQList>
        </Container>
      </Section>

      {/* Footer - 미니멀 */}
      <Footer>
        <FooterInner>
          <FooterRow>
            <LogoBadge>GR</LogoBadge>
            <FooterLinks>
              <FooterLink href="http://gr.or.kr" target="_blank" rel="noopener noreferrer">
                공식사이트
              </FooterLink>
              <FooterLink href="http://spt.kr" target="_blank" rel="noopener noreferrer">
                인증신청
              </FooterLink>
            </FooterLinks>
          </FooterRow>
          <FooterDivider />
          <FooterNotice>본 사이트는 GR 홍보 공모전 출품작입니다 (비공식)</FooterNotice>
          <FooterCopy>© 2025 GR Innovation · 환경부 자원순환산업인증원 GR 제도 홍보</FooterCopy>
        </FooterInner>
      </Footer>
    </Root>
  );
}

// ============ Styled Components ============

const Root = styled.main`
  position: absolute;
  inset: 0;
  overflow: auto;
  background: #ffffff;
  color: #18181b;
`;

// Header
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #f4f4f5;
  z-index: 100;
  @media (max-width: 768px) {
    backdrop-filter: blur(16px);
  }
`;

const HeaderInner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 20px 24px;
  }
  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

const LogoBadge = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: #18181b;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavDot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #d4d4d8;
`;

const NavLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #71717a;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #18181b;
  }
`;

// Hero
const Hero = styled.section`
  max-width: 1080px;
  margin: 0 auto;
  padding: 200px 32px 160px;
  @media (max-width: 968px) {
    padding: 160px 32px 120px;
  }
  @media (max-width: 768px) {
    padding: 140px 24px 100px;
  }
  @media (max-width: 480px) {
    padding: 120px 20px 80px;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
`;

const TitleWrap = styled.div`
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const Tagline = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #71717a;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 1.5px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
    letter-spacing: 1.2px;
  }
`;

const HeroDesc = styled.p`
  font-size: 20px;
  color: #52525b;
  font-weight: 400;
  line-height: 1.6;
  margin: 0 0 40px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
    margin: 0 0 32px;
  }
`;

const CTARow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PrimaryBtn = styled(motion.button)`
  padding: 16px 40px;
  border-radius: 8px;
  background: #18181b;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  letter-spacing: -0.2px;
  transition: all 0.2s;
  @media (max-width: 640px) {
    width: 100%;
    max-width: 280px;
  }
  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 14px;
  }
`;

const TextBtn = styled(motion.a)`
  font-size: 15px;
  font-weight: 600;
  color: #52525b;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #18181b;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Section
const Section = styled.section`
  padding: 120px 32px;
  @media (max-width: 968px) {
    padding: 100px 32px;
  }
  @media (max-width: 768px) {
    padding: 80px 24px;
  }
  @media (max-width: 480px) {
    padding: 60px 20px;
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #a1a1aa;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    font-size: 11px;
    letter-spacing: 1.2px;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 700;
  line-height: 1.3;
  color: #18181b;
  margin: 0 0 32px;
  letter-spacing: -0.5px;
  @media (max-width: 480px) {
    margin: 0 0 24px;
    line-height: 1.4;
  }
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: #18181b;
  margin-bottom: 60px;
  @media (max-width: 768px) {
    margin-bottom: 48px;
  }
  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
`;

// Three Column
const ThreeCol = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  @media (max-width: 480px) {
    gap: 32px;
  }
`;

const ColCard = styled.div`
  padding: 0;
`;

const ColNum = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #a1a1aa;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 12px;
  }
`;

const ColTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #18181b;
  margin: 0 0 12px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 17px;
  }
`;

const ColText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #52525b;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;

// Stats
const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 48px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }
`;

const StatCard = styled.div`
  padding: 40px 0;
  text-align: center;
  border: 1px solid #f4f4f5;
  border-radius: 8px;
  @media (max-width: 480px) {
    padding: 32px 0;
  }
`;

const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #18181b;
  margin-bottom: 8px;
  letter-spacing: -1px;
  @media (max-width: 768px) {
    font-size: 44px;
  }
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

const StatLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #71717a;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const BenefitsList = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const BenefitTag = styled.div`
  padding: 10px 20px;
  border-radius: 6px;
  background: #fafafa;
  border: 1px solid #f4f4f5;
  font-size: 13px;
  font-weight: 600;
  color: #52525b;
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

// Process
const ProcessList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }
`;

const ProcessItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border: 1px solid #f4f4f5;
  border-radius: 8px;
  @media (max-width: 480px) {
    padding: 20px;
    gap: 14px;
  }
`;

const ProcessNum = styled.div`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: #18181b;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }
`;

const ProcessText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #18181b;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ProcessMeta = styled.div`
  text-align: center;
  font-size: 14px;
  color: #71717a;
  font-weight: 500;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// Chart
const ChartBox = styled.div`
  height: 320px;
  padding: 40px;
  border: 1px solid #f4f4f5;
  border-radius: 8px;
  margin-bottom: 48px;
  @media (max-width: 768px) {
    padding: 28px;
    height: 280px;
  }
  @media (max-width: 480px) {
    padding: 20px;
    height: 240px;
    margin-bottom: 40px;
  }
`;

// Category
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const CategoryCol = styled.div`
  padding: 24px;
  border: 1px solid #f4f4f5;
  border-radius: 8px;
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const CategoryTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: #18181b;
  margin: 0 0 12px;
  @media (max-width: 480px) {
    font-size: 13px;
    margin: 0 0 10px;
  }
`;

const CategoryItems = styled.div`
  font-size: 13px;
  line-height: 1.7;
  color: #71717a;
  font-weight: 500;
  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 1.6;
  }
`;

// FAQ
const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const FAQItem = styled.div`
  padding: 28px;
  border: 1px solid #f4f4f5;
  border-radius: 8px;
  transition: all 0.2s;
  &:hover {
    border-color: #e4e4e7;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }
  @media (max-width: 768px) {
    padding: 24px;
  }
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const FAQQ = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #18181b;
  margin-bottom: 12px;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const FAQA = styled.div`
  font-size: 14px;
  line-height: 1.7;
  color: #52525b;
  font-weight: 400;
  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.6;
  }
`;

// Footer
const Footer = styled.footer`
  background: #fafafa;
  border-top: 1px solid #f4f4f5;
  padding: 60px 32px;
  @media (max-width: 768px) {
    padding: 48px 24px;
  }
  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const FooterInner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const FooterLink = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: #71717a;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #18181b;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background: #f4f4f5;
  margin-bottom: 24px;
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const FooterNotice = styled.div`
  font-size: 12px;
  color: #a1a1aa;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 500;
  @media (max-width: 480px) {
    font-size: 11px;
    line-height: 1.5;
  }
`;

const FooterCopy = styled.div`
  font-size: 11px;
  color: #d4d4d8;
  text-align: center;
  font-weight: 400;
  line-height: 1.6;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
