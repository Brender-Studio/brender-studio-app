import logo from "@/assets/logo-brender-studio.svg";


const LoadingBrandSpinner = () => {
    return (
        <>
            <img src={logo} alt="logo" className="animate-spin-slow rotate h-7 w-7" />
        </>
    )
}

export default LoadingBrandSpinner