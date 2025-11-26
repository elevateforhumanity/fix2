const fs = require('fs');
const path = require('path');

// Components with DEFAULT exports
const defaultExports = ['AnalyticsDashboard', 'WIOAComplianceDashboard'];

// Components with NAMED exports  
const namedExports = ['AutoAttritionTracker', 'AutoFlowCharts', 'AutoProgramGenerator', 
  'CopilotAssistant', 'CopilotDeployment', 'ExcelChartGenerator', 
  'IntelligentDataProcessor', 'LearningBarrierAnalyzer'];

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Fix default exports that were changed to named
  defaultExports.forEach(name => {
    const wrongImport = `import { ${name} } from '@/components/admin/${name}'`;
    const correctImport = `import ${name} from '@/components/admin/${name}'`;
    if (content.includes(wrongImport)) {
      content = content.replace(wrongImport, correctImport);
      changed = true;
    }
  });
  
  // Fix named exports that were changed to default
  namedExports.forEach(name => {
    const wrongImport = `import ${name} from '@/components/admin/${name}'`;
    const correctImport = `import { ${name} } from '@/components/admin/${name}'`;
    if (content.includes(wrongImport)) {
      content = content.replace(wrongImport, correctImport);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

// Find all files in app directory
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fixFile(filePath);
    }
  });
}

walkDir('app');
