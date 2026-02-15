const path = require('node:path');
const fs = require('node:fs');
const { migratePythonTree } = require('../backend/pythonToJsConverter');

const projectRoot = path.resolve(__dirname, '..', '..');
const targets = [
  {
    key: 'pyxel-examples',
    sourceDir: path.join(projectRoot, 'python/pyxel/examples'),
    outputDir: path.join(projectRoot, 'js-port/migrated/python/pyxel/examples')
  },
  {
    key: 'pyxel-top-level',
    sourceDir: path.join(projectRoot, 'python/pyxel'),
    outputDir: path.join(projectRoot, 'js-port/migrated/python/pyxel'),
    includeTopLevelOnly: true
  },
  {
    key: 'pyxel-editor',
    sourceDir: path.join(projectRoot, 'python/pyxel/editor'),
    outputDir: path.join(projectRoot, 'js-port/migrated/python/pyxel/editor')
  },
  {
    key: 'wasm-selected',
    sourceDir: path.join(projectRoot, 'wasm'),
    outputDir: path.join(projectRoot, 'js-port/migrated/wasm'),
    includeFiles: ['gamepad.py', 'import_hook.py']
  },
  {
    key: 'wasm-apps',
    sourceDir: path.join(projectRoot, 'wasm'),
    outputDir: path.join(projectRoot, 'js-port/migrated/wasm/apps'),
    includeFiles: ['code-maker/main.py', 'mml-studio/mml_studio.py']
  }
];

function removeDir(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function migrateTopLevelPyFiles(sourceDir, outputDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith('.py')) continue;
    const tempDir = path.join(sourceDir, '..', '.tmp_single_migrate');
    fs.mkdirSync(tempDir, { recursive: true });
    const copied = path.join(tempDir, e.name);
    fs.copyFileSync(path.join(sourceDir, e.name), copied);
    const result = migratePythonTree({ sourceDir: tempDir, outputDir: path.join(outputDir, path.basename(sourceDir)) });
    count += result.count;
    removeDir(tempDir);
  }
  return { count };
}

function migrateExplicitFiles(sourceDir, outputDir, includeFiles) {
  const tempDir = path.join(sourceDir, '.tmp_selected_migrate');
  removeDir(tempDir);
  fs.mkdirSync(tempDir, { recursive: true });
  for (const file of includeFiles) {
    const sourcePath = path.join(sourceDir, file);
    const tempPath = path.join(tempDir, file);
    fs.mkdirSync(path.dirname(tempPath), { recursive: true });
    fs.copyFileSync(sourcePath, tempPath);
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
  for (const target of targets) {
    let result;
    if (target.includeTopLevelOnly) {
      result = migrateTopLevelPyFiles(target.sourceDir, path.dirname(target.outputDir));
    } else if (target.includeFiles) {
      result = migrateExplicitFiles(target.sourceDir, target.outputDir, target.includeFiles);
    } else {
      result = migratePythonTree({ sourceDir: target.sourceDir, outputDir: target.outputDir });
    }
    summary.push({
      key: target.key,
      sourceDir: target.sourceDir,
      outputDir: target.outputDir,
      count: result.count
    });
  }

  const reportPath = path.join(outRoot, 'MIGRATION_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
  console.log(`Wrote ${reportPath}`);
  for (const item of summary) {
    console.log(`- [${item.key}] ${item.sourceDir} -> ${item.outputDir} : ${item.count}`);
  }
}

main();
