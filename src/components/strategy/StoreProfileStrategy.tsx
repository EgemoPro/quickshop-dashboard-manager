import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/store/hooks';
import { updateStoreStrategy, StoreStrategy } from '@/store/slices/strategySlice';
import { ProfileSection } from './ProfileSection';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { updateStoreInfo, StoreInfo } from '@/store/slices/authSlice';
import { handleImageFileChange } from '@/utils/imageUpload';

interface StoreProfileStrategyProps {
  storeInfo: StoreInfo;
  storeStrategy: StoreStrategy;
}

const StoreProfileStrategy: React.FC<StoreProfileStrategyProps> = ({
  storeInfo,
  storeStrategy
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [strategyData, setStrategyData] = useState({
    storeDescription: storeStrategy.storeDescription || '',
    storeObjectives: storeStrategy.storeObjectives || '',
    targetAudience: storeStrategy.targetAudience || '',
    competitiveAdvantage: storeStrategy.competitiveAdvantage || '',
    marketPosition: storeStrategy.marketPosition || '',
    growthPlans: storeStrategy.growthPlans || '',
  });

  const [storeData, setStoreData] = useState({
    name: storeInfo.name || '',
    description: storeInfo.description || '',
    logo: storeInfo.logo || '',
    banner: storeInfo.banner || '',
  });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setStrategyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStoreChange = (field: string, value: string) => {
    setStoreData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    // Save strategy data
    dispatch(updateStoreStrategy(strategyData));

    // Save store info data
    dispatch(updateStoreInfo({
      name: storeData.name,
      description: storeData.description,
      logo: storeData.logo,
      banner: storeData.banner,
    }));
    
    toast({
      title: "Informations mises à jour",
      description: "Les informations de la boutique ont été mises à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <ProfileSection title="Informations de base">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="storeName">Nom de la boutique</Label>
            <Input
              id="storeName"
              value={storeData.name}
              onChange={(e) => handleStoreChange('name', e.target.value)}
              className="mt-1"
              placeholder="Nom de votre boutique"
            />
          </div>
          
          <div>
            <Label htmlFor="storeWebsite">Site web</Label>
            <Input
              id="storeWebsite"
              value={storeInfo.website || ''}
              disabled
              className="mt-1 bg-muted"
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
                    className="h-24 w-24 object-contain border rounded-md cursor-pointer"
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
      </ProfileSection>

      <ProfileSection title="Vision et stratégie de la boutique">
        <div className="space-y-4">
          <div>
            <Label htmlFor="storeDescription">Description de la boutique</Label>
            <Textarea
              id="storeDescription"
              value={strategyData.storeDescription}
              onChange={(e) => handleChange('storeDescription', e.target.value)}
              className="mt-1 h-24"
              placeholder="Décrivez votre boutique en quelques phrases..."
            />
          </div>
          <div>
            <Label htmlFor="storeObjectives">Objectifs commerciaux</Label>
            <Textarea
              id="storeObjectives"
              value={strategyData.storeObjectives}
              onChange={(e) => handleChange('storeObjectives', e.target.value)}
              className="mt-1 h-24"
              placeholder="Quels sont vos objectifs à court et long terme..."
            />
          </div>
          <div>
            <Label htmlFor="targetAudience">Public cible</Label>
            <Textarea
              id="targetAudience"
              value={strategyData.targetAudience}
              onChange={(e) => handleChange('targetAudience', e.target.value)}
              className="mt-1 h-24"
              placeholder="Décrivez votre audience cible..."
            />
          </div>
          <div>
            <Label htmlFor="competitiveAdvantage">Avantages concurrentiels</Label>
            <Textarea
              id="competitiveAdvantage"
              value={strategyData.competitiveAdvantage}
              onChange={(e) => handleChange('competitiveAdvantage', e.target.value)}
              className="mt-1 h-24"
              placeholder="Quels sont vos avantages par rapport à la concurrence..."
            />
          </div>
          <div>
            <Label htmlFor="marketPosition">Positionnement sur le marché</Label>
            <Textarea
              id="marketPosition"
              value={strategyData.marketPosition}
              onChange={(e) => handleChange('marketPosition', e.target.value)}
              className="mt-1 h-24"
              placeholder="Comment vous positionnez-vous sur le marché..."
            />
          </div>
          <div>
            <Label htmlFor="growthPlans">Plans de croissance</Label>
            <Textarea
              id="growthPlans"
              value={strategyData.growthPlans}
              onChange={(e) => handleChange('growthPlans', e.target.value)}
              className="mt-1 h-24"
              placeholder="Quels sont vos plans pour développer votre activité..."
            />
          </div>
          <Button onClick={handleSave} className="w-full sm:w-auto mt-2">
            Enregistrer les modifications
          </Button>
        </div>
      </ProfileSection>
    </div>
  );
};

export default StoreProfileStrategy;
