
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { User } from "@/store/slices/authSlice";

interface ProfileHeaderProps {
  user: User;
  darkMode: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, darkMode }) => {
  return (
    <CardTitle className="flex justify-between items-center">
      <span>Profil Vendeur</span>
      {user.storeInfo?.verified && (
        <Badge className="flex items-center gap-1 bg-green-500 text-white">
          <CheckCircle className="h-3 w-3" />
          Vérifié
        </Badge>
      )}
      <CardDescription>Gérez votre profil et vos préférences</CardDescription>
    </CardTitle>
  );
};

export default ProfileHeader;
