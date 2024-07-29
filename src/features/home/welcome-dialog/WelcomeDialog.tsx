import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import splash from "@/assets/splash-xuliban.jpg"
import { open } from "@tauri-apps/api/shell"
import { useLocation } from "react-router-dom"

const WelcomeDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const hideWelcomeDialog = localStorage.getItem("hideWelcomeDialog")
        if (location.pathname === "/") {
            setIsDialogOpen(hideWelcomeDialog !== "true")
        }
    }, [])


    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    const handleOpenArtistSplash = () => {
        const url = "https://www.artstation.com/xuliban-productions1"
        open(url)
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
        localStorage.setItem("hideWelcomeDialog", JSON.stringify(!isChecked))
    }


    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="min-w-[500px]">
                <div className="absolute w-full h-64">
                    <div className="absolute w-full h-64 bg-gradient-to-b z-10 from-transparent to-black/80" />
                    <img
                        src={splash}
                        alt="splash"
                        className="relative w-full h-64 object-cover rounded-t-lg"
                    />
                    <p>
                        <span
                            className="text-muted-foreground shadow-lg text-xs absolute bottom-2 right-2 z-[60] hover:underline hover:cursor-pointer"
                            onClick={handleOpenArtistSplash}
                        >
                           Art by Xuliban
                        </span>
                    </p>
                </div>
                <DialogHeader className="mt-[55%] ">
                    <DialogTitle>
                        Welcome to Brender Studio!
                    </DialogTitle>
                  
                    <div></div>
                    <DialogDescription >
                        Before you get started, make sure you have an AWS account and have set up your AWS credentials. If you haven't done so, please check the documentation for more information.
                    </DialogDescription>
                    <DialogDescription>
                        Brender Studio still in beta, so if you encounter any issues, please report them on GitHub or Discord.
                    </DialogDescription>
                    <DialogDescription className="pt-4">
                        Now, get ready to enjoy some amazing rendering! 🚀
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="w-full mt-4">
                    <div className="flex justify-between w-full">
                        <div className="items-center flex space-x-2">
                            <Checkbox id="terms1"
                                defaultChecked={isChecked}
                                onCheckedChange={handleCheckboxChange}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <p className="text-xs text-muted-foreground">
                                    Don't show this again
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleDialogClose} type="submit">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default WelcomeDialog