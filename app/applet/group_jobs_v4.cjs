const fs = require('fs');

function processJobs() {
  const content = fs.readFileSync('./src/components/Heatmap.tsx', 'utf-8');
  const match = content.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
  if (!match) return;
  
  let jobsListStr = match[1];
  let jobs = eval(`(${jobsListStr})`);
  
  let newJobsMap = new Map();
  
  // Arts / Sports heavily targeted
  for (let job of jobs) {
    if (job.industry === '예술, 스포츠 및 여가관련 서비스업') {
      if (job.title.includes('K-pop') || job.title.includes('통역') || job.title.includes('프로게이머')) {
        // keep
      } else if (/(선수|야구|축구|농구|배구|스포츠|코치|감독)/.test(job.title)) {
        job.title = '프로 스포츠·e스포츠';
      } else if (/(크리에이터|유튜버|스트리머|UCC)/.test(job.title)) {
        job.title = '미디어/콘텐츠 크리에이터';
      } else if (/(작가|PD|디자이너|감독|일러스트레이터|아티스트)/.test(job.title)) {
        job.title = '미디어 콘텐츠 기획·창작자';
      }
    }
  }

  // General combinations
  for (let job of jobs) {
    // Combine similar ones strictly
    const key = `${job.industry}|${job.year}|${job.status}|${job.title}`;
    if (!newJobsMap.has(key)) {
      newJobsMap.set(key, job);
    }
  }

  // Limit max 2 per (industry, year, status) to avoid overflow
  let finalJobs = [];
  let bucketCounts = {};
  for (let job of newJobsMap.values()) {
    const bucket = `${job.industry}|${job.year}|${job.status}`;
    if (!bucketCounts[bucket]) bucketCounts[bucket] = 0;
    
    // Always keep importance
    if (job.title.includes('통역') || job.title.includes('K-pop') || job.title.includes('에이전트') || job.title.includes('윤리')) {
      finalJobs.push(job);
      continue;
    }

    if (bucketCounts[bucket] < 3) {
      finalJobs.push(job);
      bucketCounts[bucket]++;
    }
  }
  
  const finalJobsStr = '[\n  ' + finalJobs.map(j => `{ industry: '${j.industry}', year: ${j.year}, title: '${j.title}', status: '${j.status}' }`).join(',\n  ') + '\n]';
  const newContent = content.replace(/export const RAW_JOBS = \[[\s\S]+?\];/, `export const RAW_JOBS = ${finalJobsStr};`);
  fs.writeFileSync('./src/components/Heatmap.tsx', newContent);
  console.log("SUCCESS. Final jobs: " + finalJobs.length);
}

processJobs();
