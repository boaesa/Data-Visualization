const fs = require('fs');

function processJobs() {
  const content = fs.readFileSync('./src/components/Heatmap.tsx', 'utf-8');
  const match = content.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
  if (!match) return;
  
  let jobsListStr = match[1];
  let jobs = eval(`(${jobsListStr})`);
  
  // Grouping similar jobs
  const groups = [
    { target: '프로 스포츠 선수', keywords: ['프로축구 선수', '야구선수', '농구선수', '배구선수', '프로야구 선수', '프로배구 선수', '프로농구 선수', 'e스포츠 선수'] },
    { target: 'AI 모델 엔지니어', keywords: ['MLOps 엔지니어', '프롬프트 엔지니어', 'LLM 파인튜닝 엔지니어', 'AI 모델 최적화 엔지니어', 'AI 환각 테스트 엔지니어', '에이전트 개발자', 'AI 서비스 기획자', '생성 AI 프롬프트 디자이너'] },
    { target: '사무·데이터 관리자', keywords: ['데이터 관리자 (DBA)', '데이터베이스 관리자', 'ERP/SAP 관리자', '사내 시스템 운영자', '단순 데이터 입력원', '사무용 소프트웨어 강사'] },
    { target: '안내 서비스 종사자', keywords: ['전화교환원', '주차 정산원', '톨게이트 수납원', '아날로그 사진 인화원', '비디오 대여점 점원', '서적 외판원', '버스 안내양', '매표소 직원'] },
    { target: '창구 은행원', keywords: ['은행 텔러', '창구 은행원', '단순 은행 창구원'] },
    { target: '운송·물류 노동자', keywords: ['택배 기사', '배달 대행 기사', '라스트마일 최적화 엔지니어', '물류 창고 작업자', '공유 킥보드 운영자', '카셰어링 운영자', '화물 트럭 기사', '대리운전 기사'] },
    { target: '현장 생산직', keywords: ['제조업 생산직', '섬유 공장 노동자', '수작업 조립원', '플라스틱 사출원'] },
    { target: '미디어 크리에이터', keywords: ['콘텐츠 크리에이터', '유튜버/스트리머', '버추얼 유튜버(VTuber)', '메타버스 아바타 디자이너', '메타버스 공간 디자이너'] },
    { target: '스마트 기술 인프라 엔지니어', keywords: ['스마트홈 설치 기사', '스마트시티 인프라 관리자', '스마트 빌딩 에너지 관리자'] }
  ];
  
  let newJobsMap = new Map();
  
  for (let job of jobs) {
    if (job.title.includes('통역가') || job.title.includes('번역가') || job.title.includes('트레이너') || job.title.includes('K-pop') || job.title.includes('AI 윤리')) {
      // Keep as-is
    } else {
      for (const g of groups) {
        if (g.keywords.includes(job.title) || job.title.includes(g.keywords[0])) {
          job.title = g.target;
        }
      }
    }
    
    // De-duplicate year-status-industry-title
    const key = `${job.industry}|${job.year}|${job.status}|${job.title}`;
    newJobsMap.set(key, job);
  }
  
  // also sort by year, then group
  const finalJobs = Array.from(newJobsMap.values());
  const finalJobsStr = '[\n  ' + finalJobs.map(j => `{ industry: '${j.industry}', year: ${j.year}, title: '${j.title}', status: '${j.status}' }`).join(',\n  ') + '\n]';
  
  const newContent = content.replace(/export const RAW_JOBS = \[[\s\S]+?\];/, `export const RAW_JOBS = ${finalJobsStr};`);
  fs.writeFileSync('./src/components/Heatmap.tsx', newContent);
  console.log("SUCCESS. New jobs count: " + finalJobs.length);
}

processJobs();
