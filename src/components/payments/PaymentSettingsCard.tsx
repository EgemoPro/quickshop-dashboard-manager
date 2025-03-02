
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PaymentSettingsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de paiement</CardTitle>
        <CardDescription>Configurez vos préférences de paiement et de facturation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-medium">Devise préférée</h3>
          <p className="text-sm text-muted-foreground">Euro (€)</p>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium">Cycle de facturation</h3>
          <p className="text-sm text-muted-foreground">Mensuel, le 1er de chaque mois</p>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium">Notifications de paiement</h3>
          <p className="text-sm text-muted-foreground">Activées pour tous les mouvements</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Modifier les paramètres</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSettingsCard;
