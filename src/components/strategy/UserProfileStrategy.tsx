import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/store/slices/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { updateUser } from '@/store/slices/authSlice';
import { Check, Upload } from 'lucide-react';
import { ProfileSection } from './ProfileSection';
import { handleImageFileChange } from '@/utils/imageUpload';

interface UserProfileStrategyProps {
  user: User;
}

const UserProfileStrategy: React.FC<UserProfileStrategyProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  
  // Form state
  const [userData, setUserData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || '',
    avatar: user.avatar,
    bio: user.bio || 'Entrepreneur passionné et innovant.'
  });
  
  // Handle form change
  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };
  
  // Save user data
  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      dispatch(updateUser({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        avatar: userData.avatar,
        bio: userData.bio
      }));
      
      setIsLoading(false);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations de profil ont été mises à jour avec succès.",
      });
    }, 800);
  };
  
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvatarUploading(true);
    
    handleImageFileChange(e, 'avatar', (result) => {
      // Update the local form state
      setUserData(prev => ({
        ...prev,
        avatar: result.url
      }));
      
      setIsAvatarUploading(false);
      
      toast({
        title: "Image prête",
        description: "L'image sera enregistrée lorsque vous sauvegarderez le profil.",
      });
    });
  };
  
  return (
    <div className="space-y-6">
      <ProfileSection title="Informations personnelles" description="Modifiez vos informations de profil">
        <div className="flex flex-col items-center mb-6">
          <Avatar 
            className="h-24 w-24 mb-4 cursor-pointer hover:opacity-90"
            onClick={handleAvatarClick}
          >
            <AvatarImage src={userData.avatar} alt={userData.fullName} />
            <AvatarFallback>{userData.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          <Button 
            size="sm"
            onClick={handleAvatarClick}
            variant="outline" 
            className="flex items-center gap-2"
            disabled={isAvatarUploading}
          >
            {isAvatarUploading ? (
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
        </div>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <Input
              id="fullName"
              value={userData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={userData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="bio">Biographie</Label>
            <Textarea
              id="bio"
              value={userData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </ProfileSection>
      
      <ProfileSection title="Préférences" description="Gérez vos préférences d'utilisation">
        <PreferencesForm user={user} />
      </ProfileSection>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enregistrement...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Enregistrer les modifications
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

// Preferences component
const PreferencesForm: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    darkMode: user.preferences?.darkMode || false,
    notifications: user.preferences?.notifications || true,
    language: user.preferences?.language || 'fr'
  });
  
  const handleToggle = (field: string) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [field]: !prev[field as keyof typeof prev] };
      
      // Update in Redux
      dispatch(updateUser({
        preferences: newPrefs
      }));
      
      toast({
        title: "Préférence mise à jour",
        description: `La préférence ${field} a été mise à jour.`,
      });
      
      return newPrefs;
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, language: value };
      
      // Update in Redux
      dispatch(updateUser({
        preferences: newPrefs
      }));
      
      toast({
        title: "Langue mise à jour",
        description: "Votre langue a été mise à jour avec succès.",
      });
      
      return newPrefs;
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Mode sombre</h4>
          <p className="text-sm text-gray-500">Activer le thème sombre pour l'interface</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={preferences.darkMode}
            onChange={() => handleToggle('darkMode')}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Notifications</h4>
          <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={preferences.notifications}
            onChange={() => handleToggle('notifications')}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="language">Langue</Label>
        <select 
          id="language"
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          value={preferences.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
    </div>
  );
};

export default UserProfileStrategy;
