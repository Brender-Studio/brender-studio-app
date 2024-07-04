import { toast } from '@/components/ui/use-toast';
import { invoke } from '@tauri-apps/api/tauri';
import { useState, useEffect } from 'react';

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(false);

  const checkInternetConnection = async () => {
    try {
      const isConnected = await invoke('check_internet_connection');
      return isConnected;
    } catch (err) {
      toast({
        title: "You are offline",
        description: "You are offline, please check your internet connection.",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    const fetchOnlineStatus = async () => {
      const online = await checkInternetConnection();
      console.log('is online:', online)
      setOnlineStatus(online as boolean);
    };

    const intervalId = setInterval(fetchOnlineStatus, 60000); // Check every minute

    fetchOnlineStatus();

    return () => clearInterval(intervalId);
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
