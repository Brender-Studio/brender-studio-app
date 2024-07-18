import BlenderPath from './blender-executable/BlenderPath'
import ListProfiles from './cli-profiles/ListProfiles'
import ListRegions from './list-regions/ListRegions'
import ClearLocalStorage from './clear-data/ClearLocalStorage'

const Settings = () => {
    return (
        <div className='space-y-4 py-6'>
            <ListProfiles />
            <BlenderPath />
            <ListRegions />
            <ClearLocalStorage />
        </div>
    )
}

export default Settings