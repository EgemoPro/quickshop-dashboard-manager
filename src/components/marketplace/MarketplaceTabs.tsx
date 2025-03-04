
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import MarketplaceApp from "./MarketplaceApp";
import SocialChannel from "./SocialChannel";
import PaymentMethod from "./PaymentMethod";
import ShippingOption from "./ShippingOption";

const MarketplaceTabs: React.FC = () => {
  return (
    <>
      <TabsContent value="overview" className="space-y-4">
        <p>Bienvenue dans la vue d'ensemble de la marketplace. Ici, vous pouvez voir un résumé de vos applications, réseaux sociaux connectés, méthodes de paiement et options de livraison.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card">
            <h3 className="text-xl font-bold">Applications Installées</h3>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-500">Applications actives sur votre boutique.</p>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold">Réseaux Sociaux Connectés</h3>
            <p className="text-2xl font-bold">4</p>
            <p className="text-sm text-gray-500">Plateformes sociales liées à votre compte.</p>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold">Méthodes de Paiement</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-500">Options de paiement disponibles pour vos clients.</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="applications" className="space-y-4">
        <p>Gérez les applications installées sur votre marketplace. Vous pouvez installer de nouvelles applications pour étendre les fonctionnalités de votre boutique.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MarketplaceApp 
            name="Avis Clients" 
            description="Collectez et affichez les avis de vos clients." 
            category="Marketing" 
            price="Gratuit" 
          />
          <MarketplaceApp 
            name="Optimisation SEO" 
            description="Améliorez le référencement de votre boutique." 
            category="Marketing" 
            price="9.99€/mois" 
          />
          <MarketplaceApp 
            name="Chat en Direct" 
            description="Communiquez en temps réel avec vos visiteurs." 
            category="Support Client" 
            price="Gratuit" 
          />
        </div>
      </TabsContent>
      
      <TabsContent value="social" className="space-y-4">
        <p>Connectez vos réseaux sociaux pour partager vos produits et interagir avec votre communauté.</p>
        
        <SocialChannel platform="Facebook" isConnected={true} followers={1200} likes={560} />
        <SocialChannel platform="Instagram" isConnected={false} followers={850} likes={320} />
        <SocialChannel platform="Twitter" isConnected={true} followers={600} likes={210} />
      </TabsContent>
      
      <TabsContent value="payments" className="space-y-4">
        <p>Configurez vos méthodes de paiement pour accepter les paiements de vos clients.</p>
        
        <PaymentMethod name="Carte de Crédit" description="Acceptez les paiements par carte de crédit." isEnabled={true} />
        <PaymentMethod name="PayPal" description="Acceptez les paiements via PayPal." isEnabled={false} />
        <PaymentMethod name="Virement Bancaire" description="Acceptez les paiements par virement bancaire." isEnabled={true} />
      </TabsContent>
      
      <TabsContent value="shipping" className="space-y-4">
        <p>Gérez vos options de livraison pour offrir une expérience d'expédition optimale à vos clients.</p>
        
        <ShippingOption name="Livraison Standard" description="Livraison en 3-5 jours ouvrables." price="4.99€" isEnabled={true} />
        <ShippingOption name="Livraison Express" description="Livraison en 1-2 jours ouvrables." price="9.99€" isEnabled={false} />
        <ShippingOption name="Retrait en Magasin" description="Les clients peuvent retirer leurs commandes en magasin." price="Gratuit" isEnabled={true} />
      </TabsContent>
    </>
  );
};

export default MarketplaceTabs;
