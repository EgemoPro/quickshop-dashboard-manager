
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ExternalLink, FileText, Map } from "lucide-react";
import ShipmentStatusBadge, { ShipmentStatus } from './ShipmentStatusBadge';

export interface ShipmentDisplayProps {
  id: string;
  orderId: string;
  status: ShipmentStatus;
  carrier: string;
  trackingNumber: string;
  shipDate: string;
  estimatedDelivery: string;
  recipientName: string;
  recipientLocation: string;
  carrierLogo?: string;
  lastUpdate?: string;
}

interface ShipmentCardProps {
  shipment: ShipmentDisplayProps;
  onViewDetails: (id: string) => void;
  onTrackShipment: (trackingNumber: string) => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ 
  shipment, 
  onViewDetails, 
  onTrackShipment 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <Avatar className="h-8 w-8 border">
              {shipment.carrierLogo ? (
                <img src={shipment.carrierLogo} alt={shipment.carrier} />
              ) : (
                <span className="text-xs">{shipment.carrier.substring(0, 2).toUpperCase()}</span>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-base">Commande #{shipment.orderId}</CardTitle>
              <p className="text-xs text-muted-foreground">
                Envoi #{shipment.id}
              </p>
            </div>
          </div>
          <ShipmentStatusBadge status={shipment.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div>
            <p className="text-muted-foreground">Destinataire</p>
            <p className="font-medium">{shipment.recipientName}</p>
            <p className="text-xs">{shipment.recipientLocation}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date d'envoi</p>
            <p>{new Date(shipment.shipDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Estimation de livraison</p>
            <p>{new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Dernière mise à jour</p>
            <p>{shipment.lastUpdate ? new Date(shipment.lastUpdate).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={() => onViewDetails(shipment.id)}
        >
          <FileText className="h-3 w-3 mr-1" />
          Détails
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
        >
          <Map className="h-3 w-3 mr-1" />
          Adresse
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="text-xs"
          onClick={() => onTrackShipment(shipment.trackingNumber)}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Suivi
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShipmentCard;
