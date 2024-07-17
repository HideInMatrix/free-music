import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { SearchCommand } from "./SearchCommand";

export function SearchWrapper({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogTitle className="hidden"></DialogTitle>
        <SearchCommand />
      </DialogContent>
    </Dialog>
  );
}
