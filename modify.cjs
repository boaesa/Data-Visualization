const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = {
  'text-xs': 'text-[12px]',
  'text-sm': 'text-[16px]',
  'text-base': 'text-[16px]',
  'text-lg': 'text-[20px]',
  'text-xl': 'text-[20px]',
  'text-2xl': 'text-[24px]',
  'text-3xl': 'text-[32px]',
  'text-4xl': 'text-[36px]',
  'text-5xl': 'text-[48px]',
  'text-6xl': 'text-[60px]',
  'text-7xl': 'text-[72px]',
};

for (const [key, val] of Object.entries(replacements)) {
  const regex = new RegExp(`\\b${key}\\b`, 'g');
  content = content.replace(regex, val);
}

fs.writeFileSync('src/App.tsx', content);
console.log("Replaced fonts!");
