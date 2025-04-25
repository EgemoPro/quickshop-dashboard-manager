import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Package, MapPin, ArrowRight } from "lucide-react";

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
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">
          {carrier.name}
        </CardTitle>
        <Badge
          variant={carrier.status === "active" ? "default" : "secondary"}
          className="font-medium"
        >
          {carrier.status === "active" ? "Actif" : "Inactif"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/5 rounded-full">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Livraisons estimées</div>
            <div className="text-2xl font-bold">{estimatedDeliveries}</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Expéditions récentes</h3>
          {recentShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="flex items-start justify-between py-3 border-b last:border-0"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{shipment.id}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {shipment.destination}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-xs font-medium">
                  {shipment.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{shipment.date}</p>
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-6 group"
        >
          Voir les détails
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShippingCard;
