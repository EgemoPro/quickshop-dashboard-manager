
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MessageCircle, Package2 } from "lucide-react";
import { ScheduledEvent } from "@/store/slices/planningSlice";

interface DeleteEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: ScheduledEvent | null;
  onDeleteEvent: () => void;
}

const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({
  open,
  onOpenChange,
  event,
  onDeleteEvent
}) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Confirmer la suppression
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer cette publication ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center gap-3 p-3 border rounded-lg mb-4">
            <div className={`rounded-md p-2 ${event.type === "product" ? "bg-blue-100" : "bg-green-100"}`}>
              {event.type === "product" ? (
                <Package2 className="h-5 w-5" />
              ) : (
                <MessageCircle className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {format(event.start, "EEEE d MMMM yyyy, HH:mm", { locale: fr })}
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onDeleteEvent}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventDialog;
