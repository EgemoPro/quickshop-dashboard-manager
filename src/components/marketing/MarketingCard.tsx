
import React from "react";
import { Megaphone, Tag, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";

const MarketingCard = () => {
  const { activeCampaigns, promoCodesCount, emailSubscribers } = useAppSelector(
    (state) => state.marketing
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Megaphone className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Marketing & Promotions</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Campagnes actives</p>
          <Badge variant={activeCampaigns > 0 ? "success" : "outline"}>
            {activeCampaigns}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Codes promo disponibles</p>
          <Badge variant="outline">{promoCodesCount}</Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Abonnés aux emails</p>
          <Badge variant="outline">{emailSubscribers}</Badge>
        </div>
        
        <div className="grid gap-2 pt-4">
          <Button variant="outline" className="w-full justify-start">
            <Tag className="h-4 w-4 mr-2" />
            Créer un code promo
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <Megaphone className="h-4 w-4 mr-2" />
            Lancer une campagne
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2" />
            Envoyer un email
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MarketingCard;
