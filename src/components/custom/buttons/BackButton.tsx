import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <Button size='icon' variant='rounded' onClick={() => navigate(-1)}>
            <ChevronLeft size={16} />
        </Button>
    )
}

export default BackButton