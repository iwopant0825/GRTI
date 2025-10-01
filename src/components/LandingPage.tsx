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
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// SVG 아이콘 컴포넌트들
const RecycleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 16V10H20L16 4L12 10H15V14M7 14V8H4L8 2L12 8H9V12M12 22L8 16H11V12H13V16H16L12 22Z"
      stroke="#00B478"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#00B478" strokeWidth="1.5" />
    <path
      d="M12 3C8.5 3 6 7.5 6 12C6 16.5 8.5 21 12 21M12 3C15.5 3 18 7.5 18 12C18 16.5 15.5 21 12 21M12 3V21M3 12H21"
      stroke="#00B478"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const LeafIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path
      d="M6.05 17.95C5.37 17.27 4.78 16.5 4.29 15.66C2.68 12.91 2.68 9.58 4.29 6.83C4.78 5.99 5.37 5.22 6.05 4.54C6.73 3.86 7.5 3.27 8.34 2.78C11.09 1.17 14.42 1.17 17.17 2.78C18.01 3.27 18.78 3.86 19.46 4.54"
      stroke="#00B478"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M7 17L17 7M17 7V14M17 7H10" stroke="#00B478" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 12L11 14L15 10M20.618 5.984A11.955 11.955 0 0112 4c-2.95 0-5.686 1.065-7.788 2.828M3.382 18.016A11.955 11.955 0 0012 20c2.95 0 5.686-1.065 7.788-2.828"
      stroke="#00B478"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 2L4 6v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z"
      stroke="#00B478"
      strokeWidth="1.5"
    />
  </svg>
);

const BuildingIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7M9 9H9.01M9 12H9.01M9 15H9.01M9 18H9.01"
      stroke="#00B478"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const SchoolIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 14L21 9L12 4L3 9L12 14ZM12 14L18.16 10.68C18.69 12.19 19 13.81 19 15.5C19 16.14 18.95 16.77 18.86 17.39M12 14V21.5M6 11.5V16.5C6 16.5 9 19 12 19C15 19 18 16.5 18 16.5V11.5"
      stroke="#00B478"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const InfraIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 15L9 9L13 13L21 5M21 5H15M21 5V11M9 21H15M12 3V8M4.22 4.22L7.76 7.76M19.78 4.22L16.24 7.76"
      stroke="#00B478"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function LandingPage() {
  const setView = useAppViewStore((s) => s.setView);

  const goExplore3D = () => {
    setView('scene');
    const canvas = document.querySelector('canvas');
    canvas?.requestPointerLock?.();
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5 }
  };

  return (
    <Root>
      <Header>
        <HeaderInner>
          <Logo>
            <LogoMark />
            <LogoText>GR Innovation</LogoText>
          </Logo>
          <Nav>
            <NavLink href="#intro">소개</NavLink>
            <NavLink href="#benefits">혜택</NavLink>
            <NavLink href="#process">절차</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
          </Nav>
        </HeaderInner>
      </Header>

      <Hero>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Badge
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            정부 공식 재활용 제품 인증
          </Badge>
          <HeroTitle>
            <MainTitle />
          </HeroTitle>
          <HeroSubtitle>
            재활용 원료 사용과 품질·안전성을 국가가 검증한 Good Recycled 인증 제품
          </HeroSubtitle>
          <HeroCTA>
            <PrimaryButton
              whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(0, 180, 120, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={goExplore3D}
            >
              <ButtonIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M10 8L15 12L10 16V8Z" fill="currentColor" />
                </svg>
              </ButtonIcon>
              GR 제품 3D 체험하기
            </PrimaryButton>
            <SecondaryButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              as="a"
              href="#intro"
            >
              자세히 알아보기
            </SecondaryButton>
          </HeroCTA>
        </HeroContent>
        <HeroVisual>
          <FloatingCard
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" fill="#E8F5F0" />
              <path
                d="M100 30C115 30 127 42 127 57V100L150 123L127 146V170C127 185 115 197 100 197C85 197 73 185 73 170V146L50 123L73 100V57C73 42 85 30 100 30Z"
                fill="url(#heroGrad)"
              />
              <circle cx="100" cy="100" r="20" fill="#ffffff" opacity="0.9" />
              <defs>
                <linearGradient id="heroGrad" x1="100" y1="30" x2="100" y2="197">
                  <stop offset="0%" stopColor="#00D084" />
                  <stop offset="100%" stopColor="#00B478" />
                </linearGradient>
              </defs>
            </svg>
          </FloatingCard>
        </HeroVisual>
      </Hero>

      <Section id="intro">
        <Container>
          <SectionHeader {...fadeInUp}>
            <SectionTitle>GR 인증이란?</SectionTitle>
            <SectionDesc>Good Recycled - 믿을 수 있는 재활용 제품의 표준</SectionDesc>
          </SectionHeader>
          <FeatureGrid>
            <FeatureCard {...fadeInUp} transition={{ delay: 0.1, duration: 0.5 }}>
              <FeatureIconWrap>
                <CheckShieldIcon />
              </FeatureIconWrap>
              <FeatureTitle>정부 공인 인증</FeatureTitle>
              <FeatureDesc>
                환경부와 자원순환산업인증원이 직접 심사하고 검증하는 공식 인증 제도입니다.
              </FeatureDesc>
            </FeatureCard>
            <FeatureCard {...fadeInUp} transition={{ delay: 0.2, duration: 0.5 }}>
              <FeatureIconWrap>
                <RecycleIcon />
              </FeatureIconWrap>
              <FeatureTitle>재활용 원료 활용</FeatureTitle>
              <FeatureDesc>
                폐기물을 재활용한 원료를 일정 비율 이상 사용하여 자원 순환에 기여합니다.
              </FeatureDesc>
            </FeatureCard>
            <FeatureCard {...fadeInUp} transition={{ delay: 0.3, duration: 0.5 }}>
              <FeatureIconWrap>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="#00B478"
                    strokeWidth="2"
                    fill="#E8F5F0"
                  />
                </svg>
              </FeatureIconWrap>
              <FeatureTitle>엄격한 품질 보증</FeatureTitle>
              <FeatureDesc>
                공인 시험기관의 성능·안전·내구성 시험을 통과한 제품만 인증받습니다.
              </FeatureDesc>
            </FeatureCard>
          </FeatureGrid>
        </Container>
      </Section>

      <Section id="benefits" style={{ background: '#F8FDFB' }}>
        <Container>
          <SectionHeader {...fadeInUp}>
            <SectionTitle>인증 혜택 및 가치</SectionTitle>
            <SectionDesc>GR 인증이 제공하는 경제적·환경적 이점</SectionDesc>
          </SectionHeader>
          <TwoColumnGrid>
            <BenefitsColumn>
              <ColumnTitle>경제적 혜택</ColumnTitle>
              <BenefitsList>
                <BenefitItem {...fadeInUp} transition={{ delay: 0.1, duration: 0.5 }}>
                  <BenefitIcon>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#00B478"
                        strokeWidth="2"
                      />
                    </svg>
                  </BenefitIcon>
                  <BenefitContent>
                    <BenefitTitle>공공기관 우선 구매</BenefitTitle>
                    <BenefitDesc>녹색제품 의무구매 제도 대상 포함</BenefitDesc>
                  </BenefitContent>
                </BenefitItem>
                <BenefitItem {...fadeInUp} transition={{ delay: 0.2, duration: 0.5 }}>
                  <BenefitIcon>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#00B478"
                        strokeWidth="2"
                      />
                    </svg>
                  </BenefitIcon>
                  <BenefitContent>
                    <BenefitTitle>조달청 입찰 가점</BenefitTitle>
                    <BenefitDesc>계약 이행능력 심사 및 MAS 사전심사 시 우대</BenefitDesc>
                  </BenefitContent>
                </BenefitItem>
                <BenefitItem {...fadeInUp} transition={{ delay: 0.3, duration: 0.5 }}>
                  <BenefitIcon>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#00B478"
                        strokeWidth="2"
                      />
                    </svg>
                  </BenefitIcon>
                  <BenefitContent>
                    <BenefitTitle>친환경 건축물 인증 연계</BenefitTitle>
                    <BenefitDesc>친환경 건설자재 인정 및 가점 부여</BenefitDesc>
                  </BenefitContent>
                </BenefitItem>
              </BenefitsList>
            </BenefitsColumn>
            <BenefitsColumn>
              <ColumnTitle>환경적 가치</ColumnTitle>
              <ValueCards>
                <ValueCard {...fadeInUp} transition={{ delay: 0.1, duration: 0.5 }}>
                  <ValueIconWrap>
                    <RecycleIcon />
                  </ValueIconWrap>
                  <ValueStatNum>75%</ValueStatNum>
                  <ValueStatLabel>평균 재활용 원료 비율</ValueStatLabel>
                </ValueCard>
                <ValueCard {...fadeInUp} transition={{ delay: 0.2, duration: 0.5 }}>
                  <ValueIconWrap>
                    <GlobeIcon />
                  </ValueIconWrap>
                  <ValueStatNum>40%</ValueStatNum>
                  <ValueStatLabel>평균 탄소 배출 감소</ValueStatLabel>
                </ValueCard>
                <ValueCard {...fadeInUp} transition={{ delay: 0.3, duration: 0.5 }}>
                  <ValueIconWrap>
                    <LeafIcon />
                  </ValueIconWrap>
                  <ValueStatNum>50만톤</ValueStatNum>
                  <ValueStatLabel>연간 폐기물 재활용량</ValueStatLabel>
                </ValueCard>
              </ValueCards>
            </BenefitsColumn>
          </TwoColumnGrid>
        </Container>
      </Section>

      <Section id="process">
        <Container>
          <SectionHeader {...fadeInUp}>
            <SectionTitle>인증 프로세스</SectionTitle>
            <SectionDesc>신청부터 인증까지 6단계 심사 절차</SectionDesc>
          </SectionHeader>
          <ProcessGrid>
            {[
              { title: '신청', desc: '신청서 및 관련 서류 제출' },
              { title: '서류 심사', desc: '기술 및 환경친화성 평가' },
              { title: '현장 심사', desc: '원료·공정·품질관리 점검' },
              { title: '제품 시험', desc: '공인 기관 품질·안전 시험' },
              { title: '종합 심의', desc: '심의위원회 최종 평가' },
              { title: '인증 수여', desc: '인증서 발급 (유효 4년)' }
            ].map((step, i) => (
              <ProcessCard
                key={i}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProcessNumber>{String(i + 1).padStart(2, '0')}</ProcessNumber>
                <ProcessTitle>{step.title}</ProcessTitle>
                <ProcessDesc>{step.desc}</ProcessDesc>
              </ProcessCard>
            ))}
          </ProcessGrid>
          <ProcessNote {...fadeInUp}>
            <strong>유효기간:</strong> 인증일로부터 4년 (재심사 통해 연장 가능) ·{' '}
            <strong>사후관리:</strong> 연 1회 정기 점검
          </ProcessNote>
        </Container>
      </Section>

      <Section style={{ background: '#F8FDFB' }}>
        <Container>
          <SectionHeader {...fadeInUp}>
            <SectionTitle>인증 제품 분야 및 현황</SectionTitle>
            <SectionDesc>다양한 산업 분야에서 활용되는 GR 인증 제품</SectionDesc>
          </SectionHeader>
          <ChartsGrid>
            <ChartWrapper {...fadeInUp} transition={{ delay: 0.1, duration: 0.5 }}>
              <ChartTitle>주요 카테고리별 인증 제품 수</ChartTitle>
              <ChartContainer>
                <Bar
                  data={{
                    labels: ['플라스틱', '목재', '유리', '금속', '지류', '기타'],
                    datasets: [
                      {
                        label: '인증 제품 수',
                        data: [28, 18, 12, 10, 14, 8],
                        backgroundColor: '#00D084',
                        borderRadius: 8
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: '#1a1a1a',
                        padding: 12,
                        titleFont: { size: 14 },
                        bodyFont: { size: 13 }
                      }
                    },
                    scales: {
                      x: {
                        grid: { display: false },
                        ticks: { color: '#4a5568', font: { size: 12 } }
                      },
                      y: {
                        grid: { color: '#e2e8f0' },
                        ticks: { color: '#4a5568', font: { size: 12 } }
                      }
                    }
                  }}
                />
              </ChartContainer>
            </ChartWrapper>
            <ChartWrapper {...fadeInUp} transition={{ delay: 0.2, duration: 0.5 }}>
              <ChartTitle>인증 혜택 활용 비율</ChartTitle>
              <ChartContainer>
                <Doughnut
                  data={{
                    labels: ['공공구매', '입찰 가점', '우수제품 근거', '건축물인증'],
                    datasets: [
                      {
                        data: [35, 25, 22, 18],
                        backgroundColor: ['#00D084', '#00B478', '#159950', '#0a7846'],
                        borderWidth: 0
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { color: '#4a5568', padding: 15, font: { size: 12 } }
                      },
                      tooltip: {
                        backgroundColor: '#1a1a1a',
                        padding: 12
                      }
                    }
                  }}
                />
              </ChartContainer>
            </ChartWrapper>
          </ChartsGrid>
          <CategoryGrid style={{ marginTop: '48px' }}>
            {[
              {
                title: '건설 자재',
                items: ['폐유리 유리대리석', '폐요업 콘크리트 벽돌', '폐목재 합성목재']
              },
              {
                title: '생활용품',
                items: ['폐플라스틱 분리수거함', '폐식용유 세탁비누', '폐섬유 제품']
              },
              {
                title: '산업재',
                items: ['전기통신 맨홀', '트레드 타이어', '카운터웨이트']
              },
              {
                title: '사무·지류',
                items: ['전자복사용지', '사무용품', '재생 섬유 제품']
              }
            ].map((cat, i) => (
              <CategoryCard
                key={i}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <CategoryTitle>{cat.title}</CategoryTitle>
                <CategoryList>
                  {cat.items.map((item, j) => (
                    <CategoryItem key={j}>
                      <CategoryDot />
                      {item}
                    </CategoryItem>
                  ))}
                </CategoryList>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader {...fadeInUp}>
            <SectionTitle>실제 활용 사례</SectionTitle>
            <SectionDesc>공공·민간 프로젝트에서 사용된 GR 인증 제품</SectionDesc>
          </SectionHeader>
          <CasesGrid>
            <CaseCard {...fadeInUp} transition={{ delay: 0.1, duration: 0.5 }}>
              <CaseIconWrap>
                <BuildingIcon />
              </CaseIconWrap>
              <CaseTitle>공공건물 리모델링</CaseTitle>
              <CaseDesc>
                재활용 콘크리트 벽돌, 합성목재 바닥재 등을 활용한 관공서 친환경 개보수
              </CaseDesc>
              <CaseTags>
                <CaseTag>건축자재</CaseTag>
                <CaseTag>공공구매</CaseTag>
              </CaseTags>
            </CaseCard>
            <CaseCard {...fadeInUp} transition={{ delay: 0.2, duration: 0.5 }}>
              <CaseIconWrap>
                <SchoolIcon />
              </CaseIconWrap>
              <CaseTitle>학교 가구 교체</CaseTitle>
              <CaseDesc>
                폐목재 재활용 책상·의자, 재생 플라스틱 사물함 등을 도입한 친환경 교육 환경 조성
              </CaseDesc>
              <CaseTags>
                <CaseTag>가구</CaseTag>
                <CaseTag>교육</CaseTag>
              </CaseTags>
            </CaseCard>
            <CaseCard {...fadeInUp} transition={{ delay: 0.3, duration: 0.5 }}>
              <CaseIconWrap>
                <InfraIcon />
              </CaseIconWrap>
              <CaseTitle>도로 인프라 시설</CaseTitle>
              <CaseDesc>
                재활용 플라스틱 맨홀, 폐고무 트레드 타이어 등을 적용한 자원순환형 공공 인프라
              </CaseDesc>
              <CaseTags>
                <CaseTag>인프라</CaseTag>
                <CaseTag>내구성</CaseTag>
              </CaseTags>
            </CaseCard>
          </CasesGrid>
        </Container>
      </Section>

      <Section id="faq" style={{ background: '#F8FDFB' }}>
        <Container>
          <SectionHeader {...fadeInUp}>
            <SectionTitle>자주 묻는 질문</SectionTitle>
            <SectionDesc>GR 인증에 대한 궁금증 해결</SectionDesc>
          </SectionHeader>
          <FAQList>
            {[
              {
                q: 'GR 인증 제품의 품질은 어떻게 보증되나요?',
                a: '공인 시험기관의 성능·안전·내구성 시험을 통과하고 KS 표준 등 품질 기준을 충족해야만 인증됩니다. 또한 연 1회 정기 사후관리를 통해 지속적으로 품질을 확인합니다.'
              },
              {
                q: 'GR 제품 구매 시 어떤 혜택이 있나요?',
                a: '공공기관은 녹색제품 의무구매 제도에 따라 GR 제품을 우선 구매합니다. 일반 소비자는 검증된 재활용 제품을 합리적 가격에 구매하며 환경 보호에 기여할 수 있습니다.'
              },
              {
                q: 'GR 인증과 환경표지 인증의 차이는 무엇인가요?',
                a: 'GR 인증은 재활용 원료 사용과 품질에 초점을 둔 인증이며, 환경표지는 제품의 전 생애주기 환경 영향을 종합 평가하는 인증입니다. 두 인증 모두 친환경 제품임을 보증합니다.'
              },
              {
                q: '인증 제품을 어디서 확인할 수 있나요?',
                a: 'GR 공식 사이트(gr.or.kr)에서 인증번호 조회가 가능하며, 제품 포장이나 라벨에 표시된 GR 마크와 인증번호를 확인하세요.'
              },
              {
                q: '인증 신청은 어떻게 하나요?',
                a: '자원순환산업인증원에 신청서 및 관련 서류를 제출하면 됩니다. 제품 기술 설명서, 품질 시험 성적서, 재활용 원료 증빙 서류 등이 필요합니다.'
              }
            ].map((faq, i) => (
              <FAQItem
                key={i}
                as={motion.div}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <FAQQuestion>
                  <FAQQIcon>Q</FAQQIcon>
                  {faq.q}
                </FAQQuestion>
                <FAQAnswer>
                  <FAQAIcon>A</FAQAIcon>
                  {faq.a}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQList>
        </Container>
      </Section>

      <Footer>
        <FooterInner>
          <FooterTop>
            <FooterBrand>
              <LogoMark />
              <LogoText>GR Innovation</LogoText>
            </FooterBrand>
            <FooterLinks>
              <FooterLink href="http://gr.or.kr" target="_blank" rel="noopener noreferrer">
                GR 공식 사이트
              </FooterLink>
              <FooterLink href="http://spt.kr" target="_blank" rel="noopener noreferrer">
                인증 신청
              </FooterLink>
            </FooterLinks>
          </FooterTop>
          <FooterDivider />
          <FooterBottom>
            <FooterNotice>
              본 웹사이트는 <strong>GR 홍보 공모전 출품작</strong>으로 제작되었으며, 공식 GR
              사이트가 아닙니다.
            </FooterNotice>
            <FooterCopy>
              © 2025 GR Innovation Project. 환경부·자원순환산업인증원 GR 인증 제도 홍보를 위한
              비공식 프로젝트입니다.
            </FooterCopy>
          </FooterBottom>
        </FooterInner>
      </Footer>
    </Root>
  );
}

// Styled Components
const Root = styled.main`
  position: absolute;
  inset: 0;
  overflow: auto;
  background: #ffffff;
  color: #1a202c;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoMark = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #00d084, #00b478);
  box-shadow: 0 4px 12px rgba(0, 208, 132, 0.25);
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: #1a202c;
  letter-spacing: -0.5px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 36px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: #4a5568;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #00b478;
  }
`;

const Hero = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding: 80px 32px;
    gap: 60px;
  }
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Badge = styled(motion.span)`
  display: inline-flex;
  align-self: flex-start;
  padding: 10px 20px;
  border-radius: 999px;
  background: linear-gradient(135deg, #e8f5f0, #d4ede3);
  color: #00b478;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(40px, 5vw, 60px);
  line-height: 1.1;
`;

const HeroSubtitle = styled.p`
  margin: 0;
  font-size: 19px;
  color: #4a5568;
  line-height: 1.6;
  font-weight: 500;
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 36px;
  border-radius: 14px;
  background: linear-gradient(135deg, #00d084, #00b478);
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 180, 120, 0.3);
`;

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
`;

const SecondaryButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  padding: 18px 36px;
  border-radius: 14px;
  background: #ffffff;
  color: #2d3748;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  &:hover {
    border-color: #cbd5e0;
    background: #f7fafc;
  }
`;

const HeroVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 968px) {
    display: none;
  }
`;

const FloatingCard = styled(motion.div)`
  filter: drop-shadow(0 20px 60px rgba(0, 180, 120, 0.2));
`;

const Section = styled.section`
  padding: 120px 32px;
  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 72px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 800;
  color: #1a202c;
  letter-spacing: -0.5px;
`;

const SectionDesc = styled.p`
  margin: 0;
  font-size: 18px;
  color: #718096;
  font-weight: 500;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FeatureCard = styled(motion.div)`
  padding: 40px 32px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    border-color: #00b478;
    box-shadow: 0 12px 40px rgba(0, 180, 120, 0.12);
    transform: translateY(-6px);
  }
`;

const FeatureIconWrap = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`;

const FeatureTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
`;

const FeatureDesc = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: #4a5568;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitsColumn = styled.div``;

const ColumnTitle = styled.h3`
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  &:hover {
    border-color: #00b478;
    box-shadow: 0 6px 20px rgba(0, 180, 120, 0.08);
  }
`;

const BenefitIcon = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #e8f5f0;
`;

const BenefitContent = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.h4`
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
`;

const BenefitDesc = styled.p`
  margin: 0;
  font-size: 14px;
  color: #718096;
`;

const ValueCards = styled.div`
  display: grid;
  gap: 20px;
`;

const ValueCard = styled(motion.div)`
  padding: 28px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    border-color: #00b478;
    box-shadow: 0 8px 24px rgba(0, 180, 120, 0.1);
  }
`;

const ValueIconWrap = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`;

const ValueStatNum = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #00b478;
  margin-bottom: 8px;
`;

const ValueStatLabel = styled.div`
  font-size: 14px;
  color: #718096;
  font-weight: 600;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessCard = styled.div`
  padding: 32px 28px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  &:hover {
    border-color: #00b478;
    box-shadow: 0 8px 24px rgba(0, 180, 120, 0.1);
  }
`;

const ProcessNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #00d084, #00b478);
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const ProcessTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
`;

const ProcessDesc = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #718096;
`;

const ProcessNote = styled(motion.div)`
  margin-top: 40px;
  padding: 20px 28px;
  border-radius: 12px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  color: #4a5568;
  text-align: center;
  strong {
    color: #2d3748;
    font-weight: 700;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ChartWrapper = styled(motion.div)`
  padding: 36px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

const ChartTitle = styled.h3`
  margin: 0 0 28px;
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
`;

const ChartContainer = styled.div`
  height: 300px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  padding: 28px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  &:hover {
    border-color: #00b478;
    box-shadow: 0 6px 20px rgba(0, 180, 120, 0.08);
  }
`;

const CategoryTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 17px;
  font-weight: 700;
  color: #1a202c;
`;

const CategoryList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #4a5568;
`;

const CategoryDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00b478;
  flex-shrink: 0;
`;

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CaseCard = styled(motion.div)`
  padding: 36px 32px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    border-color: #00b478;
    box-shadow: 0 12px 40px rgba(0, 180, 120, 0.12);
    transform: translateY(-6px);
  }
`;

const CaseIconWrap = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`;

const CaseTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 19px;
  font-weight: 700;
  color: #1a202c;
`;

const CaseDesc = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.7;
  color: #4a5568;
`;

const CaseTags = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CaseTag = styled.span`
  padding: 6px 14px;
  border-radius: 999px;
  background: #e8f5f0;
  color: #00b478;
  font-size: 12px;
  font-weight: 700;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  padding: 32px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  &:hover {
    border-color: #00b478;
    box-shadow: 0 6px 20px rgba(0, 180, 120, 0.08);
  }
`;

const FAQQuestion = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 14px;
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.6;
`;

const FAQQIcon = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d084, #00b478);
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FAQAnswer = styled.div`
  display: flex;
  gap: 14px;
  font-size: 15px;
  line-height: 1.8;
  color: #4a5568;
`;

const FAQAIcon = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e8f5f0;
  color: #00b478;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.footer`
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
  padding: 60px 32px 48px;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 32px;
`;

const FooterLink = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: #718096;
  text-decoration: none;
  &:hover {
    color: #00b478;
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 32px 0;
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

const FooterNotice = styled.div`
  padding: 16px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fff5e6, #ffe8cc);
  border: 1px solid #ffd699;
  font-size: 14px;
  color: #744210;
  font-weight: 500;
  strong {
    font-weight: 700;
    color: #5a3308;
  }
`;

const FooterCopy = styled.p`
  margin: 0;
  font-size: 13px;
  color: #a0aec0;
  line-height: 1.6;
`;
