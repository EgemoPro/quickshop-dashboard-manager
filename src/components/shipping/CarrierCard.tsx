
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
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border">
              {carrier.logo ? (
                <img src={carrier.logo} alt={carrier.name} />
              ) : (
                <Truck className="h-6 w-6" />
              )}
            </Avatar>
            <div>
              <CardTitle className="text-base">{carrier.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {carrier.description || `Livraison en ${carrier.deliveryTimeRange.min}-${carrier.deliveryTimeRange.max} jours`}
              </p>
            </div>
          </div>
          <Badge variant={carrier.isActive ? "default" : "outline"}>
            {carrier.isActive ? "Actif" : "Inactif"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Délai moyen</p>
              <p className="font-medium">{carrier.averageDeliveryTime || `${carrier.deliveryTimeRange.min}-${carrier.deliveryTimeRange.max}`} jours</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Prix moyen</p>
              <p className="font-medium">{carrier.averagePrice ? formatCurrency(carrier.averagePrice) : "Variable"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Envois</p>
              <p className="font-medium">{carrier.shipmentsCount || 0}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button 
          variant={carrier.isActive ? "outline" : "default"} 
          size="sm"
          onClick={() => onToggleStatus(carrier.id)}
        >
          {carrier.isActive ? "Désactiver" : "Activer"}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(carrier.id)}
        >
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarrierCard;
