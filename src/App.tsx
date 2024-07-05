import { useEffect } from "react";
import AppLayout from "./components/layouts/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import { invoke } from '@tauri-apps/api/tauri'
import { useUpdater } from "./update/useUpdater";

function App() {
  const { updateAvailable, installAndRelaunch } = useUpdater();

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
    if (updateAvailable) {
      installAndRelaunch();
    }
  }, [updateAvailable, installAndRelaunch]);

  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
