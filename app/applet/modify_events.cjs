const fs = require('fs');
let content = fs.readFileSync('src/components/Heatmap.tsx', 'utf-8');

// The new EVENT_LIST content provided by the user
const newEventListStr = `const EVENT_LIST = [
  // [J] 정보통신업
  { industry: '정보통신업', year: 1885, title: '한성~인천 전신 개통',     img: '1885_한성 인천 전신 개통.jpg' },
  { industry: '정보통신업', year: 1902, title: '한성전화소 개설',         img: '1902 한성전화소 개설.jpg' },
  { industry: '정보통신업', year: 1994, title: '인터넷 상용화',           img: '1994년 인터넷 상용화.jpg', isImportant: true }, // IT 생태계 및 관련 직업 등장의 서막
  { industry: '정보통신업', year: 1998, title: '벤처 붐 및 스타크래프트 유행', img: '1998_PC방.webp' },
  { industry: '정보통신업', year: 2000, title: '닷컴 벤처 붐',             img: '2000_닷컴 버블.jpg' },
  { industry: '정보통신업', year: 2001, title: '닷컴 버블 붕괴',           img: '2001_닷컴버블 붕괴.jpg' },
  { industry: '정보통신업', year: 2003, title: '초고속 인터넷 최고 보급률', img: '2003초고속 인터넷— PC통신 몰락 및 ADSL 보급 확산.jpg' },
  { industry: '정보통신업', year: 2009, title: '스마트폰 국내 보급',       img: '2009년 스마트폰 보급 확산.jpg', isImportant: true }, // 모바일 혁명, 앱 관련 신규 직업군 폭발
  { industry: '정보통신업', year: 2011, title: '4G LTE 상용화',            img: '2011.07_4g 상용화.jpg' },
  { industry: '정보통신업', year: 2015, title: 'O2O 플랫폼 성장',          img: '2015O2O 플랫폼 서비스 확산.png' },
  { industry: '정보통신업', year: 2019, title: '세계 최초 5G 상용화',      img: '2019 세계 최초 5g 상용화.jpg' },
  { industry: '정보통신업', year: 2020, title: '코로나19 비대면 전환',     img: '2020년 팬데믹과 비대면 전환 2.jpg' },
  { industry: '정보통신업', year: 2022, title: 'ChatGPT 등장',             img: '2022.11 챗gpt 등장.jpg', isImportant: true }, // 지식 노동자 대체 및 AI 직군 등장의 기점
  { industry: '정보통신업', year: 2025, title: 'AI 에이전트 상용화',       img: '2025 AI 에이전트 상용화2.jpg', isImportant: true }, // 본격적인 직업 대체 및 융합의 가속화

  // [C] 제조업
  { industry: '제조업', year: 1970, title: '수출 100억 달러 목표', img: '1970수출 드라이브 — 경공업 중심 국가 주도 성장.jpg' },
  { industry: '제조업', year: 1973, title: '중화학공업화 선언',      img: '1973_중화학 공업화 선언.jpg', isImportant: true }, // 대규모 생산직 일자리 확산의 뼈대
  { industry: '제조업', year: 1979, title: '2차 오일쇼크',           img: '1979_제2차 오일쇼크.jpeg' },
  { industry: '제조업', year: 1986, title: '3저 호황',               img: '1986_3저호황_단군이래최대호황.jpeg' },
  { industry: '제조업', year: 1988, title: '서울올림픽 특수',        img: '1988 서울올림픽.jpg.avif' },
  { industry: '제조업', year: 1998, title: 'IMF 구조조정',           img: '1998 IMF.jpg', isImportant: true }, // 평생직장 개념 소멸 및 대량 실업 사태
  { industry: '제조업', year: 2001, title: '중국 WTO 가입',          img: '2001 중국 wto 가입.jpg' },
  { industry: '제조업', year: 2008, title: '글로벌 금융위기',        img: '2008 글로벌 금융위기.jpg' },
  { industry: '제조업', year: 2010, title: '수출 3대장 신기록',      img: '2010반도체·자동차·디스플레이 — 사상 최대 수출액 기록.png' },
  { industry: '제조업', year: 2016, title: '조선업 구조조정',        img: '2016-조선해운업 구조조정.jpeg' },
  { industry: '제조업', year: 2019, title: '일본 반도체 소재 규제',  img: '2019-일본화이트리스트제외.png' },
  { industry: '제조업', year: 2020, title: '코로나19 자동화 가속',  img: '2020 코로나.jpeg' },
  { industry: '제조업', year: 2022, title: '반도체 다운사이클',      img: '2022 반도체 배터리 인력난.png' },
  { industry: '제조업', year: 2024, title: 'AI 반도체 붐',           img: '2025 스마트 팩토리.jpg', isImportant: true }, // 하드웨어 산업의 AI 결합

  // [Q] 보건업 및 사회복지
  { industry: '보건업 및 사회복지', year: 1989, title: '전국민 의료보험',     img: '1989 전국민의료보험시대 개막.jpg' },
  { industry: '보건업 및 사회복지', year: 2000, title: '의약분업 시행',       img: '2000 의료 대파업.jpeg' },
  { industry: '보건업 및 사회복지', year: 2008, title: '노인장기요양보험',   img: '2008-노인장기요양보험 — 요양보호사 28만명 양성.png', isImportant: true }, // 돌봄·요양 일자리의 폭발적 확산
  { industry: '보건업 및 사회복지', year: 2010, title: '요양시장 폭발',       img: '2010노인 장기요양기관 폭발적 증가 — 4,000개 돌파.jpeg' },
  { industry: '보건업 및 사회복지', year: 2011, title: '무상보육 시행',       img: '2011-무상보육전면실시 - 보육교사 일자리 증가.jpg' },
  { industry: '보건업 및 사회복지', year: 2018, title: '치매국가책임제',      img: '2018치매국가책임제 — 돌봄 인력 수요 급증.jpg' },
  { industry: '보건업 및 사회복지', year: 2020, title: '코로나19 인력 총동원',img: '2020코로나19 방역 총력 — 간호사·공공의료 인력 총동원.jpg' },
  { industry: '보건업 및 사회복지', year: 2025, title: '초고령사회 진입',     img: '2025 초고령 사회진입.jpg', isImportant: true }, // 인구 구조 변화가 산업 전체에 미치는 메가 트렌드

  // [G] 도매 및 소매업
  { industry: '도매 및 소매업', year: 1982, title: '소비 붐 중산층 확대', img: '1982통행금지 해제·교복 자율화 — 소비 붐.jpg' },
  { industry: '도매 및 소매업', year: 1988, title: '올림픽 소비 호황',     img: '1988 서울올림픽.jpg.avif' },
  { industry: '도매 및 소매업', year: 1993, title: '이마트 1호점 개점',     img: '1993 11 이마트 1호점 개점.jpg' },
  { industry: '도매 및 소매업', year: 1996, title: '대형마트 전국화',      img: '1996유통시장 전면 개방 — 대형마트 전국 확대.jpeg' },
  { industry: '도매 및 소매업', year: 1998, title: 'IMF 소비 급감',         img: '1998 IMF.jpg' },
  { industry: '도매 및 소매업', year: 2000, title: '인터넷쇼핑 태동',      img: '2000인터넷쇼핑 태동 — 오픈마켓 본격화.jpg', isImportant: true }, // 오프라인 유통 인력의 소멸 시작
  { industry: '도매 및 소매업', year: 2003, title: '카드대란 소비 위축',   img: '2003 카드대란.jpeg' },
  { industry: '도매 및 소매업', year: 2011, title: '소셜커머스 쿠팡',      img: '2010 스마트폰 대중화.jpeg' },
  { industry: '도매 및 소매업', year: 2018, title: '로켓배송 전면화',      img: '2018모바일 쇼핑 급증·로켓배송 — 무점포 판매 증가.jpeg' },
  { industry: '도매 및 소매업', year: 2020, title: '코로나19 이커머스 폭발', img: '2020코로나19 — 오프라인 침체, 비대면 소비(이커머스) 폭발.png', isImportant: true }, // 플랫폼 기반 상거래 일자리 확산
  { industry: '도매 및 소매업', year: 2022, title: '플랫폼 유통 지배',     img: '2022네이버쇼핑·카카오커머스 — 플랫폼 유통 지배.png' },
  { industry: '도매 및 소매업', year: 2025, title: '유통 디지털 전환',     img: '2025AI 추천·자동화 물류 — 유통 디지털 전환 완성.jpg' },

  // [H] 운수 및 창고업
  { industry: '운수 및 창고업', year: 1970, title: '경부고속도로 개통',    img: '1970경부고속도로 개통 — 육상 화물 운송 본격화.jpg' },
  { industry: '운수 및 창고업', year: 1989, title: '택배 산업 법제화',     img: '1989택배 산업 법제화 — 한진·현대택배 설립.jpg' },
  { industry: '운수 및 창고업', year: 2000, title: '인터넷쇼핑 택배 성장', img: '2000인터넷쇼핑 택배 성장 — 2억건→8억건(2005).jpg' },
  { industry: '운수 및 창고업', year: 2009, title: '택배 1조원 돌파',      img: '2009택배 1조원 돌파 — 취업자 +11만명(+41.5%).jpeg' },
  { industry: '운수 및 창고업', year: 2015, title: '쿠팡맨 직배송',        img: '2015쿠팡맨 직배송 — 물류 직고용 혁신.jpg' },
  { industry: '운수 및 창고업', year: 2018, title: '새벽배송 성장',        img: '2018새벽배송 성장 — 여성 취업자 +50천명(+12.3%).jpeg' },
  { industry: '운수 및 창고업', year: 2020, title: '코로나19 물류 폭발',   img: '2020코로나19 — 택배 33억건(+21%), 물류 폭발.jpg' },
  { industry: '운수 및 창고업', year: 2022, title: '배달 라이더 최대',     img: '2022배달플랫폼 — 배달 라이더 약 40만명(사상 최대).jpg', isImportant: true }, // 긱 이코노미(Gig Economy) 일자리의 최고점
  { industry: '운수 및 창고업', year: 2025, title: '자율주행 배송 시범',   img: '2025자율주행 배송 시범 — AI 물류 최적화 도입.jpg' },

  // [K] 금융 및 보험업
  { industry: '금융 및 보험업', year: 1975, title: '은행 지점 전국 확대', img: '1975경제성장 — 은행·보험 지점 전국 확대.jpeg' },
  { industry: '금융 및 보험업', year: 1988, title: '코스피 1000 증권 붐', img: '1988증권 붐 — 코스피 1000 돌파, 취업자 748천명.jpg' },
  { industry: '금융 및 보험업', year: 1997, title: 'IMF 외환위기',        img: '1997 IMF.jpg', isImportant: true }, // 금융권 대규모 통폐합 및 일자리 소멸
  { industry: '금융 및 보험업', year: 2000, title: '인터넷뱅킹 도입',     img: '2000인터넷뱅킹 도입 — 비대면 금융 거래 시작.jpeg' },
  { industry: '금융 및 보험업', year: 2002, title: '카드대란',            img: '2002카드대란 — 연체율 30% 돌파, -28천명(-3.7%).jpeg' },
  { industry: '금융 및 보험업', year: 2008, title: '글로벌 금융위기',     img: '2008 글로벌 금융위기.jpg' },
  { industry: '금융 및 보험업', year: 2015, title: '모바일뱅킹 확산',     img: '2015 모바일뱅킹 확산.jpg' },
  { industry: '금융 및 보험업', year: 2020, title: '코로나 비대면 금융', img: '2020 코로나.jpeg' },
  { industry: '금융 및 보험업', year: 2025, title: '핀테크 AI 금융',      img: '2025 핀테크 에이아이금융.jpg', isImportant: true }, // 은행 창구 직원 등 전통 금융직의 강력한 소멸 위협

  // [R] 예술·스포츠 및 여가
  { industry: '예술·스포츠 및 여가', year: 1988, title: '서울올림픽 개최',   img: '1988 서울올림픽.jpg.avif' },
  { industry: '예술·스포츠 및 여가', year: 2000, title: '문화산업 국가전략화', img: '2000문화산업진흥기본법 강화 — 콘텐츠 국가 전략화.png' },
  { industry: '예술·스포츠 및 여가', year: 2002, title: '한일월드컵',         img: '2002 한일월드컵.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2003, title: '겨울연가 한류',       img: '2003 겨울연가 한류.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2009, title: '한류 2차 붐',         img: '2009문화콘텐츠 육성+한류 2차 붐 — 남성 +141천명(+22%).jpg' },
  { industry: '예술·스포츠 및 여가', year: 2012, title: '강남스타일 글로벌',   img: '2012 강남스타일 글로벌히트.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2019, title: '영화 기생충',         img: '2019 기생충.jpg' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '코로나 공연 침체',    img: '2020 코로나.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2021, title: '오징어게임 OTT',      img: '2021 오징어게임 ott 한류.jpeg', isImportant: true }, // K-콘텐츠 관련 파생 직업 확산
  { industry: '예술·스포츠 및 여가', year: 2022, title: '엔데믹 공연 재개',    img: '2022 엔데믹 공연 재개.jpg' },
  { industry: '예술·스포츠 및 여가', year: 2025, title: 'AI 콘텐츠 시대',      img: '2025AI 콘텐츠·e스포츠 — e스포츠 산업 1조원 규모.jpeg', isImportant: true }, // 창작의 영역까지 침투하는 AI

  // [M] 전문과학 및 기술서비스업
  { industry: '전문과학 및 기술서비스업', year: 1999, title: 'IT 벤처 붐',       img: '1999_it 벤처 붐.webp' },
  { industry: '전문과학 및 기술서비스업', year: 2008, title: '녹색 R&D 확대',    img: '2008녹색 R&D — 환경·에너지 연구 확대, +54천명(+7.6%).jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2011, title: '바이오 IT 융합',   img: '2011바이오·IT 융합 붐 — CRA·바이오연구원 급증, +80천명.jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2013, title: '창조경제 스타트업', img: '2013 창조경제 - 스타트업 8만개 신설.jpeg' },
  { industry: '전문과학 및 기술서비스업', year: 2017, title: '4차산업 전략',     img: '2017-4차산업혁명위원회 출범 — AI·빅데이터 국가 전략.webp', isImportant: true }, // 4차 산업혁명 기반 일자리 육성
  { industry: '전문과학 및 기술서비스업', year: 2019, title: '데이터 3법',       img: '2019 데이터 3법 통과.jpeg' },
  { industry: '전문과학 및 기술서비스업', year: 2020, title: '디지털 뉴딜',       img: '2020 디지털 뉴딜.jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2022, title: '반도체·배터리 인력난', img: '2022 반도체 배터리 인력난.png' },

  // [O] 공공행정 및 국방
  { industry: '공공행정 및 국방', year: 1992, title: '지방자치제 출범',   img: '1992지방자치제 출범 — 지방직 공무원 수요 증가.jpg' },
  { industry: '공공행정 및 국방', year: 1998, title: 'IMF 공공 구조조정', img: '1998 IMF 공공 구조조정.jpg' },
  { industry: '공공행정 및 국방', year: 2001, title: '전자정부 구축',     img: '2001 전자정부 구축.jpg' },
  { industry: '공공행정 및 국방', year: 2013, title: '여성공직 확대',     img: '2013 여성공직 확대.jpg' },
  { industry: '공공행정 및 국방', year: 2017, title: '공무원 17만명 증원', img: '2017공무원 17만명 증원 — 경찰·소방·복지직 집중 채용.jpg' },
  { industry: '공공행정 및 국방', year: 2020, title: '코로나19 방역행정', img: '2020 코로나 19.jpg' },
  { industry: '공공행정 및 국방', year: 2025, title: 'AI 행정 도입',      img: '2025 AI 행정 도입.jpg' },

  // [P] 교육서비스업
  { industry: '교육서비스업', year: 1992, title: '대학정원 자율화', img: '1992 대학정원자유화.jpeg' },
  { industry: '교육서비스업', year: 1995, title: '5·31 교육개혁',  img: '1995-531 교육개혁.jpeg' },
  { industry: '교육서비스업', year: 2000, title: '영어조기교육',   img: '2000 영어조기교육.jpeg' },
  { industry: '교육서비스업', year: 2003, title: '사교육비 최고',   img: '2003 사교육비 최고.jpg' },
  { industry: '교육서비스업', year: 2005, title: '주5일 수업제',   img: '2005 주5일 수업제 도입.jpg' },
  { industry: '교육서비스업', year: 2015, title: '저출산 인구절벽', img: '2015 저출산.jpg', isImportant: true }, // 학생 수 감소로 인한 교육 산업 축소 및 위협
  { industry: '교육서비스업', year: 2020, title: '코로나 원격수업', img: '2020 코로나 원격.jpg' },
  { industry: '교육서비스업', year: 2025, title: 'AI 개인화 학습', img: '2025_ ai 개인화 학습.jpeg' },
];`;

// replace EVENT_LIST completely
content = content.replace(/const EVENT_LIST = \[[\s\S]+?\];/, newEventListStr);

// replace minRowHeight logic
const minRowHeightMatcher = /let minRowHeight = [^\n]+;\n\s+if \(hasEvent\) minRowHeight = Math\.max\(minRowHeight, 80\);/;

const newMinRowHeightLogic = \`const hasImportantEvent = eventsInThisYear.some((ev: any) => ev.isImportant);
              let minRowHeight = d.year <= 1960 ? 12 : d.year <= 2024 ? 28 : 56;
              if (hasImportantEvent) {
                minRowHeight = Math.max(minRowHeight, 160);
              } else if (hasEvent) {
                minRowHeight = Math.max(minRowHeight, 80);
              }\`;

content = content.replace(minRowHeightMatcher, newMinRowHeightLogic);

fs.writeFileSync('src/components/Heatmap.tsx', content);
console.log('Update finished.');
