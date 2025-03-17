
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import MarketplaceSearch from "@/components/marketplace/MarketplaceSearch";
import MarketplaceTabs from "@/components/marketplace/MarketplaceTabs";
import AppDialog from "@/components/marketplace/AppDialog";

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const openAddDialog = () => {
    setShowAddDialog(true);
  };
  
  const closeAddDialog = () => {
    setShowAddDialog(false);
  };
  
  return (
    <div className="container p-4 md:p-6 mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
      
      <Card className="mb-6">
        <MarketplaceHeader onAddApp={openAddDialog} />
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
                <TabsTrigger value="payments">Paiements</TabsTrigger>
                <TabsTrigger value="shipping">Livraison</TabsTrigger>
              </TabsList>
              
              <MarketplaceSearch 
                searchTerm={searchTerm} 
                onSearchChange={handleSearch}
              />
            </div>
            
            <MarketplaceTabs />
          </Tabs>
        </CardContent>
      </Card>
      
      <AppDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onClose={closeAddDialog}
        onAdd={closeAddDialog}
      />
    </div>
  );
};

export default Marketplace;
