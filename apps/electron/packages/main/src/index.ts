import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "node:path";
import { URL } from "node:url";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

autoUpdater.logger = log;

const IS_DEV = process.env.MODE === "development";
const IS_PROD = process.env.MODE === "production";
const VERSION = process.env.VITE_APP_VERSION;

const create_window = async () => {
  const win = new BrowserWindow({
    show: false,
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), "packages/preload/dist/index.cjs"),
    },
  });

  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behaviour with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  win.on("ready-to-show", () => {
    win?.show();

    if (IS_DEV) {
      win?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test.
   */
  const pageUrl =
    IS_DEV && process.env.VITE_DEV_SERVER_URL !== undefined
      ? process.env.VITE_DEV_SERVER_URL
      : new URL(
          "../renderer/dist/index.html",
          "file://" + __dirname
        ).toString();

  await win.loadURL(pageUrl);

  return win;
};

app.whenReady().then(() => {
  create_window();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      create_window();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (IS_PROD) {
  app
    .whenReady()
    .then(() => {
      return autoUpdater.checkForUpdatesAndNotify();
    })
    .catch((e) => console.error("Failed to check and install updates:", e));
}
