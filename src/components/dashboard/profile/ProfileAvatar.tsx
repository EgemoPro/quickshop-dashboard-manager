
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Store } from "lucide-react";
import { User } from "@/store/slices/authSlice";

interface ProfileAvatarProps {
  user: User;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
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
    </>
  );
};

export default ProfileAvatar;
