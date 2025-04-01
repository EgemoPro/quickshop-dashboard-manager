
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Store, Upload } from "lucide-react";
import { User } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/slices/authSlice";
import { handleImageFileChange } from "@/utils/imageUpload";
import { useToast } from "@/hooks/use-toast";

interface ProfileAvatarProps {
  user: User;
  editable?: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user, editable = false }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const handleAvatarClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editable) return;
    
    setIsUploading(true);
    
    handleImageFileChange(e, 'avatar', (result) => {
      // Update the Redux store with the new avatar
      dispatch(updateUser({
        avatar: result.url, // In production this would be the path
      }));
      
      setIsUploading(false);
      
      toast({
        title: "Avatar mis à jour",
        description: "Votre avatar a été mis à jour avec succès.",
      });
    });
  };
  
  return (
    <>
      <Avatar 
        className={`h-24 w-24 mb-4 ${editable ? 'cursor-pointer hover:opacity-90' : ''}`}
        onClick={handleAvatarClick}
      >
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
      
      {editable && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          <Button 
            size="sm"
            variant="outline" 
            className="mt-3 flex items-center gap-2"
            onClick={handleAvatarClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                Chargement...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Modifier la photo
              </>
            )}
          </Button>
        </>
      )}
    </>
  );
};

export default ProfileAvatar;
