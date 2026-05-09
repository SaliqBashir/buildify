const fs = require('fs');
const path = require('path');

const files = [
  'app/page.js',
  'app/alternatives/page.js',
  'app/predictor/page.js',
  'app/components/CompanyIntelligenceCard.js',
  'app/components/ContactSupplierModal.js',
  'app/components/SupplierMapView.js'
];

const replacements = [
  { from: /bg-\[#0a0f1a\]/g, to: 'bg-slate-50' },
  { from: /bg-\[#0d1321\]/g, to: 'bg-white' },
  { from: /text-white/g, to: 'text-[#0a2540]' },
  { from: /text-slate-300/g, to: 'text-slate-600' },
  { from: /text-slate-400/g, to: 'text-slate-500' },
  { from: /border-slate-700/g, to: 'border-slate-200' },
  { from: /border-slate-800/g, to: 'border-slate-200' },
  { from: /bg-slate-800\/40/g, to: 'bg-white/40' },
  { from: /bg-slate-900\/20/g, to: 'bg-slate-50/20' },
  { from: /bg-slate-800/g, to: 'bg-slate-100' },
  { from: /bg-slate-900/g, to: 'bg-slate-50' },
  { from: /shadow-2xl/g, to: 'stripe-card-shadow' },
  { from: /shadow-xl/g, to: 'stripe-card-shadow' },
  { from: /text-indigo-400/g, to: 'text-indigo-600' },
  { from: /text-indigo-300/g, to: 'text-indigo-600' },
  { from: /bg-transparent text-white/g, to: 'bg-transparent text-[#0a2540]' },
  { from: /bg-transparent text-\[#0a2540\]/g, to: 'bg-transparent text-[#0a2540]' }, // in case
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(r => {
      content = content.replace(r.from, r.to);
    });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
