let sw: ServiceWorker;

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js", {
        scope: ".",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        sw = registration.active;
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();

navigator.serviceWorker.addEventListener("message", (event) => {
  let [s1, s2] = event.data.path;
  if (s1 === "backend_service") {
    window.backend_service[s2](event.data.data).then((response) => {
      sw.postMessage({ response, id: event.data.id });
      return;
    });
  }
});

let dummy;

export { dummy };
