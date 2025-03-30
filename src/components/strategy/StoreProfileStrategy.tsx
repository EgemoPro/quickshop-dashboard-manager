
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { StoreInfo } from '@/store/slices/authSlice';
import { StoreStrategy } from '@/store/slices/strategySlice';
import { useAppDispatch } from '@/store/hooks';
import { updateStoreInfo } from '@/store/slices/authSlice';
import { updateStoreStrategy } from '@/store/slices/strategySlice';
import { Check } from 'lucide-react';
import { ProfileSection } from './ProfileSection';
import ImageUploader from '@/components/products/ImageUploader';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoreProfileStrategyProps {
  storeInfo?: StoreInfo;
  storeStrategy: StoreStrategy;
}

const StoreProfileStrategy: React.FC<StoreProfileStrategyProps> = ({
  storeInfo,
  storeStrategy
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  // Form state
  const [storeData, setStoreData] = useState({
    name: storeInfo?.name || '',
    description: storeInfo?.description || '',
    logo: storeInfo?.logo || '',
    banner: storeInfo?.banner || '',
  });

  const [strategyData, setStrategyData] = useState({
    targetAudience: storeStrategy.targetAudience,
    competitiveAdvantage: storeStrategy.competitiveAdvantage,
    marketPosition: storeStrategy.marketPosition,
    growthPlans: storeStrategy.growthPlans,
  });

  // Initialize images for preview
  const [logoImages, setLogoImages] = useState<Array<{ id: string; url: string; name: string }>>([
    ...(storeData.logo ? [{ id: "current-logo", url: storeData.logo, name: "Logo actuel" }] : [])
  ]);

  const [bannerImages, setBannerImages] = useState<Array<{ id: string; url: string; name: string }>>([
    ...(storeData.banner ? [{ id: "current-banner", url: storeData.banner, name: "Bannière actuelle" }] : [])
  ]);

  // Handle store data change
  const handleStoreChange = (field: string, value: string) => {
    setStoreData(prev => ({ ...prev, [field]: value }));
  };


  // Handle logo change
  const handleLogoChange = (images: Array<{ id: string; url: string; name: string }>) => {
    setLogoImages(images);
    if (images.length > 0) {
      handleStoreChange('logo', images[0].url);
    } else {
      handleStoreChange('logo', '');
    }
  };

  // Handle banner change
  const handleBannerChange = (images: Array<{ id: string; url: string; name: string }>) => {
    setBannerImages(images);
    if (images.length > 0) {
      handleStoreChange('banner', images[0].url);
    } else {
      handleStoreChange('banner', '');
    }
  };



  // Save all changes
  const handleSave = () => {
    setIsLoading(true);

    // Update store info
    if (storeInfo) {
      dispatch(updateStoreInfo({
        name: storeData.name,
        description: storeData.description,
        logo: storeData.logo,
        banner: storeData.banner
      }));
    }

    // Update strategy data
    dispatch(updateStoreStrategy(strategyData));

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: "Informations enregistrées",
        description: "Les informations de votre boutique ont été mises à jour avec succès.",
      });
    }, 800);
  };

  if (!storeInfo) {
    return (
      <div className="text-center p-4 sm:p-8">
        <h3 className="text-base sm:text-lg font-medium">Aucune boutique associée</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Vous n'avez pas encore de boutique en ligne. Créez une boutique pour accéder à ces fonctionnalités.
        </p>
        <Button className="mt-4">Créer une boutique</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <ProfileSection title="Informations de la boutique" description="Détails de votre boutique en ligne">
        <div className="grid grid-cols-1  gap-4 sm:gap-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label>Logo</Label>
                {storeData.logo && (
                  <div className="flex justify-center mb-2">
                    <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                      <AvatarImage src={storeData.logo} alt={storeData.name} />
                      <AvatarFallback className="bg-primary/10">
                        {storeData.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                <ImageUploader
                  images={logoImages}
                  onImagesChange={handleLogoChange}
                  
                />
              </div>
              <Label>Bannière</Label>
              {storeData.banner && (
                <div className="relative h-24 sm:h-32 w-full overflow-hidden rounded-md mb-2">
                  <img
                    src={storeData.banner}
                    alt="Bannière boutique"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <ImageUploader
                images={bannerImages}
                onImagesChange={handleBannerChange}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="storeName">Nom de la boutique</Label>
              <Input
                id="storeName"
                value={storeData.name}
                onChange={(e) => handleStoreChange('name', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="storeDescription">Description</Label>
              <Textarea
                id="storeDescription"
                value={storeData.description}
                onChange={(e) => handleStoreChange('description', e.target.value)}
                rows={4}
              />
              <p className="text-xs text-gray-500">
                {storeData.description.length}/500 caractères. Une bonne description est essentielle pour le référencement.
              </p>
            </div>
          </div>

        </div>
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

export default StoreProfileStrategy;
