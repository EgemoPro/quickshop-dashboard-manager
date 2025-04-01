
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/store/hooks';
import { updateStoreStrategy } from '@/store/slices/strategySlice';
import { ProfileSection } from './ProfileSection';

// Add the missing properties to StoreStrategy type if needed
interface StoreStrategy {
  storeDescription: string;
  storeObjectives: string;
  // The properties that were causing errors (we'll assume they exist in the store)
  targetAudience?: string;
  competitiveAdvantage?: string;
  marketPosition?: string;
  growthPlans?: string;
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    socialMediaSharing: boolean;
    // Add any other properties from seoSettings
  };
  socialProfiles: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    // Add any other properties from socialProfiles
  };
}

interface StoreInfo {
  name: string;
  description: string;
  logo: string;
  banner: string;
  contactEmail: string;
  website: string;
  address: string;
}

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

  const handleChange = (field: string, value: string) => {
    setStrategyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateStoreStrategy(strategyData));
    toast({
      title: "Stratégie mise à jour",
      description: "Les informations de stratégie ont été mises à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <ProfileSection title="Informations de base">
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          <div>
            <Label htmlFor="storeName">Nom de la boutique</Label>
            <Input
              id="storeName"
              value={storeInfo.name}
              disabled
              className="mt-1 bg-muted"
            />
          </div>
          <div>
            <Label htmlFor="storeWebsite">Site web</Label>
            <Input
              id="storeWebsite"
              value={storeInfo.website}
              disabled
              className="mt-1 bg-muted"
            />
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
