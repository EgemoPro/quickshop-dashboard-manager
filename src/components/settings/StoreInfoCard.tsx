
import React from "react";
import { Store } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StoreInfoCardProps {
  storeName: string;
  storeDescription: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
  onInputChange: (field: string, value: string) => void;
}

const StoreInfoCard = ({
  storeName,
  storeDescription,
  storeAddress,
  storeEmail,
  storePhone,
  onInputChange,
}: StoreInfoCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Store className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Informations de la boutique</h2>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="store-name">Nom de la boutique</Label>
          <Input
            id="store-name"
            value={storeName}
            onChange={(e) => onInputChange("storeName", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="store-description">Description</Label>
          <Textarea
            id="store-description"
            value={storeDescription}
            onChange={(e) => onInputChange("storeDescription", e.target.value)}
            rows={3}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="store-address">Adresse</Label>
          <Input
            id="store-address"
            value={storeAddress}
            onChange={(e) => onInputChange("storeAddress", e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="store-email">Email</Label>
            <Input
              id="store-email"
              type="email"
              value={storeEmail}
              onChange={(e) => onInputChange("storeEmail", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="store-phone">Téléphone</Label>
            <Input
              id="store-phone"
              value={storePhone}
              onChange={(e) => onInputChange("storePhone", e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StoreInfoCard;
