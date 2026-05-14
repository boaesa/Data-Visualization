import React, { useMemo } from 'react';

const chartData = [
  { year: '1965', agriculture: 4820, manufacturing: 620, construction: 180, health: 0, tech: 0, arts: 0 },
  { year: '1970', agriculture: 4850, manufacturing: 1100, construction: 300, health: 0, tech: 0, arts: 0 },
  { year: '1975', agriculture: 5000, manufacturing: 1900, construction: 450, health: 0, tech: 0, arts: 0 },
  { year: '1980', agriculture: 4600, manufacturing: 2800, construction: 800, health: 0, tech: 0, arts: 0 },
  { year: '1985', agriculture: 3700, manufacturing: 3500, construction: 1100, health: 0, tech: 0, arts: 0 },
  { year: '1990', agriculture: 3200, manufacturing: 4800, construction: 1400, health: 0, tech: 0, arts: 0 },
  { year: '1995', agriculture: 2300, manufacturing: 4800, construction: 1900, health: 0, tech: 0, arts: 0 },
  { year: '2000', agriculture: 2200, manufacturing: 4200, construction: 1600, health: 400, tech: 0, arts: 0 },
  { year: '2001', agriculture: 2100, manufacturing: 4100, construction: 1650, health: 450, tech: 0, arts: 50 },
  { year: '2004', agriculture: 1900, manufacturing: 4150, construction: 1750, health: 500, tech: 100, arts: 150 },
  { year: '2005', agriculture: 1800, manufacturing: 4100, construction: 1800, health: 600, tech: 600, arts: 250 },
  { year: '2010', agriculture: 1500, manufacturing: 4000, construction: 1700, health: 1000, tech: 800, arts: 300 },
  { year: '2015', agriculture: 1300, manufacturing: 4400, construction: 1800, health: 1700, tech: 1000, arts: 400 },
  { year: '2020', agriculture: 1400, manufacturing: 4300, construction: 2000, health: 2300, tech: 1200, arts: 450 },
  { year: '2023', agriculture: 1200, manufacturing: 4400, construction: 2100, health: 2800, tech: 1300, arts: 500 },
  { year: '2024', agriculture: 1150, manufacturing: 4450, construction: 2000, health: 2900, tech: 1350, arts: 520 },
];

const INDUSTRIES = [
  { id: 'agri', key: 'agriculture', name: '농림어업', color: '#15803d' },
  { id: 'manu', key: 'manufacturing', name: '제조업', color: '#2563eb' },
  { id: 'const', key: 'construction', name: '건설업', color: '#9333ea' },
  { id: 'health', key: 'health', name: '보건업 및 사회복지', color: '#dc2626' },
  { id: 'tech', key: 'tech', name: '전문, 과학 기술', color: '#f97316' },
  { id: 'art', key: 'arts', name: '예술, 스포츠', color: '#14b8a6' },
];

const YEARS = Array.from({ length: Math.floor((2024 - 1965) / 5) + 1 }, (_, i) => 1965 + i * 5);
if (!YEARS.includes(2024)) YEARS.push(2024);

const VALUE_TICKS = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];

const GRAPH_HEIGHT = 4800;

const getYearY = (year: number) => {
  let percent = 0;
  if (year <= 1990) {
    percent = ((year - 1965) / (1990 - 1965)) * 0.20;
  } else if (year <= 2000) {
    percent = 0.20 + ((year - 1990) / (2000 - 1990)) * 0.10;
  } else if (year <= 2010) {
    percent = 0.30 + ((year - 2000) / (2010 - 2000)) * 0.20;
  } else {
    percent = 0.50 + ((year - 2010) / (2024 - 2010)) * 0.50;
  }
  return percent * GRAPH_HEIGHT;
};

const SOCIAL_ISSUES = [
  // --- 1. 농림어업 (agri) ---
  { category: 'agri', year: 1970, title: '새마을운동 출범', desc: '농촌 근대화 및 환경 개선 사업 시작', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 1971, title: '통일벼 보급', desc: '주력 품종 보급으로 식량 생산성 급증', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 1977, title: '쌀 자급 달성', desc: '녹색혁명을 통한 주곡 자립 완성', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 1980, title: '냉해 대흉작', desc: '이상 기온으로 인한 농가 소득 타격', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 1989, title: '농어촌발전종합대책', desc: '개방 대비 구조개선 대책 수립', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 1995, title: 'WTO 출범', desc: '농산물 시장 개방 및 특별세 도입', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 2003, title: '한·칠레 FTA', desc: '첫 자유무역협정 시작', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 2007, title: '한미 FTA', desc: '농축산물 개방 및 경쟁 심화', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 2010, title: '구제역 대유행', desc: '사상 최악의 가축 전염병 피해', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 2015, title: '쌀 시장 전면개방', desc: '쌀 관세화 도입 및 전면 개방', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 2020, title: '귀농귀촌 증가', desc: '코로나발 인구 환류 현상', img: 'https://placehold.co/300x200?text=Agri' },
  { category: 'agri', year: 2022, title: '고령화율 49% 돌파', desc: '농가 인력난 및 생산 기반 약화', img: 'https://placehold.co/300x200?text=Agri' },

  // --- 2. 제조업 (manu) ---
  { category: 'manu', year: 1973, title: '중화학공업화 선언', desc: '포항제철 등 중공업 육성', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 1979, title: '2차 오일쇼크', desc: '에너지 급등 제조원가 부담', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 1986, title: '3저 호황', desc: '저금리·저유가로 수출 증가', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 1988, title: '제조업 정점기', desc: '올림픽 전후 산업 경쟁력 최대', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 1992, title: '한중수교', desc: '중국 시장 개척 및 생산기지 이전', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 1997, title: 'IMF 구조조정', desc: '재벌 빅딜 및 고용 구조 변화', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 2001, title: '중국 WTO 가입', desc: '생산기지 대거 중국 이전', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 2008, title: '글로벌 금융위기', desc: '전 세계적 금융 위기 여파', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 2010, title: '반도체·자동차 반등', desc: '글로벌 위기 이후 산업 재도약', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 2016, title: '조선업 구조조정', desc: '글로벌 수주 절벽 따른 감원', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 2019, title: '일본 수출규제', desc: '소재·부품 국산화 본격화', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 2020, title: '비대면 IT 수요', desc: '비대면 특수. 전자기기 급증', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 2022, title: '반도체 사이클 급감', desc: '미국법 등 글로벌 공급망 재편', img: 'https://placehold.co/300x200?text=Manu' },
  { category: 'manu', year: 2024, title: 'AI 반도체 호황', desc: 'AI 발전발 차세대 메모리 수요 급증', img: 'https://placehold.co/300x200?text=Manu' },

  // --- 3. 건설업 (const) ---
  { category: 'const', year: 1968, title: '경부고속도로 착공', desc: '국토 대동맥. 토목 본격화', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 1973, title: '중동 건설붐', desc: '해외 건설 수주 통한 외화 획득', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 1982, title: '88올림픽 유치', desc: '올림픽 유치에 따른 도시 개발', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 1989, title: '1기 신도시 건설', desc: '주택 200만호 건설 수도권 확장', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 1997, title: 'IMF 건설사 부도', desc: '외환위기발 건설 경기 급랭', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 2003, title: '행정수도 이전 추진', desc: '균형 발전 정책 등 충청권 개발', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 2008, title: '글로벌 금융위기', desc: '미분양 급증. 건설 침체 시작', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 2014, title: '부동산 부양책', desc: 'LTV 완화 등 경기 활성화', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 2021, title: '3기 신도시 발표', desc: '공급 확대 통한 시장 안정화', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 2022, title: '레고랜드·PF 부실', desc: '금리 인상발 건설 금융 위기', img: 'https://placehold.co/300x200?text=Const' },
  { category: 'const', year: 2024, title: '건설 경기 침체', desc: '고금리 장기화. 원자재값 상승', img: 'https://placehold.co/300x200?text=Const' },

  // --- 4. 보건 및 사회복지 (health) ---
  { category: 'health', year: 1989, title: '전국민 의료보험', desc: '보건 서비스 접근성 비약적 향상', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2000, title: '의약분업 시행', desc: '진료·조제 분리 복지 체계 정비', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2008, title: '노인장기요양보험', desc: '요양 인력 수요의 증가 기점', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2011, title: '무상보육 시행', desc: '국가 책임 보육 시스템 강화', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2013, title: '기초연금 확대', desc: '노인 빈곤 타파 복지 예산 증대', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2017, title: '문재인 케어', desc: '건강보험 보장성 및 비급여 축소', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2018, title: '치매국가책임제', desc: '고령화 대응 연관 인프라 확충', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2020, title: '코로나19 방역', desc: '의료 및 돌봄 인력 중요성 부각', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2022, title: '고령사회 심화', desc: '초고령사회 근접 수요 폭증', img: 'https://placehold.co/300x200?text=Health' },
  { category: 'health', year: 2024, title: '간호법 논의', desc: '현장 갈등 및 간호 인력 처우 개선', img: 'https://placehold.co/300x200?text=Health' },

  // --- 5. 전문, 과학 및 기술 (tech) ---
  { category: 'tech', year: 2004, title: 'R&D 투자 확대', desc: '국가 R&D 투자 GDP 2% 진입', img: 'https://placehold.co/300x200?text=Tech' },
  { category: 'tech', year: 2008, title: '녹색 R&D', desc: '친환경 및 에너지 기술 투자', img: 'https://placehold.co/300x200?text=Tech' },
  { category: 'tech', year: 2013, title: '창조경제 추진', desc: 'ICT 융합 및 신산업 집중 육성', img: 'https://placehold.co/300x200?text=Tech' },
  { category: 'tech', year: 2014, title: 'R&D 확대', desc: '국가 연구개발 예산 및 투자 확대', img: 'https://placehold.co/300x200?text=Tech' },
  { category: 'tech', year: 2017, title: '4차산업혁명위 출범', desc: 'AI, 데이터 중심 산업 변화 시작', img: 'https://placehold.co/300x200?text=Tech' },
  { category: 'tech', year: 2019, title: '데이터 정책 확대', desc: '디지털 전환 가속화 국가 전략', img: 'https://placehold.co/300x200?text=Tech' },
  { category: 'tech', year: 2020, title: '디지털 뉴딜', desc: '비대면 인프라 등 대규모 투자', img: 'https://placehold.co/300x200?text=Tech' },
  { category: 'tech', year: 2022, title: 'R&D 인력난', desc: '첨단 기술 분야 핵심 인재 확보 경쟁', img: 'https://placehold.co/300x200?text=Tech' },
  { category: 'tech', year: 2024, title: '생성형 AI 확산', desc: '전 산업 AI 트랜스포메이션 가속화', img: 'https://placehold.co/300x200?text=Tech' },

  // --- 6. 예술, 스포츠, 여가 (art) ---
  { category: 'art', year: 2002, title: '한일 월드컵', desc: '스포츠 및 국가 브랜드 도약', img: 'https://placehold.co/300x200?text=Art' },
  { category: 'art', year: 2003, title: '겨울연가 열풍', desc: '한류 시작과 콘텐츠 산업 도약', img: 'https://placehold.co/300x200?text=Art' },
  { category: 'art', year: 2005, title: '주5일제 전면시행', desc: '여가 및 여행 서비스 수요 폭발', img: 'https://placehold.co/300x200?text=Art' },
  { category: 'art', year: 2012, title: '강남스타일 열풍', desc: 'K-POP 콘텐츠 수출 본격화', img: 'https://placehold.co/300x200?text=Art' },
  { category: 'art', year: 2018, title: '평창동계올림픽', desc: '동계 스포츠 및 지역 관광 활성화', img: 'https://placehold.co/300x200?text=Art' },
  { category: 'art', year: 2019, title: 'K-콘텐츠 정점', desc: 'BTS 등 글로벌 문화 시장 석권', img: 'https://placehold.co/300x200?text=Art' },
  { category: 'art', year: 2020, title: '공연·스포츠 직격타', desc: '코로나발 오프라인 여가 침체', img: 'https://placehold.co/300x200?text=Art' },
  { category: 'art', year: 2021, title: 'OTT 호황', desc: '오징어게임 등 비대면 소비 급증', img: 'https://placehold.co/300x200?text=Art' },
  { category: 'art', year: 2022, title: '엔데믹 공연 재개', desc: '보복 소비 따른 극장·여행 회복', img: 'https://placehold.co/300x200?text=Art' }
];

const IndustryTimeline = () => {
  const { paths } = useMemo(() => {
    let maxTotal = 0;
    const computedData = chartData.map(d => {
      let total = 0;
      const cumulatives: Record<string, { left: number; right: number }> = {};
      const yearNum = parseInt(d.year, 10);
      
      INDUSTRIES.forEach(ind => {
        const val = (d as any)[ind.key] as number;
        cumulatives[ind.id] = { left: total, right: total + val };
        total += val;
      });
      if (total > maxTotal) maxTotal = total;
      return { yearNum, cumulatives };
    });

    const xDomain = maxTotal || 100;

    const paths = INDUSTRIES.map(ind => {
      let dPath = "";
      
      // Down the right edge
      computedData.forEach((row, idx) => {
        const x = (row.cumulatives[ind.id].right / xDomain) * 100;
        const y = getYearY(row.yearNum);
        if (idx === 0) dPath += `M ${x} ${y} `;
        else dPath += `L ${x} ${y} `;
      });

      // Up the left edge
      for (let idx = computedData.length - 1; idx >= 0; idx--) {
        const row = computedData[idx];
        const x = (row.cumulatives[ind.id].left / xDomain) * 100;
        const y = getYearY(row.yearNum);
        dPath += `L ${x} ${y} `;
      }
      
      dPath += "Z";
      return { ...ind, dPath };
    });

    return { paths };
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto p-4 bg-white font-sans overflow-hidden rounded-3xl border border-slate-100 shadow-sm mt-8">
      
      {/* 상단 헤더: 왼쪽수치축(80px) + 산업섹션 6개 + 오른쪽연도축(100px) */}
      <div className="grid grid-cols-[80px_repeat(6,1fr)_100px] border-b-2 border-slate-200 pb-3 pt-4 sticky top-0 bg-white z-50">
        <div className="text-center font-bold text-slate-400 text-xs self-end pb-1 pr-2">수치</div>
        {INDUSTRIES.map((ind) => (
          <div key={ind.id} className="text-center font-extrabold text-sm px-1 py-2">
            <span style={{ color: ind.color }}>{ind.name}</span>
          </div>
        ))}
        <div className="text-center font-bold text-slate-400 text-xs self-end pb-1 pl-2">연도</div>
      </div>

      <div className="relative grid grid-cols-[80px_repeat(6,1fr)_100px] my-6" style={{ height: `${GRAPH_HEIGHT}px` }}>
        
        {/* [Layer 1] 가로축(수치 0~4500) 왼쪽 표현 */}
        <div className="relative border-r border-slate-200 bg-slate-50/50 h-full">
          {VALUE_TICKS.map((val) => {
            const bottomPos = (val / 4500) * 100; 
            return (
              <div 
                key={`val-${val}`} 
                className="absolute right-2 flex items-center translate-y-1/2" 
                style={{ bottom: `${bottomPos}%` }}
              >
                <span className="text-[11px] font-bold text-slate-500 mr-2">{val}</span>
                <div className="w-1.5 h-[2px] bg-slate-300" />
              </div>
            );
          })}
        </div>

        {/* [Layer 2] 중앙 통합 그래프 영역 & 6개 섹션 */}
        <div className="relative col-span-6 h-full">
          
          {/* 전체 누적 면적 그래프 (Layer 1.5) - 순수 SVG 사용 */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
            <svg width="100%" height="100%" viewBox={`0 0 100 ${GRAPH_HEIGHT}`} preserveAspectRatio="none">
              {paths.map(ind => (
                <path 
                  key={`path-${ind.id}`} 
                  d={ind.dPath} 
                  fill={ind.color} 
                  stroke={ind.color} 
                  strokeWidth={1} 
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>

          {/* 세로 구분선 및 배경 가이드 (Layer 2) */}
          <div className="absolute inset-0 grid grid-cols-6 pointer-events-none z-10">
            {INDUSTRIES.map((_, i) => (
              <div key={`guide-${i}`} className="border-r border-slate-300 border-solid h-full" />
            ))}
          </div>

          {/* [Layer 3] 업종별 카드 중앙 배치 */}
          <div className="absolute inset-0 grid grid-cols-6 z-20">
            {INDUSTRIES.map((ind) => {
              const issues = SOCIAL_ISSUES.filter(issue => issue.category === ind.id).sort((a, b) => a.year - b.year);
              
              const cardHeight = 152;
              const padding = 16;
              const minDistance = cardHeight + padding;
              
              const positions = issues.map(issue => ({
                ...issue,
                topPx: getYearY(issue.year),
                originalTopPx: getYearY(issue.year)
              }));

              // 겹침 방지를 위한 강제 위치 조정
              for (let iter = 0; iter < 100; iter++) {
                for (let i = 0; i < positions.length - 1; i++) {
                  const diff = positions[i + 1].topPx - positions[i].topPx;
                  if (diff < minDistance) {
                    const overlap = minDistance - diff;
                    positions[i].topPx -= overlap / 2;
                    positions[i + 1].topPx += overlap / 2;
                  }
                }
                
                // 경계 조건 적용
                positions.forEach((pos) => {
                  if (pos.topPx < cardHeight / 2 + 16) pos.topPx = cardHeight / 2 + 16;
                  if (pos.topPx > GRAPH_HEIGHT - cardHeight / 2 - 16) pos.topPx = GRAPH_HEIGHT - cardHeight / 2 - 16;
                });
              }
              
              // 단단한 정렬 보장
              for (let i = 1; i < positions.length; i++) {
                if (positions[i].topPx < positions[i-1].topPx + minDistance) {
                  positions[i].topPx = positions[i-1].topPx + minDistance;
                }
              }

              return (
              <div key={`col-${ind.id}`} className="relative h-full">
                {positions.map((issue, idx) => {
                  return (
                    <div 
                      key={`issue-${idx}`} 
                      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-30"
                      style={{ top: `${issue.topPx}px` }}
                    >
                      <div className="bg-white border-2 border-slate-200 rounded-xl shadow-md hover:shadow-xl overflow-hidden group-hover:scale-105 transition-all duration-300 cursor-pointer w-[100px] h-[152px] flex flex-col">
                        <img src={issue.img} alt={issue.title} className="w-full h-[70px] object-cover shrink-0" />
                        <div className="p-2 bg-white flex flex-col items-center justify-center flex-1">
                          <p className="font-bold text-[11px] text-slate-800 leading-tight mb-1 text-center line-clamp-2">{issue.title}</p>
                          <p className="text-[10px] text-blue-600 font-extrabold mb-1">{issue.year}</p>
                          <p className="text-[9px] text-slate-500 leading-tight text-center line-clamp-2 opacity-80 group-hover:opacity-100">{issue.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )})}
          </div>
        </div>

        {/* [Layer 4] 우측 연도축 */}
        <div className="relative h-full border-l border-slate-200 bg-slate-50/50">
          {YEARS.map((year) => {
            const topPercent = (getYearY(year) / GRAPH_HEIGHT) * 100;
            return (
              <div 
                key={`year-${year}`} 
                className="absolute flex items-center w-full -translate-y-1/2"
                style={{ top: `${topPercent}%` }}
              >
                <div className="w-2.5 h-[2px] bg-slate-400" />
                <span className="ml-2 font-extrabold text-xs text-slate-600">{year}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default IndustryTimeline;
