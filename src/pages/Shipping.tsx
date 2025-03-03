
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/store/hooks";
import { Package, TruckIcon, MapPin, BarChart4, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShipmentCard, { ShipmentDisplayProps } from "@/components/shipping/ShipmentCard";
import CarrierCard from "@/components/shipping/CarrierCard";
import { ShipmentStatus } from "@/components/shipping/ShipmentStatusBadge";

const Shipping = () => {
  const { carriers, shipments, zones, packages: shippingPackages } = useAppSelector(state => state.shipping);
  const [activeTab, setActiveTab] = useState("active-shipments");

  // Transform shipments for UI
  const displayShipments: ShipmentDisplayProps[] = shipments.map(shipment => {
    const carrier = carriers.find(c => c.id === shipment.carrier);
    
    return {
      id: shipment.id,
      orderId: shipment.orderId,
      status: shipment.status as ShipmentStatus,
      carrier: carrier?.name || "Transporteur inconnu",
      trackingNumber: shipment.trackingNumber,
      shipDate: shipment.shipDate,
      estimatedDelivery: shipment.estimatedDelivery,
      recipientName: shipment.recipientAddress.name,
      recipientLocation: `${shipment.recipientAddress.city}, ${shipment.recipientAddress.country}`,
      carrierLogo: carrier?.logo,
      lastUpdate: shipment.updatedAt || shipment.shipDate,
    };
  });

  const handleViewShipmentDetails = (id: string) => {
    console.log("View shipment details:", id);
  };

  const handleTrackShipment = (trackingNumber: string) => {
    console.log("Track shipment:", trackingNumber);
  };

  const handleToggleCarrierStatus = (id: string) => {
    console.log("Toggle carrier status:", id);
  };

  const handleEditCarrier = (id: string) => {
    console.log("Edit carrier:", id);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expéditions</h1>
          <p className="text-muted-foreground">Gérez vos expéditions et suivez vos colis</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Nouvelle expédition</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Envois en cours</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.filter(s => 
              s.status === "shipped" || s.status === "processing"
            ).length}</div>
            <p className="text-xs text-muted-foreground">
              Envois et préparation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transporteurs actifs</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carriers.filter(c => c.isActive).length}</div>
            <p className="text-xs text-muted-foreground">
              Sur {carriers.length} disponibles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zones d'expédition</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{zones.length}</div>
            <p className="text-xs text-muted-foreground">
              {zones.reduce((acc, zone) => acc + zone.countries.length, 0)} pays couverts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Délai moyen</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.length > 0 ? "2.5" : "0"} jours</div>
            <p className="text-xs text-muted-foreground">
              Durée d'acheminement
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active-shipments" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active-shipments">Expéditions actives</TabsTrigger>
          <TabsTrigger value="all-shipments">Historique</TabsTrigger>
          <TabsTrigger value="carriers">Transporteurs</TabsTrigger>
          <TabsTrigger value="shipping-zones">Zones d'expédition</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active-shipments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayShipments.filter(s => s.status !== "delivered" && s.status !== "failed").map((shipment) => (
              <ShipmentCard 
                key={shipment.id}
                shipment={shipment}
                onViewDetails={handleViewShipmentDetails}
                onTrackShipment={handleTrackShipment}
              />
            ))}
            {displayShipments.filter(s => s.status !== "delivered" && s.status !== "failed").length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">Aucune expédition active actuellement</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all-shipments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayShipments.map((shipment) => (
              <ShipmentCard 
                key={shipment.id}
                shipment={shipment}
                onViewDetails={handleViewShipmentDetails}
                onTrackShipment={handleTrackShipment}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="carriers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {carriers.map((carrier) => (
              <CarrierCard 
                key={carrier.id}
                carrier={{
                  ...carrier,
                  shipmentsCount: shipments.filter(s => s.carrier === carrier.id).length,
                  averagePrice: (carrier.pricing.base + carrier.pricing.perKg * 2).toFixed(2) as unknown as number
                }}
                onToggleStatus={handleToggleCarrierStatus}
                onEdit={handleEditCarrier}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shipping-zones" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {zones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{zone.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Pays couverts</p>
                      <p className="text-muted-foreground">{zone.countries.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Multiplicateur de prix</p>
                      <p>×{zone.priceMultiplier}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Shipping;
