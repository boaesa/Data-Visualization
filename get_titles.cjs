const fs = require('fs');

function processJobs() {
  const content = fs.readFileSync('./src/components/Heatmap.tsx', 'utf-8');
  const match = content.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
  if (!match) return;
  
  let jobsListStr = match[1];
  let jobs = eval(`(${jobsListStr})`);
  
  let titles = Array.from(new Set(jobs.map(j => j.title)));
  fs.writeFileSync('titles.txt', titles.join('\n'));
}

processJobs();
