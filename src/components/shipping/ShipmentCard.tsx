
import React, { useState } from 'react';
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

interface MapsCoords {
  lon: string;
  lat: string;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({
  shipment,
  onViewDetails,
  onTrackShipment
}) => {


  const [isMapsLanched, setIsMapsLanched] = useState<boolean>(false)
  const [map, setMap] = useState<MapsCoords>()

  const toggleMapsLanch = () =>{
    onTrackShipment(shipment.trackingNumber)
    setIsMapsLanched(!isMapsLanched)
  }


  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex space-x-3 items-center">
            <Avatar className="h-10 w-10 border bg-primary/5">
              {shipment.carrierLogo ? (
                <img src={shipment.carrierLogo} alt={shipment.carrier} className="p-2" />
              ) : (
                <span className="text-sm font-medium">{shipment.carrier.substring(0, 2).toUpperCase()}</span>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-lg">Commande #{shipment.orderId}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Envoi #{shipment.id}
              </p>
            </div>
          </div>
          <ShipmentStatusBadge status={shipment.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-y-4 text-sm mt-2">
          <div>
            <p className="text-muted-foreground font-medium mb-1">Destinataire</p>
            <p className="font-semibold">{shipment.recipientName}</p>
            <p className="text-sm text-muted-foreground">{shipment.recipientLocation}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-medium mb-1">Date d'envoi</p>
            <p className="font-semibold">{new Date(shipment.shipDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-medium mb-1">Estimation</p>
            <p className="font-semibold">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-medium mb-1">Dernière mise à jour</p>
            <p className="font-semibold">{shipment.lastUpdate ? new Date(shipment.lastUpdate).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
        {isMapsLanched &&
          (<div className='w-full h-30'>

            <h1>Maps</h1>

          </div>)
        }
      </CardContent>
      <CardFooter className="flex justify-between pt-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails(shipment.id)}
        >
          <FileText className="h-4 w-4 mr-2" />
          Détails
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <Map className="h-4 w-4 mr-2" />
          Adresse
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={toggleMapsLanch}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Suivi
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShipmentCard;
