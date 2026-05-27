const fs = require('fs');

function processJobs() {
  const content = fs.readFileSync('./src/components/Heatmap.tsx', 'utf-8');
  const match = content.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
  if (!match) return;
  
  let jobsListStr = match[1];
  let jobs = eval(`(${jobsListStr})`);
  
  // Aggressive Mapping rules
  const rules = [
    // Sports / Arts
    { match: /(축구|야구|농구|배구|스포츠|선수|게이머|트레이너|코치|감독)/, target: '프로 스포츠·e스포츠' },
    { match: /(배달|택배|물류|배송|하역|지게꾼|인력거꾼|운전|기사|트럭)/, target: '운송/배송/물류' },
    { match: /(교사|강사|교육|입시|튜터|학습지)/, target: '교육/학습 전문가' },
    { match: /(의사|간호사|병리사|치료사|보건|의료|원무|약사)/, target: '의료/보건 인력' },
    { match: /(크리에이터|유튜버|스트리머|방송|BJ|팟캐스트)/, target: '미디어 크리에이터' },
    { match: /(은행|텔러|금융|세무|보험|회계)/, target: '금융/사무/회계원' },
    { match: /(전화|교환원|접수|매표소|접객|주차|안내)/, target: '단순 안내/접객 서비스' },
    { match: /(비디오|대여점|서적|사진|인쇄|출판)/, target: '아날로그 미디어 서비스' },
    { match: /(데이터 관리|DBA|ERP|입력원|전산원|펀치카드)/, target: '단순 사무/데이터원' },
    { match: /(기후|탄소|생태계|환경|녹색)/, target: '기후/환경 전문가' },
    { match: /(메타버스|VR|XR|홀로그램)/, target: '가상현실/메타버스 설계' },
    { match: /(반도체|디스플레이|배터리|2차전지)/, target: '첨단 전자/반도체 공정' },
    { match: /(조립|제조|방직|섬유|단조|제사공|사출)/, target: '전통 제조 조립원' },
    { match: /(우주|항공|UAM|도심항공|위성)/, target: '우주/항공 모빌리티' },
    { match: /(스마트|인프라)/, target: '스마트 인프라 관리' },
    { match: /(개발자|소프트웨어|프로그래머)/, target: '소프트웨어 개발' },
    { match: /(노인|돌봄|요양보호사|장례|복지)/, target: '돌봄/복지 서비스' },
    { match: /(프롬프트|LLM|MLOps|AI 모델|AI 서비스|인공지능)/, target: 'AI 모델/서비스 개발' },
    { match: /(AI)/, target: 'AI 활용 전문가' }, // Fallback for various AI jobs
    { match: /(반려동물|수의사|펫)/, target: '반려동물 서비스' }
  ];
  
  let newJobsMap = new Map();
  
  for (let job of jobs) {
    if (job.title.includes('통역') || job.title.includes('번역') || job.title.includes('K-pop') || job.title.includes('윤리') || job.title.includes('무당')) {
      // Keep as-is
    } else {
      for (const rule of rules) {
        if (rule.match.test(job.title)) {
          job.title = rule.target;
          break;
        }
      }
    }
    
    // Group exactly by industry + year + status + NEW TITLE
    const key = `${job.industry}|${job.year}|${job.status}|${job.title}`;
    if (!newJobsMap.has(key)) {
      newJobsMap.set(key, job);
    }
  }
  
  const finalJobs = Array.from(newJobsMap.values());
  const finalJobsStr = '[\n  ' + finalJobs.map(j => `{ industry: '${j.industry}', year: ${j.year}, title: '${j.title}', status: '${j.status}' }`).join(',\n  ') + '\n]';
  
  const newContent = content.replace(/export const RAW_JOBS = \[[\s\S]+?\];/, `export const RAW_JOBS = ${finalJobsStr};`);
  fs.writeFileSync('./src/components/Heatmap.tsx', newContent);
  console.log("SUCCESS. Reduced to new jobs count: " + finalJobs.length);
}

processJobs();
