
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { EventType } from "@/store/slices/planningSlice";

interface EditEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventForm: {
    title: string;
    description: string;
    type: EventType;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    productId: string;
  };
  onEventFormChange: (field: string, value: string) => void;
  onEditEvent: () => void;
  onDeletePrompt: () => void;
}

const EditEventDialog: React.FC<EditEventDialogProps> = ({
  open,
  onOpenChange,
  eventForm,
  onEventFormChange,
  onEditEvent,
  onDeletePrompt
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier la publication</DialogTitle>
          <DialogDescription>
            Modifiez les détails de la publication.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-title" className="text-right font-medium">
              Titre
            </label>
            <Input
              id="edit-title"
              value={eventForm.title}
              onChange={(e) => onEventFormChange("title", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-type" className="text-right font-medium">
              Type
            </label>
            <Select
              value={eventForm.type}
              onValueChange={(value: EventType) => onEventFormChange("type", value)}
            >
              <SelectTrigger className="col-span-3" id="edit-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Produit</SelectItem>
                <SelectItem value="message">Message</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {eventForm.type === "product" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-product-id" className="text-right font-medium">
                ID Produit
              </label>
              <Input
                id="edit-product-id"
                value={eventForm.productId}
                onChange={(e) => onEventFormChange("productId", e.target.value)}
                className="col-span-3"
                placeholder="PRD-12345"
              />
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-start-date" className="text-right font-medium">
              Date de début
            </label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <Input
                id="edit-start-date"
                type="date"
                value={eventForm.startDate}
                onChange={(e) => onEventFormChange("startDate", e.target.value)}
              />
              <Input
                type="time"
                value={eventForm.startTime}
                onChange={(e) => onEventFormChange("startTime", e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-end-date" className="text-right font-medium">
              Date de fin
            </label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <Input
                id="edit-end-date"
                type="date"
                value={eventForm.endDate}
                onChange={(e) => onEventFormChange("endDate", e.target.value)}
              />
              <Input
                type="time"
                value={eventForm.endTime}
                onChange={(e) => onEventFormChange("endTime", e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="edit-description" className="text-right font-medium">
              Description
            </label>
            <textarea
              id="edit-description"
              rows={3}
              value={eventForm.description}
              onChange={(e) => onEventFormChange("description", e.target.value)}
              className="col-span-3 min-h-[80px] border rounded-md p-2"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="destructive" 
            onClick={onDeletePrompt}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
          <div className="flex-1"></div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={onEditEvent}
            disabled={!eventForm.title || !eventForm.startDate || !eventForm.endDate}
          >
            Mettre à jour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
