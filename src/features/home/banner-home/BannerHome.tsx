import banner from '../../../assets/banner/dani-rovira-vila-dani-scifi-scene.jpg';
import { open } from '@tauri-apps/api/shell';

const BannerHome = () => {

    return (
        <>
            <div className={`relative top-0 left-0 w-full h-80 transition-all duration-300`}
            >
                <div className="absolute w-full h-full bg-gradient-to-t from-background to-transparent" />
                <img src={banner} alt="banner" className="w-full h-full object-cover" />
                <div 
                    onClick={() => open('https://www.artstation.com/darovi3d')}
                    className="cursor-pointer font-semibold absolute bottom-4 right-4 text-white/80 text-xs"
                >
                    Art By Dani Rovira Vilà
                </div>
            </div>
        
        </>
    );
}

export default BannerHome;
