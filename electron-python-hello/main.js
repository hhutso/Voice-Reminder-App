// main.js
const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

// Run Python script in background
const python = spawn('python', ['server.py']);

python.stdout.on('data', (data) => {
  console.log(`Python: ${data}`);
});

python.stderr.on('data', (data) => {
  console.error(`Python error: ${data}`);
});

app.whenReady().then(createWindow);
