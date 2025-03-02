
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Package, MapPin } from "lucide-react";

interface ShippingCardProps {
  carrier: {
    name: string;
    logo?: string;
    status: "active" | "inactive";
  };
  recentShipments: {
    id: string;
    destination: string;
    date: string;
    status: string;
  }[];
  estimatedDeliveries: number;
}

const ShippingCard: React.FC<ShippingCardProps> = ({
  carrier,
  recentShipments,
  estimatedDeliveries,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          {carrier.name}
        </CardTitle>
        <Badge
          variant={carrier.status === "active" ? "default" : "outline"}
          className="ml-auto"
        >
          {carrier.status === "active" ? "Actif" : "Inactif"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Livraisons estimées</div>
            <div className="font-medium">{estimatedDeliveries}</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">Expéditions récentes</div>
          {recentShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="flex items-start justify-between border-b pb-2 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <Package className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">{shipment.id}</div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {shipment.destination}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-xs">
                  {shipment.status}
                </Badge>
                <div className="text-xs text-gray-500 mt-1">{shipment.date}</div>
              </div>
            </div>
          ))}
        </div>

        <Button size="sm" variant="outline" className="w-full mt-4">
          Voir les détails
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShippingCard;
