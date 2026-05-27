const fs = require('fs');

function processJobs() {
  const content = fs.readFileSync('/app/applet/src/components/Heatmap.tsx', 'utf-8');
  const match = content.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
  if (!match) return;
  
  let jobsListStr = match[1];
  let jobs = eval(`(${jobsListStr})`);
  
  // Grouping similar jobs
  const groups = [
    { target: '프로 스포츠 선수', keywords: ['프로축구 선수', '야구선수', '농구선수', '배구선수', '프로야구 선수', '프로배구 선수', '프로농구 선수'], exception: '' },
    { target: 'AI 모델 엔지니어', keywords: ['MLOps 엔지니어', '프롬프트 엔지니어', 'LLM 파인튜닝 엔지니어', 'AI 모델 최적화 엔지니어', 'AI 환각 테스트 엔지니어', '에이전트 개발자', 'AI 서비스 기획자', '생성 AI 프롬프트 디자이너'], exception: '' },
    { target: '기본 사무/데이터 관리자', keywords: ['데이터 관리자 (DBA)', '데이터베이스 관리자', 'ERP/SAP 관리자', '사내 시스템 운영자', '단순 데이터 입력원', '사무용 소프트웨어 강사'], exception: '' },
    { target: '전통적 콜센터/안내원', keywords: ['전화교환원', '주차 정산원', '톨게이트 수납원', '아날로그 사진 인화원', '비디오 대여점 점원', '서적 외판원'], exception: '' },
    { target: '창구 은행원', keywords: ['은행 텔러', '창구 은행원'], exception: '' },
    { target: '스마트 물류/배송 기사', keywords: ['택배 기사', '배달 대행 기사', '라스트마일 최적화 엔지니어', '물류 창고 작업자', '공유 킥보드 운영자', '카셰어링 운영자'], exception: '' }
  ];
  
  let newJobsMap = new Map();
  
  for (let job of jobs) {
    if (job.title === '통역가' || job.title === '번역가' || job.title === 'K-pop 트레이너' || job.title === '오토바이 배달원' || job.title === 'AI 윤리 책임자') {
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
  
  const finalJobs = Array.from(newJobsMap.values());
  const finalJobsStr = '[\n  ' + finalJobs.map(j => `{ industry: '${j.industry}', year: ${j.year}, title: '${j.title}', status: '${j.status}' }`).join(',\n  ') + '\n]';
  
  const newContent = content.replace(/export const RAW_JOBS = \[[\s\S]+?\];/, `export const RAW_JOBS = ${finalJobsStr};`);
  fs.writeFileSync('/app/applet/src/components/Heatmap.tsx', newContent);
  console.log("SUCCESS. New jobs count: " + finalJobs.length);
}

processJobs();
