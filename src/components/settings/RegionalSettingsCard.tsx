
import React from "react";
import { Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegionalSettingsCardProps {
  language: string;
  currency: string;
  theme: string;
  onSettingChange: (field: string, value: string) => void;
}

const RegionalSettingsCard = ({
  language,
  currency,
  theme,
  onSettingChange,
}: RegionalSettingsCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Globe className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Paramètres régionaux</h2>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="language">Langue</Label>
          <Select
            value={language}
            onValueChange={(value) => onSettingChange("language", value)}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Sélectionnez une langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="currency">Devise</Label>
          <Select
            value={currency}
            onValueChange={(value) => onSettingChange("currency", value)}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Sélectionnez une devise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">Euro (€)</SelectItem>
              <SelectItem value="USD">Dollar US ($)</SelectItem>
              <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
              <SelectItem value="CAD">Dollar Canadien (C$)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="theme">Thème</Label>
          <Select
            value={theme}
            onValueChange={(value) => onSettingChange("theme", value)}
          >
            <SelectTrigger id="theme">
              <SelectValue placeholder="Sélectionnez un thème" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Clair</SelectItem>
              <SelectItem value="dark">Sombre</SelectItem>
              <SelectItem value="system">Système</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default RegionalSettingsCard;
