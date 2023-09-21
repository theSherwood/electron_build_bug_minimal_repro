import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // we can also expose variables, not just functions
});

declare global {
  interface Window {
    backend_service: any;
    client_service: any;
  }
}

/* CLIENT SERVICE */
// How the backend calls the client

let client_service: any;
// The renderer has to call this method to supply the client service to this
// module. This is because the browser window is not available from this module.
// So the renderer has to pass in the client service so that the ipcRenderer
// can properly respond to events sent from the electron backend.
contextBridge.exposeInMainWorld(
  "electron_client_service_bridge",
  (get_client_service) => {
    client_service = get_client_service();
    console.log("client_service", client_service);
  }
);

ipcRenderer.on("log_electron_main", (...args) => {
  console.log("Electron Main:", ...args);
});

/* BACKEND SERVICE */
// How the client calls the backend

contextBridge.exposeInMainWorld("backend_service", {});
