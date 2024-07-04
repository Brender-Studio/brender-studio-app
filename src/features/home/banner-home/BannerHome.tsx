import banner from '../../../assets/banner/kevin-jick-kevinjick-cyberpunkstreet-establishing-final-1.jpg';

const BannerHome = () => {

    return (
        <>
            <div
                className={`relative -z-10 top-0 left-0 w-full h-80 transition-all duration-300`}
            >
                <div className="absolute w-full h-full bg-gradient-to-t from-background to-transparent" />
                <img src={banner} alt="banner" className="w-full h-full object-cover" />
            </div>
        
        </>
    );
}

export default BannerHome;
