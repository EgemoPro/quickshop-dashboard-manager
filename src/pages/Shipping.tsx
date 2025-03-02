
import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import ShipmentCard from '@/components/shipping/ShipmentCard';
import CarrierCard from '@/components/shipping/CarrierCard';
import ShippingCard from '@/components/shipping/ShippingCard';
import { RootState } from '@/store/store';

// Define additional props needed for components
interface ShippingSettings {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
  isDefault: boolean;
}

const Shipping = () => {
  const { shipments, carriers } = useSelector((state: RootState) => state.shipping);
  
  // Mock settings since they don't exist in the store
  const settings: ShippingSettings[] = [
    {
      id: "setting-001",
      name: "Livraison Standard",
      description: "Livraison en 3-5 jours ouvrables",
      price: 5.99,
      estimatedDelivery: "3-5 jours",
      isDefault: true
    },
    {
      id: "setting-002",
      name: "Livraison Express",
      description: "Livraison en 1-2 jours ouvrables",
      price: 12.99,
      estimatedDelivery: "1-2 jours",
      isDefault: false
    }
  ];

  // Mock data for ShippingCard component
  const shippingCardData = settings.map(setting => ({
    carrier: {
      name: setting.name,
      status: "active" as const
    },
    recentShipments: [
      {
        id: `shipment-${setting.id}`,
        destination: "Paris, France",
        date: "2023-12-01",
        status: "Livré"
      }
    ],
    estimatedDeliveries: Math.floor(Math.random() * 10) + 1
  }));

  // Mock handlers for ShipmentCard
  const handleViewDetails = (id: string) => {
    console.log("View details for shipment:", id);
  };

  const handleTrackShipment = (trackingNumber: string) => {
    console.log("Track shipment:", trackingNumber);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">Expéditions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shippingCardData.map((data, index) => (
            <ShippingCard
              key={settings[index].id}
              carrier={data.carrier}
              recentShipments={data.recentShipments}
              estimatedDeliveries={data.estimatedDeliveries}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Expéditions récentes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shipments.map((shipment) => {
            // Extract the city and country from the recipientAddress
            const destination = `${shipment.recipientAddress.city}, ${shipment.recipientAddress.country}`;
            
            // Map the shipment data to the expected props structure
            const shipmentData = {
              id: shipment.id,
              orderId: shipment.orderId,
              status: shipment.status,
              carrier: shipment.carrier,
              trackingNumber: shipment.trackingNumber,
              shipDate: shipment.shipDate,
              estimatedDelivery: shipment.estimatedDelivery,
              recipientName: shipment.recipientAddress.name,
              recipientLocation: destination,
              lastUpdate: shipment.shipDate,
            };
            
            return (
              <ShipmentCard
                key={shipment.id}
                shipment={shipmentData}
                onViewDetails={handleViewDetails}
                onTrackShipment={handleTrackShipment}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transporteurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carriers.map((carrier) => {
            // Add mock contact and rating properties for display purposes
            const contact = "support@" + carrier.name.toLowerCase().replace(/\s/g, "") + ".com";
            const rating = 4.5;
            
            // Map the carrier data to the expected props structure
            const carrierData = {
              id: carrier.id,
              name: carrier.name,
              logo: carrier.logo,
              isActive: carrier.isActive,
              deliveryTimeRange: carrier.deliveryTimeRange,
              averagePrice: carrier.pricing.base,
              shipmentsCount: Math.floor(Math.random() * 100)
            };
            
            // Mock handlers for the CarrierCard component
            const handleToggleStatus = (id: string) => {
              console.log("Toggle status for carrier:", id);
            };
            
            const handleEdit = (id: string) => {
              console.log("Edit carrier:", id);
            };
            
            return (
              <CarrierCard
                key={carrier.id}
                carrier={carrierData}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
