const fs = require('fs');
const files = ['/app/applet/src/App.tsx', '/app/applet/src/components/Heatmap.tsx'];

function replaceColors(content) {
    // Basic backgrounds
    content = content.replace(/bg-white\/[0-9]+/g, 'bg-ui-bg-card/90');
    content = content.replace(/bg-white/g, 'bg-ui-bg-card');
    content = content.replace(/bg-\[\#FAFAFA\]|bg-\[\#FFF8F8\]|bg-slate-50\/50/g, 'bg-ui-bg-main');
    content = content.replace(/bg-slate-50|bg-slate-100|bg-slate-200|bg-slate-800|bg-slate-900\/50|bg-slate-900/g, 'bg-ui-bg-card');
    content = content.replace(/bg-gray-50/g, 'bg-ui-bg-card');
    
    // Text colors
    content = content.replace(/text-slate-900|text-slate-800|text-slate-100|text-gray-900/g, 'text-ui-text-primary');
    content = content.replace(/text-slate-700|text-slate-600|text-slate-500|text-slate-400|text-slate-300|text-gray-600|text-gray-500/g, 'text-ui-text-secondary');
    
    // Border colors
    content = content.replace(/border-slate-100|border-slate-200|border-slate-300|border-gray-100|border-slate-700|border-slate-800/g, 'border-ui-border');
    content = content.replace(/border-white\/10|border-indigo-500\/30|border-red-100|border-indigo-100/g, 'border-ui-border');
    
    // Semantic Colors in Heatmap (STATUS_STYLE)
    content = content.replace(/bg-emerald-100 text-emerald-700 border-emerald-300/g, 'bg-transparent text-brand-appearance border-brand-appearance');
    content = content.replace(/bg-ui-bg-card\/90 text-emerald-700/g, 'bg-ui-bg-card/80 text-brand-appearance');
    
    content = content.replace(/bg-green-500 text-ui-text-primary border-green-600/g, 'bg-transparent text-brand-spread border-brand-spread');
    content = content.replace(/bg-ui-bg-card\/90 text-ui-text-primary/g, 'bg-ui-bg-card/80 text-brand-spread');

    content = content.replace(/bg-blue-100 text-blue-700 border-blue-300/g, 'bg-transparent text-brand-threat border-brand-threat');
    content = content.replace(/bg-ui-bg-card\/90 text-blue-700/g, 'bg-ui-bg-card/80 text-brand-threat');

    content = content.replace(/bg-ui-bg-card text-ui-text-primary border-ui-border/g, 'bg-transparent text-brand-extinction border-brand-extinction');
    content = content.replace(/bg-ui-bg-card\/90 text-ui-text-primary/g, 'bg-ui-bg-card/80 text-brand-extinction');

    return content;
}

for (const file of files) {
  if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf-8');
      content = replaceColors(content);
      fs.writeFileSync(file, content);
      console.log(`Processed ${file}`);
  }
}
