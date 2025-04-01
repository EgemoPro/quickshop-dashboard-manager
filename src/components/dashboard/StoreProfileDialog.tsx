
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Store, User, Upload, Image as ImageIcon, Save } from "lucide-react";
import { updateStoreConfig } from "@/store/slices/settingsSlice";
import { updateStoreInfo, updateUser } from "@/store/slices/authSlice";
import { handleImageFileChange } from "@/utils/imageUpload";

interface StoreProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StoreProfileDialog: React.FC<StoreProfileDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const storeConfig = useAppSelector(state => state.settings.storeConfig);
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);
  
  // Form states
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });
  
  const [storeData, setStoreData] = useState({
    name: user?.storeInfo?.name || storeConfig.name,
    description: user?.storeInfo?.description || storeConfig.description,
    logo: user?.storeInfo?.logo || storeConfig.logo,
    banner: user?.storeInfo?.banner || storeConfig.banner,
  });
  
  // Update form data when user or storeConfig changes
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
      
      setStoreData({
        name: user.storeInfo?.name || storeConfig.name,
        description: user.storeInfo?.description || storeConfig.description,
        logo: user.storeInfo?.logo || storeConfig.logo,
        banner: user.storeInfo?.banner || storeConfig.banner,
      });
    }
  }, [user, storeConfig]);
  
  // Handlers
  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleStoreChange = (field: string, value: string) => {
    setStoreData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleAvatarClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };
  
  const handleLogoClick = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };
  
  const handleBannerClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click();
    }
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvatarUploading(true);
    
    handleImageFileChange(e, 'avatar', (result) => {
      setProfileData(prev => ({
        ...prev,
        avatar: result.url
      }));
      
      setIsAvatarUploading(false);
      
      toast({
        title: "Avatar prêt",
        description: "L'avatar sera enregistré lorsque vous sauvegarderez les modifications.",
      });
    });
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLogoUploading(true);
    
    handleImageFileChange(e, 'logo', (result) => {
      setStoreData(prev => ({
        ...prev,
        logo: result.url
      }));
      
      setIsLogoUploading(false);
      
      toast({
        title: "Logo prêt",
        description: "Le logo sera enregistré lorsque vous sauvegarderez les modifications.",
      });
    });
  };
  
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBannerUploading(true);
    
    handleImageFileChange(e, 'banner', (result) => {
      setStoreData(prev => ({
        ...prev,
        banner: result.url
      }));
      
      setIsBannerUploading(false);
      
      toast({
        title: "Bannière prête",
        description: "La bannière sera enregistrée lorsque vous sauvegarderez les modifications.",
      });
    });
  };
  
  const handleSave = () => {
    setIsLoading(true);
    
    // Update user profile
    dispatch(updateUser({
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      avatar: profileData.avatar,
    }));
    
    // Update store settings in Redux
    dispatch(updateStoreConfig({
      name: storeData.name,
      description: storeData.description,
      logo: storeData.logo,
      banner: storeData.banner,
    }));
    
    // Update store info in auth slice
    if (user?.storeInfo) {
      dispatch(updateStoreInfo({
        name: storeData.name,
        description: storeData.description,
        logo: storeData.logo,
        banner: storeData.banner,
      }));
    }
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier votre profil</DialogTitle>
          <DialogDescription>
            Mettez à jour vos informations personnelles et les détails de votre boutique
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil personnel
            </TabsTrigger>
            <TabsTrigger value="store" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Boutique
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar
                className="h-24 w-24 mb-4 cursor-pointer hover:opacity-90"
                onClick={handleAvatarClick}
              >
                <AvatarImage src={profileData.avatar} alt={profileData.fullName} />
                <AvatarFallback>{profileData.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <input
                type="file"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleAvatarClick}
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
                    Changer l'avatar
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => handleProfileChange("fullName", e.target.value)}
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  placeholder="Votre adresse email"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                  placeholder="Votre numéro de téléphone"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="store" className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="storeName">Nom de la boutique</Label>
                <Input
                  id="storeName"
                  value={storeData.name}
                  onChange={(e) => handleStoreChange("name", e.target.value)}
                  placeholder="Nom de votre boutique"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="storeDescription">Description</Label>
                <Textarea
                  id="storeDescription"
                  value={storeData.description}
                  onChange={(e) => handleStoreChange("description", e.target.value)}
                  placeholder="Description de votre boutique"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label className="mb-1">Logo</Label>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-center mb-4">
                    {storeData.logo ? (
                      <img 
                        src={storeData.logo} 
                        alt="Logo actuel" 
                        className="h-24 w-24 object-contain border rounded-md"
                        onClick={handleLogoClick}
                      />
                    ) : (
                      <div 
                        className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                        onClick={handleLogoClick}
                      >
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleLogoClick}
                    disabled={isLogoUploading}
                  >
                    {isLogoUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        Chargement...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        {storeData.logo ? 'Changer le logo' : 'Ajouter un logo'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label className="mb-1">Bannière</Label>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-center mb-4">
                    {storeData.banner ? (
                      <img 
                        src={storeData.banner} 
                        alt="Bannière actuelle" 
                        className="h-32 w-full object-cover border rounded-md cursor-pointer"
                        onClick={handleBannerClick}
                      />
                    ) : (
                      <div 
                        className="h-32 w-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                        onClick={handleBannerClick}
                      >
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    ref={bannerInputRef}
                    onChange={handleBannerChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleBannerClick}
                    disabled={isBannerUploading}
                  >
                    {isBannerUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        Chargement...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        {storeData.banner ? 'Changer la bannière' : 'Ajouter une bannière'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoreProfileDialog;
