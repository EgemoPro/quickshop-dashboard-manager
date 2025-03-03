
import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ShipmentCard } from '@/components/shipping/ShipmentCard';
import { CarrierCard } from '@/components/shipping/CarrierCard';
import { ShippingCard } from '@/components/shipping/ShippingCard';
import { RootState } from '@/store/store';

const Shipping = () => {
  const { shipments, carriers, settings } = useSelector((state: RootState) => state.shipping);

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
          {shipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              trackingNumber={shipment.trackingNumber}
              status={shipment.status}
              carrier={shipment.carrier}
              destination={shipment.destination}
              // If updatedAt exists use it, otherwise use shipDate
              lastUpdate={shipment.shipDate}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transporteurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carriers.map((carrier) => (
            <CarrierCard
              key={carrier.id}
              name={carrier.name}
              logo={carrier.logo}
              trackingUrl={carrier.trackingUrl}
              contact={carrier.contact}
              rating={carrier.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
