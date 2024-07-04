import StackSelect from "../custom/selects/StackSelect";
import ProfileSelect from "../custom/selects/ProfileSelect";
import RegionSelect from "../custom/selects/RegionSelect";
import { Separator } from "../ui/separator";
import DiscordButton from "../custom/buttons/footer/DiscordButton";
import CliButton from "../custom/buttons/footer/CliButton";
import SupportButton from "../custom/buttons/footer/SupportButton";

const Footer = () => {

    return (
        <div className='no-select absolute bottom-0 w-full bg-card h-[1.5rem] flex items-center z-[9]'>
            <div className="flex w-full justify-between">
                <div className="flex items-center">
                    <CliButton />
                    <Separator orientation="vertical" />
                    <DiscordButton />
                    <Separator orientation="vertical" />
                    <SupportButton />
                    <Separator orientation="vertical" />
                </div>
                <div className="flex">
                    <Separator orientation="vertical" />
                    <ProfileSelect />
                    <Separator orientation="vertical" />
                    <StackSelect />
                    <Separator orientation="vertical" />
                    <RegionSelect />
                </div>
            </div>
        </div>
    )
}

export default Footer