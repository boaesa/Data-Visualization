const fs = require('fs');
const files = ['./src/App.tsx', './src/components/Heatmap.tsx', './src/components/CAVETest.tsx', './src/components/IndustryTimeline.tsx'];

function replaceColors(content) {
    // Basic backgrounds
    content = content.replace(/bg-white\/[0-9]+/g, 'bg-ui-bg-card/90');
    content = content.replace(/bg-white/g, 'bg-ui-bg-card');
    content = content.replace(/bg-\[\#FAFAFA\]|bg-\[\#FFF8F8\]|bg-slate-50\/50/g, 'bg-ui-bg-main');
    content = content.replace(/bg-slate-50|bg-slate-100|bg-slate-200|bg-slate-800|bg-slate-900\/50|bg-slate-900/g, 'bg-ui-bg-card');
    content = content.replace(/bg-gray-50/g, 'bg-ui-bg-card');
    
    // Background gradients
    content = content.replace(/from-blue-50/g, 'from-ui-bg-card');
    content = content.replace(/from-indigo-900\/50/g, 'from-ui-bg-card');
    content = content.replace(/to-blue-900\/50/g, 'to-ui-bg-main');
    
    // Specific icon bg
    content = content.replace(/bg-blue-100|bg-indigo-50|bg-amber-100|bg-emerald-100|bg-purple-100|bg-rose-50|bg-cyan-50|bg-rose-100|bg-indigo-100|bg-emerald-100|bg-cyan-100|bg-emerald-500\/10|bg-red-500\/10|bg-indigo-500\/20/g, 'bg-ui-bg-card');
    
    // Text colors
    content = content.replace(/text-slate-900|text-slate-800|text-slate-100|text-gray-900/g, 'text-ui-text-primary');
    content = content.replace(/text-slate-700|text-slate-600|text-slate-500|text-slate-400|text-slate-300|text-gray-600|text-gray-500/g, 'text-ui-text-secondary');
    
    // Other specific text colors
    content = content.replace(/text-blue-600|text-blue-500|text-indigo-600|text-rose-500|text-cyan-600|text-amber-600|text-emerald-600|text-\[\#0D92F4\]|text-red-700|text-red-500|text-red-800\/80|text-indigo-500|text-indigo-400|text-emerald-500|text-emerald-400|text-red-400|text-purple-600/g, 'text-brand-main');
    
    // Background brand colors
    content = content.replace(/bg-amber-500|bg-indigo-400|bg-ui-bg-card0/g, 'bg-brand-main');

    // Remove text-brand-main from some elements you want customized later, or just apply text-brand-main broadly where colored.
    // To use all four colors on icons, I will specifically find some icons and color them.
    content = content.replace(/<Target className="w-5 h-5 text-brand-main" \/>/g, '<Target className="w-5 h-5 text-brand-threat" />');
    content = content.replace(/<Network className="w-7 h-7 text-brand-main" \/>/g, '<Network className="w-7 h-7 text-brand-spread" />');
    content = content.replace(/<ShieldCheck className="w-7 h-7 text-brand-main" \/>/g, '<ShieldCheck className="w-7 h-7 text-brand-appearance" />');
    content = content.replace(/<Briefcase className="w-6 h-6 text-brand-main" \/>/g, '<Briefcase className="w-6 h-6 text-brand-threat" />');
    content = content.replace(/<Sparkles className="w-6 h-6 text-brand-main" \/>/g, '<Sparkles className="w-6 h-6 text-brand-extinction" />');
    content = content.replace(/<BrainCircuit className="w-6 h-6 text-brand-main" \/>/g, '<BrainCircuit className="w-6 h-6 text-brand-spread" />');
    content = content.replace(/<Lightbulb className="w-6 h-6 text-brand-main" \/>/g, '<Lightbulb className="w-6 h-6 text-brand-extinction" />');
    content = content.replace(/<Lightbulb className="w-5 h-5 text-ui-text-primary" \/>/g, '<Lightbulb className="w-5 h-5 text-brand-extinction" />');
    
    // Border colors
    content = content.replace(/border-slate-100|border-slate-200|border-slate-300|border-gray-100|border-slate-700|border-slate-800/g, 'border-ui-border');
    content = content.replace(/border-white\/10|border-indigo-500\/30|border-red-100|border-indigo-100/g, 'border-ui-border');
    
    // Semantic Colors in Heatmap (STATUS_STYLE)
    content = content.replace(/bg-emerald-100 text-emerald-700 border-emerald-300/g, 'bg-transparent text-brand-appearance border-brand-appearance');
    content = content.replace(/bg-ui-bg-card\/90 text-emerald-700/g, 'bg-ui-bg-card/80 text-brand-appearance');
    
    content = content.replace(/bg-green-500 text-ui-text-primary border-green-600/g, 'bg-transparent text-brand-spread border-brand-spread');
    content = content.replace(/bg-ui-bg-card\/90 text-ui-text-primary/g, 'bg-ui-bg-card/80 text-brand-spread');

    content = content.replace(/bg-blue-100 text-blue-700 border-blue-300|bg-transparent text-ui-text-primary border-ui-border/g, 'bg-transparent text-brand-threat border-brand-threat');
    content = content.replace(/bg-ui-bg-card\/90 text-blue-700/g, 'bg-ui-bg-card/80 text-brand-threat');

    content = content.replace(/bg-ui-bg-card text-ui-text-primary border-ui-border/g, 'bg-transparent text-brand-extinction border-brand-extinction');
    content = content.replace(/bg-ui-bg-card\/90 text-ui-text-primary/g, 'bg-ui-bg-card/80 text-brand-extinction');
    
    // Filters active tab fix
    content = content.replace(/isActive \? 'bg-ui-bg-card text-ui-text-primary border-ui-border border-b-2' : 'bg-ui-bg-card text-ui-text-secondary border-ui-border hover:bg-ui-bg-card'/g, 'isActive ? "bg-ui-bg-card text-ui-text-primary border-ui-text-primary border-b-2" : "bg-ui-bg-main text-ui-text-secondary border-ui-border hover:bg-ui-bg-card"');
    
    content = content.replace(/isActive \? 'bg-slate-700 text-white border-slate-700 border-b-2' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'/g, 'isActive ? "bg-ui-bg-card text-ui-text-primary border-ui-text-primary border-b-2" : "bg-ui-bg-main text-ui-text-secondary border-ui-border hover:bg-ui-bg-card"');

    // Selection fix in App.tsx
    content = content.replace(/selection:bg-blue-100/g, 'selection:bg-ui-bg-card');

    content = content.replace(/bg-slate-700\/50/g, 'bg-ui-bg-main');
    content = content.replace(/bg-emerald-500/g, 'bg-brand-appearance');
    content = content.replace(/text-emerald-800/g, 'text-brand-appearance');
    content = content.replace(/bg-emerald-50|bg-emerald-100/g, 'bg-brand-appearance/10');
    content = content.replace(/border-emerald-100/g, 'border-brand-appearance/20');
    content = content.replace(/bg-blue-500/g, 'bg-brand-spread');
    content = content.replace(/bg-slate-400/g, 'bg-brand-extinction');
    content = content.replace(/bg-purple-50/g, 'bg-brand-extinction/10');
    content = content.replace(/text-purple-600/g, 'text-brand-extinction');
    content = content.replace(/shadow-\[0_0_0_2px_rgba\(147,51,234,0\.2\)\]/g, 'shadow-[0_0_0_2px_rgba(38,153,246,0.2)]');

    return content;
}

for (const file of files) {
  if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf-8');
      content = replaceColors(content);
      fs.writeFileSync(file, content);
      console.log(`Processed ${file}`);
  } else {
      console.log(`Not found: ${file}`);
  }
}
