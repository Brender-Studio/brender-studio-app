import { useEffect } from "react";
import AppLayout from "./components/layouts/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import { invoke } from '@tauri-apps/api/tauri'

function App() {

  useEffect(() => {
    // document.addEventListener('contextmenu', event => event.preventDefault());

    const closeSplashscreenTimeout = setTimeout(async () => {
      await invoke("close_splashscreen");

      window.clearTimeout(closeSplashscreenTimeout);
    }, 1000); 
  }, []);


  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
