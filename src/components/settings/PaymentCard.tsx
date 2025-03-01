
import React from "react";
import { CreditCard, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PaymentCard = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <CreditCard className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Paiement</h2>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Configurez les méthodes de paiement acceptées par votre boutique.</p>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <CreditCard className="h-4 w-4 mr-2" />
            Configurer les moyens de paiement
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2" />
            Modèles d'emails de facturation
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PaymentCard;
