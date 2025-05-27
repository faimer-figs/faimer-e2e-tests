const { execSync } = require('child_process');
const fs = require('fs');

const START_MARK = '<!-- TEST-LIST-START -->';
const END_MARK = '<!-- TEST-LIST-END -->';
const README_PATH = 'README.md';

try {
  const testListOutput = execSync('npx playwright test --list', { encoding: 'utf8' });

  const newTests = testListOutput
    .split('\n')
    .filter(testLine => testLine.trim() !== '' && testLine.includes('›'))
    .map(testLine => {
      const lineParts = testLine.split('›');
      const testDescription = lineParts.slice(1).join('›').trim(); // remove browser info
      return testDescription;
    });

  const readme = fs.readFileSync(README_PATH, 'utf8');
  const existingListMatch = readme.match(
    new RegExp(`${START_MARK}([\\s\\S]*?)${END_MARK}`)
  );

  const existingListRaw = existingListMatch ? existingListMatch[1].trim() : '';
  const existingTests = existingListRaw
    .split('\n')
    .map(testLine => testLine.replace(/<li>(.*?)<\/li>/, '$1').trim())
    .filter(Boolean);

  const testsToAdd = newTests.filter(test => !existingTests.includes(test));

  if (testsToAdd.length === 0) {
    process.exit(0);
  }

  const newListItems = testsToAdd.map(test => `  <li>${test}</li>`).join('\n');
  const updatedList = `${existingListRaw}\n${newListItems}`;

  const updatedReadme = readme.replace(
    new RegExp(`${START_MARK}[\\s\\S]*?${END_MARK}`),
    `${START_MARK}\n${updatedList}\n${END_MARK}`
  );

    fs.writeFileSync(README_PATH, updatedReadme);
    const outputPath = process.env.GITHUB_OUTPUT;
    if (outputPath) {
      fs.appendFileSync(outputPath, `readme_updated=true\n`);
    }
    console.log(`✅ Test list updated in README.md.`);
  } catch (error) {
  console.error('❌ Failed to update test list:', error.message);
  process.exit(1);
}
