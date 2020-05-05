/* eslint-disable */
// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, globalShortcut, ipcMain } = require('electron');
const url = require('url');

const path = require('path');

let mainWindow = null;
let windows = [];

function createWindow () {
  const { height, width } = screen.getPrimaryDisplay().size;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    frame: false,
    transparent: true,
    movable: false,
    skipTaskbar: true,
    backgroundColor: '#00000000',
    show: false,
  });

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL(process.env.ELECTRON_START_URL || url.Format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.removeMenu();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.on('ready', () => {
  globalShortcut.register('F10', () => {
    windows = BrowserWindow.getAllWindows();
    if (mainWindow.isVisible()) {
      windows.forEach(win => {
        win.hide();
      });
    } else {
      windows.forEach(win => {
        win.show();
      });
    }
  });
  globalShortcut.register('F12', () => {
    mainWindow.webContents.openDevTools()
  });
});

ipcMain.handle('open-link', (event, url) => {
  const win = new BrowserWindow({
    alwaysOnTop: true,
  });

  win.loadURL(url);
  windows.push(win);
})