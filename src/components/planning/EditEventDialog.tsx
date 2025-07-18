
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    campaignId?: string;
    orderId?: string;
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onEventFormChange(e.target.name, e.target.value);
  };

  const handleSelectChange = (field: string, value: string) => {
    onEventFormChange(field, value);
  };

  const canSave = eventForm.title && eventForm.startDate && eventForm.endDate;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">✏️ Modifier l'événement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">
              Titre de l'événement
            </Label>
            <Input
              id="title"
              name="title"
              value={eventForm.title}
              onChange={handleChange}
              placeholder="Entrez le titre de l'événement"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-semibold">
              Type d'événement
            </Label>
            <Select 
              value={eventForm.type} 
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">📦 Produit</SelectItem>
                <SelectItem value="message">💬 Message</SelectItem>
                <SelectItem value="marketing">📊 Marketing</SelectItem>
                <SelectItem value="order">🛒 Commande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {eventForm.type === "product" && (
            <div className="space-y-2">
              <Label htmlFor="productId" className="text-sm font-semibold">
                Référence produit
              </Label>
              <Input
                id="productId"
                name="productId"
                value={eventForm.productId}
                onChange={handleChange}
                placeholder="Ex: PRD-12345"
                className="w-full"
              />
            </div>
          )}
          
          {eventForm.type === "marketing" && (
            <div className="space-y-2">
              <Label htmlFor="campaignId" className="text-sm font-semibold">
                Référence campagne
              </Label>
              <Input
                id="campaignId"
                name="campaignId"
                value={eventForm.campaignId || ""}
                onChange={handleChange}
                placeholder="Ex: CAMP-001"
                className="w-full"
              />
            </div>
          )}
          
          {eventForm.type === "order" && (
            <div className="space-y-2">
              <Label htmlFor="orderId" className="text-sm font-semibold">
                Numéro de commande
              </Label>
              <Input
                id="orderId"
                name="orderId"
                value={eventForm.orderId || ""}
                onChange={handleChange}
                placeholder="Ex: ORD-582791"
                className="w-full"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={eventForm.description}
              onChange={handleChange}
              placeholder="Ajoutez une description détaillée..."
              className="w-full resize-none"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-semibold">
                📅 Date de début
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={eventForm.startDate}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm font-semibold">
                🕐 Heure de début
              </Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={eventForm.startTime}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-semibold">
                📅 Date de fin
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={eventForm.endDate}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-sm font-semibold">
                🕐 Heure de fin
              </Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={eventForm.endTime}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between items-center gap-3 pt-6 border-t">
          <Button 
            variant="destructive" 
            onClick={onDeletePrompt}
            className="hover:bg-destructive/90 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              onClick={onEditEvent}
              disabled={!canSave}
              className="bg-primary hover:bg-primary/90 transition-colors"
            >
              💾 Enregistrer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
