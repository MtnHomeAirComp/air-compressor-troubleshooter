const fs = require('fs');
const path = require('path');

console.log('🔍 Starting build tests...\n');

// Test 1: Validate JSON
console.log('Test 1: Validating troubleshooting.logic.json...');
try {
  const logic = JSON.parse(fs.readFileSync('./troubleshooting.logic.json', 'utf8'));
  
  // Check required fields
  if (!logic.meta) throw new Error('Missing meta field');
  if (!logic.meta.system) throw new Error('Missing meta.system');
  if (!logic.meta.version) throw new Error('Missing meta.version');
  if (!logic.problems || !Array.isArray(logic.problems)) throw new Error('Missing or invalid problems array');
  
  // Validate structure
  logic.problems.forEach((problem, idx) => {
    if (!problem.id) throw new Error(`Problem ${idx}: missing id`);
    if (!problem.title) throw new Error(`Problem ${idx}: missing title`);
    if (!Array.isArray(problem.steps)) throw new Error(`Problem ${idx}: missing steps array`);
    
    problem.steps.forEach((step, stepIdx) => {
      if (!step.id) throw new Error(`Problem ${idx} Step ${stepIdx}: missing id`);
      if (!step.question) throw new Error(`Problem ${idx} Step ${stepIdx}: missing question`);
      if (!step.yes) throw new Error(`Problem ${idx} Step ${stepIdx}: missing yes branch`);
      if (!step.no) throw new Error(`Problem ${idx} Step ${stepIdx}: missing no branch`);
    });
  });
  
  console.log(`  ✓ JSON is valid`);
  console.log(`  ✓ Found ${logic.problems.length} troubleshooting scenarios`);
  console.log(`  ✓ Metadata: ${logic.meta.system} v${logic.meta.version}`);
} catch (e) {
  console.log(`  ✗ Error: ${e.message}`);
  process.exit(1);
}

// Test 2: Check JSX files exist and are readable
console.log('\nTest 2: Checking JSX files...');
const jsxFiles = ['react.jsx', 'Troubleshooter.jsx'];
jsxFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('React')) throw new Error('Missing React import');
    if (!content.includes('export')) throw new Error('Missing export');
    console.log(`  ✓ ${file} is valid (${content.split('\n').length} lines)`);
  } catch (e) {
    console.log(`  ✗ ${file}: ${e.message}`);
    process.exit(1);
  }
});

// Test 3: Check README
console.log('\nTest 3: Checking documentation...');
try {
  const readme = fs.readFileSync('./README.md', 'utf8');
  if (!readme.includes('air-compressor-troubleshooting')) throw new Error('Missing title');
  console.log(`  ✓ README.md exists and contains documentation`);
} catch (e) {
  console.log(`  ✗ README.md: ${e.message}`);
  process.exit(1);
}

console.log('\n✅ All tests passed! Build is ready.\n');
