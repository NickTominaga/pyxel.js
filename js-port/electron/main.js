const path = require('node:path');
const { app, BrowserWindow } = require('electron');
const { spawn } = require('node:child_process');

let backendProcess;

function startBackend() {
  const backendPath = path.join(__dirname, '../backend/server.js');
  backendProcess = spawn(process.execPath, [backendPath], {
    stdio: 'inherit'
  });
}

async function waitForBackend(maxRetries = 30) {
  for (let i = 0; i < maxRetries; i += 1) {
    try {
      const res = await fetch('http://localhost:8787/api/health');
      if (res.ok) {
        return;
      }
    } catch (_error) {
      // continue retry
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error('Backend did not start in time.');
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.loadURL('http://localhost:8787');
}

app.whenReady().then(async () => {
  startBackend();
  await waitForBackend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill('SIGTERM');
  }
});
