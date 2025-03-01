
import React from "react";
import { CreditCard, Mail, Currency } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";

const PaymentCard = () => {
  const { currency, currencySymbol } = useAppSelector((state) => state.settings);
  
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <CreditCard className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Paiement</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Configurez les méthodes de paiement acceptées par votre boutique.</p>
          <Badge variant="outline" className="ml-2">
            <Currency className="h-3 w-3 mr-1" />
            {currency} ({currencySymbol})
          </Badge>
        </div>
        
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
