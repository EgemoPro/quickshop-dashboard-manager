
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface MarketplaceAppProps {
  name: string;
  description: string;
  category: string;
  price: string;
}

const MarketplaceApp: React.FC<MarketplaceAppProps> = ({ name, description, category, price }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
      <CardFooter className="justify-between items-center">
        <Badge variant="secondary">{price}</Badge>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Installer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketplaceApp;
