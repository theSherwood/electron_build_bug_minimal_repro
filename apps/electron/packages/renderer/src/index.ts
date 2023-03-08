import "./register_sw";

declare global {
  interface Window {
    client_service?: any;
    backend_service?: any;
    electron_client_service_bridge?: any;
  }
}

// We have to supply the preload module with a bridge to the client service.
// This is how we are doing that.
let get_client_service = () => {
  return window.client_service;
};
window.electron_client_service_bridge(get_client_service);
