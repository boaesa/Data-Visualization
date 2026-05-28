import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUp } from 'lucide-react';
import DATA from './HeatmapData.json';

const INDUSTRIES = [
  { id: 'J', name: '정보통신업',           keyword: 'technology,data'     },
  { id: 'Q', name: '보건업 및 사회복지',   keyword: 'medical,healthcare'  },
  { id: 'C', name: '제조업',               keyword: 'factory,production'  },
  { id: 'M', name: '전문과학 및 기술서비스업', keyword: 'science,research' },
  { id: 'K', name: '금융 및 보험업',       keyword: 'finance,stock'       },
  { id: 'R', name: '예술·스포츠 및 여가', keyword: 'arts,stadium'        },
  { id: 'H', name: '운수 및 창고업',       keyword: 'logistics,truck'     },
  { id: 'O', name: '공공행정 및 국방',     keyword: 'government,city'     },
  { id: 'P', name: '교육서비스업',         keyword: 'school,classroom'    },
];

const EVENT_LIST = [
  // [정보통신업]
  { industry: '정보통신업', year: 1885, title: '한성~인천 전신 개통' },
  { industry: '정보통신업', year: 1902, title: '한성전화소 개설' },
  { industry: '정보통신업', year: 1994, title: '인터넷 상용화', isImportant: true },
  { industry: '정보통신업', year: 1998, title: '벤처 붐 및 스타크래프트 유행' },
  { industry: '정보통신업', year: 2000, title: '닷컴 벤처 붐' },
  { industry: '정보통신업', year: 2000, title: '인터넷쇼핑 태동', isImportant: true },
  { industry: '정보통신업', year: 2001, title: '닷컴 버블 붕괴' },
  { industry: '정보통신업', year: 2003, title: '초고속 인터넷 최고 보급률' },
  { industry: '정보통신업', year: 2009, title: '스마트폰 국내 보급', isImportant: true },
  { industry: '정보통신업', year: 2011, title: '4G LTE 상용화' },
  { industry: '정보통신업', year: 2011, title: '소셜커머스 쿠팡' },
  { industry: '정보통신업', year: 2015, title: 'O2O 플랫폼 성장' },
  { industry: '정보통신업', year: 2019, title: '세계 최초 5G 상용화' },
  { industry: '정보통신업', year: 2020, title: '코로나19 비대면 전환' },
  { industry: '정보통신업', year: 2020, title: '코로나19 이커머스 폭발', isImportant: true },
  { industry: '정보통신업', year: 2022, title: 'ChatGPT 등장', isImportant: true },
  { industry: '정보통신업', year: 2022, title: '플랫폼 유통 지배' },
  { industry: '정보통신업', year: 2025, title: 'AI 에이전트 상용화', isImportant: true },

  // [제조업]
  { industry: '제조업', year: 1970, title: '수출 100억 달러 목표' },
  { industry: '제조업', year: 1973, title: '중화학공업화 선언', isImportant: true },
  { industry: '제조업', year: 1979, title: '2차 오일쇼크' },
  { industry: '제조업', year: 1986, title: '3저 호황' },
  { industry: '제조업', year: 1988, title: '서울올림픽 특수' },
  { industry: '제조업', year: 1998, title: 'IMF 구조조정', isImportant: true },
  { industry: '제조업', year: 2001, title: '중국 WTO 가입' },
  { industry: '제조업', year: 2008, title: '글로벌 금융위기' },
  { industry: '제조업', year: 2010, title: '수출 3대장 신기록' },
  { industry: '제조업', year: 2016, title: '조선업 구조조정' },
  { industry: '제조업', year: 2019, title: '일본 반도체 소재 규제' },
  { industry: '제조업', year: 2020, title: '코로나19 자동화 가속' },
  { industry: '제조업', year: 2022, title: '반도체 다운사이클' },
  { industry: '제조업', year: 2024, title: 'AI 반도체 붐', isImportant: true },

  // [보건업 및 사회복지]
  { industry: '보건업 및 사회복지', year: 1989, title: '전국민 의료보험' },
  { industry: '보건업 및 사회복지', year: 2000, title: '의약분업 시행' },
  { industry: '보건업 및 사회복지', year: 2008, title: '노인장기요양보험', isImportant: true },
  { industry: '보건업 및 사회복지', year: 2010, title: '요양시장 폭발' },
  { industry: '보건업 및 사회복지', year: 2011, title: '무상보육 시행' },
  { industry: '보건업 및 사회복지', year: 2018, title: '치매국가책임제' },
  { industry: '보건업 및 사회복지', year: 2020, title: '코로나19 인력 총동원' },
  { industry: '보건업 및 사회복지', year: 2025, title: '초고령사회 진입', isImportant: true },

  // [운수 및 창고업]
  { industry: '운수 및 창고업', year: 1970, title: '경부고속도로 개통' },
  { industry: '운수 및 창고업', year: 1989, title: '택배 산업 법제화' },
  { industry: '운수 및 창고업', year: 2000, title: '인터넷쇼핑 택배 성장' },
  { industry: '운수 및 창고업', year: 2009, title: '택배 1조원 돌파' },
  { industry: '운수 및 창고업', year: 2015, title: '쿠팡맨 직배송' },
  { industry: '운수 및 창고업', year: 2018, title: '새벽배송 성장' },
  { industry: '운수 및 창고업', year: 2018, title: '로켓배송 전면화' },
  { industry: '운수 및 창고업', year: 2020, title: '코로나19 물류 폭발' },
  { industry: '운수 및 창고업', year: 2022, title: '배달 라이더 최대', isImportant: true },
  { industry: '운수 및 창고업', year: 2025, title: '자율주행 배송 시범' },
  { industry: '운수 및 창고업', year: 2025, title: '유통 디지털 전환' },

  // [금융 및 보험업]
  { industry: '금융 및 보험업', year: 1975, title: '은행 지점 전국 확대' },
  { industry: '금융 및 보험업', year: 1988, title: '코스피 1000 증권 붐' },
  { industry: '금융 및 보험업', year: 1997, title: 'IMF 외환위기', isImportant: true },
  { industry: '금융 및 보험업', year: 1998, title: 'IMF 소비 급감' },
  { industry: '금융 및 보험업', year: 2000, title: '인터넷뱅킹 도입' },
  { industry: '금융 및 보험업', year: 2002, title: '카드대란' },
  { industry: '금융 및 보험업', year: 2003, title: '카드대란 소비 위축' },
  { industry: '금융 및 보험업', year: 2008, title: '글로벌 금융위기' },
  { industry: '금융 및 보험업', year: 2015, title: '모바일뱅킹 확산' },
  { industry: '금융 및 보험업', year: 2020, title: '코로나 비대면 금융' },
  { industry: '금융 및 보험업', year: 2025, title: '핀테크 AI 금융', isImportant: true },

  // [예술·스포츠 및 여가]
  { industry: '예술·스포츠 및 여가', year: 1988, title: '서울올림픽 개최' },
  { industry: '예술·스포츠 및 여가', year: 2000, title: '문화산업 국가전략화' },
  { industry: '예술·스포츠 및 여가', year: 2002, title: '한일월드컵' },
  { industry: '예술·스포츠 및 여가', year: 2003, title: '겨울연가 한류' },
  { industry: '예술·스포츠 및 여가', year: 2009, title: '한류 2차 붐' },
  { industry: '예술·스포츠 및 여가', year: 2012, title: '강남스타일 글로벌' },
  { industry: '예술·스포츠 및 여가', year: 2019, title: '영화 기생충' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '코로나 공연 침체' },
  { industry: '예술·스포츠 및 여가', year: 2021, title: '오징어게임 OTT', isImportant: true },
  { industry: '예술·스포츠 및 여가', year: 2022, title: '엔데믹 공연 재개' },
  { industry: '예술·스포츠 및 여가', year: 2025, title: 'AI 콘텐츠 시대', isImportant: true },

  // [전문과학 및 기술서비스업]
  { industry: '전문과학 및 기술서비스업', year: 1999, title: 'IT 벤처 붐' },
  { industry: '전문과학 및 기술서비스업', year: 2008, title: '녹색 R&D 확대' },
  { industry: '전문과학 및 기술서비스업', year: 2011, title: '바이오 IT 융합' },
  { industry: '전문과학 및 기술서비스업', year: 2013, title: '창조경제 스타트업' },
  { industry: '전문과학 및 기술서비스업', year: 2017, title: '4차산업 전략', isImportant: true },
  { industry: '전문과학 및 기술서비스업', year: 2019, title: '데이터 3법' },
  { industry: '전문과학 및 기술서비스업', year: 2020, title: '디지털 뉴딜' },
  { industry: '전문과학 및 기술서비스업', year: 2022, title: '반도체·배터리 인력난' },

  // [공공행정 및 국방]
  { industry: '공공행정 및 국방', year: 1992, title: '지방자치제 출범' },
  { industry: '공공행정 및 국방', year: 1998, title: 'IMF 공공 구조조정' },
  { industry: '공공행정 및 국방', year: 2001, title: '전자정부 구축' },
  { industry: '공공행정 및 국방', year: 2013, title: '여성공직 확대' },
  { industry: '공공행정 및 국방', year: 2017, title: '공무원 17만명 증원' },
  { industry: '공공행정 및 국방', year: 2020, title: '코로나19 방역행정' },
  { industry: '공공행정 및 국방', year: 2025, title: 'AI 행정 도입' },

  // [교육서비스업]
  { industry: '교육서비스업', year: 1992, title: '대학정원 자율화' },
  { industry: '교육서비스업', year: 1995, title: '5·31 교육개혁' },
  { industry: '교육서비스업', year: 2000, title: '영어조기교육' },
  { industry: '교육서비스업', year: 2003, title: '사교육비 최고' },
  { industry: '교육서비스업', year: 2005, title: '주5일 수업제' },
  { industry: '교육서비스업', year: 2015, title: '저출산 인구절벽', isImportant: true },
  { industry: '교육서비스업', year: 2020, title: '코로나 원격수업' },
  { industry: '교육서비스업', year: 2025, title: 'AI 개인화 학습' },
];

export const RAW_JOBS = [
  { industry: '정보통신업', year: 2000, title: '전신기사', status: '위험' },
  { industry: '정보통신업', year: 1970, title: '전화교환원', status: '확산' },
  { industry: '정보통신업', year: 1970, title: '메인프레임 운영자', status: '등장' },
  { industry: '정보통신업', year: 1980, title: '전산원(펀치카드)', status: '확산' },
  { industry: '정보통신업', year: 1980, title: '네트워크 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 1980, title: '데이터베이스 관리자', status: '등장' },
  { industry: '정보통신업', year: 2035, title: '소프트웨어 개발자', status: '확산' },
  { industry: '정보통신업', year: 1980, title: '전산 운영원', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1950, title: '타이피스트', status: '확산' },
  { industry: '정보통신업', year: 1994, title: 'IT PM', status: '등장' },
  { industry: '정보통신업', year: 2030, title: 'IT 시스템 운영자', status: '확산' },
  { industry: '정보통신업', year: 2030, title: '웹 개발자', status: '확산' },
  { industry: '정보통신업', year: 1998, title: 'PC방 운영자', status: '등장' },
  { industry: '정보통신업', year: 1998, title: 'e비즈니스 기획자', status: '등장' },
  { industry: '정보통신업', year: 1998, title: '게임 개발자', status: '등장' },
  { industry: '정보통신업', year: 1998, title: '컴퓨터 수리 기사', status: '등장' },
  { industry: '정보통신업', year: 2030, title: '사이버보안 전문가', status: '확산' },
  { industry: '정보통신업', year: 2000, title: 'IT 보안 관제원', status: '등장' },
  { industry: '정보통신업', year: 2000, title: 'UX/UI 디자이너', status: '등장' },
  { industry: '정보통신업', year: 2000, title: '디지털 마케터', status: '등장' },
  { industry: '정보통신업', year: 2003, title: '온라인 커뮤니티 운영자', status: '등장' },
  { industry: '정보통신업', year: 2006, title: '바이럴 마케터', status: '등장' },
  { industry: '정보통신업', year: 2009, title: '모바일 앱 개발자', status: '등장' },
  { industry: '정보통신업', year: 2010, title: '검색엔진 최적화(SEO) 전문가', status: '등장' },
  { industry: '정보통신업', year: 2010, title: '앱 마케터', status: '등장' },
  { industry: '정보통신업', year: 2010, title: '앱 분석가(UA)', status: '등장' },
  { industry: '정보통신업', year: 2012, title: 'DevOps 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2012, title: '데이터 사이언티스트', status: '등장' },
  { industry: '정보통신업', year: 2013, title: '데이터 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2013, title: '빅데이터 아키텍트', status: '등장' },
  { industry: '정보통신업', year: 2016, title: '머신러닝 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2016, title: '알파고 AI 충격', status: '등장' },
  { industry: '정보통신업', year: 2016, title: '클라우드 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2017, title: 'AI 챗봇 개발자', status: '등장' },
  { industry: '정보통신업', year: 2017, title: '블록체인 개발자', status: '등장' },
  { industry: '정보통신업', year: 2018, title: 'AI 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2019, title: 'RPA 개발자', status: '등장' },
  { industry: '정보통신업', year: 2019, title: '디지털 트랜스포메이션 PM', status: '등장' },
  { industry: '정보통신업', year: 2020, title: 'AI 윤리 전문가', status: '등장' },
  { industry: '정보통신업', year: 2020, title: 'MLOps 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2020, title: '데이터 라벨러', status: '등장' },
  { industry: '정보통신업', year: 2020, title: '사이버 보안 침해 분석가', status: '등장' },
  { industry: '정보통신업', year: 2022, title: '프롬프트 엔지니어', status: '확산' },
  { industry: '정보통신업', year: 2022, title: 'LLM 파인튜닝 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2022, title: '생성AI 프로덕트 매니저', status: '등장' },
  { industry: '정보통신업', year: 2023, title: 'AI 서비스 운영자', status: '등장' },
  { industry: '정보통신업', year: 2023, title: 'AI 에이전트 개발자', status: '등장' },
  { industry: '정보통신업', year: 2030, title: 'AI 감사관', status: '등장' },
  { industry: '정보통신업', year: 2030, title: 'AI 안전 연구원', status: '등장' },
  { industry: '정보통신업', year: 2030, title: 'AI 엔지니어·ML 전문가', status: '등장' },
  { industry: '정보통신업', year: 2030, title: '디지털 트윈 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2030, title: '소프트웨어 개발자(초급)', status: '등장' },
  { industry: '정보통신업', year: 2030, title: '양자 컴퓨팅 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2035, title: 'AI 에이전트 오케스트레이터', status: '등장' },
  { industry: '정보통신업', year: 2035, title: '사이버 물리 시스템 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2035, title: '사이버-물리 시스템 엔지니어', status: '등장' },
  { industry: '정보통신업', year: 2035, title: '양자 암호 전문가', status: '등장' },
  { industry: '정보통신업', year: 2035, title: '양자컴퓨팅 전문가', status: '등장' },
  { industry: '정보통신업', year: 2040, title: 'AI 인격 설계자', status: '등장' },
  { industry: '정보통신업', year: 2040, title: '뇌-컴퓨터 인터페이스 개발자', status: '등장' },
  { industry: '정보통신업', year: 2040, title: '범용AI 운영 전문가', status: '등장' },
  { industry: '정보통신업', year: 2045, title: 'AI 공진화 연구원', status: '등장' },
  { industry: '정보통신업', year: 2045, title: '가상 세계 건축가', status: '등장' },
  { industry: '정보통신업', year: 2050, title: '양자-AI 융합 개발자', status: '등장' },
  { industry: '정보통신업', year: 2050, title: '포스트 AI 시대 큐레이터', status: '등장' },
  { industry: '금융 및 보험업', year: 2030, title: '은행 창구직원', status: '위험' },
  { industry: '금융 및 보험업', year: 1981, title: '주산원·계산원', status: '확산' },
  { industry: '금융 및 보험업', year: 1962, title: '증권 중개인', status: '등장' },
  { industry: '금융 및 보험업', year: 1977, title: '방문판매 보험원', status: '등장' },
  { industry: '금융 및 보험업', year: 1977, title: '보험 계리사', status: '등장' },
  { industry: '금융 및 보험업', year: 2035, title: '보험 설계사', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '공인회계사', status: '소멸' },
  { industry: '금융 및 보험업', year: 2030, title: '금융 분석가', status: '확산' },
  { industry: '금융 및 보험업', year: 1981, title: '손해사정사', status: '등장' },
  { industry: '금융 및 보험업', year: 2020, title: '텔레마케터(금융)', status: '확산' },
  { industry: '금융 및 보험업', year: 2010, title: '외환 딜러', status: '확산' },
  { industry: '금융 및 보험업', year: 1992, title: '투자 분석가', status: '등장' },
  { industry: '금융 및 보험업', year: 1996, title: '신용분석사', status: '등장' },
  { industry: '금융 및 보험업', year: 1997, title: '리스크 관리사', status: '등장' },
  { industry: '금융 및 보험업', year: 1997, title: '신용회복 상담사', status: '등장' },
  { industry: '금융 및 보험업', year: 2030, title: '대출 심사원', status: '소멸' },
  { industry: '금융 및 보험업', year: 2000, title: 'PB(개인자산관리사)', status: '등장' },
  { industry: '금융 및 보험업', year: 2000, title: '방카슈랑스 판매원', status: '등장' },
  { industry: '금융 및 보험업', year: 2000, title: '인터넷 증권 거래원', status: '등장' },
  { industry: '금융 및 보험업', year: 2030, title: '펀드매니저', status: '확산' },
  { industry: '금융 및 보험업', year: 2008, title: '글로벌 금융위기 대응 전문가', status: '등장' },
  { industry: '금융 및 보험업', year: 2010, title: '증권 트레이더', status: '등장' },
  { industry: '금융 및 보험업', year: 2010, title: '크라우드펀딩 매니저', status: '등장' },
  { industry: '금융 및 보험업', year: 2030, title: '핀테크 전문가', status: '확산' },
  { industry: '금융 및 보험업', year: 2016, title: '로보어드바이저 운영자', status: '등장' },
  { industry: '금융 및 보험업', year: 2017, title: '암호화폐 트레이더', status: '등장' },
  { industry: '금융 및 보험업', year: 2020, title: 'ESG 투자 분석가', status: '등장' },
  { industry: '금융 및 보험업', year: 2021, title: '디지털 자산 컴플라이언스', status: '등장' },
  { industry: '금융 및 보험업', year: 2030, title: 'AI 리스크 모델러', status: '등장' },
  { industry: '금융 및 보험업', year: 2030, title: 'AI 리스크 분석가', status: '등장' },
  { industry: '금융 및 보험업', year: 2035, title: 'AI 자산 운용 전문가', status: '등장' },
  { industry: '금융 및 보험업', year: 2045, title: 'AI 투자 감독관', status: '확산' },
  { industry: '금융 및 보험업', year: 2035, title: '디지털 화폐 운영자', status: '등장' },
  { industry: '금융 및 보험업', year: 2035, title: '디지털 화폐(CBDC) 전문가', status: '등장' },
  { industry: '금융 및 보험업', year: 2040, title: '개인 재무 AI 어드바이저', status: '등장' },
  { industry: '금융 및 보험업', year: 2040, title: '개인 재무 AI 코치', status: '등장' },
  { industry: '금융 및 보험업', year: 2050, title: '탄소 크레딧 거래소 운영자', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1876, title: '통역관·역관', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1890, title: '신식 의사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1902, title: '약사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1973, title: '측량사', status: '확산' },
  { industry: '보건업 및 사회복지', year: 2000, title: '한의사', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 1948, title: '변호사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1960, title: '공인중개사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2035, title: '세무사', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 1961, title: '건축사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1961, title: '광고 카피라이터', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '간호사', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 1971, title: '과학기술 연구원', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1980, title: '영양사', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 1973, title: '특허 전문가(변리사)', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1980, title: '변리사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1983, title: '광고 기획자(AE)', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1983, title: '인테리어 디자이너', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1987, title: '노동운동 활동가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1993, title: '노무사', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '번역가', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 1990, title: '정보보호 컨설턴트', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1990, title: '환경공학 기술자', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1995, title: '감정평가사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1995, title: '법무사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '경영 컨설턴트', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 1997, title: '아웃소싱 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 1998, title: '헤드헌터·채용 컨설턴트', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2000, title: '노무 컨설턴트', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '데이터 분석가', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 2000, title: '환경 컨설턴트', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2010, title: 'AI 연구원', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2010, title: '사물인터넷(IoT) 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2010, title: '스타트업 컨설턴트', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2013, title: '기후변화 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2013, title: '빅데이터 기획자', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2014, title: '핀테크 보안 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2019, title: 'ESG 경영 컨설턴트', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: 'AI 거버넌스 전문가', status: '확산' },
  { industry: '전문과학 및 기술서비스업', year: 2020, title: '디지털 전환(DX) 컨설턴트', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2020, title: '탄소배출권 거래사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2022, title: 'AI 법률 서비스 기획자', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: 'AI 특허 심사관', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '그린테크 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '번역가(단순)', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2035, title: 'AI 규제 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2035, title: 'AI 규제·거버넌스 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2035, title: '기후공학 기술자', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2035, title: '탄소배출권 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2040, title: 'AI 윤리 판사', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2040, title: 'AI 윤리·거버넌스 전문가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2040, title: '지속가능성 전략가', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2045, title: 'AI 법인 대리인', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2045, title: 'AI 윤리·철학 연구자', status: '등장' },
  { industry: '전문과학 및 기술서비스업', year: 2050, title: '인류 지식 보존사', status: '등장' },
  { industry: '교육서비스업', year: 1990, title: '학습지 교사', status: '확산' },
  { industry: '운수 및 창고업', year: 2030, title: '배달원(라이더)', status: '소멸' },
  { industry: '예술·스포츠 및 여가', year: 1919, title: '신문 기자', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 1940, title: '활동사진 변사', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 1920, title: '사진작가', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1927, title: '라디오 아나운서', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1970, title: '탤런트·배우', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 1960, title: 'CF 감독', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1960, title: '스튜어디스(객실승무원)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1970, title: '광고 모델', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1970, title: '바둑 기사(프로)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '방송 작가', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 1970, title: '작곡가·음악 프로듀서', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1980, title: '케이블 방송 PD', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1982, title: '스포츠 선수(프로)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1982, title: '프로야구 선수', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1983, title: '개그맨·코미디언', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1983, title: '프로축구 선수', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1986, title: '스포츠 트레이너', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1986, title: '아시안게임 통역사', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '국제회의 기획자(PCO)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '레저·스포츠 강사', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '스포츠 마케터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '스포츠 중계 캐스터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '이벤트 기획자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '통역사(동시통역)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '투어 가이드(관광 안내원)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1989, title: '여행 가이드(해외)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1990, title: 'PC 게임 개발자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1990, title: '뮤직비디오 감독', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1990, title: '연예 매니저', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1991, title: '케이블 TV 운영자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1993, title: '쇼호스트', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1995, title: '홈쇼핑 MD', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 1998, title: '프로게이머', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '3D 모델러', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 2000, title: '웹 기획자(PD)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2002, title: '길거리 응원 기획자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2002, title: '스포츠 에이전트', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2002, title: '한류 PD·기획자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: 'VFX 아티스트', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 2004, title: '게임 기획자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2004, title: '웹툰 작가', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2010, title: '음반 기획자(A&R)', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 2004, title: '팟캐스트 진행자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2005, title: 'UCC 크리에이터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2010, title: '스포츠 데이터 분석가', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2010, title: '유튜버·크리에이터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2010, title: '피트니스 트레이너', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2011, title: '웹드라마 PD', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2012, title: '소셜 큐레이터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2015, title: 'K-pop 안무가', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2015, title: 'e스포츠 코치·감독', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2015, title: '인플루언서', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2016, title: 'e스포츠 해설가', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2016, title: '팬덤 마케터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2019, title: 'VR 콘텐츠 제작자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2019, title: '웹툰 번역가', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: 'AI 아티스트', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: 'K-드라마 제작 PD', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '가상 인간 기획자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '공연 기획자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '그래픽 디자이너', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '메타버스 디자이너', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '버추얼 유튜버', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '일러스트레이터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '조명·음향 기사', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '홈트레이닝 강사', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2021, title: 'K-pop 트레이너', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2021, title: 'OTT 콘텐츠 기획자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2021, title: '메타버스 아바타 디자이너', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2022, title: 'NFT 아티스트', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2022, title: '숏폼 크리에이터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2023, title: 'AI 콘텐츠 감별사', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2035, title: 'AI 창작 디렉터', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '유튜버·숏폼 크리에이터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '홀로그램 공연 기획자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2035, title: 'XR 경험 설계자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2035, title: '디지털 경험 설계자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2040, title: '감성 AI 설계자', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2040, title: '몰입형 경험 디렉터', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2045, title: '감성 콘텐츠 치료사', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2045, title: '디지털 유산 관리사', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2050, title: '공연 예술가(라이브)', status: '등장' },
  { industry: '예술·스포츠 및 여가', year: 2050, title: '인간 예술 감정사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1960, title: '간호보조원', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2010, title: '방사선사', status: '확산' },
  { industry: '보건업 및 사회복지', year: 1963, title: '임상병리사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1963, title: '치기공사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1965, title: '파독 간호사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1980, title: '물리치료사', status: '확산' },
  { industry: '보건업 및 사회복지', year: 1970, title: '사회복지사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1970, title: '임상심리사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1977, title: '보건교사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1977, title: '치과의사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1988, title: '스포츠 의학 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1990, title: '아동 심리 상담사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1990, title: '언어치료사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1996, title: '응급구조사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1997, title: '직업재활사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2000, title: '병원 원무 행정직', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2000, title: '산후조리원 간호사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2000, title: '치과위생사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2000, title: '호스피스 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2005, title: '노인 돌봄 서비스원', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2005, title: '의료관광 코디네이터', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2005, title: '의료정보 관리사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2035, title: '요양보호사', status: '확산' },
  { industry: '보건업 및 사회복지', year: 2010, title: '반려동물 미용사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2010, title: '반려동물 수의사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2010, title: '반려동물 훈련사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2010, title: '병원 코디네이터', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2010, title: '줄기세포 연구원', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2010, title: '헬스케어 앱 기획자', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2014, title: '임상시험 코디네이터(CRC)', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2015, title: '시니어 라이프 플래너', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2015, title: '정신건강 상담사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2017, title: '정신건강복지사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2017, title: '치매 전문 요양사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2030, title: '의료 AI 전문가', status: '확산' },
  { industry: '보건업 및 사회복지', year: 2020, title: '감염병 관리 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '돌봄 로봇 운영자', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '백신 접종 간호사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '비대면 심리 상담사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '원격의료 코디네이터', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '유전상담사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '장례지도사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '펫 장례지도사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2020, title: '헬스 코치', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2022, title: 'AI 신약 개발 연구원', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2023, title: '디지털 치료제 개발자', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2030, title: 'AI 진단 보조원', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2030, title: '간호 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2030, title: '나노의학 기술자', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2030, title: '요양보호사·돌봄 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2035, title: 'AI 의료 협업 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2035, title: '노인 돌봄 로봇 운영사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2035, title: '노인 돌봄 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2035, title: '유전자 치료 연구원', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2035, title: '유전자 편집 기술자', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2040, title: 'AI 의료 코디네이터', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2040, title: '인체 증강 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2040, title: '정신건강 AI 치료사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2045, title: 'AI 돌봄 시스템 설계사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2045, title: '노화 역전 연구원', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2050, title: 'AI 돌봄 윤리 전문가', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2050, title: '수명 연장 전문의', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2050, title: '우주 의료 전문가', status: '등장' },
  { industry: '교육서비스업', year: 1945, title: '교사(공교육)', status: '등장' },
  { industry: '교육서비스업', year: 1950, title: '조산원(산파)', status: '등장' },
  { industry: '교육서비스업', year: 1960, title: '교육행정가', status: '등장' },
  { industry: '교육서비스업', year: 1969, title: '중학교 입시 학원 강사', status: '확산' },
  { industry: '교육서비스업', year: 1970, title: '특수교육 교사', status: '등장' },
  { industry: '교육서비스업', year: 1980, title: '교복 폐지 관련 제복업자', status: '등장' },
  { industry: '교육서비스업', year: 1980, title: '보육교사', status: '등장' },
  { industry: '교육서비스업', year: 2030, title: '어학원 강사(원어민)', status: '소멸' },
  { industry: '교육서비스업', year: 1980, title: '유치원 교사', status: '등장' },
  { industry: '교육서비스업', year: 1980, title: '학원 강사', status: '등장' },
  { industry: '교육서비스업', year: 1990, title: '논술 강사', status: '등장' },
  { industry: '교육서비스업', year: 1993, title: '입시 컨설턴트', status: '등장' },
  { industry: '교육서비스업', year: 1994, title: '수능 전문 강사', status: '등장' },
  { industry: '교육서비스업', year: 2005, title: '다문화 교육 강사', status: '등장' },
  { industry: '교육서비스업', year: 2006, title: '방과후 교사', status: '등장' },
  { industry: '교육서비스업', year: 2010, title: '에듀테크 기획자', status: '등장' },
  { industry: '교육서비스업', year: 2010, title: '온라인 강사', status: '등장' },
  { industry: '교육서비스업', year: 2010, title: '진로상담 교사', status: '등장' },
  { industry: '교육서비스업', year: 2010, title: '특수교육 보조원', status: '등장' },
  { industry: '교육서비스업', year: 2013, title: '자유학기제 진로 교사', status: '등장' },
  { industry: '교육서비스업', year: 2013, title: '코딩 교육 강사', status: '등장' },
  { industry: '교육서비스업', year: 2015, title: '디지털 리터러시 교육자', status: '등장' },
  { industry: '교육서비스업', year: 2030, title: 'AI 교육 전문가', status: '확산' },
  { industry: '교육서비스업', year: 2020, title: '교육 콘텐츠 개발자', status: '등장' },
  { industry: '교육서비스업', year: 2020, title: '메타버스 교육 기획자', status: '등장' },
  { industry: '교육서비스업', year: 2020, title: '방역 교육 강사', status: '등장' },
  { industry: '교육서비스업', year: 2025, title: 'AI 디지털 교과서 개발자', status: '등장' },
  { industry: '교육서비스업', year: 2030, title: '대학·중등교육 교사', status: '등장' },
  { industry: '교육서비스업', year: 2035, title: '평생학습 설계사', status: '확산' },
  { industry: '교육서비스업', year: 2035, title: 'AI 러닝 코치', status: '등장' },
  { industry: '교육서비스업', year: 2035, title: '평생학습 플래너', status: '등장' },
  { industry: '교육서비스업', year: 2040, title: '인간 역량 개발 코치', status: '등장' },
  { industry: '교육서비스업', year: 2045, title: '경험 학습 설계자', status: '등장' },
  { industry: '교육서비스업', year: 2050, title: '인간 본질 교육자', status: '등장' },
  { industry: '공공행정 및 국방', year: 1910, title: '순사(경찰)', status: '등장' },
  { industry: '공공행정 및 국방', year: 1961, title: '경찰관', status: '확산' },
  { industry: '공공행정 및 국방', year: 1945, title: '외교관', status: '등장' },
  { industry: '공공행정 및 국방', year: 2030, title: '세무 공무원', status: '소멸' },
  { industry: '공공행정 및 국방', year: 1950, title: '군 행정병·군무원', status: '등장' },
  { industry: '공공행정 및 국방', year: 1950, title: '소방관', status: '등장' },
  { industry: '공공행정 및 국방', year: 1950, title: '행정 서기', status: '등장' },
  { industry: '공공행정 및 국방', year: 1960, title: '우체부(우편집배원)', status: '등장' },
  { industry: '공공행정 및 국방', year: 2030, title: '통계 조사원', status: '소멸' },
  { industry: '공공행정 및 국방', year: 1966, title: '주민등록 담당원', status: '등장' },
  { industry: '공공행정 및 국방', year: 1970, title: '근로감독관', status: '등장' },
  { industry: '공공행정 및 국방', year: 1970, title: '새마을 지도자', status: '등장' },
  { industry: '공공행정 및 국방', year: 1987, title: '노무 담당자(기업)', status: '등장' },
  { industry: '공공행정 및 국방', year: 1987, title: '인권 활동가', status: '등장' },
  { industry: '공공행정 및 국방', year: 1990, title: '군 통신 전문병', status: '등장' },
  { industry: '공공행정 및 국방', year: 1990, title: '정책 분석가', status: '등장' },
  { industry: '공공행정 및 국방', year: 1990, title: '지방자치 공무원', status: '등장' },
  { industry: '공공행정 및 국방', year: 1991, title: 'NGO 활동가', status: '등장' },
  { industry: '공공행정 및 국방', year: 1991, title: '환경 영향 평가사', status: '등장' },
  { industry: '공공행정 및 국방', year: 2000, title: '다문화 지원 전문가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2000, title: '대기환경 측정원', status: '등장' },
  { industry: '공공행정 및 국방', year: 2002, title: '전자정부 운영자', status: '등장' },
  { industry: '공공행정 및 국방', year: 2003, title: '소방 구조대원', status: '등장' },
  { industry: '공공행정 및 국방', year: 2006, title: '공공 데이터 관리사', status: '등장' },
  { industry: '공공행정 및 국방', year: 2010, title: '군 사이버 전문병', status: '등장' },
  { industry: '공공행정 및 국방', year: 2010, title: '드론 운용 군인', status: '등장' },
  { industry: '공공행정 및 국방', year: 2010, title: '사회적 기업가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2012, title: '스마트시티 운영자', status: '등장' },
  { industry: '공공행정 및 국방', year: 2013, title: '미세먼지 관리 전문가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2013, title: '재난안전 전문가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2020, title: '군 AI 운영 전문요원', status: '등장' },
  { industry: '공공행정 및 국방', year: 2020, title: '기후 활동가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2020, title: '디지털 포렌식 수사관', status: '등장' },
  { industry: '공공행정 및 국방', year: 2030, title: '공공 AI 서비스 기획자', status: '등장' },
  { industry: '공공행정 및 국방', year: 2030, title: '민원 처리 공무원(단순)', status: '등장' },
  { industry: '공공행정 및 국방', year: 2030, title: '사이버 안보 전문가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2035, title: 'AI 공공서비스 감독관', status: '등장' },
  { industry: '공공행정 및 국방', year: 2035, title: '사이버 안보 전략가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2035, title: '스마트시티 운영 전문가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2040, title: '국가 AI 거버넌스 위원', status: '등장' },
  { industry: '공공행정 및 국방', year: 2040, title: '국가 AI 거버넌스 전문관', status: '등장' },
  { industry: '공공행정 및 국방', year: 2050, title: '기후 긴급 대응 전문가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2050, title: '달·화성 행정 전문가', status: '등장' },
  { industry: '공공행정 및 국방', year: 2050, title: '생태계 복원 기술자', status: '등장' },
  { industry: '제조업', year: 1990, title: '광부(탄광)', status: '확산' },
  { industry: '제조업', year: 1910, title: '방직공', status: '등장' },
  { industry: '제조업', year: 1930, title: '철공·단조공', status: '등장' },
  { industry: '제조업', year: 1950, title: '굴뚝청소부', status: '등장' },
  { industry: '제조업', year: 1950, title: '인쇄 기술자', status: '등장' },
  { industry: '제조업', year: 1953, title: '군수품 제조공', status: '등장' },
  { industry: '제조업', year: 2030, title: 'CNC 기계 조작원', status: '소멸' },
  { industry: '제조업', year: 1960, title: '섬유·봉제 노동자', status: '등장' },
  { industry: '제조업', year: 1990, title: '신발 제조공', status: '위험' },
  { industry: '제조업', year: 2020, title: '조립 생산직', status: '확산' },
  { industry: '제조업', year: 1990, title: '합판 제조공', status: '위험' },
  { industry: '제조업', year: 1960, title: '화학 공정 기술자', status: '등장' },
  { industry: '제조업', year: 1965, title: '가발 제조공', status: '등장' },
  { industry: '제조업', year: 1968, title: '경부고속도로 건설 노동자', status: '등장' },
  { industry: '제조업', year: 1970, title: '냉동기계 기술자', status: '등장' },
  { industry: '제조업', year: 1970, title: '농기계 수리 기사', status: '등장' },
  { industry: '제조업', year: 1970, title: '소재 연구원', status: '등장' },
  { industry: '제조업', year: 1970, title: '조선소 기술자', status: '등장' },
  { industry: '제조업', year: 1973, title: '건설 중장비 기사', status: '등장' },
  { industry: '제조업', year: 2030, title: '용접공', status: '소멸' },
  { industry: '제조업', year: 1973, title: '전기 기술자', status: '등장' },
  { industry: '제조업', year: 1974, title: '반도체 공정 엔지니어', status: '등장' },
  { industry: '제조업', year: 1975, title: '자동차 조립 노동자', status: '등장' },
  { industry: '제조업', year: 1978, title: '원전 안전 관리사', status: '등장' },
  { industry: '제조업', year: 1978, title: '원전 운전원', status: '등장' },
  { industry: '제조업', year: 1980, title: '기계 설계 기술자', status: '등장' },
  { industry: '제조업', year: 1980, title: '반도체 장비 엔지니어', status: '등장' },
  { industry: '제조업', year: 1980, title: '품질 검사원', status: '등장' },
  { industry: '제조업', year: 1980, title: '플랜트 건설 기술자', status: '등장' },
  { industry: '운수 및 창고업', year: 1961, title: '버스 안내양', status: '확산' },
  { industry: '제조업', year: 1985, title: '반도체 테스트 엔지니어', status: '등장' },
  { industry: '제조업', year: 1990, title: '디스플레이 엔지니어', status: '등장' },
  { industry: '제조업', year: 1990, title: '로봇 프로그래머', status: '등장' },
  { industry: '제조업', year: 2030, title: '스마트팩토리 운영자', status: '확산' },
  { industry: '제조업', year: 2000, title: '자동화 설비 엔지니어', status: '등장' },
  { industry: '제조업', year: 2000, title: '제사공(실크)', status: '등장' },
  { industry: '제조업', year: 2003, title: 'LNG 플랜트 기술자', status: '등장' },
  { industry: '제조업', year: 2005, title: 'OLED 개발 연구원', status: '등장' },
  { industry: '제조업', year: 2009, title: '녹색성장 전문가', status: '등장' },
  { industry: '제조업', year: 2010, title: '드론 제조 엔지니어', status: '등장' },
  { industry: '제조업', year: 2010, title: '제조 데이터 분석가', status: '등장' },
  { industry: '제조업', year: 2012, title: '풍력 발전 기술자', status: '등장' },
  { industry: '제조업', year: 2013, title: '3D 프린팅 전문가', status: '등장' },
  { industry: '제조업', year: 2015, title: '배터리(2차전지) 엔지니어', status: '등장' },
  { industry: '제조업', year: 2015, title: '에너지저장(ESS) 기술자', status: '등장' },
  { industry: '제조업', year: 2015, title: '태양광 패널 설치원', status: '등장' },
  { industry: '제조업', year: 2016, title: 'DRAM 공정 개발자', status: '등장' },
  { industry: '제조업', year: 2016, title: '반도체 설계 엔지니어', status: '등장' },
  { industry: '제조업', year: 2019, title: '수소 인프라 엔지니어', status: '등장' },
  { industry: '제조업', year: 2020, title: 'HBM 개발 엔지니어', status: '등장' },
  { industry: '운수 및 창고업', year: 2020, title: '물류 창고 작업자', status: '확산' },
  { industry: '제조업', year: 2020, title: '수소 연료전지 기술자', status: '등장' },
  { industry: '제조업', year: 2021, title: '수소차 기술자', status: '등장' },
  { industry: '제조업', year: 2030, title: 'AI 반도체 설계자', status: '확산' },
  { industry: '제조업', year: 2023, title: '탄소 포집 기술자', status: '등장' },
  { industry: '제조업', year: 2030, title: '배터리·신에너지 엔지니어', status: '등장' },
  { industry: '제조업', year: 2030, title: '우주 부품 제조 엔지니어', status: '등장' },
  { industry: '제조업', year: 2030, title: '조립 생산직(단순 반복)', status: '등장' },
  { industry: '제조업', year: 2035, title: '첨단소재 연구원', status: '등장' },
  { industry: '제조업', year: 2035, title: '휴머노이드 로봇 운영자', status: '등장' },
  { industry: '제조업', year: 2040, title: '스마트팩토리 AI 감독관', status: '등장' },
  { industry: '제조업', year: 2040, title: '핵융합 발전 기술자', status: '등장' },
  { industry: '제조업', year: 2045, title: '에너지 저장 시스템 전문가', status: '등장' },
  { industry: '제조업', year: 2050, title: '에너지 제로 건축 기술자', status: '등장' },
  { industry: '제조업', year: 2050, title: '우주 발사체 기술자', status: '등장' },
  { industry: '운수 및 창고업', year: 2050, title: '선박 운항사', status: '확산' },
  { industry: '운수 및 창고업', year: 1940, title: '인력거꾼', status: '확산' },
  { industry: '운수 및 창고업', year: 2030, title: '버스 기사', status: '소멸' },
  { industry: '운수 및 창고업', year: 1930, title: '하역 작업자', status: '등장' },
  { industry: '운수 및 창고업', year: 2040, title: '항공기 조종사', status: '소멸' },
  { industry: '운수 및 창고업', year: 1950, title: '지게꾼', status: '등장' },
  { industry: '운수 및 창고업', year: 2035, title: '화물 트럭 기사', status: '소멸' },
  { industry: '운수 및 창고업', year: 1953, title: '군용 차량 정비사', status: '등장' },
  { industry: '운수 및 창고업', year: 1961, title: '전차 운전사', status: '등장' },
  { industry: '운수 및 창고업', year: 1965, title: '파독 광부', status: '확산' },
  { industry: '운수 및 창고업', year: 1963, title: '항만 하역부', status: '등장' },
  { industry: '운수 및 창고업', year: 1967, title: '통관사', status: '등장' },
  { industry: '운수 및 창고업', year: 1969, title: '고속도로 요금소 직원', status: '등장' },
  { industry: '운수 및 창고업', year: 1970, title: '냉동·냉장 물류 전문가', status: '등장' },
  { industry: '운수 및 창고업', year: 1970, title: '항공 관제사', status: '등장' },
  { industry: '운수 및 창고업', year: 1970, title: '항만 하역 감독관', status: '등장' },
  { industry: '운수 및 창고업', year: 1982, title: '중동 파견 건설 노동자', status: '확산' },
  { industry: '운수 및 창고업', year: 1973, title: '해외 건설 코디네이터', status: '등장' },
  { industry: '운수 및 창고업', year: 1988, title: '관광 버스 기사', status: '등장' },
  { industry: '운수 및 창고업', year: 1988, title: '항공 정비사', status: '등장' },
  { industry: '운수 및 창고업', year: 2000, title: '택배 기사', status: '위험' },
  { industry: '운수 및 창고업', year: 2000, title: '해운 물류 전문가', status: '등장' },
  { industry: '운수 및 창고업', year: 2002, title: '셔틀버스·관광 기사', status: '등장' },
  { industry: '운수 및 창고업', year: 2007, title: '하이패스 시스템 운영원', status: '등장' },
  { industry: '운수 및 창고업', year: 2009, title: '고속철도(KTX) 승무원', status: '등장' },
  { industry: '운수 및 창고업', year: 2010, title: '공유 킥보드 운영자', status: '등장' },
  { industry: '운수 및 창고업', year: 2010, title: '드론 배송 운영자', status: '등장' },
  { industry: '운수 및 창고업', year: 2010, title: '라스트마일 최적화 엔지니어', status: '등장' },
  { industry: '운수 및 창고업', year: 2010, title: '카셰어링 운영자', status: '등장' },
  { industry: '운수 및 창고업', year: 2015, title: '공유 자전거 운영자', status: '등장' },
  { industry: '운수 및 창고업', year: 2015, title: '물류 자동화 엔지니어', status: '등장' },
  { industry: '운수 및 창고업', year: 2015, title: '플랫폼 노동자(긱워커)', status: '등장' },
  { industry: '운수 및 창고업', year: 2016, title: '물류 드론 개발자', status: '등장' },
  { industry: '운수 및 창고업', year: 2018, title: '배달 대행 기사', status: '등장' },
  { industry: '운수 및 창고업', year: 2019, title: 'PM(개인형이동장치) 안전 관리원', status: '등장' },
  { industry: '운수 및 창고업', year: 2020, title: '대리운전 기사', status: '등장' },
  { industry: '운수 및 창고업', year: 2020, title: '자율주행 안전 요원', status: '등장' },
  { industry: '운수 및 창고업', year: 2030, title: '전기차 충전 인프라 기사', status: '위험' },
  { industry: '운수 및 창고업', year: 2035, title: 'UAM(도심항공) 조종사', status: '위험' },
  { industry: '운수 및 창고업', year: 2030, title: '자율주행 모빌리티 기획자', status: '등장' },
  { industry: '운수 및 창고업', year: 2030, title: '항만 자동화 운영관', status: '등장' },
  { industry: '운수 및 창고업', year: 2035, title: '모빌리티 서비스 관리자', status: '등장' },
  { industry: '운수 및 창고업', year: 2035, title: '모빌리티 서비스 매니저', status: '등장' },
  { industry: '운수 및 창고업', year: 2040, title: '우주 물류 전문가', status: '등장' },
  { industry: '운수 및 창고업', year: 2050, title: '자율주행 인프라 엔지니어', status: '확산' },
  { industry: '운수 및 창고업', year: 2045, title: '자율운항 선박 관제사', status: '등장' },
  { industry: '운수 및 창고업', year: 2050, title: '도심항공(UAM) 교통 관제사', status: '등장' },
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

const STATUS_STYLE: Record<string, { pill: string; badge: string; filterPill?: string }> = {
  등장: { pill: 'bg-brand-appearance-50 text-brand-appearance border border-brand-appearance', badge: 'bg-ui-bg-card/80 text-brand-appearance' },
  확산: { pill: 'bg-brand-spread-50 text-brand-spread border border-brand-spread',          badge: 'bg-ui-bg-card/80 text-brand-spread' },
  위험: { pill: 'bg-brand-threat-50 text-brand-threat border border-brand-threat',         badge: 'bg-ui-bg-card/80 text-brand-threat'    },
  소멸: { 
    pill: 'bg-brand-extinction-100 text-yellow-600 border border-brand-extinction', 
    badge: 'bg-ui-bg-card/80 text-yellow-600',
    filterPill: 'bg-brand-extinction-50 text-yellow-600 border border-brand-extinction'
  },
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
const AI_REPLACEABLE_JOBS = [
  { industry: '정보통신업', year: 1980, title: '전산원(펀치카드)' },
  { industry: '정보통신업', year: 1980, title: '타이피스트' },
  { industry: '정보통신업', year: 2000, title: '전신기사' },
  { industry: '정보통신업', year: 2020, title: '데이터 라벨러' },
  { industry: '정보통신업', year: 2030, title: '소프트웨어 개발자(초급)' },
  { industry: '금융 및 보험업', year: 1977, title: '보험 계리사' },
  { industry: '금융 및 보험업', year: 1981, title: '금융 분석가' },
  { industry: '금융 및 보험업', year: 1996, title: '신용분석사' },
  { industry: '금융 및 보험업', year: 1997, title: '은행 창구직원' },
  { industry: '금융 및 보험업', year: 1999, title: '대출 심사원' },
  { industry: '금융 및 보험업', year: 2030, title: '대출 심사원' },
  { industry: '금융 및 보험업', year: 2030, title: '은행 창구직원' },
  { industry: '전문과학 및 기술서비스업', year: 1876, title: '통역관·역관' },
  { industry: '전문과학 및 기술서비스업', year: 1961, title: '광고 카피라이터' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '번역가' },
  { industry: '전문과학 및 기술서비스업', year: 2030, title: '번역가(단순)' },
  { industry: '예술·스포츠 및 여가', year: 1950, title: '타이피스트' },
  { industry: '예술·스포츠 및 여가', year: 1970, title: '방송 작가' },
  { industry: '예술·스포츠 및 여가', year: 1986, title: '아시안게임 통역사' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '통역사(동시통역)' },
  { industry: '예술·스포츠 및 여가', year: 2000, title: '3D 모델러' },
  { industry: '예술·스포츠 및 여가', year: 2019, title: '웹툰 번역가' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '그래픽 디자이너' },
  { industry: '예술·스포츠 및 여가', year: 2020, title: '일러스트레이터' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '3D 모델러' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '그래픽 디자이너' },
  { industry: '예술·스포츠 및 여가', year: 2030, title: '방송 작가' },
  { industry: '교육서비스업', year: 2030, title: '어학원 강사(원어민)' },
  { industry: '공공행정 및 국방', year: 2030, title: '세무 공무원' },
  { industry: '공공행정 및 국방', year: 2030, title: '통계 조사원' },
  { industry: '제조업', year: 1990, title: '신발 제조공' },
  { industry: '제조업', year: 1990, title: '합판 제조공' },
  { industry: '제조업', year: 2030, title: 'CNC 기계 조작원' },
  { industry: '제조업', year: 2030, title: '용접공' },
  { industry: '운수 및 창고업', year: 2000, title: '택배 기사' },
  { industry: '운수 및 창고업', year: 2030, title: '배달원(라이더)' },
  { industry: '운수 및 창고업', year: 2030, title: '버스 기사' },
  { industry: '운수 및 창고업', year: 2030, title: '전기차 충전 인프라 기사' },
  { industry: '운수 및 창고업', year: 2030, title: '항공기 조종사' },
  { industry: '운수 및 창고업', year: 2035, title: 'UAM(도심항공) 조종사' },
  { industry: '운수 및 창고업', year: 2035, title: '화물 트럭 기사' },
  { industry: '운수 및 창고업', year: 2040, title: '항공기 조종사' },
];

const STEADY_SELLER_JOBS = [
  { industry: '정보통신업', year: 2030, title: '사이버보안 전문가', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 1970, title: '탤런트·배우', status: '확산' },
  { industry: '예술·스포츠 및 여가', year: 1988, title: '레저·스포츠 강사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1970, title: '사회복지사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 1990, title: '간호사', status: '확산' },
  { industry: '보건업 및 사회복지', year: 2008, title: '요양보호사', status: '등장' },
  { industry: '보건업 및 사회복지', year: 2030, title: '요양보호사', status: '확산' },
  { industry: '교육서비스업', year: 1945, title: '교사(공교육)', status: '등장' },
  { industry: '교육서비스업', year: 1970, title: '특수교육 교사', status: '등장' },
  { industry: '교육서비스업', year: 1980, title: '보육교사', status: '등장' },
  { industry: '교육서비스업', year: 1980, title: '유치원 교사', status: '등장' },
  { industry: '공공행정 및 국방', year: 1945, title: '경찰관', status: '등장' },
  { industry: '공공행정 및 국방', year: 1945, title: '외교관', status: '등장' },
  { industry: '공공행정 및 국방', year: 1950, title: '소방관', status: '등장' },
  { industry: '공공행정 및 국방', year: 1961, title: '경찰관', status: '확산' },
  { industry: '공공행정 및 국방', year: 1991, title: 'NGO 활동가', status: '등장' },
  { industry: '제조업', year: 1973, title: '전기 기술자', status: '등장' }
];

const STORYLINES = [
  {
    id: 'kpop',
    title: 'K-POP',
    insight: 'K-POP이 이끈 직업들을 알아보자',
    jobs: [
      { year: 1970, industry: '예술·스포츠 및 여가', title: '작곡가·음악 프로듀서', desc: '초기 음반 생태계의 시작' },
      { year: 2002, industry: '예술·스포츠 및 여가', title: '한류 PD·기획자', desc: '한류 기획 시대의 개막' },
      { year: 2004, industry: '예술·스포츠 및 여가', title: '음반 기획자(A&R)', desc: '오프라인 음반 전성기' },
      { year: 2010, industry: '예술·스포츠 및 여가', title: '음반 기획자(A&R)', desc: '오프라인 시장 축소로 업무 개편' },
      { year: 2015, industry: '예술·스포츠 및 여가', title: 'K-pop 안무가', desc: '퍼포먼스 중심 산업 재편' },
      { year: 2021, industry: '예술·스포츠 및 여가', title: 'OTT 콘텐츠 기획자', desc: 'A&R을 대체하는 영상 콘텐츠의 시대' },
      { year: 2030, industry: '예술·스포츠 및 여가', title: 'AI 창작 디렉터', desc: '인간의 창작을 지휘하는 단계로 진화' }
    ]
  },
  {
    id: 'crisis',
    title: 'IMF & 코로나19',
    insight: '국가적 위기에 영향 받은 직업들을 알아보자',
    jobs: [
      { year: 1997, industry: '금융 및 보험업', title: '은행 창구직원', desc: 'IMF로 인한 오프라인 금융의 위기 신호' },
      { year: 1997, industry: '금융 및 보험업', title: '리스크 관리사', desc: '위기가 낳은 새로운 리스크 통제 직업' },
      { year: 2020, industry: '예술·스포츠 및 여가', title: '공연 기획자', desc: '코로나19 팬데믹으로 인한 치명적 타격' },
      { year: 2020, industry: '보건업 및 사회복지', title: '비대면 심리 상담사', desc: '격리의 시대가 낳은 비대면 돌봄' },
      { year: 2020, industry: '예술·스포츠 및 여가', title: '버추얼 유튜버', desc: '현실의 위기를 대체한 가상 인플루언서' }
    ]
  },
  {
    id: 'ai_knowledge',
    title: 'AI',
    insight: 'AI에 강한 영향을 받은 직업들을 알아보자',
    jobs: [
      { year: 2016, industry: '정보통신업', title: '알파고 AI 충격', desc: 'AI 시대의 공식적 선언' },
      { year: 2030, industry: '전문과학 및 기술서비스업', title: '번역가', desc: 'AI 번역 고도화로 인한 직업 소멸 위기' },
      { year: 2030, industry: '전문과학 및 기술서비스업', title: '공인회계사', desc: '연산 및 회계 자동화로 인한 위협' },
      { year: 2020, industry: '전문과학 및 기술서비스업', title: 'AI 거버넌스 전문가', desc: 'AI 시스템을 통제하고 감독하는 역할 등장' },
      { year: 2022, industry: '전문과학 및 기술서비스업', title: 'AI 법률 서비스 기획자', desc: 'AI를 활용한 지식 서비스 기획' },
      { year: 2040, industry: '전문과학 및 기술서비스업', title: 'AI 윤리 판사', desc: '알고리즘의 윤리성을 판단하는 최고 결정권자' }
    ]
  },
  {
    id: 'care',
    title: '스테디셀러',
    insight: 'AI 대체불가능한 직업들을 알아보자',
    jobs: [
      { year: 1960, industry: '보건업 및 사회복지', title: '간호보조원', desc: '육체적 돌봄 노동의 시작' },
      { year: 1970, industry: '보건업 및 사회복지', title: '사회복지사', desc: '사회적/제도적 돌봄 영역 확대' },
      { year: 2008, industry: '보건업 및 사회복지', title: '요양보호사', desc: '고령화 시대의 필수 직업으로 확산' },
      { year: 2035, industry: '보건업 및 사회복지', title: '노인 돌봄 로봇 운영사', desc: '육체 노동은 로봇이, 통제는 인간이 담당' },
      { year: 2050, industry: '보건업 및 사회복지', title: 'AI 돌봄 윤리 전문가', desc: '기술이 닿지 못하는 정서와 윤리의 영역' }
    ]
  }
];

const ALL_SIDEBAR_JOBS = buildSidebarJobs();

const Heatmap = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [cutoffYear, setCutoffYear] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [aiFilterActive, setAiFilterActive] = useState<boolean>(false);
  const [steadyFilterActive, setSteadyFilterActive] = useState<boolean>(false);
  const [activeStorylineId, setActiveStorylineId] = useState<string | null>(null);
  const storylineIdRef = useRef<string | null>(null);
  const [storylinePoints, setStorylinePoints] = useState<{x: number, y: number}[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  const activeStoryline = STORYLINES.find(s => s.id === activeStorylineId);
  const autoScrollRef = useRef<boolean>(false);

  useEffect(() => {
    const section = document.getElementById('timeline');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBackToTop(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    storylineIdRef.current = activeStorylineId;
  }, [activeStorylineId]);

  useEffect(() => {
    if (!activeStorylineId || !timelineRef.current || !activeStoryline) {
      setStorylinePoints([]);
      return;
    }

    const updatePoints = () => {
      if (!timelineRef.current) return;
      const points: {x: number, y: number}[] = [];
      const container = timelineRef.current;
      
      activeStoryline.jobs.forEach(sj => {
        const jobId = `job-tl-${sj.year}-${sj.industry}-${encodeURIComponent(sj.title)}`;
        const el = document.getElementById(jobId);
        if (el) {
          let top = 0;
          let left = 0;
          const width = el.offsetWidth;
          const height = el.offsetHeight;
          let curr: HTMLElement | null = el;
          
          while (curr && curr !== container) {
            top += curr.offsetTop;
            left += curr.offsetLeft;
            curr = curr.offsetParent as HTMLElement;
          }
          
          points.push({
            x: left + width / 2,
            y: top + height / 2
          });
        }
      });
      points.sort((a, b) => a.y - b.y);
      setStorylinePoints(points);
    };

    updatePoints();
    const timer = setTimeout(updatePoints, 50);
    window.addEventListener('resize', updatePoints);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePoints);
    };
  }, [activeStorylineId, activeStoryline, cutoffYear]);

  useEffect(() => {
    const onScroll = () => {
      if (autoScrollRef.current || storylineIdRef.current) return;
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

  useEffect(() => {
    const el = timelineScrollRef.current;
    if (!el) return;

    let targetScrollTop = el.scrollTop;
    let currentScrollTop = el.scrollTop;
    let animationFrameId: number | null = null;
    const speedMultiplier = 1.6; // Responsive velocity
    const easeFactor = 0.085;     // Easy-ease friction (0.085 provides excellent responsiveness and buttery smooth decay)

    const interpolate = () => {
      const diff = targetScrollTop - currentScrollTop;
      if (Math.abs(diff) > 0.2) {
        currentScrollTop += diff * easeFactor;
        el.scrollTop = currentScrollTop;
        animationFrameId = requestAnimationFrame(interpolate);
      } else {
        el.scrollTop = targetScrollTop;
        currentScrollTop = targetScrollTop;
        animationFrameId = null;
      }
    };

    const handleScrollWheel = (e: WheelEvent) => {
      e.preventDefault();
      const maxScroll = el.scrollHeight - el.clientHeight;
      targetScrollTop = Math.max(0, Math.min(maxScroll, targetScrollTop + e.deltaY * speedMultiplier));
      
      // Keep state sync if manually dragged or outside scroll occurs
      if (Math.abs(currentScrollTop - el.scrollTop) > 15) {
        currentScrollTop = el.scrollTop;
      }

      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(interpolate);
      }
    };

    el.addEventListener('wheel', handleScrollWheel, { passive: false });

    const handleScroll = () => {
      if (animationFrameId === null) {
        targetScrollTop = el.scrollTop;
        currentScrollTop = el.scrollTop;
      }
    };
    el.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleScrollWheel);
      el.removeEventListener('scroll', handleScroll);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
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
  if (aiFilterActive) {
    filteredSidebarJobs = filteredSidebarJobs.filter(j => 
       AI_REPLACEABLE_JOBS.some(r => r.year === j.year && r.title === j.title && (r.industry === j.industry || j.industry.startsWith(r.industry)))
    );
  }
  if (steadyFilterActive) {
    filteredSidebarJobs = filteredSidebarJobs.filter(j => 
       STEADY_SELLER_JOBS.some(r => r.year === j.year && r.title === j.title && (r.industry === j.industry || j.industry.startsWith(r.industry)))
    );
  }
  const sidebarRemaining = filteredSidebarJobs.filter(j => j.year >= cutoffYear);

  return (
    <div className="bg-ui-bg-card w-full min-h-screen text-ui-text-primary font-sans m-0 p-0 flex flex-col relative">

      {/* ───────────────────────────────────────────────────────── */}
      {/* 1. Job List Section */}
      {/* ───────────────────────────────────────────────────────── */}
      <section id="job-list" className="relative z-40 bg-ui-bg-card/90 backdrop-blur w-full flex flex-col border-b border-ui-border pt-3 h-[calc(100vh-64px)] shrink-0 shadow-sm">
        <div className="w-full px-2 md:px-4 mb-8 flex flex-col justify-center items-center max-w-7xl mx-auto relative">
<div className="w-full flex justify-center items-center relative min-h-[28px] mt-[40px] mb-8">
          <div className="absolute left-0">
             <p className="text-[10px] md:text-[11px] text-ui-text-secondary font-medium bg-ui-bg-card px-2 py-0.5 rounded-full border border-ui-border">
               {sidebarRemaining.length}개 대기중
             </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#2699F6] font-semibold tracking-wider text-[16px] uppercase block mb-2">Job List</span>
            <h1 className="text-[28px] md:text-[32px] font-bold leading-tight text-center">직업 리스트</h1>
          </div>
          <p className="text-[10px] text-ui-text-secondary hidden md:block absolute right-0">스크롤하면 타임라인에 나타납니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => {
            setSteadyFilterActive(!steadyFilterActive);
            if (!steadyFilterActive) {
              setAiFilterActive(false);
              setActiveFilter(null);
            }
          }} className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 border ${steadyFilterActive ? 'bg-black text-white border-black shadow-sm' : 'bg-ui-bg-card text-ui-text-primary border-ui-border hover:bg-ui-bg-main'} `}>스테디셀러 직업</button>
          <button onClick={() => {
            setAiFilterActive(!aiFilterActive);
            if (!aiFilterActive) {
              setSteadyFilterActive(false);
              setActiveFilter(null);
            }
          }} className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 border ${aiFilterActive ? 'bg-black text-white border-black shadow-sm' : 'bg-ui-bg-card text-ui-text-primary border-ui-border hover:bg-ui-bg-main'} `}>높은 대체 가능성</button>
        </div>
        </div>

        <div ref={timelineScrollRef} id="timeline-scroll-container" className="w-full max-w-7xl mx-auto flex-1 overflow-y-auto px-2 md:px-4 relative z-40 custom-scrollbar mb-1">
          <div className="sticky top-0 z-50 bg-ui-bg-card/90 backdrop-blur border-b border-ui-border pb-2 mb-2 w-full pt-1">
            <div className="grid grid-cols-[55px_repeat(9,minmax(0,1fr))] md:grid-cols-[70px_repeat(9,minmax(0,1fr))] gap-0 w-full">
              <div className="text-ui-text-secondary text-[9px] md:text-xs font-bold flex items-center justify-center border-r border-transparent"></div>
              {INDUSTRIES.map(ind => (
                <div key={`job-header-${ind.id}`} className="text-[#4D4D4D] text-[8px] md:text-xs font-bold text-center flex flex-col items-center justify-center px-0.5 break-keep leading-tight">
                  {ind.name}
                </div>
              ))}
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-[55px_repeat(9,minmax(0,1fr))] md:grid-cols-[70px_repeat(9,minmax(0,1fr))] gap-0 w-full pb-2 min-h-full">
            <div className="border-r border-ui-border" />
            {INDUSTRIES.map(ind => {
              // 1. 현재 인더스트리에 해당하는 직업 추출
              const allJobs = filteredSidebarJobs.filter(j => j.industry === ind.name);
              
              // 2. 상태 고정 순서 배열 및 그룹별 스타일 정의
              const statuses = ['등장', '확산', '위험', '소멸'];
              const STATUS_BOX_STYLE: Record<string, { container: string; label: string }> = {
                '등장': { 
                  container: 'bg-brand-appearance-50 border-brand-appearance/50', 
                  label: 'text-brand-appearance bg-brand-appearance/10' 
                },
                '확산': { 
                  container: 'bg-brand-spread-50 border-brand-spread/50', 
                  label: 'text-brand-spread bg-brand-spread/10' 
                },
                '위험': { 
                  container: 'bg-brand-threat-50 border-brand-threat/50', 
                  label: 'text-brand-threat bg-brand-threat/10' 
                },
                '소멸': { 
                  container: 'bg-brand-extinction-50 border-brand-extinction/50', 
                  label: 'text-yellow-600 bg-brand-extinction/20' 
                }
              };

              return (
                <div key={`jobs-${ind.id}`} className="border-r border-ui-border flex flex-col gap-4 px-1 pt-2 justify-start items-center">
                  {statuses.map(status => {
                    // 3. 해당 상태 그룹에 속하는 직업들 필터링
                    const jobsInStatus = allJobs.filter(j => j.status === status);
                    if (jobsInStatus.length === 0) return null;

                    // 그룹 내 모든 직업이 이미 타임라인에 흡수되었는지 확인
                    const allAbsorbed = jobsInStatus.every(j => j.year <= cutoffYear);
                    if (allAbsorbed && activeFilter !== null) return null;

                    const boxStyle = STATUS_BOX_STYLE[status];

                    return (
                      <div 
                        key={`${ind.id}-${status}`} 
                        className={`w-full rounded-md border p-1 flex flex-col gap-1 transition-all duration-300 shadow-sm
                          ${boxStyle.container} 
                          ${allAbsorbed && activeFilter === null ? 'opacity-0 max-h-0 m-0 p-0 overflow-hidden scale-95 border-none' : 'opacity-100'}`}
                      >
                        {/* 공통 상태 라벨 (칸 상단에 일괄 표시) */}
                        <div className={`text-[8px] md:text-[9px] font-bold text-center py-0.5 rounded-sm tracking-wider ${boxStyle.label}`}>
                          {status}
                        </div>

                        {/* 직업 카드 수직 나열 랙(Stack) */}
                        <div className="flex flex-col gap-1">
                          {jobsInStatus.map((j, i) => {
                            const isAbsorbed = j.year <= cutoffYear;
                            if (isAbsorbed && activeFilter !== null) return null;
                            
                            const animationClasses = activeFilter === null ? 'transition-all duration-500 delay-[100ms]' : '';
                            const jobId = `job-tl-${j.year}-${j.industry}-${encodeURIComponent(j.title)}`;

                            return (
                              <div
                                key={i}
                                onClick={() => {
                                  const targetYear = j.year;
                                  autoScrollRef.current = true;
                                  setCutoffYear(targetYear);

                                  setTimeout(() => {
                                    let el = document.getElementById(jobId);
                                    if (!el) {
                                      el = document.querySelector(`[data-year="${targetYear}"]`);
                                    }
                                    if (el) {
                                      const yOffset = -(window.innerHeight * 0.4) + 50; 
                                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                      window.scrollTo({top: y, behavior: 'smooth'});
                                      
                                      setTimeout(() => {
                                        autoScrollRef.current = false;
                                      }, 1200);
                                    } else {
                                      autoScrollRef.current = false;
                                    }
                                  }, 100);
                                }}
                                className={`bg-ui-bg-card border border-ui-border/80 rounded px-1.5 py-2 cursor-pointer hover:border-ui-border hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all
                                  ${animationClasses}
                                  ${isAbsorbed ? 'opacity-20 grayscale scale-95' : 'opacity-100 scale-100'}`}
                              >
                                <span className="block text-[9px] md:text-[10px] font-semibold text-[#4D4D4D] leading-tight break-keep text-center">
                                  {j.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
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
      <section id="timeline" className="w-full bg-ui-bg-card m-0 p-0 flex flex-col items-center relative z-40">
        
        {/* Timeline Industry Columns Header (Sticky inside timeline) */}
        <div className="w-full bg-ui-bg-card/90 backdrop-blur-md border-b border-t border-ui-border pt-8 pb-8 z-50 sticky top-[64px] shadow-sm">
          <div className="grid grid-cols-[55px_repeat(9,minmax(0,1fr))] md:grid-cols-[70px_repeat(9,minmax(0,1fr))] gap-0 w-full max-w-7xl mx-auto px-2 md:px-4">
            <div className="text-ui-text-secondary text-[9px] md:text-xs font-bold flex items-center justify-center border-r border-ui-border">연도</div>
            {INDUSTRIES.map(ind => (
              <div key={`header-${ind.id}`} className="text-[#4D4D4D] text-[8px] md:text-xs font-bold text-center flex flex-col items-center justify-center px-0.5 break-keep leading-tight">
                {ind.name}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full text-center mb-12 px-4 mt-[88px]">
          <span className="text-[#2699F6] font-semibold tracking-wider text-[16px] uppercase block mb-2">Job Timeline</span>
          <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25]">
            한국의 산업군 일자리 타임라인 (1876–2050)
          </h2>
        </div>

        <div className="w-full flex justify-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-start gap-2 bg-ui-bg-card p-4 rounded-md border border-ui-border">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(248,105,107,0.5)]" /> 1점: 역대 최저권</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(251,170,119,0.5)]" /> 2점: 하위권</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(255,235,132,0.5)]" /> 3점: 중간권</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(177,213,128,0.5)]" /> 4점: 상위권</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-[rgba(99,190,123,0.5)]" /> 5점: 역대 최고권</div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm mt-1">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 block bg-ui-bg-card border border-ui-border" /> 빈칸: 해당 시기 데이터 없음</div>
                <div className="flex items-center gap-1.5 text-ui-text-secondary">
                  | <span className="font-bold text-ui-text-secondary">산업별 취업자 수</span> 기반
                </div>
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <button 
                type="button"
                onClick={() => {
                  setActiveFilter(null);
                  setAiFilterActive(false);
                  setSteadyFilterActive(false);
                  setActiveStorylineId(null);
                  setTimeout(() => {
                    const el = document.querySelector('[data-year]');
                    if (el) {
                      const yOffset = -(window.innerHeight * 0.4) + 50;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeFilter === null && !aiFilterActive && !steadyFilterActive
                    ? 'bg-black text-white border-black shadow-sm' 
                    : 'bg-ui-bg-card text-ui-text-secondary border border-ui-border hover:bg-ui-bg-main'
                }`}
              >
                전체
              </button>
              {Object.keys(STATUS_STYLE).map(statusName => {
                const ss = STATUS_STYLE[statusName];
                const isActive = activeFilter === statusName;
                const pillStyle = ss.filterPill || ss.pill;
                return (
                  <button
                    type="button"
                    key={statusName}
                    onClick={() => {
                      setActiveFilter(statusName);
                      setAiFilterActive(false);
                      setSteadyFilterActive(false);
                      setActiveStorylineId(null);
                      setTimeout(() => {
                        const matchedJob = ALL_SIDEBAR_JOBS.find(j => j.status === statusName);
                        if (matchedJob) {
                          const jobId = `job-tl-${matchedJob.year}-${matchedJob.industry}-${encodeURIComponent(matchedJob.title)}`;
                          let el = document.getElementById(jobId);
                          if (!el) {
                            el = document.querySelector(`[data-year="${matchedJob.year}"]`);
                          }
                          if (el) {
                            const yOffset = -(window.innerHeight * 0.4) + 50;
                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }
                      }, 100);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive 
                        ? pillStyle + ' shadow-sm ring-1 ring-ui-border ring-offset-1' 
                        : 'bg-ui-bg-card text-ui-text-secondary border border-ui-border hover:bg-ui-bg-main'
                    }`}
                  >
                    {statusName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Storylines Filter Section */}
        <div className="w-full max-w-5xl px-4 flex flex-col items-center justify-center mb-8 gap-4 z-40 relative">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {STORYLINES.map(story => (
              <button
                key={story.id}
                onClick={() => {
                  if (activeStorylineId === story.id) {
                    setActiveStorylineId(null);
                  } else {
                    setActiveStorylineId(story.id);
                    setActiveFilter(null);
                    setAiFilterActive(false);
                    setSteadyFilterActive(false);
                    setCutoffYear(2050);
                    // Scroll to the first job of the storyline on the page window
                    setTimeout(() => {
                      const firstJob = story.jobs[0];
                      if (firstJob) {
                        const jobId = `job-tl-${firstJob.year}-${firstJob.industry}-${encodeURIComponent(firstJob.title)}`;
                        let el = document.getElementById(jobId);
                        if (!el) {
                          el = document.querySelector(`[data-year="${firstJob.year}"]`);
                        }
                        if (el) {
                          const yOffset = -(window.innerHeight * 0.4) + 50;
                          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }
                    }, 100);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                  activeStorylineId === story.id 
                    ? 'bg-black text-white border-black shadow-sm scale-105' 
                    : 'bg-ui-bg-card text-ui-text-secondary border-ui-border hover:bg-ui-bg-main'
                }`}
              >
                {story.title}
              </button>
            ))}
          </div>
          
          {activeStoryline && (
            <div className="bg-ui-bg-main border border-ui-border p-4 rounded-lg text-center animate-fade-in w-full">
              <p className="text-ui-text-primary font-bold text-sm md:text-base">
                💡 {activeStoryline.insight}
              </p>
            </div>
          )}
        </div>

        <div className="w-full max-w-7xl mx-auto flex gap-0 relative z-10 px-2 md:px-4">
          <div ref={timelineRef} className="flex-1 min-w-0 relative pt-2 z-10">
            
            {/* Storyline Vertical Connection Line Overlay */}
            {storylinePoints.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '100%' }}>
                <polyline
                  points={storylinePoints.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  className="text-ui-text-primary animate-dash"
                />
                {storylinePoints.map((p, i) => (
                  <circle key={`pt-${i}`} cx={p.x} cy={p.y} r="5" fill="currentColor" className="text-ui-text-primary animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </svg>
            )}

          <div className="flex flex-col w-full pb-32 relative pt-2">
            {(DATA as any[]).map((d: any) => {
              const eventsInThisYear = EVENT_LIST.filter(ev => ev.year === d.year);
              const hasEvent = eventsInThisYear.length > 0;

              const hasImportantEvent = eventsInThisYear.some((ev: any) => ev.isImportant);
              let minRowHeight = d.year <= 1960 ? 12 : d.year <= 2024 ? 28 : 56;
              if (hasImportantEvent) {
                minRowHeight = Math.max(minRowHeight, 110);
              } else if (hasEvent) {
                minRowHeight = Math.max(minRowHeight, 55);
              }

              const isSplit2022 = d.year === 2022;
              let rowJobIndex = 0;

              return (
                <React.Fragment key={d.year}>
                  {isSplit2022 && (
                    <div className="grid grid-cols-[55px_repeat(9,minmax(0,1fr))] md:grid-cols-[70px_repeat(9,minmax(0,1fr))] w-full h-[60px] md:h-[80px] relative">
                      <div className="border-r border-ui-border h-full" />
                      {INDUSTRIES.map(ind => (
                        <div key={`split-${ind.id}`} className="border-r border-ui-border h-full" />
                      ))}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-ui-border -translate-y-1/2" />
                      </div>
                      <div className="absolute inset-0 pointer-events-none grid grid-cols-[55px_repeat(9,minmax(0,1fr))] md:grid-cols-[70px_repeat(9,minmax(0,1fr))] items-center">
                        <div className="col-start-5 col-end-8 px-1 flex justify-center items-center">
                          <span className="bg-ui-bg-card w-full text-center z-10 text-ui-text-primary font-bold text-[10px] sm:text-xs md:text-sm border border-ui-border rounded-full py-1.5 shadow-sm truncate">
                            2022년 ChatGPT 등장
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div data-year={d.year} className="grid grid-cols-[55px_repeat(9,minmax(0,1fr))] md:grid-cols-[70px_repeat(9,minmax(0,1fr))] w-full group/row cursor-crosshair">
                    <div className="border-r border-ui-border flex items-start justify-center relative pt-1 md:pt-1.5" style={{ minHeight: `${minRowHeight}px` }}>
                      {/* Short grey tick mark on the right border */}
                      <div className="absolute right-0 top-[12px] md:top-[15px] w-1.5 h-[1px] bg-zinc-400 dark:bg-zinc-600 z-20" />
                      
                      {((d.year >= 1999) || shouldShowYear(d.year)) && (
                        (() => {
                          const isLarge = d.year < 1999 ? shouldShowYear(d.year) : (d.year % 5 === 0);
                          return (
                            <span 
                              className={`z-10 bg-ui-bg-card px-1 whitespace-nowrap leading-none text-zinc-600 dark:text-zinc-400 ${
                                isLarge 
                                  ? "text-[13.5px] md:text-base font-black mt-0.5" 
                                  : "text-[11.5px] md:text-[13px] font-bold mt-[2px]"
                              }`}
                            >
                              {d.year}
                            </span>
                          );
                        })()
                      )}
                    </div>

                    {INDUSTRIES.map(ind => {
                      const val = d[ind.id] as number | null;
                      const bgColor = val ? HEAT_COLORS[String(val)] : 'transparent';
                      const event = eventsInThisYear.find(ev => ev.industry === ind.name);

                      let jobsHere = JOB_MAP[`${ind.name}|${d.year}`] ?? [];
                      if (activeFilter) {
                        jobsHere = jobsHere.filter(j => j.status === activeFilter);
                      }
                      if (aiFilterActive) {
                        jobsHere = jobsHere.filter(j => 
                          AI_REPLACEABLE_JOBS.some(r => r.year === d.year && r.title === j.title && (r.industry === ind.name || ind.name.startsWith(r.industry)))
                        );
                      }
                      if (steadyFilterActive) {
                        jobsHere = jobsHere.filter(j => 
                          STEADY_SELLER_JOBS.some(r => r.year === d.year && r.title === j.title && (r.industry === ind.name || ind.name.startsWith(r.industry)))
                        );
                      }
                      const showJobs = d.year <= cutoffYear && jobsHere.length > 0;

                      return (
                        <div
                          key={`${ind.id}-${d.year}`}
                          className="relative flex flex-col items-stretch border-ui-border border-r p-0.5 md:p-1 gap-7"
                          style={{
                            minHeight: `${minRowHeight}px`,
                            backgroundColor: bgColor,
                          }}
                        >
                          {event && (
                            <div
                              className="relative w-full shrink-0 overflow-hidden rounded-[4px] shadow-sm flex flex-col items-center justify-center p-2 group/event z-20 hover:z-30 hover:scale-[1.15] transition-all duration-300 h-fit bg-[#121212] border border-zinc-800 text-white"
                              style={{
                                minHeight: `${minRowHeight - 8}px`,
                                backgroundColor: '#121212',
                              }}
                            >
                              <div className="relative z-10 text-center w-full py-1">
                                <span className="block text-brand-main text-[8px] md:text-[9px] font-bold tracking-tighter mb-0.5">
                                  {event.year}
                                </span>
                                <h3 className="text-white text-[8.5px] md:text-[10px] font-extrabold leading-[1.2] whitespace-normal break-words px-0.5">
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
                                
                                const storyMatch = activeStoryline?.jobs.find(
                                  sj => sj.year === d.year && sj.industry === ind.name && sj.title === j.title
                                );
                                const isHighlighted = !!storyMatch;
                                
                                const isStorylineActive = !!activeStorylineId;
                                const dimOpacity = (isStorylineActive && !isHighlighted) ? 'hidden' : 'opacity-100';
                                const highlightStyle = isHighlighted ? 'shadow-md scale-105 z-50' : 'z-20';
                                
                                const chipAnimClass = (activeFilter === null && !isStorylineActive) ? 'animate-chip-enter' : '';
                                const chipAnimStyle = (activeFilter === null && !isStorylineActive) ? { animationDelay: `${currentIndex * 40}ms` } : {};
                                const jobId = `job-tl-${j.year}-${j.industry}-${encodeURIComponent(j.title)}`;
                                
                                return (
                                  <React.Fragment key={ji}>
                                    <div
                                      id={jobId}
                                      className={`relative group/job flex flex-col items-center justify-center gap-1.5 text-[9px] md:text-[10px] px-2 py-2 rounded-[5px] border leading-tight font-semibold whitespace-normal break-words w-full h-fit ${ss.pill} shadow-sm ${chipAnimClass} transition-all duration-300 hover:-translate-y-0.5 ${dimOpacity} ${highlightStyle}`}
                                      style={chipAnimStyle}
                                    >
                                      <span className={`px-1.5 py-[2px] rounded-[3px] text-[6px] md:text-[7px] font-black shrink-0 shadow-sm leading-none flex items-center justify-center whitespace-nowrap ${ss.badge}`}>
                                        {j.status}
                                      </span>
                                      <span className="leading-snug break-words min-w-0 text-center whitespace-normal">{j.title}</span>
                                    </div>
                                    {isHighlighted && (
                                      <div 
                                        className={`bg-[#727272] text-white text-[6px] md:text-[8px] p-2 md:p-2.5 rounded-md w-full text-center z-40 shadow-md pointer-events-none mb-4 -mt-0.5 ${chipAnimClass}`}
                                        style={chipAnimStyle}
                                      >
                                        <span className="font-medium whitespace-normal break-keep leading-tight">{storyMatch.desc}</span>
                                      </div>
                                    )}
                                  </React.Fragment>
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

    {/* Back to top Button */}
    {showBackToTop && (
      <button
        onClick={() => {
          const section = document.getElementById('timeline');
          if (section) {
            const y = section.getBoundingClientRect().top + window.pageYOffset - 64;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }}
        className="fixed bottom-[12px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-4 py-2.5 text-white text-xs font-bold leading-none shadow-lg tracking-wider transition-all duration-200 hover:opacity-90 cursor-pointer"
        style={{ backgroundColor: "#121212", borderRadius: "1000px" }}
      >
        <ArrowUp className="w-3.5 h-3.5" />
        <span>Back to top</span>
      </button>
    )}

    </div>
  );
};

export default Heatmap;
