const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('node:path');
const fs = require('node:fs');
const { migratePythonTree, convertPythonToJs } = require('./pythonToJsConverter');

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/convert', (req, res) => {
  try {
    const { pythonCode } = req.body;
    if (typeof pythonCode !== 'string' || !pythonCode.trim()) {
      res.status(400).json({ error: 'pythonCode is required' });
      return;
    }
    const javascriptCode = convertPythonToJs(pythonCode);
    res.json({ javascriptCode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/migrate', (req, res) => {
  try {
    const { sourceDir, outputDir } = req.body;
    if (!sourceDir || !outputDir) {
      res.status(400).json({ error: 'sourceDir and outputDir are required' });
      return;
    }

    if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
      res.status(400).json({ error: `sourceDir is not a directory: ${sourceDir}` });
      return;
    }

    const result = migratePythonTree({ sourceDir, outputDir });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Pyxel JS REST API listening at http://localhost:${PORT}`);
});
