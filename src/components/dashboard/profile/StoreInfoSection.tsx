
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Store } from "lucide-react";
import { StoreInfo } from "@/store/slices/authSlice";

interface StoreInfoSectionProps {
  storeInfo: StoreInfo;
  darkMode: boolean;
}

const StoreInfoSection: React.FC<StoreInfoSectionProps> = ({ storeInfo, darkMode }) => {
  return (
    <div className="mb-6 w-full">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        <Store className="h-4 w-4 text-primary" />
        Informations de la boutique
      </h4>
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
        <div className="flex items-center mb-2">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={storeInfo.logo} alt={storeInfo.name} />
            <AvatarFallback>{storeInfo.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{storeInfo.name}</p>
            <p className="text-xs text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Créée le {new Date(storeInfo.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {storeInfo.banner && (
          <div className="mt-3">
            <img 
              src={storeInfo.banner} 
              alt="Bannière boutique" 
              className="w-full h-20 object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreInfoSection;
