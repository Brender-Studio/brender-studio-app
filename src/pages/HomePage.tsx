import SectionHome from "@/components/custom/structure/SectionHome";
import FirstSteps from "@/features/home/first-steps/FirstSteps";
import GuidesSection from "@/features/home/GuidesSection";
import SponsorSection from "@/features/home/SponsorSection";
import SupportSection from "@/features/home/SupportSection";


const HomePage = () => {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">

            <FirstSteps />

            <SectionHome
                title="Documentation & Resources"
                content={<GuidesSection />}
            />

            <SectionHome
                title="Support & Information"
                content={<SupportSection />}
            />

            <SectionHome
                title="Sponsorship & Donations"
                content={<SponsorSection />}
            />

            <footer className="pt-16 pb-4 flex flex-col justify-center space-y-1">
                <span className="text-center text-xs text-muted-foreground">
                    Brender Studio - {new Date().getFullYear()}
                </span>
                <p className="text-center text-xs text-muted-foreground">
                    Brender Studio is not affiliated with Blender Foundation & Amazon Web Services. All trademarks are property of their respective owners.
                </p>
            </footer>
        </div>
    );
};

export default HomePage;
