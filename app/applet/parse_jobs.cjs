const fs = require('fs');

function processJobs() {
  const content = fs.readFileSync('src/components/Heatmap.tsx', 'utf-8');
  const match = content.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
  
  if (!match) {
    console.log("Failed to find RAW_JOBS");
    return;
  }
  
  let jobsListStr = match[1];
  let jobs;
  try {
    jobs = eval(`(${jobsListStr})`);
  } catch (e) {
    console.log("Evaluating failed", e);
    return;
  }
  
  fs.writeFileSync('jobs_dump.json', JSON.stringify(jobs, null, 2));
  console.log("Extracted " + jobs.length + " jobs");
}

processJobs();
