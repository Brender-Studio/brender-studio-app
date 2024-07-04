import { Book, FolderSearch, GraduationCap, Info, Terminal, UploadCloud } from "lucide-react";
import testImg from "../../../assets/splash-xuliban.jpg";
import gettingStartedImg from "../../../assets/brender-home/getting-started.png";
import discordImg from "../../../assets/brender-home/discord.png";
import ytImg from "../../../assets/brender-home/yt.png";
import faqImg from "../../../assets/brender-home/faq.png";
import githubImg from "../../../assets/brender-home/github.png";
import docsImg from "../../../assets/brender-home/docs.png";
import patreonImg from "../../../assets/brender-home/patreon.png";
import ghSponsorsImg from "../../../assets/brender-home/gh-sponsors.png";
import { FaDiscord, FaGithub, FaPatreon, FaYoutube } from "react-icons/fa";

export const homeData = [
    {
        section: "Getting Started",
        data: [
            {
                title: 'Set up AWS CLI',
                description: 'Configure your AWS CLI to get started with Brender Studio and streamline your rendering workflows.',
                img: testImg,
                alt: 'Configure AWS CLI',
                path: '/settings#aws-profiles',
                isExternal: false,
                icon: <Terminal size={16} />,
            },
            {
                title: 'Deploy Stack',
                description: 'Deploy the Brender Studio stack to your AWS account for seamless cloud rendering.',
                img: '/images/invite-team.svg',
                alt: 'Deploy Stack',
                path: '/stacks/deploy-stack',
                isExternal: false,
                icon: <UploadCloud size={16} />,
            },
            {
                title: 'Set Blender Path',
                description: 'Specify the local path for Blender to start rendering your projects with Brender Studio.',
                img: '/images/start-building.svg',
                alt: 'Set Blender Path',
                path: '/settings',
                isExternal: false,
                icon: <FolderSearch size={16} />,
            },
        ]
    },
    {
        section: "Documentation",
        data: [
            {
                title: "Getting Started",
                description: "Begin your journey with Brender Studio by following our comprehensive getting started guide.",
                path: "https://brenderstudio.com/docs/guides/getting-started",
                img: gettingStartedImg,
                alt: "Getting Started",
                isExternal: true,
                icon: <GraduationCap size={16} />,
            },
            {
                title: "User Documentation",
                description: "Dive into our detailed user documentation to explore all the features and functionalities of Brender Studio.",
                path: "https://brenderstudio.com/docs",
                img: docsImg,
                alt: "Documentation",
                isExternal: true,
                icon: <Book size={16} />,
            },
            {
                title: "Source Code",
                description: "Access our open-source code on GitHub to contribute or learn more about the development of Brender Studio.",
                path: "https://github.com/Brender-Studio/brender-studio-app",
                img: githubImg,
                alt: "Source Code",
                isExternal: true,
                icon: <FaGithub size={16} />,
            },
        ]
    },
    {
        section: "Support",
        data: [
            {
                title: "Discord Community",
                description: "Join our Discord community for support, networking, and sharing ideas with fellow Brender Studio users.",
                path: "https://discord.gg/z7sBb4J5r5",
                img: discordImg,
                alt: "Discord Community",
                isExternal: true,
                icon: <FaDiscord size={16} />,
            },
            {
                title: "YouTube Tutorials",
                description: "Watch tutorials on our YouTube channel to enhance your skills and stay updated with the latest features of Brender Studio.",
                path: "https://www.youtube.com/@BrenderStudio",
                img: ytImg,
                alt: "Brender Studio Channel",
                isExternal: true,
                icon: <FaYoutube size={16} />,
            },
            {
                title: "FAQ",
                description: "Find answers to the most frequently asked questions about Brender Studio.",
                path: "https://brenderstudio.com/support#faq-section",
                img: faqImg,
                alt: "FAQ",
                isExternal: true,
                icon: <Info size={16} />,
            },
        ]
    },
    {
        section: "Sponsorship & Donations",
        data: [
            {
                title: "Patreon",
                description: "Become a Patreon supporter to get exclusive benefits and support the development of Brender Studio and future open-source tools.",
                path: "https://www.patreon.com/BrenderStudio",
                img: patreonImg,
                alt: "Become a Patreon",
                isExternal: true,
                icon: <FaPatreon />,
            },
            {
                title: "GitHub Sponsors",
                description: "Sponsor us on GitHub to help maintain and enhance Brender Studio and other upcoming open-source solutions.",
                path: "https://github.com/sponsors/brender-studio",
                img: ghSponsorsImg,
                alt: "GitHub Sponsors",
                isExternal: true,
                icon: <FaGithub size={16} />,
            },
        ]
    }
];