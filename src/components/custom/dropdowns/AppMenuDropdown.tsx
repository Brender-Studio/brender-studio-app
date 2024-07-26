import { Button } from '@/components/ui/button'
import { Book, Code2, CreditCard, Github, Globe, Grip, Heart, Settings, Terminal, Youtube } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DiscordIcon from '../icons/DiscordIcon'
import { useNavigate } from 'react-router-dom';
import { open } from '@tauri-apps/api/shell';

const menuData = [
    {
        section: "Menu",
        items: [
            { icon: Settings, text: "Settings", url: "/settings" },
            { icon: CreditCard, text: "Cost Explorer", url: "/cost-explorer" },
        ]
    },
    {
        section: "Resources",
        items: [
            { icon: CreditCard, text: "Getting Started", url: "https://brenderstudio.com/docs/guides/getting-started" },
            { icon: Book, text: "Documentation", url: "https://brenderstudio.com/docs" },
            { icon: Globe, text: "Website", url: "https://brenderstudio.com" },
            { icon: Code2, text: "Community Scripts", url: "https://github.com/Brender-Studio/brender-snippets"}
        ]
    },
    {
        section: "Support",
        items: [
            { icon: Github, text: "GitHub", url: "https://github.com/Brender-Studio" },
            { icon: DiscordIcon, text: "Discord", url: "https://discord.gg/z7sBb4J5r5" },
            { icon: Youtube, text: "Youtube", url: "https://www.youtube.com/@BrenderStudio" },
            { icon: Heart, text: "Donate", url: "https://brenderstudio.com/donate" }
        ]
    },
    {
        items: [
            { icon: Terminal, text: "AWS Console", url: "https://console.aws.amazon.com" }
        ]
    }
];

const AppMenuDropdown = () => {
    const navigate = useNavigate()

    const handleItemClick = (url: string) => {
        console.log(url)
        if (url.startsWith('http')) {
            open(url)
        } else {
            navigate(url)
        }
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="link" size="icon" className={"hover:bg-white/10 rounded-full backdrop-blur-sm"}>
                        <Grip size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4">
                    {menuData.map((section, index) => (
                        <div key={index}>
                            {section.section && <DropdownMenuLabel>{section.section}</DropdownMenuLabel>}
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {section.items.map((item, i) => (
                                    <DropdownMenuItem key={i} onClick={() => handleItemClick(item.url || "")}>
                                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                        <span>{item.text}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default AppMenuDropdown