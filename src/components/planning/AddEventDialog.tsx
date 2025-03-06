
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    campaignId?: string;
    orderId?: string;
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onEventFormChange(e.target.name, e.target.value);
  };

  const handleSelectChange = (field: string, value: string) => {
    onEventFormChange(field, value);
  };

  const canSave = eventForm.title && eventForm.startDate && eventForm.endDate;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle publication</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Titre
            </Label>
            <Input
              id="title"
              name="title"
              value={eventForm.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select 
              value={eventForm.type} 
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Produit</SelectItem>
                <SelectItem value="message">Message</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="order">Commande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {eventForm.type === "product" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productId" className="text-right">
                ID Produit
              </Label>
              <Input
                id="productId"
                name="productId"
                value={eventForm.productId}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          )}
          
          {eventForm.type === "marketing" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaignId" className="text-right">
                ID Campagne
              </Label>
              <Input
                id="campaignId"
                name="campaignId"
                value={eventForm.campaignId}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          )}
          
          {eventForm.type === "order" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="orderId" className="text-right">
                ID Commande
              </Label>
              <Input
                id="orderId"
                name="orderId"
                value={eventForm.orderId}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={eventForm.description}
              onChange={handleChange}
              className="col-span-3"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Date début
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={eventForm.startDate}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Heure début
            </Label>
            <Input
              id="startTime"
              name="startTime"
              type="time"
              value={eventForm.startTime}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Date fin
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={eventForm.endDate}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">
              Heure fin
            </Label>
            <Input
              id="endTime"
              name="endTime"
              type="time"
              value={eventForm.endTime}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={onAddEvent}
            disabled={!canSave}
          >
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
