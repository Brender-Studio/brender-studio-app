import { Card } from "@/components/ui/card"
import { errors } from "./data/errors"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { open } from "@tauri-apps/api/shell"
import { useEffect } from "react"

const TroubleshootingSection = () => {

    const handleOpenLink = (link: string) => {
        open(link)
    }

    useEffect(() => {
        const handleSmoothScroll = (event: MouseEvent) => {
          if (event.target instanceof HTMLAnchorElement && event.target.getAttribute('href')?.startsWith('#')) {
            event.preventDefault();
            const targetId = event.target.getAttribute('href')?.substring(1);
            const targetElement = document.getElementById(targetId!);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }
        };
    
        document.addEventListener('click', handleSmoothScroll);
        return () => {
          document.removeEventListener('click', handleSmoothScroll);
        };
      }, []);

    return (
        <div className="py-6">
            <p className="text-muted-foreground text-sm">Here you can find some common issues and how to solve them. If you encounter any issues not listed here, please let us know on GitHub or Discord!</p>
            <div className="py-8">
                <h2 className="text-md font-semibold">
                    Table of Contents
                </h2>
                <ul className="text-sm mt-4 list-disc pl-8 text-muted-foreground">
                    {errors.map((error, index) => (
                        <li key={index} className="py-1">
                            <a href={`#${error.id}`} className="hover:underline">{error.title}</a>
                        </li>
                    ))}
                </ul>

                <div className="space-y-4 mt-8">
                    {errors.map((error, index) => (
                        <Card key={index} id={error.id} className="p-6">
                            <h2 className="text-md font-semibold">
                                {error.title}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {error.description}
                            </p>
                            <div className="text-sm mt-6 text-muted-foreground">
                                {error.solution?.map((solution, index) => (
                                    <ul key={index} className="list-disc pl-8">
                                        <li className="text-md font-semibold mt-4 text-white">
                                            {solution.solution_title}
                                        </li>
                                        <p className="text-sm text-muted-foreground">
                                            {solution.solution_description}
                                        </p>
                                    </ul>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 justify-end mt-12">
                                {error.web_docs_link && (
                                    <div className="text-end">
                                        <Button variant='secondary' size='sm' onClick={() => handleOpenLink(error.web_docs_link)}>
                                            Documentation
                                        </Button>
                                    </div>
                                )}
                                {
                                    error.internal_link && (
                                        <div className="text-end">
                                            <Link to={error.internal_link}>
                                                <Button size='sm'>
                                                    Review
                                                </Button>
                                            </Link>
                                        </div>
                                    )
                                
                                }
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TroubleshootingSection