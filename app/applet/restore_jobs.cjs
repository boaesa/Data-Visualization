const fs = require('fs');

function restoreJobs() {
  const content = fs.readFileSync('./src/components/Heatmap.tsx', 'utf-8');
  const orgJobs = fs.readFileSync('parsed_jobs.cjs', 'utf-8');
  
  // get RAW_JOBS block from orgJobs
  const matchOrg = orgJobs.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
  if (!matchOrg) return console.log("Failed to parse org jobs");
  
  const finalJobsStr = matchOrg[1];
  
  const newContent = content.replace(/export const RAW_JOBS = \[[\s\S]+?\];/, `export const RAW_JOBS = ${finalJobsStr};`);
  
  fs.writeFileSync('./src/components/Heatmap.tsx', newContent);
  console.log("Restored jobs from parsed_jobs.cjs!");
}

restoreJobs();
