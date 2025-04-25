import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import ShipmentCard from '@/components/shipping/ShipmentCard';
import CarrierCard from '@/components/shipping/CarrierCard';
import ShippingCard from '@/components/shipping/ShippingCard';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';
import { Truck, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

  const handleViewDetails = (id: string) => {
    console.log("View details for shipment:", id);
  };

  const handleTrackShipment = (trackingNumber: string) => {
    console.log("Track shipment:", trackingNumber);
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expéditions</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos expéditions et suivez vos livraisons en temps réel
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Nouvelle expédition
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {shippingCardData.map((data, index) => (
          <motion.div
            key={settings[index].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ShippingCard
              carrier={data.carrier}
              recentShipments={data.recentShipments}
              estimatedDeliveries={data.estimatedDeliveries}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Expéditions récentes</h2>
          <Button variant="outline">Voir toutes les expéditions</Button>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {shipments.map((shipment, index) => {
            const destination = `${shipment.recipientAddress.city}, ${shipment.recipientAddress.country}`;
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
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ShipmentCard
                  shipment={shipmentData}
                  onViewDetails={() => console.log('View details:', shipment.id)}
                  onTrackShipment={() => console.log('Track shipment:', shipment.trackingNumber)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Transporteurs actifs</h2>
          <Button variant="outline">Gérer les transporteurs</Button>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {carriers.map((carrier, index) => {
            const carrierData = {
              id: carrier.id,
              name: carrier.name,
              logo: carrier.logo,
              isActive: carrier.isActive,
              deliveryTimeRange: carrier.deliveryTimeRange,
              averagePrice: carrier.pricing.base,
              shipmentsCount: Math.floor(Math.random() * 100)
            };
            
            return (
              <motion.div
                key={carrier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CarrierCard
                  carrier={carrierData}
                  onToggleStatus={() => console.log('Toggle status:', carrier.id)}
                  onEdit={() => console.log('Edit carrier:', carrier.id)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
