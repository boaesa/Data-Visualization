const fs = require('fs');
const content = fs.readFileSync('src/components/Heatmap.tsx', 'utf-8');
const match = content.match(/export const RAW_JOBS = (\[[\s\S]+?\]);/);
if (match) {
  try {
    const jobs = eval(`(${match[1]})`);
    fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
    console.log("Jobs dumped successfully");
  } catch (e) {
    console.log('Error evaluating:', e);
  }
} else {
  console.log("Failed to find RAW_JOBS");
}
