
import React from "react";
import { Store, Facebook, Instagram } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MarketplaceCard = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Store className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Marketplace & Applications</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Apps connectées</p>
          <Badge variant="outline">3</Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Canaux de vente</p>
          <Badge variant="outline">2</Badge>
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <Facebook className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Facebook Shop</p>
              <p className="text-xs text-gray-500">Connecté</p>
            </div>
            <Badge variant="success">Actif</Badge>
          </div>
          
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <Instagram className="h-5 w-5 text-pink-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Instagram Shop</p>
              <p className="text-xs text-gray-500">Connecté</p>
            </div>
            <Badge variant="success">Actif</Badge>
          </div>
        </div>
        
        <div className="grid gap-2 pt-2">
          <Button variant="outline" className="w-full justify-start">
            <Store className="h-4 w-4 mr-2" />
            Explorer les applications
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <div className="flex items-center">
              <div className="h-4 w-4 mr-2 text-[#1DA1F2]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </div>
              Connecter Twitter
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MarketplaceCard;
