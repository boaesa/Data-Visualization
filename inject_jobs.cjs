const fs = require('fs');

const original = fs.readFileSync('src/components/Heatmap.tsx', 'utf-8');
const newJobs = fs.readFileSync('parsed_jobs.cjs', 'utf-8');

const updated = original.replace(/const RAW_JOBS = \[\n([\s\S]*?)\];/, newJobs);

fs.writeFileSync('src/components/Heatmap.tsx', updated, 'utf-8');
console.log('Updated Heatmap.tsx');
