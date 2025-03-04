
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import { toast } from "sonner";

interface PaymentMethodProps {
  name: string;
  description: string;
  isEnabled: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ name, description, isEnabled }) => {
  const [enabled, setEnabled] = useState(isEnabled);
  
  const handleToggle = () => {
    setEnabled(!enabled);
    toast(`${name} ${!enabled ? "activé" : "désactivé"} avec succès`);
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-full p-2">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <Switch id={`${name}-switch`} checked={enabled} onCheckedChange={handleToggle} />
    </div>
  );
};

export default PaymentMethod;
