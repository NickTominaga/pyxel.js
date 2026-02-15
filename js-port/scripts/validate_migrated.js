const path = require('node:path');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..', 'migrated');

function findJsFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findJsFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

function parseError(stderr) {
  const lines = stderr.trim().split('\n').filter(Boolean);
  const head = lines[0] || 'syntax error';
  const m = head.match(/^(.*\.js):(\d+)/);
  if (!m) {
    return { head, lineNumber: null, lineText: null };
  }
  const file = m[1];
  const lineNumber = Number(m[2]);
  let lineText = null;
  try {
    const sourceLines = fs.readFileSync(file, 'utf8').split('\n');
    lineText = sourceLines[lineNumber - 1] || null;
  } catch (_error) {
    lineText = null;
  }
  return { head, lineNumber, lineText };
}

const files = findJsFiles(root);
const failures = [];

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    const parsed = parseError(result.stderr);
    failures.push({
      file,
      stderr: parsed.head,
      lineNumber: parsed.lineNumber,
      lineText: parsed.lineText
    });
  }
}

const report = {
  total: files.length,
  passed: files.length - failures.length,
  failed: failures.length,
  failures
};

const reportPath = path.join(root, 'SYNTAX_REPORT.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`Checked ${report.total} files; passed=${report.passed}; failed=${report.failed}`);
console.log(`Wrote ${reportPath}`);
if (failures.length) {
  console.log('Top failures:');
  for (const item of failures.slice(0, 10)) {
    const lineInfo = item.lineNumber ? `:${item.lineNumber}` : '';
    console.log(`- ${item.file}${lineInfo}: ${item.lineText || item.stderr}`);
  }
}
