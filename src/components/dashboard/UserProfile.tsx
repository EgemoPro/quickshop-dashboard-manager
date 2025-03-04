
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import StoreProfileDialog from "./StoreProfileDialog";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileAvatar from "./profile/ProfileAvatar";
import StoreInfoSection from "./profile/StoreInfoSection";
import ContactButtons from "./profile/ContactButtons";
import PreferencesSection from "./profile/PreferencesSection";

interface UserProfileProps {
  darkMode: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ darkMode }) => {
  const { user } = useAppSelector(state => state.auth);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  
  if (!user) return null;
  
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
          <ProfileHeader user={user} darkMode={darkMode} />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center mb-6">
            <ProfileAvatar user={user} />
            
            {user.storeInfo && (
              <StoreInfoSection storeInfo={user.storeInfo} darkMode={darkMode} />
            )}
          </div>
          
          <ContactButtons onEditProfile={handleEditProfile} />
          
          <PreferencesSection userPreferences={user.preferences} />
        </CardContent>
      </Card>
      
      <StoreProfileDialog 
        open={showProfileDialog} 
        onOpenChange={setShowProfileDialog} 
      />
    </motion.div>
  );
};

export default UserProfile;
