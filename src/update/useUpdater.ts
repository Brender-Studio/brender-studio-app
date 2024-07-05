import { useState, useEffect } from 'react';
import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';

export function useUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      const unlisten = await onUpdaterEvent(({ error, status }) => {
        console.log('Updater event', error, status);
      });

      try {
        const { shouldUpdate, manifest } = await checkUpdate();

        if (shouldUpdate) {
          setUpdateAvailable(true);
          console.log(`Update available: ${manifest?.version}`);
        }
      } catch (error) {
        console.error(error);
      }

      return unlisten;
    };

    const unlistenPromise = checkForUpdates();

    return () => {
      unlistenPromise.then(unlisten => unlisten());
    };
  }, []);

  const installAndRelaunch = async () => {
    await installUpdate();
    await relaunch();
  };

  return { updateAvailable, installAndRelaunch };
}
