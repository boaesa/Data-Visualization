import React, { useState, useEffect, useRef, useMemo } from 'react';
import DATA from './HeatmapData.json';

const INDUSTRIES = [
  { id: 'J', name: '정보통신업',           keyword: 'technology,data'     },
  { id: 'Q', name: '보건업 및 사회복지',   keyword: 'medical,healthcare'  },
  { id: 'C', name: '제조업',               keyword: 'factory,production'  },
  { id: 'M', name: '전문과학 및 기술서비스업', keyword: 'science,research' },
  { id: 'K', name: '금융 및 보험업',       keyword: 'finance,stock'       },
  { id: 'G', name: '도매 및 소매업',       keyword: 'retail,shopping'     },
  { id: 'R', name: '예술·스포츠 및 여가', keyword: 'arts,stadium'        },
  { id: 'H', name: '운수 및 창고업',       keyword: 'logistics,truck'     },
  { id: 'O', name: '공공행정 및 국방',     keyword: 'government,city'     },
  { id: 'P', name: '교육서비스업',         keyword: 'school,classroom'    },
];

const EVENT_LIST = [
  // [J] 정보통신업
  { industry: '정보통신업', year: 1885, title: '한성~인천 전신 개통',   img: null },
  { industry: '정보통신업', year: 1902, title: '한성전화소 개설',        img: null },
  { industry: '정보통신업', year: 1994, title: '인터넷 상용화',          img: null },
  { industry: '정보통신업', year: 1998, title: '벤처 붐 및 스타크래프트 유행', img: null },
  { industry: '정보통신업', year: 2000, title: '닷컴 벤처 붐',           img: '2000 닷컴벤처붐.jpg' },
  { industry: '정보통신업', year: 2001, title: '닷컴 버블 붕괴',         img: '2001 닷컴 버블 붕괴.jpg' },
  { industry: '정보통신업', year: 2003, title: '초고속 인터넷 최고 보급률', img: '2003 초고속 인터넷 세계 최고 보급률 달성.jpg' },
  { industry: '정보통신업', year: 2009, title: '스마트폰 국내 보급',     img: '2009 스마트폰 국내 보급.jpeg' },
  { industry: '정보통신업', year: 2011, title: '4G LTE 상용화',          img: '2011 -4G LTE 상용화 .jpeg' },
  { industry: '정보통신업', year: 2015, title: 'O2O 플랫폼 성장',        img: '2015 O2O 플랫폼 성장.jpeg' },
  { industry: '정보통신업', year: 2019, title: '세계 최초 5G 상용화',    img: '2019세계 최초 5G 상용화 — IoT·5G 엔지니어 수요 증가.jpg' },
  { industry: '정보통신업', year: 2020, title: '코로나19 비대면 전환',   img: '2020 코로나.jpg' },
  { industry: '정보통신업', year: 2022, title: 'ChatGPT 등장',           img: '2022 챗지피티 등장.jpeg' },
  { industry: '정보통신업', year: 2025, title: 'AI 에이전트 상용화',     img: '2025-AI 에이전트 상용화 — 취업자 1,140천명, SW자동화 시대.jpeg' },
  // [C] 제조업
  { industry: '제조업', year: 1970, title: '수출 100억 달러 목표',      img: '1970수출 100억 달러 목표 — 봉제·가발공장 급증.png' },
  { industry: '제조업', year: 1973, title: '중화학공업화 선언',          img: '1973중화학공업화 선언 — 철강·조선·화학 육성.jpg.avif' },
  { industry: '제조업', year: 1979, title: '2차 오일쇼크',               img: '1979-2차 오일쇼크 — 유가 2배 상승, 수출 타격.jpg' },
  { industry: '제조업', year: 1986, title: '3저 호황',                   img: '1986-3저호황 — 수출 급증, 제조업 황금기.webp' },
  { industry: '제조업', year: 1988, title: '서울올림픽 특수',             img: '1988서울올림픽 특수 — 전자·자동차 생산 최대.jpg' },
  { industry: '제조업', year: 1998, title: 'IMF 구조조정',               img: '1998IMF 구조조정 — 제조업 취업자 -36만명(-12.3%).jpg' },
  { industry: '제조업', year: 2001, title: '중국 WTO 가입',              img: '2001중국 WTO 가입 — 섬유·신발 경쟁력 상실.jpg' },
  { industry: '제조업', year: 2008, title: '글로벌 금융위기',            img: '2008글로벌 금융위기 — 자동차·철강 감산.jpg' },
  { industry: '제조업', year: 2010, title: '수출 3대장 신기록',          img: '2010자동차·반도체·스마트폰 수출 동시 신기록.jpg' },
  { industry: '제조업', year: 2016, title: '조선업 구조조정',            img: '2016조선업 구조조정 — 직간접 고용 -10만명.jpeg' },
  { industry: '제조업', year: 2019, title: '일본 반도체 소재 규제',      img: '2019일본 반도체 소재 수출 규제.jpg' },
  { industry: '제조업', year: 2020, title: '코로나19 자동화 가속',       img: '2020코로나19 + 공급망 붕괴 — 자동화 투자 가속.jpg' },
  { industry: '제조업', year: 2022, title: '반도체 다운사이클',          img: '2022반도체 다운사이클 — 재고 과잉·감산.jpeg' },
  { industry: '제조업', year: 2024, title: 'AI 반도체 붐',               img: '2024 AI 반도체 붐 .jpg' },
  // [Q] 보건업 및 사회복지
  { industry: '보건업 및 사회복지', year: 1989, title: '전국민 의료보험',     img: '1989 전국민 의료보험 도입.jpg' },
  { industry: '보건업 및 사회복지', year: 2000, title: '의약분업 시행',        img: '2000 의약분업.jpg' },
  { industry: '보건업 및 사회복지', year: 2008, title: '노인장기요양보험',     img: '2008 노인장기요양보험.jpeg' },
  { industry: '보건업 및 사회복지', year: 2010, title: '요양시장 폭발',        img: '2010 요양시장 폭발.gif' },
  { industry: '보건업 및 사회복지', year: 2011, title: '무상보육 시행',        img: '2011무상보육 시행 — 보육교사 30만명으로 증가.jpg' },
  { industry: '보건업 및 사회복지', year: 2018, title: '치매국가책임제',        img: '2018치매국가책임제.jpg' },
  { industry: '보건업 및 사회복지', year: 2020, title: '코로나19 인력 총동원', img: '2020코로나19 — 의료·복지 인력 총동원.jpg' },
  { industry: '보건업 및 사회복지', year: 2025, title: '초고령사회 진입',       img: '2025 초고령사회진입.jpg' },
  // [G] 도매 및 소매업
  { industry: '도매 및 소매업', year: 1982, title: '소비 붐 중산층 확대',  img: '1982소비 붐 — 중산층 확대, 도소매 취업자 317만명 최고.jpg' },
  { industry: '도매 및 소매업', year: 1988, title: '올림픽 소비 호황',     img: '1988올림픽 소비 호황 — 백화점·소비재 판매 최대.jpg' },
  { industry: '도매 및 소매업', year: 1993, title: '이마트 1호점 개점',    img: '1993이마트 1호점 개점 — 대형할인점 시대 개막.jpg' },
  { industry: '도매 및 소매업', year: 1996, title: '대형마트 전국화',      img: '1996홈플러스·롯데마트 전국화 — 재래시장 위축.jpeg' },
  { industry: '도매 및 소매업', year: 1998, title: 'IMF 소비 급감',        img: '1998IMF — 소비 급감, 소매점 대량 폐업(-24만명,-9%).jpeg' },
  { industry: '도매 및 소매업', year: 2000, title: '인터넷쇼핑 태동',      img: '2000인터넷쇼핑 태동 — 옥션·인터파크 거래 급증.jpeg' },
  { industry: '도매 및 소매업', year: 2003, title: '카드대란 소비 위축',   img: '2003카드대란 — 소비 급위축, 할부판매 직격탄.jpeg' },
  { industry: '도매 및 소매업', year: 2011, title: '소셜커머스 쿠팡',      img: '2011소셜커머스 — 쿠팡·티몬·위메프 등장.jpg' },
  { industry: '도매 및 소매업', year: 2018, title: '로켓배송 전면화',      img: '2018쿠팡 로켓배송 전면화 — 이커머스 판도 변화.jpeg' },
  { industry: '도매 및 소매업', year: 2020, title: '코로나19 이커머스 폭발', img: '2020코로나19 — 오프라인 소매 -84천명, 이커머스 159조원.jpg' },
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
  { industry: '운수 및 창고업', year: 2022, title: '배달 라이더 최대',     img: '2022배달플랫폼 — 배달 라이더 약 40만명(사상 최대).jpg' },
  { industry: '운수 및 창고업', year: 2025, title: '자율주행 배송 시범',   img: '2025자율주행 배송 시범 — AI 물류 최적화 도입.jpg' },
  // [K] 금융 및 보험업
  { industry: '금융 및 보험업', year: 1975, title: '은행 지점 전국 확대', img: '1975경제성장 — 은행·보험 지점 전국 확대.jpeg' },
  { industry: '금융 및 보험업', year: 1988, title: '코스피 1000 증권 붐', img: '1988증권 붐 — 코스피 1000 돌파, 취업자 748천명.jpg' },
  { industry: '금융 및 보험업', year: 1997, title: 'IMF 외환위기',        img: '1997 IMF.jpg' },
  { industry: '금융 및 보험업', year: 2000, title: '인터넷뱅킹 도입',     img: '2000인터넷뱅킹 도입 — 비대면 금융 거래 시작.jpeg' },
  { industry: '금융 및 보험업', year: 2002, title: '카드대란',             img: '2002카드대란 — 연체율 30% 돌파, -28천명(-3.7%).jpeg' },
  { industry: '금융 및 보험업', year: 2008, title: '글로벌 금융위기',     img: '2008 글로벌 금융위기.jpg' },
  { industry: '금융 및 보험업', year: 2015, title: '모바일뱅킹 확산',     img: '2015 모바일뱅킹 확산.jpg' },
  { industry: '금융 및 보험업', year: 2020, title: '코로나 비대면 금융', img: '2020 코로나.jpeg' },
  { industry: '금융 및 보험업', year: 2025, title: '핀테크 AI 금융',      img: '2025 핀테크 에이아이금융.jpg' },
  // [R] 예술·스포츠 및 여가
  { industry: '예술·스포츠 및 여가', year: 1988, title: '서울올림픽 개최',   img: '1988 서울올림픽.jpg.avif' },
  { industry: '예술·스포츠 및 여가', year: 2000, title: '문화산업 국가전략화', img: '2000문화산업진흥기본법 강화 — 콘텐츠 국가 전략화.png' },
  { industry: '예술·스포츠 및 여가', year: 2002, title: '한일월드컵',         img: '2002 한일월드컵.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2003, title: '겨울연가 한류',       img: '2003 겨울연가 한류.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2009, title: '한류 2차 붐',         img: '2009문화콘텐츠 육성+한류 2차 붐 — 남성 +141천명(+22%).jpg' },
  { industry: '예술·스포츠 및 여가', year: 2012, title: '강남스타일 글로벌',   img: '2012 강남스타일 글로벌히트.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2019, title: '영화 기생충',         img: '2019 기생충.jpg' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '코로나 공연 침체',    img: '2020 코로나.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2021, title: '오징어게임 OTT',      img: '2021 오징어게임 ott 한류.jpeg' },
  { industry: '예술·스포츠 및 여가', year: 2022, title: '엔데믹 공연 재개',    img: '2022 엔데믹 공연 재개.jpg' },
  { industry: '예술·스포츠 및 여가', year: 2025, title: 'AI 콘텐츠 시대',      img: '2025AI 콘텐츠·e스포츠 — e스포츠 산업 1조원 규모.jpeg' },
  // [M] 전문과학 및 기술서비스업
  { industry: '전문과학 및 기술서비스업', year: 1999, title: 'IT 벤처 붐',       img: '1999_it 벤처 붐.webp' },
  { industry: '전문과학 및 기술서비스업', year: 2008, title: '녹색 R&D 확대',    img: '2008녹색 R&D — 환경·에너지 연구 확대, +54천명(+7.6%).jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2011, title: '바이오 IT 융합',   img: '2011바이오·IT 융합 붐 — CRA·바이오연구원 급증, +80천명.jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2013, title: '창조경제 스타트업', img: '2013 창조경제 - 스타트업 8만개 신설.jpeg' },
  { industry: '전문과학 및 기술서비스업', year: 2017, title: '4차산업 전략',     img: '2017-4차산업혁명위원회 출범 — AI·빅데이터 국가 전략.webp' },
  { industry: '전문과학 및 기술서비스업', year: 2019, title: '데이터 3법',        img: '2019 데이터 3법 통과.jpeg' },
  { industry: '전문과학 및 기술서비스업', year: 2020, title: '디지털 뉴딜',       img: '2020 디지털 뉴딜.jpg' },
  { industry: '전문과학 및 기술서비스업', year: 2022, title: '반도체·배터리 인력난', img: '2022 반도체 배터리 인력난.png' },
  // [O] 공공행정 및 국방
  { industry: '공공행정 및 국방', year: 1992, title: '지방자치제 출범',   img: '1992지방자치제 출범 — 지방직 공무원 수요 증가.jpg' },
  { industry: '공공행정 및 국방', year: 1998, title: 'IMF 공공 구조조정', img: '1998 IMF 공공 구조조정.jpg' },
  { industry: '공공행정 및 국방', year: 2001, title: '전자정부 구축',      img: '2001 전자정부 구축.jpg' },
  { industry: '공공행정 및 국방', year: 2013, title: '여성공직 확대',      img: '2013 여성공직 확대.jpg' },
  { industry: '공공행정 및 국방', year: 2017, title: '공무원 17만명 증원', img: '2017공무원 17만명 증원 — 경찰·소방·복지직 집중 채용.jpg' },
  { industry: '공공행정 및 국방', year: 2020, title: '코로나19 방역행정', img: '2020 코로나 19.jpg' },
  { industry: '공공행정 및 국방', year: 2025, title: 'AI 행정 도입',       img: '2025 AI 행정 도입.jpg' },
  // [P] 교육서비스업
  { industry: '교육서비스업', year: 1992, title: '대학정원 자율화', img: '1992 대학정원자유화.jpeg' },
  { industry: '교육서비스업', year: 1995, title: '5·31 교육개혁',  img: '1995-531 교육개혁.jpeg' },
  { industry: '교육서비스업', year: 2000, title: '영어조기교육',   img: '2000 영어조기교육.jpeg' },
  { industry: '교육서비스업', year: 2003, title: '사교육비 최고',   img: '2003 사교육비 최고.jpg' },
  { industry: '교육서비스업', year: 2005, title: '주5일 수업제',   img: '2005 주5일 수업제 도입.jpg' },
  { industry: '교육서비스업', year: 2015, title: '저출산 인구절벽', img: '2015 저출산.jpg' },
  { industry: '교육서비스업', year: 2020, title: '코로나 원격수업', img: '2020 코로나 원격.jpg' },
  { industry: '교육서비스업', year: 2025, title: 'AI 개인화 학습', img: '2025_ ai 개인화 학습.jpeg' },
];

export const RAW_JOBS = [
  { industry:'정보통신업', year:1885, title:'전신기사', status:'등장' },
  { industry:'정보통신업', year:1902, title:'전화교환원', status:'등장' },
  { industry:'정보통신업', year:1970, title:'메인프레임 운영자', status:'등장' },
  { industry:'정보통신업', year:1970, title:'전산원(펀치카드)', status:'등장' },
  { industry:'정보통신업', year:1970, title:'전화교환원', status:'확산' },
  { industry:'정보통신업', year:1980, title:'네트워크 엔지니어', status:'등장' },
  { industry:'정보통신업', year:1980, title:'데이터베이스 관리자', status:'등장' },
  { industry:'정보통신업', year:1980, title:'소프트웨어 개발자', status:'등장' },
  { industry:'정보통신업', year:1980, title:'전산 운영원', status:'등장' },
  { industry:'정보통신업', year:1980, title:'전산원(펀치카드)', status:'확산' },
  { industry:'정보통신업', year:1980, title:'타이피스트', status:'등장' },
  { industry:'정보통신업', year:1994, title:'IT PM', status:'등장' },
  { industry:'정보통신업', year:1994, title:'IT 시스템 운영자', status:'등장' },
  { industry:'정보통신업', year:1994, title:'웹 개발자', status:'등장' },
  { industry:'정보통신업', year:1998, title:'PC방 운영자', status:'등장' },
  { industry:'정보통신업', year:1998, title:'e비즈니스 기획자', status:'등장' },
  { industry:'정보통신업', year:1998, title:'게임 개발자', status:'등장' },
  { industry:'정보통신업', year:1998, title:'컴퓨터 수리 기사', status:'등장' },
  { industry:'정보통신업', year:1999, title:'사이버보안 전문가', status:'등장' },
  { industry:'정보통신업', year:2000, title:'IT 보안 관제원', status:'등장' },
  { industry:'정보통신업', year:2000, title:'UX/UI 디자이너', status:'등장' },
  { industry:'정보통신업', year:2000, title:'디지털 마케터', status:'등장' },
  { industry:'정보통신업', year:2000, title:'전신기사', status:'위험' },
  { industry:'정보통신업', year:2003, title:'온라인 커뮤니티 운영자', status:'등장' },
  { industry:'정보통신업', year:2006, title:'바이럴 마케터', status:'등장' },
  { industry:'정보통신업', year:2009, title:'모바일 앱 개발자', status:'등장' },
  { industry:'정보통신업', year:2010, title:'검색엔진 최적화(SEO) 전문가', status:'등장' },
  { industry:'정보통신업', year:2010, title:'앱 마케터', status:'등장' },
  { industry:'정보통신업', year:2010, title:'앱 분석가(UA)', status:'등장' },
  { industry:'정보통신업', year:2012, title:'DevOps 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2012, title:'데이터 사이언티스트', status:'등장' },
  { industry:'정보통신업', year:2013, title:'데이터 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2013, title:'빅데이터 아키텍트', status:'등장' },
  { industry:'정보통신업', year:2016, title:'머신러닝 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2016, title:'알파고 AI 충격', status:'등장' },
  { industry:'정보통신업', year:2016, title:'클라우드 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2017, title:'AI 챗봇 개발자', status:'등장' },
  { industry:'정보통신업', year:2017, title:'블록체인 개발자', status:'등장' },
  { industry:'정보통신업', year:2018, title:'AI 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2019, title:'RPA 개발자', status:'등장' },
  { industry:'정보통신업', year:2019, title:'디지털 트랜스포메이션 PM', status:'등장' },
  { industry:'정보통신업', year:2020, title:'AI 윤리 전문가', status:'등장' },
  { industry:'정보통신업', year:2020, title:'IT 시스템 운영자', status:'확산' },
  { industry:'정보통신업', year:2020, title:'MLOps 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2020, title:'데이터 라벨러', status:'등장' },
  { industry:'정보통신업', year:2020, title:'사이버 보안 침해 분석가', status:'등장' },
  { industry:'정보통신업', year:2020, title:'프롬프트 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2022, title:'LLM 파인튜닝 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2022, title:'생성AI 프로덕트 매니저', status:'등장' },
  { industry:'정보통신업', year:2022, title:'프롬프트 엔지니어', status:'확산' },
  { industry:'정보통신업', year:2023, title:'AI 서비스 운영자', status:'등장' },
  { industry:'정보통신업', year:2023, title:'AI 에이전트 개발자', status:'등장' },
  { industry:'정보통신업', year:2030, title:'AI 감사관', status:'등장' },
  { industry:'정보통신업', year:2030, title:'AI 안전 연구원', status:'등장' },
  { industry:'정보통신업', year:2030, title:'AI 엔지니어·ML 전문가', status:'등장' },
  { industry:'정보통신업', year:2030, title:'IT 시스템 운영자', status:'확산' },
  { industry:'정보통신업', year:2030, title:'디지털 트윈 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2030, title:'사이버보안 전문가', status:'확산' },
  { industry:'정보통신업', year:2030, title:'소프트웨어 개발자(초급)', status:'등장' },
  { industry:'정보통신업', year:2030, title:'양자 컴퓨팅 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2030, title:'웹 개발자', status:'확산' },
  { industry:'정보통신업', year:2035, title:'AI 에이전트 오케스트레이터', status:'등장' },
  { industry:'정보통신업', year:2035, title:'사이버 물리 시스템 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2035, title:'사이버-물리 시스템 엔지니어', status:'등장' },
  { industry:'정보통신업', year:2035, title:'소프트웨어 개발자', status:'확산' },
  { industry:'정보통신업', year:2035, title:'양자 암호 전문가', status:'등장' },
  { industry:'정보통신업', year:2035, title:'양자컴퓨팅 전문가', status:'등장' },
  { industry:'정보통신업', year:2040, title:'AI 인격 설계자', status:'등장' },
  { industry:'정보통신업', year:2040, title:'뇌-컴퓨터 인터페이스 개발자', status:'등장' },
  { industry:'정보통신업', year:2040, title:'범용AI 운영 전문가', status:'등장' },
  { industry:'정보통신업', year:2045, title:'AI 공진화 연구원', status:'등장' },
  { industry:'정보통신업', year:2045, title:'가상 세계 건축가', status:'등장' },
  { industry:'정보통신업', year:2050, title:'양자-AI 융합 개발자', status:'등장' },
  { industry:'정보통신업', year:2050, title:'포스트 AI 시대 큐레이터', status:'등장' },
  { industry:'금융 및 보험업', year:1950, title:'은행 창구직원', status:'등장' },
  { industry:'금융 및 보험업', year:1950, title:'주산원·계산원', status:'등장' },
  { industry:'금융 및 보험업', year:1962, title:'증권 중개인', status:'등장' },
  { industry:'금융 및 보험업', year:1977, title:'방문판매 보험원', status:'등장' },
  { industry:'금융 및 보험업', year:1977, title:'보험 계리사', status:'등장' },
  { industry:'금융 및 보험업', year:1977, title:'보험 설계사', status:'등장' },
  { industry:'금융 및 보험업', year:1981, title:'공인회계사', status:'등장' },
  { industry:'금융 및 보험업', year:1981, title:'금융 분석가', status:'등장' },
  { industry:'금융 및 보험업', year:1981, title:'손해사정사', status:'등장' },
  { industry:'금융 및 보험업', year:1981, title:'주산원·계산원', status:'확산' },
  { industry:'금융 및 보험업', year:1981, title:'텔레마케터(금융)', status:'등장' },
  { industry:'금융 및 보험업', year:1988, title:'외환 딜러', status:'등장' },
  { industry:'금융 및 보험업', year:1992, title:'투자 분석가', status:'등장' },
  { industry:'금융 및 보험업', year:1996, title:'신용분석사', status:'등장' },
  { industry:'금융 및 보험업', year:1997, title:'금융 분析가', status:'등장' },
  { industry:'금융 및 보험업', year:1997, title:'리스크 관리사', status:'등장' },
  { industry:'금융 및 보험업', year:1997, title:'신용회복 상담사', status:'등장' },
  { industry:'금융 및 보험업', year:1997, title:'외환 딜러', status:'확산' },
  { industry:'금융 및 보험업', year:1997, title:'은행 창구직원', status:'위험' },
  { industry:'금융 및 보험업', year:1999, title:'대출 심사원', status:'등장' },
  { industry:'금융 및 보험업', year:2000, title:'PB(개인자산관리사)', status:'등장' },
  { industry:'금융 및 보험업', year:2000, title:'방카슈랑스 판매원', status:'등장' },
  { industry:'금융 및 보험업', year:2000, title:'인터넷 증권 거래원', status:'등장' },
  { industry:'금융 및 보험업', year:2000, title:'펀드매니저', status:'등장' },
  { industry:'금융 및 보험업', year:2008, title:'글로벌 금융위기 대응 전문가', status:'등장' },
  { industry:'금융 및 보험업', year:2010, title:'외환 딜러', status:'확산' },
  { industry:'금융 및 보험업', year:2010, title:'증권 트레이더', status:'등장' },
  { industry:'금융 및 보험업', year:2010, title:'크라우드펀딩 매니저', status:'등장' },
  { industry:'금융 및 보험업', year:2015, title:'핀테크 전문가', status:'등장' },
  { industry:'금융 및 보험업', year:2016, title:'로보어드바이저 운영자', status:'등장' },
  { industry:'금융 및 보험업', year:2017, title:'암호화폐 트레이더', status:'등장' },
  { industry:'금융 및 보험업', year:2020, title:'ESG 투자 분석가', status:'등장' },
  { industry:'금융 및 보험업', year:2020, title:'은행 창구직원', status:'위험' },
  { industry:'금융 및 보험업', year:2020, title:'텔레마케터(금융)', status:'확산' },
  { industry:'금융 및 보험업', year:2021, title:'디지털 자산 컴플라이언스', status:'등장' },
  { industry:'금융 및 보험업', year:2030, title:'AI 리스크 모델러', status:'등장' },
  { industry:'금융 및 보험업', year:2030, title:'AI 리스크 분석가', status:'등장' },
  { industry:'금융 및 보험업', year:2030, title:'금융 분析가', status:'확산' },
  { industry:'금융 및 보험업', year:2030, title:'대출 심사원', status:'소멸' },
  { industry:'금융 및 보험업', year:2030, title:'은행 창구직원', status:'위험' },
  { industry:'금융 및 보험업', year:2030, title:'펀드매니저', status:'확산' },
  { industry:'금융 및 보험업', year:2030, title:'핀테크 전문가', status:'확산' },
  { industry:'금융 및 보험업', year:2035, title:'AI 자산 운용 전문가', status:'등장' },
  { industry:'금융 및 보험업', year:2035, title:'AI 투자 감독관', status:'등장' },
  { industry:'금융 및 보험업', year:2035, title:'디지털 화폐 운영자', status:'등장' },
  { industry:'금융 및 보험업', year:2035, title:'디지털 화폐(CBDC) 전문가', status:'등장' },
  { industry:'금융 및 보험업', year:2035, title:'보험 설계사', status:'확산' },
  { industry:'금융 및 보험업', year:2040, title:'개인 재무 AI 어드바이저', status:'등장' },
  { industry:'금융 및 보험업', year:2040, title:'개인 재무 AI 코치', status:'등장' },
  { industry:'금융 및 보험업', year:2045, title:'AI 투자 감독관', status:'확산' },
  { industry:'금융 및 보험업', year:2050, title:'탄소 크레딧 거래소 운영자', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1876, title:'통역관·역관', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1890, title:'신식 의사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1902, title:'약사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1910, title:'측량사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1930, title:'한의사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1948, title:'변호사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1960, title:'공인중개사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1960, title:'세무사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1961, title:'건축사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1961, title:'광고 카피라이터', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1965, title:'간호사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1971, title:'과학기술 연구원', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1973, title:'영양사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1973, title:'측량사', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:1973, title:'특허 전문가(변리사)', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1980, title:'변리사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1983, title:'광고 기획자(AE)', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1983, title:'인테리어 디자이너', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1987, title:'노동운동 활동가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1988, title:'노무사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1990, title:'번역가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1990, title:'정보보호 컨설턴트', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1990, title:'환경공학 기술자', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1993, title:'노무사', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:1995, title:'감정평가사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1995, title:'법무사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1997, title:'경영 컨설턴트', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1997, title:'아웃소싱 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:1998, title:'헤드헌터·채용 컨설턴트', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2000, title:'노무 컨설턴트', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2000, title:'데이터 분석가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2000, title:'환경 컨설턴트', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2010, title:'AI 연구원', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2010, title:'사물인터넷(IoT) 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2010, title:'스타트업 컨설턴트', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2013, title:'기후변화 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2013, title:'빅데이터 기획자', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2014, title:'핀테크 보안 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2019, title:'ESG 경영 컨설턴트', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2020, title:'AI 거버넌스 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2020, title:'디지털 전환(DX) 컨설턴트', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2020, title:'번역가', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:2020, title:'탄소배출권 거래사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2022, title:'AI 법률 서비스 기획자', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'AI 거버넌스 전문가', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'AI 특허 심사관', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'경영 컨설턴트', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'공인회계사', status:'소멸' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'그린테크 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'데이터 분석가', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'번역가', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'번역가(단순)', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2030, title:'세무사', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:2035, title:'AI 규제 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2035, title:'AI 규제·거버넌스 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2035, title:'기후공학 기술자', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2035, title:'세무사', status:'확산' },
  { industry:'전문과학 및 기술서비스업', year:2035, title:'탄소배출권 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2040, title:'AI 윤리 판사', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2040, title:'AI 윤리·거버넌스 전문가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2040, title:'지속가능성 전략가', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2045, title:'AI 법인 대리인', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2045, title:'AI 윤리·철학 연구자', status:'등장' },
  { industry:'전문과학 및 기술서비스업', year:2050, title:'인류 지식 보존사', status:'등장' },
  { industry:'도매', year:1876, title:'객주·여각 상인', status:'등장' },
  { industry:'도매', year:1910, title:'포목상·직물상', status:'등장' },
  { industry:'도매', year:1930, title:'백화점 판매원', status:'등장' },
  { industry:'도매', year:1950, title:'물장수', status:'등장' },
  { industry:'도매', year:1950, title:'얼음장수', status:'등장' },
  { industry:'도매', year:1960, title:'계산원(캐셔)', status:'등장' },
  { industry:'도매', year:1960, title:'외판원(방문판매원)', status:'등장' },
  { industry:'도매', year:1960, title:'재고관리 담당자', status:'등장' },
  { industry:'도매', year:1970, title:'농협 판매원', status:'등장' },
  { industry:'도매', year:1970, title:'도매 중간상', status:'등장' },
  { industry:'도매', year:1970, title:'세일즈맨(기업 영업)', status:'등장' },
  { industry:'도매', year:1988, title:'면세점 판매원', status:'등장' },
  { industry:'도매', year:1989, title:'여행 상품 기획자', status:'등장' },
  { industry:'도매', year:1989, title:'편의점 점원', status:'등장' },
  { industry:'도매', year:1990, title:'고객 서비스 상담원', status:'등장' },
  { industry:'도매', year:1990, title:'편의점 점원', status:'위험' },
  { industry:'도매', year:1997, title:'중고물품 판매원', status:'등장' },
  { industry:'도매', year:1999, title:'이커머스 운영자', status:'등장' },
  { industry:'도매', year:2000, title:'가격비교 사이트 운영자', status:'등장' },
  { industry:'도매', year:2000, title:'외판원(방문판매원)', status:'위험' },
  { industry:'도매', year:2000, title:'퍼스널 쇼퍼', status:'등장' },
  { industry:'도매', year:2002, title:'스포츠 용품 판매원', status:'등장' },
  { industry:'도매', year:2007, title:'물류 센터 포장 직원', status:'등장' },
  { industry:'도매', year:2008, title:'편의점 점원', status:'소멸' },
  { industry:'도매', year:2010, title:'데이터 기반 MD', status:'등장' },
  { industry:'도매', year:2010, title:'배달 플랫폼 운영자', status:'등장' },
  { industry:'도매', year:2010, title:'백화점 판매원', status:'소멸' },
  { industry:'도매', year:2010, title:'전단지 배포원', status:'등장' },
  { industry:'도매', year:2010, title:'학습지 교사', status:'등장' },
  { industry:'도매', year:2015, title:'1인 가구 가사 도우미', status:'등장' },
  { industry:'도매', year:2015, title:'쇼핑 라이브 호스트', status:'등장' },
  { industry:'도매', year:2015, title:'크로스보더 셀러', status:'등장' },
  { industry:'도매', year:2018, title:'당근마켓 판매자', status:'등장' },
  { industry:'도매', year:2018, title:'새벽배송 MD', status:'등장' },
  { industry:'도매', year:2019, title:'배달원(라이더)', status:'등장' },
  { industry:'도매', year:2020, title:'계산원(캐셔)', status:'위험' },
  { industry:'도매', year:2020, title:'고객 서비스 상담원', status:'소멸' },
  { industry:'도매', year:2020, title:'도매 중간상', status:'확산' },
  { industry:'도매', year:2020, title:'새벽배송 기사', status:'등장' },
  { industry:'도매', year:2020, title:'여행사 직원', status:'등장' },
  { industry:'도매', year:2020, title:'편의점 점원', status:'소멸' },
  { industry:'도매', year:2030, title:'계산원(캐셔)', status:'위험' },
  { industry:'도매', year:2030, title:'고객 서비스 상담원', status:'소멸' },
  { industry:'도매', year:2030, title:'이커머스 물류 운영자', status:'등장' },
  { industry:'도매', year:2030, title:'편의점 점원', status:'소멸' },
  { industry:'도매', year:2035, title:'AI 쇼핑 어드바이저', status:'등장' },
  { industry:'도매', year:2035, title:'AI 쇼핑 큐레이터', status:'등장' },
  { industry:'도매', year:2035, title:'배달원(라이더)', status:'소멸' },
  { industry:'도매', year:2040, title:'초개인화 큐레이터', status:'등장' },
  { industry:'도매', year:2045, title:'탄소 제로 유통 설계자', status:'등장' },
  { industry:'도매', year:2050, title:'AI 소비자 권익 보호관', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1902, title:'신문 기자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1910, title:'활동사진 변사', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1919, title:'신문 기자', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:1920, title:'사진작가', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1927, title:'라디오 아나운서', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1930, title:'탤런트·배우', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1940, title:'활동사진 변사', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:1950, title:'타이피스트', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:1960, title:'CF 감독', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1960, title:'스튜어디스(객실승무원)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1970, title:'광고 모델', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1970, title:'바둑 기사(프로)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1970, title:'방송 작가', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1970, title:'작곡가·음악 프로듀서', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1970, title:'탤런트·배우', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:1980, title:'케이블 방송 PD', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1982, title:'스포츠 선수(프로)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1982, title:'프로야구 선수', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1983, title:'개그맨·코미디언', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1983, title:'프로축구 선수', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1986, title:'스포츠 트레이너', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1986, title:'아시안게임 통역사', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1988, title:'국제회의 기획자(PCO)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1988, title:'레저·스포츠 강사', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1988, title:'스포츠 마케터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1988, title:'스포츠 중계 캐스터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1988, title:'이벤트 기획자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1988, title:'통역사(동시통역)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1988, title:'투어 가이드(관광 안내원)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1989, title:'여행 가이드(해외)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1990, title:'PC 게임 개발자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1990, title:'뮤직비디오 감독', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1990, title:'연예 매니저', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1991, title:'케이블 TV 운영자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1993, title:'쇼호스트', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1995, title:'홈쇼핑 MD', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:1998, title:'프로게이머', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2000, title:'3D 모델러', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2000, title:'웹 기획자(PD)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2002, title:'길거리 응원 기획자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2002, title:'스포츠 에이전트', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2002, title:'한류 PD·기획자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2004, title:'VFX 아티스트', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2004, title:'게임 기획자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2004, title:'웹툰 작가', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2004, title:'음반 기획자(A&R)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2004, title:'팟캐스트 진행자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2005, title:'UCC 크리에이터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2010, title:'스포츠 데이터 분석가', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2010, title:'유튜버·크리에이터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2010, title:'음반 기획자(A&R)', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:2010, title:'피트니스 트레이너', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2011, title:'웹드라마 PD', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2012, title:'소셜 큐레이터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2015, title:'K-pop 안무가', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2015, title:'e스포츠 코치·감독', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2015, title:'인플루언서', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2016, title:'e스포츠 해설가', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2016, title:'팬덤 마케터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2019, title:'VR 콘텐츠 제작자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2019, title:'웹툰 번역가', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'AI 아티스트', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'K-드라마 제작 PD', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'가상 인간 기획자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'공연 기획자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'그래픽 디자이너', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'메타버스 디자이너', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'버추얼 유튜버', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'일러스트레이터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'조명·음향 기사', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2020, title:'홈트레이닝 강사', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2021, title:'K-pop 트레이너', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2021, title:'OTT 콘텐츠 기획자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2021, title:'메타버스 아바타 디자이너', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2022, title:'NFT 아티스트', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2022, title:'숏폼 크리에이터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2023, title:'AI 콘텐츠 감별사', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2030, title:'3D 모델러', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:2030, title:'AI 창작 디렉터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2030, title:'VFX 아티스트', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:2030, title:'그래픽 디자이너', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:2030, title:'방송 작가', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:2030, title:'유튜버·숏폼 크리에이터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2030, title:'홀로그램 공연 기획자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2035, title:'AI 창작 디렉터', status:'확산' },
  { industry:'예술·스포츠 및 여가', year:2035, title:'XR 경험 설계자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2035, title:'디지털 경험 설계자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2040, title:'감성 AI 설계자', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2040, title:'몰입형 경험 디렉터', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2045, title:'감성 콘텐츠 치료사', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2045, title:'디지털 유산 관리사', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2050, title:'공연 예술가(라이브)', status:'등장' },
  { industry:'예술·스포츠 및 여가', year:2050, title:'인간 예술 감정사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1960, title:'간호보조원', status:'등장' },
  { industry:'보건업 및 사회복지', year:1963, title:'방사선사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1963, title:'임상병리사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1963, title:'치기공사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1965, title:'파독 간호사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1970, title:'물리치료사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1970, title:'사회복지사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1970, title:'임상심리사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1977, title:'보건교사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1977, title:'치과의사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1980, title:'물리치료사', status:'확산' },
  { industry:'보건업 및 사회복지', year:1980, title:'영양사', status:'확산' },
  { industry:'보건업 및 사회복지', year:1988, title:'스포츠 의학 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:1990, title:'간호사', status:'확산' },
  { industry:'보건업 및 사회복지', year:1990, title:'아동 심리 상담사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1990, title:'언어치료사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1996, title:'응급구조사', status:'등장' },
  { industry:'보건업 및 사회복지', year:1997, title:'직업재활사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2000, title:'병원 원무 행정직', status:'등장' },
  { industry:'보건업 및 사회복지', year:2000, title:'산후조리원 간호사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2000, title:'치과위생사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2000, title:'한의사', status:'확산' },
  { industry:'보건업 및 사회복지', year:2000, title:'호스피스 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2005, title:'노인 돌봄 서비스원', status:'등장' },
  { industry:'보건업 및 사회복지', year:2005, title:'의료관광 코디네이터', status:'등장' },
  { industry:'보건업 및 사회복지', year:2005, title:'의료정보 관리사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2008, title:'요양보호사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2010, title:'반려동물 미용사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2010, title:'반려동물 수의사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2010, title:'반려동물 훈련사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2010, title:'방사선사', status:'확산' },
  { industry:'보건업 및 사회복지', year:2010, title:'병원 코디네이터', status:'등장' },
  { industry:'보건업 및 사회복지', year:2010, title:'줄기세포 연구원', status:'등장' },
  { industry:'보건업 및 사회복지', year:2010, title:'헬스케어 앱 기획자', status:'등장' },
  { industry:'보건업 및 사회복지', year:2014, title:'임상시험 코디네이터(CRC)', status:'등장' },
  { industry:'보건업 및 사회복지', year:2015, title:'시니어 라이프 플래너', status:'등장' },
  { industry:'보건업 및 사회복지', year:2015, title:'정신건강 상담사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2017, title:'정신건강복지사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2017, title:'치매 전문 요양사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2018, title:'의료 AI 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'간호사', status:'확산' },
  { industry:'보건업 및 사회복지', year:2020, title:'감염병 관리 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'돌봄 로봇 운영자', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'백신 접종 간호사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'비대면 심리 상담사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'원격의료 코디네이터', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'유전상담사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'장례지도사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'펫 장례지도사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2020, title:'헬스 코치', status:'등장' },
  { industry:'보건업 및 사회복지', year:2022, title:'AI 신약 개발 연구원', status:'등장' },
  { industry:'보건업 및 사회복지', year:2023, title:'디지털 치료제 개발자', status:'등장' },
  { industry:'보건업 및 사회복지', year:2030, title:'AI 진단 보조원', status:'등장' },
  { industry:'보건업 및 사회복지', year:2030, title:'간호 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2030, title:'나노의학 기술자', status:'등장' },
  { industry:'보건업 및 사회복지', year:2030, title:'요양보호사', status:'확산' },
  { industry:'보건업 및 사회복지', year:2030, title:'요양보호사·돌봄 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2030, title:'의료 AI 전문가', status:'확산' },
  { industry:'보건업 및 사회복지', year:2035, title:'AI 의료 협업 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2035, title:'노인 돌봄 로봇 운영사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2035, title:'노인 돌봄 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2035, title:'요양보호사', status:'확산' },
  { industry:'보건업 및 사회복지', year:2035, title:'유전자 치료 연구원', status:'등장' },
  { industry:'보건업 및 사회복지', year:2035, title:'유전자 편집 기술자', status:'등장' },
  { industry:'보건업 및 사회복지', year:2040, title:'AI 의료 코디네이터', status:'등장' },
  { industry:'보건업 및 사회복지', year:2040, title:'인체 증강 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2040, title:'정신건강 AI 치료사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2045, title:'AI 돌봄 시스템 설계사', status:'등장' },
  { industry:'보건업 및 사회복지', year:2045, title:'노화 역전 연구원', status:'등장' },
  { industry:'보건업 및 사회복지', year:2050, title:'AI 돌봄 윤리 전문가', status:'등장' },
  { industry:'보건업 및 사회복지', year:2050, title:'수명 연장 전문의', status:'등장' },
  { industry:'보건업 및 사회복지', year:2050, title:'우주 의료 전문가', status:'등장' },
  { industry:'교육서비스업', year:1945, title:'교사(공교육)', status:'등장' },
  { industry:'교육서비스업', year:1950, title:'조산원(산파)', status:'등장' },
  { industry:'교육서비스업', year:1960, title:'교육행정가', status:'등장' },
  { industry:'교육서비스업', year:1968, title:'중학교 입시 학원 강사', status:'등장' },
  { industry:'교육서비스업', year:1969, title:'중학교 입시 학원 강사', status:'확산' },
  { industry:'교육서비스업', year:1970, title:'특수교육 교사', status:'등장' },
  { industry:'교육서비스업', year:1980, title:'교복 폐지 관련 제복업자', status:'등장' },
  { industry:'교육서비스업', year:1980, title:'보육교사', status:'등장' },
  { industry:'교육서비스업', year:1980, title:'어학원 강사(원어민)', status:'등장' },
  { industry:'교육서비스업', year:1980, title:'유치원 교사', status:'등장' },
  { industry:'교육서비스업', year:1980, title:'학원 강사', status:'등장' },
  { industry:'교육서비스업', year:1990, title:'논술 강사', status:'등장' },
  { industry:'교육서비스업', year:1990, title:'학습지 교사', status:'확산' },
  { industry:'교육서비스업', year:1993, title:'입시 컨설턴트', status:'등장' },
  { industry:'교육서비스업', year:1994, title:'수능 전문 강사', status:'등장' },
  { industry:'교육서비스업', year:2005, title:'다문화 교육 강사', status:'등장' },
  { industry:'교육서비스업', year:2006, title:'방과후 교사', status:'등장' },
  { industry:'교육서비스업', year:2010, title:'에듀테크 기획자', status:'등장' },
  { industry:'교육서비스업', year:2010, title:'온라인 강사', status:'등장' },
  { industry:'교육서비스업', year:2010, title:'진로상담 교사', status:'등장' },
  { industry:'교육서비스업', year:2010, title:'특수교육 보조원', status:'등장' },
  { industry:'교육서비스업', year:2013, title:'자유학기제 진로 교사', status:'등장' },
  { industry:'교육서비스업', year:2013, title:'코딩 교육 강사', status:'등장' },
  { industry:'교육서비스업', year:2015, title:'디지털 리터러시 교육자', status:'등장' },
  { industry:'교육서비스업', year:2018, title:'AI 교육 전문가', status:'등장' },
  { industry:'교육서비스업', year:2020, title:'교육 콘텐츠 개발자', status:'등장' },
  { industry:'교육서비스업', year:2020, title:'메타버스 교육 기획자', status:'등장' },
  { industry:'교육서비스업', year:2020, title:'방역 교육 강사', status:'등장' },
  { industry:'교육서비스업', year:2025, title:'AI 디지털 교과서 개발자', status:'등장' },
  { industry:'교육서비스업', year:2030, title:'AI 교육 전문가', status:'확산' },
  { industry:'교육서비스업', year:2030, title:'대학·중등교육 교사', status:'등장' },
  { industry:'교육서비스업', year:2030, title:'어학원 강사(원어민)', status:'소멸' },
  { industry:'교육서비스업', year:2030, title:'평생학습 설계사', status:'등장' },
  { industry:'교육서비스업', year:2035, title:'AI 러닝 코치', status:'등장' },
  { industry:'교육서비스업', year:2035, title:'평생학습 설계사', status:'확산' },
  { industry:'교육서비스업', year:2035, title:'평생학습 플래너', status:'등장' },
  { industry:'교육서비스업', year:2040, title:'인간 역량 개발 코치', status:'등장' },
  { industry:'교육서비스업', year:2045, title:'경험 학습 설계자', status:'등장' },
  { industry:'교육서비스업', year:2050, title:'인간 본질 교육자', status:'등장' },
  { industry:'공공행정 및 국방', year:1910, title:'순사(경찰)', status:'등장' },
  { industry:'공공행정 및 국방', year:1945, title:'경찰관', status:'등장' },
  { industry:'공공행정 및 국방', year:1945, title:'외교관', status:'등장' },
  { industry:'공공행정 및 국방', year:1948, title:'세무 공무원', status:'등장' },
  { industry:'공공행정 및 국방', year:1950, title:'군 행정병·군무원', status:'등장' },
  { industry:'공공행정 및 국방', year:1950, title:'소방관', status:'등장' },
  { industry:'공공행정 및 국방', year:1950, title:'행정 서기', status:'등장' },
  { industry:'공공행정 및 국방', year:1960, title:'우체부(우편집배원)', status:'등장' },
  { industry:'공공행정 및 국방', year:1960, title:'통계 조사원', status:'등장' },
  { industry:'공공행정 및 국방', year:1961, title:'경찰관', status:'확산' },
  { industry:'공공행정 및 국방', year:1966, title:'주민등록 담당원', status:'등장' },
  { industry:'공공행정 및 국방', year:1970, title:'근로감독관', status:'등장' },
  { industry:'공공행정 및 국방', year:1970, title:'새마을 지도자', status:'등장' },
  { industry:'공공행정 및 국방', year:1987, title:'노무 담당자(기업)', status:'등장' },
  { industry:'공공행정 및 국방', year:1987, title:'인권 활동가', status:'등장' },
  { industry:'공공행정 및 국방', year:1990, title:'군 통신 전문병', status:'등장' },
  { industry:'공공행정 및 국방', year:1990, title:'정책 분석가', status:'등장' },
  { industry:'공공행정 및 국방', year:1990, title:'지방자치 공무원', status:'등장' },
  { industry:'공공행정 및 국방', year:1991, title:'NGO 활동가', status:'등장' },
  { industry:'공공행정 및 국방', year:1991, title:'환경 영향 평가사', status:'등장' },
  { industry:'공공행정 및 국방', year:2000, title:'다문화 지원 전문가', status:'등장' },
  { industry:'공공행정 및 국방', year:2000, title:'대기환경 측정원', status:'등장' },
  { industry:'공공행정 및 국방', year:2002, title:'전자정부 운영자', status:'등장' },
  { industry:'공공행정 및 국방', year:2003, title:'소방 구조대원', status:'등장' },
  { industry:'공공행정 및 국방', year:2006, title:'공공 데이터 관리사', status:'등장' },
  { industry:'공공행정 및 국방', year:2010, title:'군 사이버 전문병', status:'등장' },
  { industry:'공공행정 및 국방', year:2010, title:'드론 운용 군인', status:'등장' },
  { industry:'공공행정 및 국방', year:2010, title:'사회적 기업가', status:'등장' },
  { industry:'공공행정 및 국방', year:2012, title:'스마트시티 운영자', status:'등장' },
  { industry:'공공행정 및 국방', year:2013, title:'미세먼지 관리 전문가', status:'등장' },
  { industry:'공공행정 및 국방', year:2013, title:'재난안전 전문가', status:'등장' },
  { industry:'공공행정 및 국방', year:2020, title:'군 AI 운영 전문요원', status:'등장' },
  { industry:'공공행정 및 국방', year:2020, title:'기후 활동가', status:'등장' },
  { industry:'공공행정 및 국방', year:2020, title:'디지털 포렌식 수사관', status:'등장' },
  { industry:'공공행정 및 국방', year:2030, title:'공공 AI 서비스 기획자', status:'등장' },
  { industry:'공공행정 및 국방', year:2030, title:'민원 처리 공무원(단순)', status:'등장' },
  { industry:'공공행정 및 국방', year:2030, title:'사이버 안보 전문가', status:'등장' },
  { industry:'공공행정 및 국방', year:2030, title:'세무 공무원', status:'소멸' },
  { industry:'공공행정 및 국방', year:2030, title:'통계 조사원', status:'소멸' },
  { industry:'공공행정 및 국방', year:2035, title:'AI 공공서비스 감독관', status:'등장' },
  { industry:'공공행정 및 국방', year:2035, title:'사이버 안보 전략가', status:'등장' },
  { industry:'공공행정 및 국방', year:2035, title:'스마트시티 운영 전문가', status:'등장' },
  { industry:'공공행정 및 국방', year:2040, title:'국가 AI 거버넌스 위원', status:'등장' },
  { industry:'공공행정 및 국방', year:2040, title:'국가 AI 거버넌스 전문관', status:'등장' },
  { industry:'공공행정 및 국방', year:2045, title:'기후 정책 전문가', status:'등장' },
  { industry:'공공행정 및 국방', year:2050, title:'기후 긴급 대응 전문가', status:'등장' },
  { industry:'공공행정 및 국방', year:2050, title:'달·화성 행정 전문가', status:'등장' },
  { industry:'공공행정 및 국방', year:2050, title:'생태계 복원 기술자', status:'등장' },
  { industry:'제조업', year:1890, title:'광부(탄광)', status:'등장' },
  { industry:'제조업', year:1910, title:'방직공', status:'등장' },
  { industry:'제조업', year:1930, title:'철공·단조공', status:'등장' },
  { industry:'제조업', year:1945, title:'광부(탄광)', status:'확산' },
  { industry:'제조업', year:1950, title:'굴뚝청소부', status:'등장' },
  { industry:'제조업', year:1950, title:'인쇄 기술자', status:'등장' },
  { industry:'제조업', year:1953, title:'군수품 제조공', status:'등장' },
  { industry:'제조업', year:1960, title:'CNC 기계 조작원', status:'등장' },
  { industry:'제조업', year:1960, title:'섬유·봉제 노동자', status:'등장' },
  { industry:'제조업', year:1960, title:'신발 제조공', status:'등장' },
  { industry:'제조업', year:1960, title:'조립 생산직', status:'등장' },
  { industry:'제조업', year:1960, title:'합판 제조공', status:'등장' },
  { industry:'제조업', year:1960, title:'화학 공정 기술자', status:'등장' },
  { industry:'제조업', year:1965, title:'가발 제조공', status:'등장' },
  { industry:'제조업', year:1968, title:'경부고속도로 건설 노동자', status:'등장' },
  { industry:'제조업', year:1970, title:'냉동기계 기술자', status:'등장' },
  { industry:'제조업', year:1970, title:'농기계 수리 기사', status:'등장' },
  { industry:'제조업', year:1970, title:'소재 연구원', status:'등장' },
  { industry:'제조업', year:1970, title:'조선소 기술자', status:'등장' },
  { industry:'제조업', year:1973, title:'건설 중장비 기사', status:'등장' },
  { industry:'제조업', year:1973, title:'용접공', status:'등장' },
  { industry:'제조업', year:1973, title:'전기 기술자', status:'등장' },
  { industry:'제조업', year:1973, title:'조립 생산직', status:'확산' },
  { industry:'제조업', year:1974, title:'반도체 공정 엔지니어', status:'등장' },
  { industry:'제조업', year:1975, title:'자동차 조립 노동자', status:'등장' },
  { industry:'제조업', year:1978, title:'원전 안전 관리사', status:'등장' },
  { industry:'제조업', year:1978, title:'원전 운전원', status:'등장' },
  { industry:'제조업', year:1979, title:'조립 생산직', status:'확산' },
  { industry:'제조업', year:1980, title:'기계 설계 기술자', status:'등장' },
  { industry:'제조업', year:1980, title:'반도체 장비 엔지니어', status:'등장' },
  { industry:'제조업', year:1980, title:'품질 검사원', status:'등장' },
  { industry:'제조업', year:1980, title:'플랜트 건설 기술자', status:'등장' },
  { industry:'제조업', year:1984, title:'버스 안내양', status:'등장' },
  { industry:'제조업', year:1985, title:'반도체 테스트 엔지니어', status:'등장' },
  { industry:'제조업', year:1990, title:'광부(탄광)', status:'확산' },
  { industry:'제조업', year:1990, title:'디스플레이 엔지니어', status:'등장' },
  { industry:'제조업', year:1990, title:'로봇 프로그래머', status:'등장' },
  { industry:'제조업', year:1990, title:'신발 제조공', status:'위험' },
  { industry:'제조업', year:1990, title:'합판 제조공', status:'위험' },
  { industry:'제조업', year:2000, title:'스마트팩토리 운영자', status:'등장' },
  { industry:'제조업', year:2000, title:'자동화 설비 엔지니어', status:'등장' },
  { industry:'제조업', year:2000, title:'제사공(실크)', status:'등장' },
  { industry:'제조업', year:2003, title:'LNG 플랜트 기술자', status:'등장' },
  { industry:'제조업', year:2005, title:'OLED 개발 연구원', status:'등장' },
  { industry:'제조업', year:2009, title:'녹색성장 전문가', status:'등장' },
  { industry:'제조업', year:2010, title:'드론 제조 엔지니어', status:'등장' },
  { industry:'제조업', year:2010, title:'제조 데이터 분석가', status:'등장' },
  { industry:'제조업', year:2012, title:'풍력 발전 기술자', status:'등장' },
  { industry:'제조업', year:2013, title:'3D 프린팅 전문가', status:'등장' },
  { industry:'제조업', year:2015, title:'배터리(2차전지) 엔지니어', status:'등장' },
  { industry:'제조업', year:2015, title:'에너지저장(ESS) 기술자', status:'등장' },
  { industry:'제조업', year:2015, title:'태양광 패널 설치원', status:'등장' },
  { industry:'제조업', year:2016, title:'DRAM 공정 개발자', status:'등장' },
  { industry:'제조업', year:2016, title:'반도체 설계 엔지니어', status:'등장' },
  { industry:'제조업', year:2019, title:'수소 인프라 엔지니어', status:'등장' },
  { industry:'제조업', year:2020, title:'HBM 개발 엔지니어', status:'등장' },
  { industry:'제조업', year:2020, title:'물류 창고 작업자', status:'등장' },
  { industry:'제조업', year:2020, title:'수소 연료전지 기술자', status:'등장' },
  { industry:'제조업', year:2020, title:'조립 생산직', status:'확산' },
  { industry:'제조업', year:2021, title:'수소차 기술자', status:'등장' },
  { industry:'제조업', year:2023, title:'AI 반도체 설계자', status:'등장' },
  { industry:'제조업', year:2023, title:'탄소 포집 기술자', status:'등장' },
  { industry:'제조업', year:2030, title:'AI 반도체 설계자', status:'확산' },
  { industry:'제조업', year:2030, title:'CNC 기계 조작원', status:'소멸' },
  { industry:'제조업', year:2030, title:'배터리·신에너지 엔지니어', status:'등장' },
  { industry:'제조업', year:2030, title:'스마트팩토리 운영자', status:'확산' },
  { industry:'제조업', year:2030, title:'용접공', status:'소멸' },
  { industry:'제조업', year:2030, title:'우주 부품 제조 엔지니어', status:'등장' },
  { industry:'제조업', year:2030, title:'조립 생산직(단순 반복)', status:'등장' },
  { industry:'제조업', year:2035, title:'첨단소재 연구원', status:'등장' },
  { industry:'제조업', year:2035, title:'휴머노이드 로봇 운영자', status:'등장' },
  { industry:'제조업', year:2040, title:'스마트팩토리 AI 감독관', status:'등장' },
  { industry:'제조업', year:2040, title:'핵융합 발전 기술자', status:'등장' },
  { industry:'제조업', year:2045, title:'에너지 저장 시스템 전문가', status:'등장' },
  { industry:'제조업', year:2050, title:'에너지 제로 건축 기술자', status:'등장' },
  { industry:'제조업', year:2050, title:'우주 발사체 기술자', status:'등장' },
  { industry:'운수 및 창고업', year:1876, title:'선박 운항사', status:'등장' },
  { industry:'운수 및 창고업', year:1900, title:'인력거꾼', status:'등장' },
  { industry:'운수 및 창고업', year:1928, title:'버스 기사', status:'등장' },
  { industry:'운수 및 창고업', year:1930, title:'하역 작업자', status:'등장' },
  { industry:'운수 및 창고업', year:1940, title:'인력거꾼', status:'확산' },
  { industry:'운수 및 창고업', year:1948, title:'항공기 조종사', status:'등장' },
  { industry:'운수 및 창고업', year:1950, title:'지게꾼', status:'등장' },
  { industry:'운수 및 창고업', year:1950, title:'화물 트럭 기사', status:'등장' },
  { industry:'운수 및 창고업', year:1953, title:'군용 차량 정비사', status:'등장' },
  { industry:'운수 및 창고업', year:1961, title:'버스 안내양', status:'확산' },
  { industry:'운수 및 창고업', year:1961, title:'전차 운전사', status:'등장' },
  { industry:'운수 및 창고업', year:1963, title:'파독 광부', status:'등장' },
  { industry:'운수 및 창고업', year:1963, title:'항만 하역부', status:'등장' },
  { industry:'운수 및 창고업', year:1965, title:'파독 광부', status:'확산' },
  { industry:'운수 및 창고업', year:1967, title:'통관사', status:'등장' },
  { industry:'운수 및 창고업', year:1969, title:'고속도로 요금소 직원', status:'등장' },
  { industry:'운수 및 창고업', year:1970, title:'냉동·냉장 물류 전문가', status:'등장' },
  { industry:'운수 및 창고업', year:1970, title:'항공 관제사', status:'등장' },
  { industry:'운수 및 창고업', year:1970, title:'항만 하역 감독관', status:'등장' },
  { industry:'운수 및 창고업', year:1973, title:'중동 파견 건설 노동자', status:'등장' },
  { industry:'운수 및 창고업', year:1973, title:'해외 건설 코디네이터', status:'등장' },
  { industry:'운수 및 창고업', year:1974, title:'철도·지하철 기관사', status:'등장' },
  { industry:'운수 및 창고업', year:1982, title:'중동 파견 건설 노동자', status:'확산' },
  { industry:'운수 및 창고업', year:1988, title:'관광 버스 기사', status:'등장' },
  { industry:'운수 및 창고업', year:1988, title:'항공 정비사', status:'등장' },
  { industry:'운수 및 창고업', year:1992, title:'택배 기사', status:'등장' },
  { industry:'운수 및 창고업', year:2000, title:'택배 기사', status:'위험' },
  { industry:'운수 및 창고업', year:2000, title:'해운 물류 전문가', status:'등장' },
  { industry:'운수 및 창고업', year:2002, title:'셔틀버스·관광 기사', status:'등장' },
  { industry:'운수 및 창고업', year:2007, title:'하이패스 시스템 운영원', status:'등장' },
  { industry:'운수 및 창고업', year:2009, title:'고속철도(KTX) 승무원', status:'등장' },
  { industry:'운수 및 창고업', year:2010, title:'공유 킥보드 운영자', status:'등장' },
  { industry:'운수 및 창고업', year:2010, title:'드론 배송 운영자', status:'등장' },
  { industry:'운수 및 창고업', year:2010, title:'라스트마일 최적화 엔지니어', status:'등장' },
  { industry:'운수 및 창고업', year:2010, title:'카셰어링 운영자', status:'등장' },
  { industry:'운수 및 창고업', year:2015, title:'공유 자전거 운영자', status:'등장' },
  { industry:'운수 및 창고업', year:2015, title:'물류 자동화 엔지니어', status:'등장' },
  { industry:'운수 및 창고업', year:2015, title:'플랫폼 노동자(긱워커)', status:'등장' },
  { industry:'운수 및 창고업', year:2016, title:'물류 드론 개발자', status:'등장' },
  { industry:'운수 및 창고업', year:2018, title:'배달 대행 기사', status:'등장' },
  { industry:'운수 및 창고업', year:2019, title:'PM(개인형이동장치) 안전 관리원', status:'등장' },
  { industry:'운수 및 창고업', year:2020, title:'대리운전 기사', status:'등장' },
  { industry:'운수 및 창고업', year:2020, title:'물류 창고 작업자', status:'확산' },
  { industry:'운수 및 창고업', year:2020, title:'자율주행 안전 요원', status:'등장' },
  { industry:'운수 및 창고업', year:2020, title:'전기차 충전 인프라 기사', status:'등장' },
  { industry:'운수 및 창고업', year:2030, title:'UAM(도심항공) 조종사', status:'등장' },
  { industry:'운수 및 창고업', year:2030, title:'배달원(라이더)', status:'소멸' },
  { industry:'운수 및 창고업', year:2030, title:'버스 기사', status:'소멸' },
  { industry:'운수 및 창고업', year:2030, title:'선박 운항사', status:'확산' },
  { industry:'운수 및 창고업', year:2030, title:'자율주행 모빌리티 기획자', status:'등장' },
  { industry:'운수 및 창고업', year:2030, title:'전기차 충전 인프라 기사', status:'위험' },
  { industry:'운수 및 창고업', year:2030, title:'철도·지하철 기관사', status:'확산' },
  { industry:'운수 및 창고업', year:2030, title:'항공기 조종사', status:'소멸' },
  { industry:'운수 및 창고업', year:2030, title:'항만 자동화 운영관', status:'등장' },
  { industry:'운수 및 창고업', year:2030, title:'화물 트럭 기사', status:'소멸' },
  { industry:'운수 및 창고업', year:2035, title:'UAM(도심항공) 조종사', status:'위험' },
  { industry:'운수 및 창고업', year:2035, title:'모빌리티 서비스 관리자', status:'등장' },
  { industry:'운수 및 창고업', year:2035, title:'모빌리티 서비스 매니저', status:'등장' },
  { industry:'운수 및 창고업', year:2035, title:'화물 트럭 기사', status:'소멸' },
  { industry:'운수 및 창고업', year:2040, title:'우주 물류 전문가', status:'등장' },
  { industry:'운수 및 창고업', year:2040, title:'자율주행 인프라 엔지니어', status:'등장' },
  { industry:'운수 및 창고업', year:2040, title:'항공기 조종사', status:'소멸' },
  { industry:'운수 및 창고업', year:2045, title:'자율운항 선박 관제사', status:'등장' },
  { industry:'운수 및 창고업', year:2045, title:'철도·지하철 기관사', status:'확산' },
  { industry:'운수 및 창고업', year:2050, title:'도심항공(UAM) 교통 관제사', status:'등장' },
  { industry:'운수 및 창고업', year:2050, title:'선박 운항사', status:'확산' },
  { industry:'운수 및 창고업', year:2050, title:'자율주행 인프라 엔지니어', status:'확산' },
];

const JOB_MAP: Record<string, typeof RAW_JOBS> = {};
RAW_JOBS.forEach(j => {
  const key = `${j.industry}|${j.year}`;
  if (!JOB_MAP[key]) JOB_MAP[key] = [];
  JOB_MAP[key].push(j);
});

const HEAT_COLORS: Record<string, string> = {
  1: 'rgba(248, 105, 107, 0.4)',
  2: 'rgba(251, 170, 119, 0.4)',
  3: 'rgba(255, 235, 132, 0.4)',
  4: 'rgba(177, 213, 128, 0.4)',
  5: 'rgba(99,  190, 123, 0.4)',
};

const STATUS_STYLE: Record<string, { pill: string; badge: string }> = {
  등장: { pill: 'bg-emerald-100 text-emerald-700 border-emerald-300', badge: 'bg-white/60 text-emerald-700' },
  확산: { pill: 'bg-green-500 text-white border-green-600',          badge: 'bg-white/30 text-white' },
  위험: { pill: 'bg-blue-100 text-blue-700 border-blue-300',         badge: 'bg-white/60 text-blue-700'    },
  소멸: { pill: 'bg-slate-700 text-slate-100 border-slate-800',      badge: 'bg-white/20 text-slate-100'   },
};

function buildSidebarJobs() {
  const seen = new Set<string>();
  return RAW_JOBS
    .slice()
    .sort((a, b) => a.year - b.year)
    .filter(j => {
      const key = `${j.industry}|${j.year}|${j.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}
const ALL_SIDEBAR_JOBS = buildSidebarJobs();

const Heatmap = () => {
  const [cutoffYear, setCutoffYear] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!timelineRef.current) return;
      const rows = timelineRef.current.querySelectorAll('[data-year]');
      const threshold = window.innerHeight * 0.4; // 2/5 viewport height

      let newCutoff = 0;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rect = row.getBoundingClientRect();
        if (rect.top <= threshold) {
          const yearStr = row.getAttribute('data-year');
          if (yearStr) newCutoff = parseInt(yearStr, 10);
        } else {
          break; // Stop iteration when below threshold
        }
      }
      setCutoffYear(newCutoff);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shouldShowYear = (year: number) => {
    if (year <= 1960) return year % 10 === 0 || year === 1876;
    if (year <= 2024) return year % 5 === 0;
    return true;
  };

  let filteredSidebarJobs = ALL_SIDEBAR_JOBS;
  if (activeFilter) {
    filteredSidebarJobs = filteredSidebarJobs.filter(j => j.status === activeFilter);
  }
  const sidebarRemaining = filteredSidebarJobs.filter(j => j.year >= cutoffYear);

  return (
    <div className="bg-white w-full min-h-screen text-slate-900 font-sans m-0 p-0 flex flex-col relative">

      {/* ───────────────────────────────────────────────────────── */}
      {/* 1. Job List Section */}
      {/* ───────────────────────────────────────────────────────── */}
      <section id="job-list" className="relative z-40 bg-white/95 backdrop-blur w-full flex flex-col border-b border-slate-200 pt-3 h-[250px] shrink-0 shadow-sm">
        <div className="w-full px-2 md:px-4 mb-2 flex justify-center items-center max-w-7xl mx-auto relative min-h-[28px]">
          <div className="absolute left-2 md:left-4">
             <p className="text-[10px] md:text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
               {sidebarRemaining.length}개 대기중
             </p>
          </div>
          <h2 className="text-base md:text-lg font-bold leading-tight text-center">직업 리스트</h2>
          <p className="text-[10px] text-slate-400 hidden sm:block absolute right-2 md:right-4">스크롤하면 타임라인에 나타납니다.</p>
        </div>

        <div className="w-full flex-1 overflow-y-auto px-2 relative z-40 custom-scrollbar mb-1">
          {/* Jobs Grid */}
          <div className="grid grid-cols-[50px_repeat(10,1fr)] md:grid-cols-[60px_repeat(10,1fr)] gap-0 w-full h-full pb-2">
            <div className="border-r border-slate-200" />
            {INDUSTRIES.map(ind => {
              const allJobs = filteredSidebarJobs.filter(j => j.industry === ind.name);
              return (
                <div key={`jobs-${ind.id}`} className="border-r border-slate-100 flex flex-col gap-1 px-0.5 md:px-1 pt-1 justify-end">
                  {allJobs.map((j, i) => {
                    const isAbsorbed = j.year <= cutoffYear;
                    const ss = STATUS_STYLE[j.status] ?? STATUS_STYLE['등장'];
                    return (
                      <div
                        key={i}
                        className={`bg-white border rounded text-center shadow-sm transition-all duration-500 transform origin-bottom flex items-center justify-center gap-1 px-1 py-0.5
                           ${isAbsorbed ? 'opacity-0 max-h-0 border-none m-0 p-0 overflow-hidden scale-90 delay-[100ms]' : 'opacity-100 max-h-[50px] scale-100 border-slate-300'}`}
                      >
                        <span className={`shrink-0 text-[7px] md:text-[8px] font-bold px-1 py-0.5 rounded-sm ${ss.pill}`}>{j.status}</span>
                        <span className="block text-[8px] md:text-[10px] font-medium text-slate-800 leading-tight break-keep text-center truncate">{j.title}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 2. Timeline Section */}
      {/* ───────────────────────────────────────────────────────── */}
      <section id="timeline" className="w-full bg-white m-0 p-0 flex flex-col items-center relative z-40">
        
        {/* Timeline Industry Columns Header (Sticky inside timeline) */}
        <div className="w-full px-2 bg-white/95 backdrop-blur-md border-b border-t border-slate-200 pt-2 pb-2 z-50 sticky top-[64px] shadow-sm">
          <div className="grid grid-cols-[50px_repeat(10,1fr)] md:grid-cols-[60px_repeat(10,1fr)] gap-0 w-full">
            <div className="text-slate-500 text-[9px] md:text-xs font-bold flex items-center justify-center border-r border-slate-200">연도</div>
            {INDUSTRIES.map(ind => (
              <div key={`header-${ind.id}`} className="text-slate-900 text-[8px] md:text-xs font-bold text-center flex flex-col items-center justify-center px-0.5 break-keep leading-tight">
                {ind.name}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full text-center mb-12 px-4 mt-12">
          <span className="text-blue-600 font-semibold tracking-wider text-[16px] uppercase block mb-2">Job Timeline</span>
          <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25]">
            한국의 산업군 일자리 타임라인 (1876–2050)
          </h2>
        </div>

        <div className="w-full flex justify-center mb-12">
          <div className="flex flex-col items-center gap-4">
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
                <div className="flex items-center gap-1.5 text-slate-500">
                  | <span className="font-bold text-slate-700">산업별 취업자 수</span> 기반
                </div>
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <span className="text-sm font-semibold text-slate-600 mr-2">칩 필터:</span>
              <button 
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeFilter === null 
                    ? 'bg-slate-800 text-white border-slate-800 shadow-sm' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                전체
              </button>
              {Object.keys(STATUS_STYLE).map(statusName => {
                const ss = STATUS_STYLE[statusName];
                const isActive = activeFilter === statusName;
                return (
                  <button
                    key={statusName}
                    onClick={() => setActiveFilter(statusName)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                      isActive 
                        ? ss.pill.split(' ')[0] + ' ' + ss.pill.split(' ')[1] + ' ' + ss.pill.split(' ')[2] + ' shadow-sm' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {statusName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full flex gap-0 relative">
          <div ref={timelineRef} className="flex-1 min-w-0 px-2 relative pt-2">

          <div className="flex flex-col w-full pb-32 relative z-10 pt-2">
            {(DATA as any[]).map((d: any) => {
              const eventsInThisYear = EVENT_LIST.filter(ev => ev.year === d.year);
              const hasEvent = eventsInThisYear.length > 0;

              let minRowHeight = d.year <= 1960 ? 12 : d.year <= 2024 ? 28 : 56;
              if (hasEvent) minRowHeight = Math.max(minRowHeight, 80);

              const isSplit2022 = d.year === 2022;
              let rowJobIndex = 0;

              return (
                <React.Fragment key={d.year}>
                  {isSplit2022 && (
                    <div className="grid grid-cols-[50px_repeat(10,1fr)] md:grid-cols-[60px_repeat(10,1fr)] w-full h-[60px] md:h-[80px] relative">
                      <div className="border-r border-slate-200 h-full" />
                      {INDUSTRIES.map(ind => (
                        <div key={`split-${ind.id}`} className="border-r border-slate-100 h-full" />
                      ))}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-slate-300 -translate-y-1/2" />
                      </div>
                      <div className="absolute inset-0 pointer-events-none grid grid-cols-[50px_repeat(10,1fr)] md:grid-cols-[60px_repeat(10,1fr)] items-center">
                        <div className="col-start-6 col-end-8 px-1 flex">
                          <span className="bg-white w-full text-center z-10 text-slate-800 font-bold text-[10px] sm:text-xs md:text-sm border border-slate-200 rounded-full py-1.5 shadow-sm truncate">
                            2022년 ChatGPT 등장
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div data-year={d.year} className="grid grid-cols-[50px_repeat(10,1fr)] md:grid-cols-[60px_repeat(10,1fr)] w-full group/row cursor-crosshair">
                    <div className="border-r border-slate-200 flex items-center justify-center relative" style={{ minHeight: `${minRowHeight}px` }}>
                      {shouldShowYear(d.year) && (
                        <span className="z-10 text-slate-500 text-[9px] md:text-xs bg-white px-1 whitespace-nowrap font-medium">
                          {d.year}
                        </span>
                      )}
                    </div>

                    {INDUSTRIES.map(ind => {
                      const val = d[ind.id] as number | null;
                      const bgColor = val ? HEAT_COLORS[String(val)] : 'transparent';
                      const event = eventsInThisYear.find(ev => ev.industry === ind.name);
                      const hasImage = event?.img && event.img.trim() !== '';

                      let jobsHere = JOB_MAP[`${ind.name}|${d.year}`] ?? [];
                      if (activeFilter) {
                        jobsHere = jobsHere.filter(j => j.status === activeFilter);
                      }
                      const showJobs = d.year <= cutoffYear && jobsHere.length > 0;

                      return (
                        <div
                          key={`${ind.id}-${d.year}`}
                          className="relative flex flex-col items-stretch border-slate-100 border-r p-0.5 md:p-1 gap-1"
                          style={{
                            minHeight: `${minRowHeight}px`,
                            backgroundColor: bgColor,
                          }}
                        >
                          {event && (
                            <div
                              className="relative w-full shrink-0 overflow-hidden rounded-[4px] shadow-sm flex flex-col items-center justify-center p-1 group/event z-20 hover:z-30 hover:scale-[1.15] transition-all duration-300"
                              style={{
                                height: `${minRowHeight - 8}px`,
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

                          {showJobs && (
                            <div className="relative z-10 flex flex-col gap-1.5 px-0.5 mt-auto pb-1.5 w-full">
                              {jobsHere.map((j, ji) => {
                                const ss = STATUS_STYLE[j.status] ?? STATUS_STYLE['등장'];
                                const currentIndex = rowJobIndex++;
                                return (
                                  <span
                                    key={ji}
                                    className={`flex items-center justify-center gap-1.5 text-[9px] md:text-[10px] px-2 py-1.5 rounded-[5px] border leading-tight font-semibold whitespace-normal break-words w-full ${ss.pill} shadow-sm animate-chip-enter`}
                                    style={{ animationDelay: `${currentIndex * 40}ms` }}
                                    title={`${j.title} (${j.status})`}
                                  >
                                    <span className={`px-1 py-[2px] rounded-[3px] text-[7px] md:text-[8px] font-black shrink-0 shadow-sm leading-none flex items-center justify-center ${ss.badge}`}>
                                      {j.status}
                                    </span>
                                    <span className="leading-snug break-words min-w-0 text-center whitespace-normal">{j.title}</span>
                                  </span>
                                );
                              })}
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
    </section>

    </div>
  );
};

export default Heatmap;
