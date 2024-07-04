
const ProgressBar = () => {
    return (
        <div className='w-full absolute top-0 left-0'>
            <div className='h-1 w-full rounded-t-lg bg-white/10 overflow-hidden'>
                <div className='progress w-full h-full bg-[#F63652] left-right'></div>
            </div>
        </div>
    )
}

export default ProgressBar