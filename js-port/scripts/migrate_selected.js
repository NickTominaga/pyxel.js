const path = require('node:path');
const fs = require('node:fs');
const { migratePythonTree } = require('../backend/pythonToJsConverter');

const projectRoot = path.resolve(__dirname, '..', '..');
const targets = [
  {
    sourceDir: path.join(projectRoot, 'python/pyxel/examples'),
    outputDir: path.join(projectRoot, 'js-port/migrated/python/pyxel/examples')
  },
  {
    sourceDir: path.join(projectRoot, 'python/pyxel'),
    outputDir: path.join(projectRoot, 'js-port/migrated/python/pyxel'),
    includeTopLevelOnly: true
  },
  {
    sourceDir: path.join(projectRoot, 'wasm'),
    outputDir: path.join(projectRoot, 'js-port/migrated/wasm'),
    includeFiles: ['gamepad.py', 'import_hook.py']
  }
];

function removeDir(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function migrateTopLevelPyFiles(sourceDir, outputDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  let count = 0;
  const files = [];
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith('.py')) continue;
    const tempSource = path.join(sourceDir, e.name);
    const tempDir = path.join(sourceDir, '..', '.tmp_single_migrate');
    fs.mkdirSync(tempDir, { recursive: true });
    const copied = path.join(tempDir, e.name);
    fs.copyFileSync(tempSource, copied);
    const result = migratePythonTree({ sourceDir: tempDir, outputDir: path.join(outputDir, path.basename(sourceDir)) });
    count += result.count;
    files.push(...result.files);
    removeDir(tempDir);
  }
  return { count, files };
}

function migrateExplicitFiles(sourceDir, outputDir, includeFiles) {
  const tempDir = path.join(sourceDir, '.tmp_selected_migrate');
  removeDir(tempDir);
  fs.mkdirSync(tempDir, { recursive: true });
  for (const f of includeFiles) {
    fs.copyFileSync(path.join(sourceDir, f), path.join(tempDir, f));
  }
  const result = migratePythonTree({ sourceDir: tempDir, outputDir });
  removeDir(tempDir);
  return result;
}

function main() {
  const outRoot = path.join(projectRoot, 'js-port/migrated');
  removeDir(outRoot);
  fs.mkdirSync(outRoot, { recursive: true });

  const summary = [];
  for (const t of targets) {
    let result;
    if (t.includeTopLevelOnly) {
      result = migrateTopLevelPyFiles(t.sourceDir, path.dirname(t.outputDir));
    } else if (t.includeFiles) {
      result = migrateExplicitFiles(t.sourceDir, t.outputDir, t.includeFiles);
    } else {
      result = migratePythonTree({ sourceDir: t.sourceDir, outputDir: t.outputDir });
    }
    summary.push({ sourceDir: t.sourceDir, outputDir: t.outputDir, count: result.count });
  }

  const reportPath = path.join(outRoot, 'MIGRATION_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
  console.log(`Wrote ${reportPath}`);
  for (const item of summary) {
    console.log(`- ${item.sourceDir} -> ${item.outputDir} : ${item.count}`);
  }
}

main();
