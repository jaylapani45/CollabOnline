import { AlertDialog,AlertDialogCancel,AlertDialogDescription,AlertDialogHeader,AlertDialogTrigger,AlertDialogTitle, AlertDialogAction,AlertDialogContent, AlertDialogFooter } from "./ui/alert-dialog";

interface ConfirmModalProps {
    children:React.ReactNode
    tittle:string
    description:string
    onConfirm:()=>void
}
export const ConfirmModal=({children,tittle,description,onConfirm}:ConfirmModalProps)=>{
    const handleClick=()=>{
        onConfirm();
    }
    return(
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{tittle}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}