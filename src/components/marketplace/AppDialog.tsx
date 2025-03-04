
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onAdd: () => void;
}

const AppDialog: React.FC<AppDialogProps> = ({ open, onOpenChange, onClose, onAdd }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une application</DialogTitle>
          <DialogDescription>
            Installez une nouvelle application pour étendre les fonctionnalités de votre marketplace.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="app-name" className="text-right font-medium">
              Nom
            </label>
            <Input
              id="app-name"
              className="col-span-3"
              placeholder="Nom de l'application"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="app-category" className="text-right font-medium">
              Catégorie
            </label>
            <Select>
              <SelectTrigger className="col-span-3" id="app-category">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Ventes</SelectItem>
                <SelectItem value="support">Support Client</SelectItem>
                <SelectItem value="analytics">Analytique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="app-price" className="text-right font-medium">
              Prix
            </label>
            <Input
              id="app-price"
              className="col-span-3"
              placeholder="Prix de l'application"
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="app-description" className="text-right font-medium">
              Description
            </label>
            <textarea
              id="app-description"
              className="col-span-3 min-h-[80px] border rounded-md p-2"
              placeholder="Description de l'application"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onAdd}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppDialog;
