import { useEffect, useRef } from "react";
import AppLayout from "./components/layouts/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import { invoke } from '@tauri-apps/api/tauri'
import { checkUpdate } from "@tauri-apps/api/updater";
// import { setupUpdater } from "./update/updater";

function App() {
  const updateChecked = useRef(false);
  useEffect(() => {
    // document.addEventListener('contextmenu', event => event.preventDefault());

    const closeSplashscreenTimeout = setTimeout(async () => {
      await invoke("close_splashscreen");

      window.clearTimeout(closeSplashscreenTimeout);
    }, 1000);

    // Limpieza
    return () => {
      window.clearTimeout(closeSplashscreenTimeout);
    };
  }, []);


  useEffect(() => {
    async function checkForUpdates() {
      if (!updateChecked.current) {
        try {
          await checkUpdate();
        } catch (error) {
          console.error('Error checking for updates:', error);
        }
        updateChecked.current = true;
      }
    }

    checkForUpdates();
  }, []);

  
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
