
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Wallet } from "lucide-react";

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank';
  lastFourDigits?: string;
  accountNumber?: string;
  expiryDate?: string;
  addedOn: string;
  status: string;
  isDefault: boolean;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ method, onEdit, onDelete }) => {
  return (
    <Card key={method.id} className="overflow-hidden">
      <CardHeader className="bg-muted/50 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {method.type === 'card' ? (
              <CreditCard className="h-8 w-8 text-primary" />
            ) : (
              <Wallet className="h-8 w-8 text-primary" />
            )}
            <div>
              <CardTitle>{method.name}</CardTitle>
              <CardDescription>
                {method.type === 'card' 
                  ? `**** **** **** ${method.lastFourDigits}` 
                  : method.accountNumber}
              </CardDescription>
            </div>
          </div>
          <Badge variant={method.isDefault ? "default" : "outline"}>
            {method.isDefault ? "Par défaut" : "Secondaire"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="text-muted-foreground">Expire le</p>
            <p>{method.expiryDate || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Ajouté le</p>
            <p>{new Date(method.addedOn).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Statut</p>
            <p className="text-green-600 font-medium">{method.status}</p>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end gap-2 p-3">
        <Button variant="outline" size="sm" onClick={() => onEdit(method.id)}>Modifier</Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(method.id)}>Supprimer</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethodCard;
