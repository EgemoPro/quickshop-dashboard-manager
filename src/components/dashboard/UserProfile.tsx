
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, Settings, Mail, PhoneCall, Calendar, Shield, CheckCircle, Edit, Upload } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import StoreProfileDialog from "./StoreProfileDialog";
import { useToast } from "@/components/ui/use-toast";

interface UserProfileProps {
  darkMode: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ darkMode }) => {
  const { user } = useAppSelector(state => state.auth);
  const { toast } = useToast();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  
  if (!user) return null;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const handleEditProfile = () => {
    setShowProfileDialog(true);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Profil Vendeur</span>
            {user.storeInfo?.verified && (
              <Badge className="flex items-center gap-1 bg-green-500 text-white">
                <CheckCircle className="h-3 w-3" />
                Vérifié
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Gérez votre profil et vos préférences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar} alt={user.fullName} />
              <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{user.fullName}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            
            <div className="mt-2 flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                {user.role === "vendor" ? "Vendeur" : user.role === "admin" ? "Admin" : "Client"}
              </Badge>
              {user.storeInfo && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Store className="h-3 w-3" />
                  {user.storeInfo.name}
                </Badge>
              )}
            </div>
          </div>
          
          {user.storeInfo && (
            <div className="mb-6">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Store className="h-4 w-4 text-primary" />
                Informations de la boutique
              </h4>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                <div className="flex items-center mb-2">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.storeInfo.logo} alt={user.storeInfo.name} />
                    <AvatarFallback>{user.storeInfo.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.storeInfo.name}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Créée le {new Date(user.storeInfo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {user.storeInfo.banner && (
                  <div className="mt-3">
                    <img 
                      src={user.storeInfo.banner} 
                      alt="Bannière boutique" 
                      className="w-full h-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 mb-6">
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" className="w-full">
              <PhoneCall className="h-4 w-4 mr-2" />
              Appeler
            </Button>
            <Button variant="outline" className="w-full col-span-2" onClick={handleEditProfile}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier le profil
            </Button>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Préférences</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span className="font-medium">Mode:</span>
                <span>{user.preferences?.darkMode ? "Sombre" : "Clair"}</span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span className="font-medium">Notifications:</span>
                <span>{user.preferences?.notifications ? "Activées" : "Désactivées"}</span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span className="font-medium">Langue:</span>
                <span>{user.preferences?.language === "fr" ? "Français" : "English"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Modal d'édition du profil */}
      <StoreProfileDialog 
        open={showProfileDialog} 
        onOpenChange={setShowProfileDialog} 
      />
    </motion.div>
  );
};

export default UserProfile;
