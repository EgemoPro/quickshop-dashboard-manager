
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { StoreInfo } from '@/store/slices/authSlice';
import { StoreStrategy, addKeyword, removeKeyword } from '@/store/slices/strategySlice';
import { useAppDispatch } from '@/store/hooks';
import { updateStoreInfo } from '@/store/slices/authSlice';
import { updateStoreStrategy, updateSocialProfiles } from '@/store/slices/strategySlice';
import { Check, Plus, X, Upload, ImageIcon } from 'lucide-react';
import { ProfileSection } from './ProfileSection';
import SEOSettings from './SEOSettings';
import SocialMediaConnections from './SocialMediaConnections';
import ImageUploader from '@/components/products/ImageUploader';

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
  
  const [newKeyword, setNewKeyword] = useState('');
  
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
  
  // Handle strategy data change
  const handleStrategyChange = (field: string, value: string) => {
    setStrategyData(prev => ({ ...prev, [field]: value }));
  };
  
  // Add new keyword
  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      dispatch(addKeyword(newKeyword.trim()));
      setNewKeyword('');
      
      toast({
        title: "Mot clé ajouté",
        description: `Le mot clé "${newKeyword}" a été ajouté.`,
      });
    }
  };
  
  // Remove keyword
  const handleRemoveKeyword = (keyword: string) => {
    dispatch(removeKeyword(keyword));
    
    toast({
      title: "Mot clé supprimé",
      description: `Le mot clé "${keyword}" a été supprimé.`,
    });
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

  // Handle social profiles change
  const handleSocialProfilesChange = (profiles: any[]) => {
    dispatch(updateSocialProfiles(profiles));
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
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">Aucune boutique associée</h3>
        <p className="text-gray-500 mt-2">
          Vous n'avez pas encore de boutique en ligne. Créez une boutique pour accéder à ces fonctionnalités.
        </p>
        <Button className="mt-4">Créer une boutique</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <ProfileSection title="Informations de la boutique" description="Détails de votre boutique en ligne">
        <div className="grid md:grid-cols-2 gap-6">
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
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Logo</Label>
              {storeData.logo && (
                <div className="flex justify-center mb-2">
                  <Avatar className="h-24 w-24">
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
            
            <div className="grid gap-2">
              <Label>Bannière</Label>
              {storeData.banner && (
                <div className="relative h-32 w-full overflow-hidden rounded-md mb-2">
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
        </div>
      </ProfileSection>
      
      <ProfileSection title="Stratégie de boutique" description="Définissez votre positionnement et vos objectifs">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="targetAudience">Public cible</Label>
            <Textarea
              id="targetAudience"
              value={strategyData.targetAudience}
              onChange={(e) => handleStrategyChange('targetAudience', e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="competitiveAdvantage">Avantage concurrentiel</Label>
            <Textarea
              id="competitiveAdvantage"
              value={strategyData.competitiveAdvantage}
              onChange={(e) => handleStrategyChange('competitiveAdvantage', e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="marketPosition">Positionnement sur le marché</Label>
              <Input
                id="marketPosition"
                value={strategyData.marketPosition}
                onChange={(e) => handleStrategyChange('marketPosition', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="growthPlans">Plans de croissance</Label>
              <Input
                id="growthPlans"
                value={strategyData.growthPlans}
                onChange={(e) => handleStrategyChange('growthPlans', e.target.value)}
              />
            </div>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title="Réseaux sociaux" description="Connectez vos réseaux sociaux à votre boutique">
        <SocialMediaConnections 
          socialProfiles={storeStrategy.socialProfiles} 
          onSocialProfilesChange={handleSocialProfilesChange} 
        />
      </ProfileSection>
      
      <ProfileSection title="Optimisation SEO" description="Améliorer le référencement de votre boutique">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Mots clés</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {storeStrategy.seoSettings.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 pl-3">
                  {keyword}
                  <button
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="ml-1 rounded-full hover:bg-gray-200 p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {storeStrategy.seoSettings.keywords.length === 0 && (
                <p className="text-sm text-gray-500 italic">Aucun mot clé défini</p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un mot clé"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
              />
              <Button onClick={handleAddKeyword} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Les mots clés aident à améliorer la visibilité de votre boutique dans les moteurs de recherche.
            </p>
          </div>
          
          <SEOSettings seoSettings={storeStrategy.seoSettings} />
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
