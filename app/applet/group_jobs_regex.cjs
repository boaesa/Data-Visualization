const fs = require('fs');

function processJobs() {
  const content = fs.readFileSync('./src/components/Heatmap.tsx', 'utf-8');
  const match = content.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
  if (!match) return;
  
  let jobsListStr = match[1];
  let jobs = eval(`(${jobsListStr})`);
  
  const rules = [
    { target: '프로 스포츠 선수', match: /(축구|야구|농구|배구)선수|스포츠 선수|프로게이머|e스포츠/ },
    { target: 'AI 모델 엔지니어', match: /(MLOps|프롬프트|LLM|AI 모델|생성 AI|에이전트 개발자)/ },
    { target: '커머스/쇼핑 관리자', match: /(이커머스 운영자|퍼스널 쇼퍼|데이터 기반 MD|새벽배송 MD|홈쇼핑 MD|가격비교 사이트|크로스보더 셀러|당근마켓 판매자|쇼핑 라이브|쇼호스트)/ },
    { target: '전통적 안내/접객원', match: /(전화교환원|주차 정산원|요금소|하이패스|안내양|비디오 대여점|외판원|매표소|접객수탁원)/ },
    { target: '운송/배송 기사', match: /(택배|배달|라스트마일|배송 기사|라이더|셔틀버스|관광 버스|트럭 기사|플랫폼 노동자|지게꾼|인력거꾼)/ },
    { target: '물류/창고 작업자', match: /(하역|물류 센터|포장 직원|창고 작업|해운 물류)/ },
    { target: '단순 사무/데이터원', match: /(단순 데이터|입력원|전산원|펀치카드|타자수)/ },
    { target: '전통 의학/보조원', match: /(임상병리사|치기공사|방사선사|원무 행정직|의료관광|병원 코디)/ },
    { target: '스마트 기술 인프라 매니저', match: /(스마트홈|스마트시티|스마트 빌딩|스마트팩토리)/ },
    { target: '유튜버/크리에이터', match: /(콘텐츠 크리에이터|유튜버|스트리머|VTuber|UCC|숏폼|팟캐스트|인플루언서|버추얼)/ },
    { target: '메타버스 디자이너', match: /(메타버스 아바타|메타버스 공간|메타버스 디자이너|VR 콘텐츠|XR 경험|홀로그램)/ },
    { target: '반도체/전자 엔지니어', match: /(DRAM|HBM|OLED|반도체|디스플레이|배터리|2차전지)/ },
    { target: '전통 제조 조립원', match: /(섬유|방직|단조|조립 생산지|조립원|신발 제조|가발 제조|제사공)/ },
    { target: '기후/환경 전문가', match: /(기후|탄소|생태계|환경 영향|녹색성장|미세먼지)/ },
    { target: '로봇 전문가', match: /(로봇|자동화 설비)/ },
    { target: '우주/항공 전문가', match: /(우주|항공기 조종사|도심항공|UAM|위성)/ }
  ];
  
  let newJobsMap = new Map();
  
  for (let job of jobs) {
    if (job.title.includes('통역') || job.title.includes('번역') || job.title.includes('K-pop') || job.title.includes('AI 윤리') || job.title.includes('의사') || job.title.includes('간호사')) {
      // Keep as-is
    } else {
      for (const rule of rules) {
        if (rule.match.test(job.title)) {
          job.title = rule.target;
          break; // Stop at first match
        }
      }
    }
    
    const key = `${job.industry}|${job.year}|${job.status}|${job.title}`;
    newJobsMap.set(key, job);
  }
  
  const finalJobs = Array.from(newJobsMap.values());
  const finalJobsStr = '[\n  ' + finalJobs.map(j => `{ industry: '${j.industry}', year: ${j.year}, title: '${j.title}', status: '${j.status}' }`).join(',\n  ') + '\n]';
  
  const newContent = content.replace(/export const RAW_JOBS = \[[\s\S]+?\];/, `export const RAW_JOBS = ${finalJobsStr};`);
  fs.writeFileSync('./src/components/Heatmap.tsx', newContent);
  console.log("SUCCESS. New jobs count: " + finalJobs.length);
}

processJobs();
