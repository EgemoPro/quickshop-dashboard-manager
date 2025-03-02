
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketingCard from "@/components/marketing/MarketingCard";
import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import MarketplaceCard from "@/components/marketplace/MarketplaceCard";
import OrdersManagementCard from "@/components/orders/OrdersManagementCard";
import ShippingCard from "@/components/shipping/ShippingCard";
import PaymentCard from "@/components/settings/PaymentCard";
import SecurityCard from "@/components/settings/SecurityCard";

interface DashboardFeatureCardsProps {
  onPasswordDialogOpen: () => void;
}

const DashboardFeatureCards = ({ onPasswordDialogOpen }: DashboardFeatureCardsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Fonctionnalités de la boutique</h2>
      
      <Tabs defaultValue="marketing" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 mb-4">
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="analytics">Analyse</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="shipping">Expéditions</TabsTrigger>
          <TabsTrigger value="payment">Paiement</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <TabsContent value="marketing" className="mt-0">
            <MarketingCard />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <AnalyticsCard />
          </TabsContent>
          
          <TabsContent value="marketplace" className="mt-0">
            <MarketplaceCard />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-0">
            <OrdersManagementCard />
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-0">
            <ShippingCard />
          </TabsContent>
          
          <TabsContent value="payment" className="mt-0">
            <PaymentCard />
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <SecurityCard onPasswordDialogOpen={onPasswordDialogOpen} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardFeatureCards;
