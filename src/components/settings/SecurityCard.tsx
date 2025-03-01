
import React from "react";
import { Shield, LockKeyhole, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SecurityCardProps {
  onPasswordDialogOpen: () => void;
}

const SecurityCard = ({ onPasswordDialogOpen }: SecurityCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Shield className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Sécurité</h2>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Gérez les paramètres de sécurité de votre boutique.</p>
        
        <div className="grid gap-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onPasswordDialogOpen}
          >
            <LockKeyhole className="h-4 w-4 mr-2" />
            Changer le mot de passe
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Activer l'authentification à deux facteurs
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Consulter le journal d'activité
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SecurityCard;
