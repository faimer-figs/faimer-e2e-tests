const fs = require('fs');
const path = require('path');

const START_MARK = '<!-- TEST-LIST-START -->';
const END_MARK = '<!-- TEST-LIST-END -->';
const README_PATH = 'README.md';
const TEST_DIR = './e2e/tests';

function extractTestsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const testPattern = /(?:test|it)\((['"`])(.*?)\1/g;

  const results = [];
  let match;
  while ((match = testPattern.exec(content)) !== null) {
    const testName = match[2];
    const fileName = path.basename(filePath);
    results.push(`${testName} (${fileName})`);
  }
  return results;
}

try {
  const testFiles = fs.readdirSync(TEST_DIR).filter(file => file.endsWith('.spec.ts'));

  const allTests = testFiles.flatMap(file => {
    const fullPath = path.join(TEST_DIR, file);
    return extractTestsFromFile(fullPath);
  });

  const uniqueSortedTests = Array.from(new Set(allTests)).sort();

  const formattedList = [
    START_MARK,
    '<ul>',
    ...uniqueSortedTests.map(test => `  <li>${test}</li>`),
    '</ul>',
    END_MARK,
  ].join('\n');

  const readme = fs.readFileSync(README_PATH, 'utf8');

  if (!readme.includes(START_MARK) || !readme.includes(END_MARK)) {
    throw new Error('README is missing required start/end markers');
  }

  const updatedReadme = readme.replace(
    new RegExp(`${START_MARK}[\\s\\S]*?${END_MARK}`),
    formattedList
  );

  fs.writeFileSync(README_PATH, updatedReadme);

  const outputPath = process.env.GITHUB_OUTPUT;
  if (outputPath) {
    fs.appendFileSync(outputPath, `readme_updated=true\n`);
  }

  console.log('✅ README.md test list successfully updated from source files.');
} catch (error) {
  console.error('❌ Failed to update test list:', error.message);
  process.exit(1);
}
