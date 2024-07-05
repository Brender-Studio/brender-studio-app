import { useEffect } from "react";
import AppLayout from "./components/layouts/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import { invoke } from '@tauri-apps/api/tauri'
import { setupUpdater } from "./update/updater";

function App() {

  useEffect(() => {
    // document.addEventListener('contextmenu', event => event.preventDefault());

    const closeSplashscreenTimeout = setTimeout(async () => {
      await invoke("close_splashscreen");

      window.clearTimeout(closeSplashscreenTimeout);
    }, 1000); 

    let unlistenUpdater: () => void;
    setupUpdater().then(unlisten => {
      unlistenUpdater = unlisten;
    });

    // Limpieza
    return () => {
      window.clearTimeout(closeSplashscreenTimeout);
      if (unlistenUpdater) {
        unlistenUpdater();
      }
    };
  }, []);


  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
