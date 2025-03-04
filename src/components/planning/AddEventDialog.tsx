
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventType } from "@/store/slices/planningSlice";

interface AddEventDialogProps {
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
  onAddEvent: () => void;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  open,
  onOpenChange,
  eventForm,
  onEventFormChange,
  onAddEvent
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une publication</DialogTitle>
          <DialogDescription>
            Créez une nouvelle publication pour votre planning.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="event-title" className="text-right font-medium">
              Titre
            </label>
            <Input
              id="event-title"
              value={eventForm.title}
              onChange={(e) => onEventFormChange("title", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="event-type" className="text-right font-medium">
              Type
            </label>
            <Select
              value={eventForm.type}
              onValueChange={(value: EventType) => onEventFormChange("type", value)}
            >
              <SelectTrigger className="col-span-3" id="event-type">
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
              <label htmlFor="product-id" className="text-right font-medium">
                ID Produit
              </label>
              <Input
                id="product-id"
                value={eventForm.productId}
                onChange={(e) => onEventFormChange("productId", e.target.value)}
                className="col-span-3"
                placeholder="PRD-12345"
              />
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="start-date" className="text-right font-medium">
              Date de début
            </label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <Input
                id="start-date"
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
            <label htmlFor="end-date" className="text-right font-medium">
              Date de fin
            </label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <Input
                id="end-date"
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
            <label htmlFor="event-description" className="text-right font-medium">
              Description
            </label>
            <textarea
              id="event-description"
              rows={3}
              value={eventForm.description}
              onChange={(e) => onEventFormChange("description", e.target.value)}
              className="col-span-3 min-h-[80px] border rounded-md p-2"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={onAddEvent}
            disabled={!eventForm.title || !eventForm.startDate || !eventForm.endDate}
          >
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
