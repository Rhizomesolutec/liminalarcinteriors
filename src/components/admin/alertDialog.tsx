import {
  AlertDialog as AlertDialogC,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  open: boolean | number | string;
  setOpen:  React.Dispatch<React.SetStateAction<number | boolean>>;
  callBack: () => void;
  text: string;
}

export function AlertDialog({ open, setOpen, callBack, text }: AlertDialogProps) {
  return (
    <AlertDialogC
      open={open == false ? false : !isNaN(Number(open)) || typeof open === "string"}
      onOpenChange={(data)=>setOpen(data)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => callBack()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogC>
  );
}