
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">Expéditions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settings.map((setting) => (
            <ShippingCard
              key={setting.id}
              title={setting.name}
              description={setting.description}
              price={setting.price}
              estimatedDelivery={setting.estimatedDelivery}
              isDefault={setting.isDefault}
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
            
            return (
              <ShipmentCard
                key={shipment.id}
                trackingNumber={shipment.trackingNumber}
                status={shipment.status}
                carrier={shipment.carrier}
                destination={destination}
                lastUpdate={shipment.shipDate}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transporteurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carriers.map((carrier) => {
            // Add mock contact and rating properties
            const contact = "support@" + carrier.name.toLowerCase().replace(/\s/g, "") + ".com";
            const rating = 4.5;
            
            return (
              <CarrierCard
                key={carrier.id}
                name={carrier.name}
                logo={carrier.logo}
                trackingUrl={carrier.trackingUrl}
                contact={contact}
                rating={rating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
