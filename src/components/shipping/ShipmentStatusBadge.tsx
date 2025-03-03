
import React from 'react';
import { Badge } from "@/components/ui/badge";

export type ShipmentStatus = "pending" | "processing" | "shipped" | "delivered" | "failed";

interface ShipmentStatusBadgeProps {
  status: ShipmentStatus;
}

const ShipmentStatusBadge: React.FC<ShipmentStatusBadgeProps> = ({ status }) => {
  const getVariant = () => {
    switch (status) {
      case "delivered":
        return "default";
      case "shipped":
        return "outline";
      case "processing":
        return "secondary";
      case "pending":
        return "outline";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "delivered":
        return "Livré";
      case "shipped":
        return "Expédié";
      case "processing":
        return "En traitement";
      case "pending":
        return "En attente";
      case "failed":
        return "Échec";
      default:
        return status;
    }
  };

  return (
    <Badge variant={getVariant()}>
      {getLabel()}
    </Badge>
  );
};

export default ShipmentStatusBadge;
