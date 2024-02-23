import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface OpenDialogProps {
    children: React.ReactNode;
    title: string;
    content?: any;
}

export const OpenDialog = ({children,title,content}:OpenDialogProps) => {
    return(
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {content}
            </DialogHeader>
        </DialogContent>
    </Dialog>
    )
}