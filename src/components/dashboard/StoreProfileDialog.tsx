
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Store, User, Upload, Image as ImageIcon, Save } from "lucide-react";
import ImageUploader from "@/components/products/ImageUploader";
import { updateSettings, updateStoreConfig } from "@/store/slices/settingsSlice";
import { updateStoreInfo } from "@/store/slices/authSlice";

// Define paths for static images
const STATIC_IMAGES = {
  defaultLogo: "/images/default-logo.png",
  defaultBanner: "/images/default-banner.jpg",
  logoPath: "/images/store-logos/",
  bannerPath: "/images/store-banners/"
};

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
  
  // Initialize images for preview
  const [logoImages, setLogoImages] = useState<Array<{ id: string; url: string; name: string }>>([
    ...(storeData.logo ? [{ id: "current-logo", url: storeData.logo, name: "Logo actuel" }] : [])
  ]);
  
  const [bannerImages, setBannerImages] = useState<Array<{ id: string; url: string; name: string }>>([
    ...(storeData.banner ? [{ id: "current-banner", url: storeData.banner, name: "Bannière actuelle" }] : [])
  ]);
  
  // Handlers
  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleStoreChange = (field: string, value: string) => {
    setStoreData(prev => ({ ...prev, [field]: value }));
  };
  
  // Simulate storing images to static folder
  const saveImageToStatic = (imageUrl: string, type: 'logo' | 'banner') => {
    // In a real app, this would upload the file to the server
    // For this demo, we'll simulate by using a predefined path
    const fileName = `${Date.now()}-${type}${type === 'logo' ? '.png' : '.jpg'}`;
    const path = type === 'logo' 
      ? `${STATIC_IMAGES.logoPath}${fileName}`
      : `${STATIC_IMAGES.bannerPath}${fileName}`;
    
    console.log(`Saving ${type} to ${path}`);
    return path;
  };
  
  const handleLogoChange = (images: Array<{ id: string; url: string; name: string }>) => {
    setLogoImages(images);
    if (images.length > 0) {
      // In a real application, we would save the image to the server here
      // For now, we'll just use the URL directly
      setStoreData(prev => ({ ...prev, logo: images[0].url }));
    } else {
      setStoreData(prev => ({ ...prev, logo: "" }));
    }
  };
  
  const handleBannerChange = (images: Array<{ id: string; url: string; name: string }>) => {
    setBannerImages(images);
    if (images.length > 0) {
      setStoreData(prev => ({ ...prev, banner: images[0].url }));
    } else {
      setStoreData(prev => ({ ...prev, banner: "" }));
    }
  };
  
  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate saving images to static folder
    let finalLogoPath = storeData.logo;
    let finalBannerPath = storeData.banner;
    
    // Only process new images (not the ones that start with our static paths)
    if (storeData.logo && !storeData.logo.startsWith(STATIC_IMAGES.logoPath)) {
      finalLogoPath = saveImageToStatic(storeData.logo, 'logo');
    }
    
    if (storeData.banner && !storeData.banner.startsWith(STATIC_IMAGES.bannerPath)) {
      finalBannerPath = saveImageToStatic(storeData.banner, 'banner');
    }
    
    // Update store settings in Redux
    dispatch(updateStoreConfig({
      name: storeData.name,
      description: storeData.description,
      logo: finalLogoPath,
      banner: finalBannerPath,
    }));
    
    // Update store info in auth slice
    if (user?.storeInfo) {
      dispatch(updateStoreInfo({
        name: storeData.name,
        description: storeData.description,
        logo: finalLogoPath,
        banner: finalBannerPath,
      }));
    }
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      
      toast({
        title: "Profil mis à jour",
        description: "Les informations de votre boutique ont été mises à jour avec succès.",
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
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profileData.avatar} alt={profileData.fullName} />
                <AvatarFallback>{profileData.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Changer l'avatar
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
                  {storeData.logo && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={storeData.logo} 
                        alt="Logo actuel" 
                        className="h-24 w-24 object-contain border rounded-md"
                      />
                    </div>
                  )}
                  <ImageUploader 
                    images={logoImages}
                    onImagesChange={handleLogoChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label className="mb-1">Bannière</Label>
                <div className="bg-gray-50 p-4 rounded-md">
                  {storeData.banner && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={storeData.banner} 
                        alt="Bannière actuelle" 
                        className="h-32 w-full object-cover border rounded-md"
                      />
                    </div>
                  )}
                  <ImageUploader 
                    images={bannerImages}
                    onImagesChange={handleBannerChange}
                  />
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
