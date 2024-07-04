import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import SpinnerButton from "../spinners/SpinnerButton"

interface DeleteDialogProps {
    btnName: string
    title: string
    description: string
    confirmationMessage: string
    confirmationKeyword: string
    confirmationLoadingKeyword: string
    isDisabled: boolean
    itemsToShow?: string[]
    onConfirm: () => void
    isLoading: boolean
    openDialog: boolean
    setOpenDialog?: (value: boolean) => void
    iconButton: React.ReactNode
    inputValue: string
    setInputValue: (value: string) => void
}

const DeleteDialog = ({ inputValue, setInputValue, btnName, iconButton, title, description, confirmationMessage, confirmationKeyword, onConfirm, isDisabled, itemsToShow, openDialog, setOpenDialog, isLoading, confirmationLoadingKeyword }: DeleteDialogProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <div>
            <Dialog
                open={openDialog}
                onOpenChange={setOpenDialog}
            >
                <DialogTrigger asChild>
                    <Button variant="destructive" disabled={isDisabled} size='sm'>
                        {iconButton}
                        {btnName}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                        <div className="pt-4 pl-10">
                            {itemsToShow?.map((item, index) => (
                                <p className="text-sm text-muted-foreground list-item max-w-sm" key={index}>{item}</p>
                            ))}
                        </div>
                        <div className="py-4">
                            <small className="text-muted-foreground">
                                {confirmationMessage}
                            </small>
                            <Input
                                value={inputValue}
                                onChange={handleInputChange}
                                className="italic mt-1" placeholder={confirmationKeyword.toUpperCase()} />
                        </div>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={onConfirm}
                            variant='destructive'
                            className={isLoading ? 'gap-2 flex' : ''}
                            disabled={!inputValue.includes(confirmationKeyword.toUpperCase()) || isLoading}
                        >
                            {isLoading && <SpinnerButton />}
                            {isLoading ? confirmationLoadingKeyword : confirmationKeyword}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DeleteDialog
