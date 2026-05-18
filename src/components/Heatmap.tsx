import React from 'react';
import DATA from './HeatmapData.json';

// 1. 산업군 정의
const INDUSTRIES = [
  { id: 'J', name: '정보통신업', keyword: 'technology,data' },
  { id: 'Q', name: '보건업 및 사회복지', keyword: 'medical,healthcare' },
  { id: 'C', name: '제조업', keyword: 'factory,production' },
  { id: 'M', name: '전문과학 및 기술서비스업', keyword: 'science,research' },
  { id: 'K', name: '금융 및 보험업', keyword: 'finance,stock' },
  { id: 'G', name: '도매 및 소매업', keyword: 'retail,shopping' },
  { id: 'R', name: '예술·스포츠 및 여가', keyword: 'arts,stadium' },
  { id: 'H', name: '운수 및 창고업', keyword: 'logistics,truck' },
  { id: 'O', name: '공공행정 및 국방', keyword: 'government,city' },
  { id: 'P', name: '교육서비스업', keyword: 'school,classroom' },
];

// 2. 전체 이벤트 데이터 (12개 산업군 통합)
const EVENT_LIST = [
  // [J] 정보통신업
  { industry: '정보통신업', year: 1885, title: '한성~인천 전신 개통', img: null },
  { industry: '정보통신업', year: 1902, title: '한성전화소 개설', img: null },
  { industry: '정보통신업', year: 1994, title: '인터넷 상용화', img: null },
  { industry: '정보통신업', year: 1998, title: '벤처 붐 및 스타크래프트 유행', img: null },
  { industry: '정보통신업', year: 2000, title: '닷컴 벤처 붐', img: '2000 닷컴벤처붐.jpg' },
  { industry: '정보통신업', year: 2001, title: '닷컴 버블 붕괴', img: '2001 닷컴 버블 붕괴.jpg' },
  { industry: '정보통신업', year: 2003, title: '초고속 인터넷 최고 보급률', img: '2003 초고속 인터넷 세계 최고 보급률 달성.jpg' },
  { industry: '정보통신업', year: 2009, title: '스마트폰 국내 보급', img: '2009 스마트폰 국내 보급.jpeg' },
  { industry: '정보통신업', year: 2011, title: '4G LTE 상용화', img: '2011 -4G LTE 상용화 .jpeg' },
  { industry: '정보통신업', year: 2015, title: 'O2O 플랫폼 성장', img: '2015 O2O 플랫폼 성장.jpeg' },
  { industry: '정보통신업', year: 2019, title: '세계 최초 5G 상용화', img: '2019세계 최초 5G 상용화 — IoT·5G 엔지니어 수요 증가.jpg' },
  { industry: '정보통신업', year: 2020, title: '코로나19 비대면 전환', img: '2020 코로나.jpg' },
  { industry: '정보통신업', year: 2022, title: 'ChatGPT 등장', img: '2022 챗지피티 등장.jpeg' },
  { industry: '정보통신업', year: 2025, title: 'AI 에이전트 상용화', img: '2025-AI 에이전트 상용화 — 취업자 1,140천명, SW자동화 시대.jpeg' },

  // [C] 제조업
  { industry: '제조업', year: 1962, title: '경제개발 5개년 계획', img: null },
  { industry: '제조업', year: 1970, title: '수출 100억 달러 목표', img: '1970수출 100억 달러 목표 — 봉제·가발공장 급증.png' },
  { industry: '제조업', year: 1973, title: '중화학공업화 선언', img: '1973중화학공업화 선언 — 철강·조선·화학 육성.jpg.avif' },
  { industry: '제조업', year: 1979, title: '2차 오일쇼크', img: '1979-2차 오일쇼크 — 유가 2배 상승, 수출 타격.jpg' },
  { industry: '제조업', year: 1986, title: '3저 호황 제조업 황금기', img: '1986-3저호황 — 수출 급증, 제조업 황금기.webp' },
  { industry: '제조업', year: 1988, title: '서울올림픽 특수', img: '1988서울올림픽 특수 — 전자·자동차 생산 최대.jpg' },
  { industry: '제조업', year: 1998, title: 'IMF 구조조정', img: '1998IMF 구조조정 — 제조업 취업자 -36만명(-12.3%).jpg' },
  { industry: '제조업', year: 2001, title: '중국 WTO 가입', img: '2001중국 WTO 가입 — 섬유·신발 경쟁력 상실.jpg' },
  { industry: '제조업', year: 2008, title: '글로벌 금융위기', img: '2008글로벌 금융위기 — 자동차·철강 감산.jpg' },
  { industry: '제조업', year: 2010, title: '수출 3대장 신기록', img: '2010자동차·반도체·스마트폰 수출 동시 신기록.jpg' },
  { industry: '제조업', year: 2016, title: '조선업 구조조정', img: '2016조선업 구조조정 — 직간접 고용 -10만명.jpeg' },
  { industry: '제조업', year: 2019, title: '일본 반도체 소재 수출 규제', img: '2019일본 반도체 소재 수출 규제.jpg' },
  { industry: '제조업', year: 2020, title: '코로나19 자동화 가속', img: '2020코로나19 + 공급망 붕괴 — 자동화 투자 가속.jpg' },
  { industry: '제조업', year: 2022, title: '반도체 다운사이클', img: '2022반도체 다운사이클 — 재고 과잉·감산.jpeg' },
  { industry: '제조업', year: 2024, title: 'AI 반도체 붐', img: '2024 AI 반도체 붐 .jpg' },

  // [Q] 보건업 및 사회복지
  { industry: '보건업 및 사회복지', year: 1970, title: '사회복지사업법 제정', img: null },
  { industry: '보건업 및 사회복지', year: 1989, title: '전국민 의료보험 도입', img: '1989 전국민 의료보험 도입.jpg' },
  { industry: '보건업 및 사회복지', year: 2000, title: '의약분업 시행', img: '2000 의약분업.jpg' },
  { industry: '보건업 및 사회복지', year: 2008, title: '노인장기요양보험', img: '2008 노인장기요양보험.jpeg' },
  { industry: '보건업 및 사회복지', year: 2010, title: '요양시장 폭발', img: '2010 요양시장 폭발.gif' },
  { industry: '보건업 및 사회복지', year: 2011, title: '무상보육 시행', img: '2011무상보육 시행 — 보육교사 30만명으로 증가.jpg' },
  { industry: '보건업 및 사회복지', year: 2013, title: '기초연금 확대', img: '2013 기초연금 확대.jpg' },
  { industry: '보건업 및 사회복지', year: 2018, title: '치매국가책임제', img: '2018치매국가책임제.jpg' },
  { industry: '보건업 및 사회복지', year: 2019, title: '돌봄 수요 폭발', img: '2019 돌봄 수요 폭발.jpg' },
  { industry: '보건업 및 사회복지', year: 2020, title: '코로나19 인력 총동원', img: '2020코로나19 — 의료·복지 인력 총동원.jpg' },
  { industry: '보건업 및 사회복지', year: 2021, title: '간호사 인력 사상최다', img: '2021 간호사 인력 사상최다.jpg' },
  { industry: '보건업 및 사회복지', year: 2024, title: '간호법 논의', img: '2024 간호법.jpg' },
  { industry: '보건업 및 사회복지', year: 2025, title: '초고령사회 진입', img: '2025 초고령사회진입.jpg' },

  // [G] 도매 및 소매업
  { industry: '도매 및 소매업', year: 1931, title: '화신백화점 개점', img: null },
  { industry: '도매 및 소매업', year: 1963, title: '재래시장 소매업 성장', img: '1963경제개발 초기 — 재래시장·노점 중심 소매업 성장.JPG' },
  { industry: '도매 및 소매업', year: 1982, title: '소비 붐 중산층 확대', img: '1982소비 붐 — 중산층 확대, 도소매 취업자 317만명 최고.jpg' },
  { industry: '도매 및 소매업', year: 1988, title: '올림픽 소비 호황', img: '1988올림픽 소비 호황 — 백화점·소비재 판매 최대.jpg' },
  { industry: '도매 및 소매업', year: 1993, title: '이마트 1호점 개점', img: '1993이마트 1호점 개점 — 대형할인점 시대 개막.jpg' },
  { industry: '도매 및 소매업', year: 1996, title: '대형마트 전국화', img: '1996홈플러스·롯데마트 전국화 — 재래시장 위축.jpeg' },
  { industry: '도매 및 소매업', year: 1998, title: 'IMF 소비 급감', img: '1998IMF — 소비 급감, 소매점 대량 폐업(-24만명,-9%).jpeg' },
  { industry: '도매 및 소매업', year: 2000, title: '인터넷쇼핑 태동', img: '2000인터넷쇼핑 태동 — 옥션·인터파크 거래 급증.jpeg' },
  { industry: '도매 및 소매업', year: 2003, title: '카드대란 소비 위축', img: '2003카드대란 — 소비 급위축, 할부판매 직격탄.jpeg' },
  { industry: '도매 및 소매업', year: 2011, title: '소셜커머스 쿠팡 등장', img: '2011소셜커머스 — 쿠팡·티몬·위메프 등장.jpg' },
  { industry: '도매 및 소매업', year: 2018, title: '로켓배송 전면화', img: '2018쿠팡 로켓배송 전면화 — 이커머스 판도 변화.jpeg' },
  { industry: '도매 및 소매업', year: 2020, title: '코로나19 비대면 폭발', img: '2020코로나19 — 오프라인 소매 -84천명, 이커머스 159조원.jpg' },
  { industry: '도매 및 소매업', year: 2022, title: '플랫폼 유통 지배', img: '2022네이버쇼핑·카카오커머스 — 플랫폼 유통 지배.png' },
  { industry: '도매 및 소매업', year: 2025, title: '유통 디지털 전환 완성', img: '2025AI 추천·자동화 물류 — 유통 디지털 전환 완성.jpg' },

  // [H] 운수 및 창고업
  { industry: '운수 및 창고업', year: 1928, title: '시내버스 운행 시작', img: null },
  { industry: '운수 및 창고업', year: 1963, title: '운수업 성장 기초', img: '1963경제개발 초기 — 버스·트럭·연안해운 운수업 성장.JPG' },
  { industry: '운수 및 창고업', year: 1970, title: '경부고속도로 개통', img: '1970경부고속도로 개통 — 육상 화물 운송 본격화.jpg' },
  { industry: '운수 및 창고업', year: 1980, title: '수출 물동량 급증', img: '1980수출 증가 — 부산항 물동량 급증, 항만 확충.jpg' },
  { industry: '운수 및 창고업', year: 1989, title: '택배 산업 법제화', img: '1989택배 산업 법제화 — 한진·현대택배 설립.jpg' },
  { industry: '운수 및 창고업', year: 1998, title: 'IMF 물류 수요 붕괴', img: '1998IMF — 물류 수요 붕괴, 취업자 -8만명(-5%).webp' },
  { industry: '운수 및 창고업', year: 2000, title: '인터넷쇼핑 택배 성장', img: '2000인터넷쇼핑 택배 성장 — 2억건→8억건(2005).jpg' },
  { industry: '운수 및 창고업', year: 2009, title: '택배 1조원 돌파', img: '2009택배 1조원 돌파 — 취업자 +11만명(+41.5%).jpeg' },
  { industry: '운수 및 창고업', year: 2015, title: '쿠팡맨 직배송 혁신', img: '2015쿠팡맨 직배송 — 물류 직고용 혁신.jpg' },
  { industry: '운수 및 창고업', year: 2018, title: '새벽배송 시장 성장', img: '2018새벽배송 성장 — 여성 취업자 +50천명(+12.3%).jpeg' },
  { industry: '운수 및 창고업', year: 2020, title: '코로나19 물류 폭발', img: '2020코로나19 — 택배 33억건(+21%), 물류 폭발.jpg' },
  { industry: '운수 및 창고업', year: 2022, title: '배달 라이더 사상최대', img: '2022배달플랫폼 — 배달 라이더 약 40만명(사상 최대).jpg' },
  { industry: '운수 및 창고업', year: 2024, title: '풀필먼트 전국화', img: '2024풀필먼트 전국화 — 여성 취업자 +57천명(+10.1%).jpeg' },
  { industry: '운수 및 창고업', year: 2025, title: '자율주행 배송 시범', img: '2025자율주행 배송 시범 — AI 물류 최적화 도입.jpg' },

  // [F] 건설업
  { industry: '건설업', year: 1968, title: '경부고속도로 착공', img: '1968경부고속도로 착공 — 국가 인프라 투자 시작.jpg' },
  { industry: '건설업', year: 1973, title: '중동 건설 붐', img: '1973중동 건설 붐 — 해외 파견 인력 연 10만명.jpg' },
  { industry: '건설업', year: 1982, title: '서울올림픽 인프라 착공', img: '1982서울올림픽 유치 — 경기장·인프라 착공.jpg' },
  { industry: '건설업', year: 1989, title: '1기 신도시 착공', img: '1989-1기 신도시 착공 — 주택 연 75만호 착공.jpg' },
  { industry: '건설업', year: 1997, title: 'IMF 건설사 부도', img: '1997IMF — 건설사 40여개 부도·취업자 -40만명(-20%).jpg' },
  { industry: '건설업', year: 2003, title: '행정수도 이전 추진', img: '2003행정수도 이전 추진 — 세종시 개발 착수.webp' },
  { industry: '건설업', year: 2007, title: '2기 신도시 개발', img: '2007-2기 신도시 개발 (판교·광교·동탄).jpg' },
  { industry: '건설업', year: 2008, title: '금융위기 자금난', img: '2008미분양 16만호 돌파 · 금융위기 — 자금난 심화.jpg' },
  { industry: '건설업', year: 2014, title: '부동산 규제 완화', img: '2014LTV·DTI 완화 — 부동산 경기 회복.jpg' },
  { industry: '건설업', year: 2017, title: '8·2 부동산 규제', img: '2017문재인 정부 8·2 부동산 규제.jpg' },
  { industry: '건설업', year: 2021, title: '3기 신도시 착공', img: '2021-3기 신도시 착공 (하남·고양·남양주).jpg' },
  { industry: '건설업', year: 2022, title: '레고랜드 PF 사태', img: '2022레고랜드 PF 사태 — 건설 자금시장 경색.jpg.webp' },
  { industry: '건설업', year: 2024, title: '고금리 PF 위기', img: '2024고금리·PF위기 — 건설 경기 침체, 법정관리 속출.jpeg' },

  // [K] 금융 및 보험업
  { industry: '금융 및 보험업', year: 1975, title: '은행 지점 전국 확대', img: '1975경제성장 — 은행·보험 지점 전국 확대.jpeg' },
  { industry: '금융 및 보험업', year: 1980, title: '금융 자율화 팽창', img: '1980금융 자율화 — 제2금융권 팽창, 취업자 332천명.jpeg' },
  { industry: '금융 및 보험업', year: 1988, title: '코스피 1000 증권 붐', img: '1988증권 붐 — 코스피 1000 돌파, 취업자 748천명.jpg' },
  { industry: '금융 및 보험업', year: 1991, title: '취업자 역대 최고', img: '1991금융업 취업자 역대 최고 — 1,054천명.jpg' },
  { industry: '금융 및 보험업', year: 1993, title: '금융실명제 시행', img: '1993 금융실명제.jpg' },
  { industry: '금융 및 보험업', year: 1997, title: 'IMF 외환위기', img: '1997 IMF.jpg' },
  { industry: '금융 및 보험업', year: 2000, title: '인터넷뱅킹 도입', img: '2000인터넷뱅킹 도입 — 비대면 금융 거래 시작.jpeg' },
  { industry: '금융 및 보험업', year: 2002, title: '카드대란 연체 폭증', img: '2002카드대란 — 연체율 30% 돌파, -28천명(-3.7%).jpeg' },
  { industry: '금융 및 보험업', year: 2008, title: '글로벌 금융위기', img: '2008 글로벌 금융위기.jpg' },
  { industry: '금융 및 보험업', year: 2015, title: '모바일뱅킹 확산', img: '2015 모바일뱅킹 확산.jpg' },
  { industry: '금융 및 보험업', year: 2020, title: '코로나 비대면 가속', img: '2020 코로나.jpeg' },
  { industry: '금융 및 보험업', year: 2022, title: '디지털뱅킹 고도화', img: '2022 디지털뱅킹.webp' },
  { industry: '금융 및 보험업', year: 2025, title: '핀테크 AI 금융', img: '2025 핀테크 에이아이금융.jpg' },

  // [P] 교육서비스업
  { industry: '교육서비스업', year: 1945, title: '의무교육 실시', img: null },
  { industry: '교육서비스업', year: 1992, title: '대학정원자유화', img: '1992 대학정원자유화.jpeg' },
  { industry: '교육서비스업', year: 1995, title: '531 교육개혁', img: '1995-531 교육개혁.jpeg' },
  { industry: '교육서비스업', year: 2000, title: '영어조기교육 열풍', img: '2000 영어조기교육.jpeg' },
  { industry: '교육서비스업', year: 2003, title: '사교육비 최고', img: '2003 사교육비 최고.jpg' },
  { industry: '교육서비스업', year: 2005, title: '주5일 수업제 도입', img: '2005 주5일 수업제 도입.jpg' },
  { industry: '교육서비스업', year: 2008, title: '금융위기 교육 타격', img: '2008 글로벌금융위기.webp' },
  { industry: '교육서비스업', year: 2015, title: '저출산 인구절벽', img: '2015 저출산.jpg' },
  { industry: '교육서비스업', year: 2020, title: '코로나 원격수업', img: '2020 코로나 원격.jpg' },
  { industry: '교육서비스업', year: 2022, title: '메타버스 교육', img: '2022 메타버스 에이앙이교육.jpg' },
  { industry: '교육서비스업', year: 2025, title: 'AI 개인화 학습', img: '2025_ ai 개인화 학습.jpeg' },

  // [R] 예술·스포츠 및 여가
  { industry: '예술·스포츠 및 여가', year: 1988, title: '서울올림픽 개최', img: '1988 서울올림픽.jpg.avif' },
  { industry: '예술·스포츠 및 여가', year: 2000, title: '문화산업 국가전략화', img: '2000문화산업진흥기본법 강화 — 콘텐츠 국가 전략화.png' },
  { industry: '예술·스포츠 및 여가', year: 2002, title: '한일월드컵', img: '2002 한일월드컵.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2003, title: '겨울연가 한류', img: '2003 겨울연가 한류.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2005, title: '주5일제 정착', img: '2005 주5일제.jpg' },
  { industry: '예술·스포츠 및 여가', year: 2009, title: '한류 2차 붐', img: '2009문화콘텐츠 육성+한류 2차 붐 — 남성 +141천명(+22%).jpg' },
  { industry: '예술·스포츠 및 여가', year: 2012, title: '강남스타일 글로벌', img: '2012 강남스타일 글로벌히트.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2013, title: '1인 크리에이터 등장', img: '2013-1인 크리에이터 등장 — 여성 +118천명(+10.3%).jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2018, title: '평창 동계올림픽', img: '2018 평창 동계올림픽.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2019, title: '영화 기생충', img: '2019 기생충.jpg' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '코로나 공연 침체', img: '2020 코로나.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2021, title: '오징어게임 OTT', img: '2021 오징어게임 ott 한류.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2022, title: '엔데믹 공연 재개', img: '2022 엔데믹 공연 재개.jpg' },
  { industry: '예술·스포츠 및 여가', year: 2025, title: 'AI 콘텐츠 시대', img: '2025AI 콘텐츠·e스포츠 — e스포츠 산업 1조원 규모.jpeg' },

  // [M] 전문과학 및 기술서비스업
  { industry: '전문과학 및 기술서비스업', year: 1999, title: 'IT 벤처 붐', img: '1999_it 벤처 붐.webp' },
  { industry: '전문과학 및 기술서비스업', year: 2008, title: '녹색 R&D 확대', img: '2008녹색 R&D — 환경·에너지 연구 확대, +54천명(+7.6%).jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2011, title: '바이오 IT 융합', img: '2011바이오·IT 융합 붐 — CRA·바이오연구원 급증, +80천명.jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2013, title: '창조경제 스타트업', img: '2013 창조경제 - 스타트업 8만개 신설.jpeg' },
  { industry: '전문과학 및 기술서비스업', year: 2017, title: '4차산업 전략 본격화', img: '2017-4차산업혁명위원회 출범 — AI·빅데이터 국가 전략.webp' },
  { industry: '전문과학 및 기술서비스업', year: 2019, title: '데이터 3법 통과', img: '2019 데이터 3법 통과.jpeg' },
  { industry: '전문과학 및 기술서비스업', year: 2020, title: '디지털 뉴딜', img: '2020 디지털 뉴딜.jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2022, title: '배터리 인력난', img: '2022 반도체 배터리 인력난.png' },

  // [O] 공공행정 및 국방
  { industry: '공공행정 및 국방', year: 1992, title: '지방자치제 출범', img: '1992지방자치제 출범 — 지방직 공무원 수요 증가.jpg' },
  { industry: '공공행정 및 국방', year: 1998, title: 'IMF 공공 구조조정', img: '1998 IMF 공공 구조조정.jpg' },
  { industry: '공공행정 및 국방', year: 2001, title: '전자정부 구축', img: '2001 전자정부 구축.jpg' },
  { industry: '공공행정 및 국방', year: 2009, title: '글로벌금융위기', img: '2009 글로벌금융위기.jpg' },
  { industry: '공공행정 및 국방', year: 2013, title: '여성공직 확대', img: '2013 여성공직 확대.jpg' },
  { industry: '공공행정 및 국방', year: 2017, title: '공무원 17만명 증원', img: '2017공무원 17만명 증원 — 경찰·소방·복지직 집중 채용.jpg' },
  { industry: '공공행정 및 국방', year: 2019, title: '공공 일자리 확대', img: '2019 공공 일자리 81만개 .jpg' },
  { industry: '공공행정 및 국방', year: 2020, title: '코로나19 방역행정', img: '2020 코로나 19.jpg' },
  { industry: '공공행정 및 국방', year: 2021, title: '디지털 정부 혁신', img: '2021 디지털 정부 혁신.png' },
  { industry: '공공행정 및 국방', year: 2025, title: 'AI 행정 도입', img: '2025 AI 행정 도입.jpg' },

  // [A] 농림어업
  { industry: '농림어업', year: 1963, title: '농업인구 최대', img: '1963 농업인구 최대 .jpg' },
  { industry: '농림어업', year: 1970, title: '새마을운동 시작', img: '1970새마을운동 시작.jpg' },
  { industry: '농림어업', year: 1971, title: '통일벼 보급', img: '1971통일벼 보급 — 쌀 수확량 혁신.webp' },
  { industry: '농림어업', year: 1977, title: '쌀 자급 달성', img: '1977쌀 자급 달성.jpg' },
  { industry: '농림어업', year: 1980, title: '냉해 대흉작', img: '1980냉해 대흉작 — 쌀 생산 20% 감소.jpg' },
  { industry: '농림어업', year: 1989, title: '농어촌발전 대책', img: '1989농어촌발전종합대책 시행.png' },
  { industry: '농림어업', year: 1992, title: 'UR 협상 타결', img: '1992UR 농산물 협상 타결.jpg' },
  { industry: '농림어업', year: 1995, title: 'WTO 출범', img: '1995WTO 출범 — 농산물 관세화 의무.jpg' },
  { industry: '농림어업', year: 2003, title: '한·칠레 FTA', img: '2003한·칠레 FTA 발효 (최초 FTA).jpg' },
  { industry: '농림어업', year: 2007, title: '한·미 FTA 타결', img: '2007한·미 FTA 협상 타결.jpg' },
  { industry: '농림어업', year: 2010, title: '구제역 대확산', img: '2010구제역 대확산 — 350만두 살처분.jpg' },
  { industry: '농림어업', year: 2011, title: '한·EU FTA 발효', img: '2011한·EU FTA 발효.webp.webp' },
  { industry: '농림어업', year: 2015, title: '쌀 시장 전면 개방', img: '2015쌀 시장 전면 개방 (관세화).jpg' },
  { industry: '농림어업', year: 2020, title: '귀농·귀촌 급증', img: '2020코로나19 — 귀농·귀촌 급증 .jpg' },
  { industry: '농림어업', year: 2022, title: '고령화율 49% 돌파', img: '2022농가 고령화율 49% 돌파.jpg' },
];

const COLORS: Record<string, string> = {
  1: 'rgba(248, 105, 107, 0.4)',
  2: 'rgba(251, 170, 119, 0.4)',
  3: 'rgba(255, 235, 132, 0.4)',
  4: 'rgba(177, 213, 128, 0.4)',
  5: 'rgba(99, 190, 123, 0.4)',
};

const Heatmap = () => {
  const shouldShowYear = (year: number) => {
    if (year <= 1960) return year % 10 === 0 || year === 1876;
    if (year <= 2024) return year % 5 === 0;
    return true;
  };

  return (
    <div className="bg-white w-full min-h-screen text-slate-900 font-sans m-0 p-0 overflow-x-hidden flex flex-col">
      <div className="w-full text-center mb-12 px-4 mt-20">
        <span className="text-blue-600 font-semibold tracking-wider text-[14px] uppercase block mb-2">Job Timeline</span>
        <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25]">한국의 산업군 일자리 타임라인 (1876–2050)</h2>
      </div>

      <div className="w-full flex justify-center mb-12">
        <div className="flex flex-col items-start gap-2 bg-slate-50 p-4 rounded-md border border-slate-200">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(248,105,107,0.5)]" /> 1점: 역대 최저권</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(251,170,119,0.5)]" /> 2점: 하위권</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(255,235,132,0.5)]" /> 3점: 중간권</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(177,213,128,0.5)]" /> 4점: 상위권</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(99,190,123,0.5)]" /> 5점: 역대 최고권</div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm mt-1">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-slate-100 border border-slate-200" /> 빈칸: 해당 시기 데이터 없음</div>
            <div className="flex items-center gap-1.5 text-slate-500">| <span className="font-bold text-slate-700">산업별 취업자 수</span> 기반</div>
          </div>
        </div>
      </div>

      <div className="w-full px-0 relative">
        <div className="sticky top-0 z-50 bg-white border-b border-slate-200 pt-6 pb-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-[50px_repeat(10,1fr)] md:grid-cols-[60px_repeat(10,1fr)] gap-0 w-full">
            <div className="text-slate-500 text-[9px] md:text-xs font-bold flex items-center justify-center border-r border-slate-200">연도</div>
            {INDUSTRIES.map(ind => (
              <div key={ind.id} className="text-slate-900 text-[8px] md:text-xs font-bold text-center flex items-center justify-center px-0.5 break-keep leading-tight">
                {ind.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full pb-32 relative z-10 w-full pt-2">
          {DATA.map((d) => {
            const eventsInThisYear = EVENT_LIST.filter(ev => ev.year === d.year);
            const hasEvent = eventsInThisYear.length > 0;
            
            let minRowHeight = d.year <= 1960 ? 12 : d.year <= 2024 ? 28 : 56;
            if (hasEvent) {
              minRowHeight = Math.max(minRowHeight, 80);
            }

            const isSplit2025 = d.year === 2025;
            const isSplit2035 = d.year === 2035;

            return (
              <React.Fragment key={d.year}>
                {(isSplit2025 || isSplit2035) && (
                  <div className="grid grid-cols-[50px_repeat(10,1fr)] md:grid-cols-[60px_repeat(10,1fr)] w-full h-[60px] md:h-[80px] relative">
                    <div className="border-r border-slate-200 h-full"></div>
                    {INDUSTRIES.map(ind => (
                      <div key={`split-${ind.id}`} className="border-r border-slate-100 h-full"></div>
                    ))}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-slate-300 transform -translate-y-1/2" />
                      <div className="absolute top-1/2 left-0 w-full flex justify-center transform -translate-y-1/2">
                        <span className="bg-white px-6 z-10 text-slate-800 font-bold text-xs md:text-sm border border-slate-200 rounded-full py-1.5 shadow-sm">
                          {d.year === 2025 ? '2025년 KEIS 전망 진입' : '2035년 장기 추정 진입'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-[50px_repeat(10,1fr)] md:grid-cols-[60px_repeat(10,1fr)] w-full group/row cursor-crosshair">
                  <div className="border-r border-slate-200 flex items-center justify-center relative" style={{ minHeight: `${minRowHeight}px` }}>
                    {shouldShowYear(d.year) && (
                      <span className="z-10 text-slate-500 text-[9px] md:text-xs bg-white px-1 whitespace-nowrap font-medium">
                        {d.year}
                      </span>
                    )}
                  </div>

                  {INDUSTRIES.map(ind => {
                    const val = (d as any)[ind.id] as number | null;
                    const bgColor = val ? COLORS[val] : 'transparent';
                    const borderClasses = "border-slate-100 border-r";

                    const event = eventsInThisYear.find(ev => ev.industry === ind.name);
                    const hasImage = event?.img && event.img.trim() !== "";
                    
                    return (
                      <div
                        key={`${ind.id}-${d.year}`}
                        className={`relative flex flex-col items-center justify-center ${borderClasses} transition-all duration-200`}
                        style={{ minHeight: `${minRowHeight}px`, backgroundColor: bgColor }}
                      >
                        {event && (
                          <div 
                            className="absolute top-1 bottom-1 left-1 right-1 md:top-1.5 md:bottom-1.5 md:left-1.5 md:right-1.5 overflow-hidden rounded-[4px] shadow-sm flex flex-col items-center justify-center p-1 group/event z-20 hover:z-30 hover:scale-[1.15] transition-all duration-300"
                            style={{
                              backgroundColor: hasImage ? '#000000' : 'rgba(0,0,0,0.7)',
                              backgroundImage: hasImage 
                                ? `url('/${encodeURIComponent(event.img || '')}')`
                                : `url('https://source.unsplash.com/featured/?${ind.keyword},${event.year}')`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          >
                            <div className="absolute inset-0 bg-black/60 group-hover/event:bg-black/30 transition-colors duration-300" />
                            <div className="relative z-10 text-center w-full">
                              <span className="block text-white/90 text-[8px] md:text-[9px] font-black tracking-tighter mb-0.5 opacity-80 group-hover/event:opacity-100">
                                {event.year}
                              </span>
                              <h3 className="text-white text-[8px] md:text-[10px] font-bold leading-[1.2] break-keep drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                                {event.title}
                              </h3>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
