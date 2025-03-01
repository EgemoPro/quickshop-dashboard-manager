
import React from "react";
import { Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PrivacyCardProps {
  privacySettings: {
    cookieConsent: string;
    dataSharing: boolean;
    analytics: boolean;
  };
  onPrivacyChange: (field: string, value: any) => void;
}

const PrivacyCard = ({ privacySettings, onPrivacyChange }: PrivacyCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Palette className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Confidentialité</h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Consentement aux cookies</Label>
          <RadioGroup 
            value={privacySettings.cookieConsent}
            onValueChange={(value) => onPrivacyChange("cookieConsent", value)}
            className="grid gap-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="essential" id="essential" />
              <Label htmlFor="essential" className="cursor-pointer">Cookies essentiels uniquement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="functional" id="functional" />
              <Label htmlFor="functional" className="cursor-pointer">Cookies fonctionnels</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="cursor-pointer">Tous les cookies</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Partage de données</Label>
              <p className="text-sm text-gray-500">Autoriser le partage de données avec nos partenaires</p>
            </div>
            <Switch 
              checked={privacySettings.dataSharing}
              onCheckedChange={(checked) => onPrivacyChange("dataSharing", checked)}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Analytiques</Label>
              <p className="text-sm text-gray-500">Collecter des données anonymes pour améliorer l'expérience</p>
            </div>
            <Switch 
              checked={privacySettings.analytics}
              onCheckedChange={(checked) => onPrivacyChange("analytics", checked)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PrivacyCard;
