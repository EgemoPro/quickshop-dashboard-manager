
import React from "react";
import { Truck, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";

const ShippingCard = () => {
  const { activeCarriers, pendingShipments, averageDeliveryTime } = useAppSelector(
    (state) => state.shipping
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Truck className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Gestion des Expéditions</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Transporteurs actifs</p>
          <Badge variant="outline">{activeCarriers.length}</Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Expéditions en attente</p>
          <Badge variant={pendingShipments > 0 ? "warning" : "outline"}>
            {pendingShipments}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Délai moyen de livraison</p>
          <Badge variant="outline">{averageDeliveryTime}</Badge>
        </div>
        
        <div className="grid gap-2 pt-4">
          <Button variant="outline" className="w-full justify-start">
            <Truck className="h-4 w-4 mr-2" />
            Gérer les transporteurs
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <MapPin className="h-4 w-4 mr-2" />
            Suivre les expéditions
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <Clock className="h-4 w-4 mr-2" />
            Estimer les délais
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ShippingCard;
