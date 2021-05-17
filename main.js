const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1080,
    minWidth: 720,
    height: 840,
    minHeight: 720,
    title: 'JustNote',
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, '/dist/JustNote/assets/logo.png'),
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/dist/JustNote/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  mainWindow.removeMenu();

  // Event when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (mainWindow === null) {
    createWindow();
  }
});
