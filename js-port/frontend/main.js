const output = document.getElementById('output');

async function postJson(endpoint, payload) {
  output.textContent = `Calling ${endpoint}...`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  output.textContent = JSON.stringify(data, null, 2);
}

document.getElementById('convertButton').addEventListener('click', async () => {
  const pythonCode = document.getElementById('pythonCode').value;
  if (!pythonCode.trim()) {
    output.textContent = 'pythonCode is required.';
    return;
  }
  await postJson('/api/convert', { pythonCode });
});

document.getElementById('migrateButton').addEventListener('click', async () => {
  const sourceDir = document.getElementById('sourceDir').value.trim();
  const outputDir = document.getElementById('outputDir').value.trim();
  if (!sourceDir || !outputDir) {
    output.textContent = 'sourceDir and outputDir are required.';
    return;
  }
  await postJson('/api/migrate', { sourceDir, outputDir });
});
