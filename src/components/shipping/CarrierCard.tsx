import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/use-currency";
import { Clock, Package, PiggyBank, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface CarrierDisplayProps {
  id: string;
  name: string;
  logo: string;
  isActive: boolean;
  deliveryTimeRange: {
    min: number;
    max: number;
  };
  description?: string;
  averageDeliveryTime?: number;
  averagePrice?: number;
  shipmentsCount?: number;
}

interface CarrierCardProps {
  carrier: CarrierDisplayProps;
  onToggleStatus: (id: string) => void;
  onEdit: (id: string) => void;
}

const CarrierCard: React.FC<CarrierCardProps> = ({ carrier, onToggleStatus, onEdit }) => {
  const { formatCurrency } = useCurrency();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border bg-primary/5">
              {carrier.logo ? (
                <img src={carrier.logo} alt={carrier.name} className="p-2" />
              ) : (
                <Truck className="h-6 w-6 text-primary" />
              )}
            </Avatar>
            <div>
              <CardTitle className="text-lg">{carrier.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Livraison en {carrier.deliveryTimeRange.min}-{carrier.deliveryTimeRange.max} jours
              </p>
            </div>
          </div>
          <Badge variant={carrier.isActive ? "default" : "secondary"} className="ml-auto">
            {carrier.isActive ? "Actif" : "Inactif"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
            <Clock className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">Délai moyen</p>
            <p className="font-semibold text-sm">{carrier.deliveryTimeRange.min}-{carrier.deliveryTimeRange.max} jours</p>
          </div>
          <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
            <PiggyBank className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">Prix moyen</p>
            <p className="font-semibold text-sm">{carrier.averagePrice ? formatCurrency(carrier.averagePrice) : "Variable"}</p>
          </div>
          <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
            <Package className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">Envois</p>
            <p className="font-semibold text-sm">{carrier.shipmentsCount}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button 
          variant={carrier.isActive ? "outline" : "default"}
          size="sm"
          onClick={() => onToggleStatus(carrier.id)}
          className="w-full sm:w-auto"
        >
          {carrier.isActive ? "Désactiver" : "Activer"}
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => onEdit(carrier.id)}
          className="w-full sm:w-auto"
        >
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarrierCard;
