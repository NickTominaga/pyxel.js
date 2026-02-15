const fs = require('node:fs');
const path = require('node:path');

function findPythonFiles(rootDir) {
  const results = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === '__pycache__' || entry.name.startsWith('.')) {
          continue;
        }
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.py')) {
        results.push(fullPath);
      }
    }
  }

  walk(rootDir);
  return results;
}

function countIndent(line) {
  const m = line.match(/^(\s*)/);
  return m ? m[1].length : 0;
}

function toCamelCase(name) {
  return name.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function normalizeExpr(expr) {
  return expr.replace(/\bself\./g, 'this.');
}

function normalizeArgs(args) {
  return args
    .split(',')
    .map((arg) => arg.trim().split('=')[0].trim())
    .filter(Boolean)
    .filter((arg) => arg !== 'self')
    .join(', ');
}

function convertLine(trimmed, context) {
  if (trimmed.startsWith('#')) {
    return { line: `//${trimmed.slice(1)}` };
  }

  if (/^import\s+/.test(trimmed) || /^from\s+.+\s+import\s+/.test(trimmed)) {
    return { line: `// TODO(import): ${trimmed}` };
  }

  const classMatch = trimmed.match(/^class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(\(.*\))?:\s*$/);
  if (classMatch) {
    return { line: `class ${classMatch[1]} {`, opensBlock: true, entersClass: true };
  }

  const fnMatch = trimmed.match(/^def\s+([A-Za-z_][A-Za-z0-9_]*)\((.*)\):\s*$/);
  if (fnMatch) {
    const rawName = fnMatch[1];
    const args = normalizeArgs(fnMatch[2]);
    if (context.inClass) {
      if (rawName === '__init__') {
        return { line: `constructor(${args}) {`, opensBlock: true };
      }
      return { line: `${toCamelCase(rawName)}(${args}) {`, opensBlock: true };
    }
    return { line: `function ${toCamelCase(rawName)}(${args}) {`, opensBlock: true };
  }

  if (trimmed === 'pass') {
    return { line: '// pass' };
  }

  if (trimmed === 'else:') {
    return { line: 'else {', opensBlock: true };
  }

  const elifMatch = trimmed.match(/^elif\s+(.+):$/);
  if (elifMatch) {
    return { line: `else if (${normalizeExpr(elifMatch[1])}) {`, opensBlock: true };
  }

  const ifMatch = trimmed.match(/^if\s+(.+):$/);
  if (ifMatch) {
    return { line: `if (${normalizeExpr(ifMatch[1])}) {`, opensBlock: true };
  }

  const whileMatch = trimmed.match(/^while\s+(.+):$/);
  if (whileMatch) {
    return { line: `while (${normalizeExpr(whileMatch[1])}) {`, opensBlock: true };
  }

  const forMatch = trimmed.match(/^for\s+(.+)\s+in\s+(.+):$/);
  if (forMatch) {
    return { line: `for (const ${forMatch[1]} of ${normalizeExpr(forMatch[2])}) {`, opensBlock: true };
  }

  const returnMatch = trimmed.match(/^return\b(.*)$/);
  if (returnMatch) {
    return { line: `return${normalizeExpr(returnMatch[1])};` };
  }

  const assignMatch = trimmed.match(/^([A-Za-z_][A-Za-z0-9_\.]*)\s*=\s*(.+)$/);
  if (assignMatch) {
    const rawLeft = assignMatch[1].replace(/^self\./, 'this.');
    const right = normalizeExpr(assignMatch[2]);
    const declaration = rawLeft.includes('.') ? '' : 'let ';
    return { line: `${declaration}${rawLeft} = ${right};` };
  }

  return { line: `${normalizeExpr(trimmed)};` };
}

function convertPythonToJs(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  const blocks = [{ indent: 0, type: 'root' }];

  for (const originalLine of lines) {
    const indent = countIndent(originalLine);
    const trimmed = originalLine.trim();

    if (!trimmed) {
      out.push('');
      continue;
    }

    while (blocks.length > 1 && indent < blocks[blocks.length - 1].indent) {
      blocks.pop();
      out.push(' '.repeat(blocks[blocks.length - 1].indent) + '}');
    }

    const context = { inClass: blocks.some((b) => b.type === 'class') };
    const converted = convertLine(trimmed, context);
    out.push(' '.repeat(indent) + converted.line);

    if (converted.opensBlock) {
      const type = converted.entersClass ? 'class' : 'block';
      blocks.push({ indent: indent + 4, type });
    }
  }

  while (blocks.length > 1) {
    blocks.pop();
    out.push(' '.repeat(blocks[blocks.length - 1].indent) + '}');
  }

  return out.join('\n');
}

function migratePythonTree({ sourceDir, outputDir }) {
  const files = findPythonFiles(sourceDir);
  const summary = [];

  for (const filePath of files) {
    const rel = path.relative(sourceDir, filePath);
    const outPath = path.join(outputDir, rel.replace(/\.py$/i, '.js'));
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    const src = fs.readFileSync(filePath, 'utf8');
    const converted = convertPythonToJs(src);
    const header = `// Auto-generated from ${rel}\n// NOTE: Manual review required for runtime parity.\n\n`;
    fs.writeFileSync(outPath, header + converted, 'utf8');

    summary.push({ source: filePath, output: outPath });
  }

  return { sourceDir, outputDir, count: summary.length, files: summary };
}

module.exports = {
  convertPythonToJs,
  migratePythonTree,
  findPythonFiles
};
