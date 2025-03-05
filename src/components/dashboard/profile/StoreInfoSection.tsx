
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
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-3 rounded-md`}>
        {storeInfo.banner && (
          <div className="mb-3">
            <img 
              src={storeInfo.banner} 
              alt="Bannière boutique" 
              className="w-full h-24 object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex items-center mb-2">
          <Avatar className="h-12 w-12 mr-3 ring-2 ring-white">
            <AvatarImage src={storeInfo.logo} alt={storeInfo.name} />
            <AvatarFallback className="bg-primary text-white">
              {storeInfo.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {storeInfo.name}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <Calendar className="h-3 w-3 mr-1" />
              Créée le {new Date(storeInfo.createdAt).toLocaleDateString()}
            </p>
            {storeInfo.verified && (
              <p className="text-xs text-green-500 font-medium mt-1">
                ✓ Boutique vérifiée
              </p>
            )}
          </div>
        </div>
        {storeInfo.description && (
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {storeInfo.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StoreInfoSection;
