const fs = require('fs');
const file = 'src/components/Heatmap.tsx';
let content = fs.readFileSync(file, 'utf-8');
content = content.replace(/위협/g, '위험');
fs.writeFileSync(file, content, 'utf-8');
