
import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Store, ArrowUpRightFromSquare, Settings2, Plus, X, } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import UserProfileStrategy from '@/components/strategy/UserProfileStrategy';
import StoreProfileStrategy from '@/components/strategy/StoreProfileStrategy';
import { useIsMobile } from '@/hooks/use-mobile';
import SEOSettings from '@/components/strategy/SEOSettings';
import SocialMediaConnections from '@/components/strategy/SocialMediaConnections';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { addKeyword, removeKeyword, SocialMediaProfile } from '@/store/slices/strategySlice';
import { ProfileSection } from '@/components/strategy/ProfileSection';

// Extended StoreInfo interface to match what we need
interface ExtendedStoreInfo {
  name: string;
  description: string;
  logo: string;
  banner: string;
  contactEmail: string;
  website: string;
  address: string;
  createdAt?: string;
  verified?: boolean;
}

// Extended StoreStrategy interface to match what we need
interface ExtendedStoreStrategy {
  storeDescription: string;
  storeObjectives: string;
  targetAudience?: string;
  competitiveAdvantage?: string;
  marketPosition?: string;
  growthPlans?: string;
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    socialMediaSharing: boolean;
    // Additional properties
    sitemap?: boolean;
    canonicalUrls?: boolean;
    structuredData?: boolean;
    robotsTxt?: string;
    allowIndexing?: boolean;
  };
  socialProfiles: SocialMediaProfile[];
}

const Strategy = () => {
  const { user } = useAppSelector(state => state.auth);
  const { storeStrategy } = useAppSelector(state => state.strategy);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [newKeyword, setNewKeyword] = useState('');

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

  if (!user) return null;

  // Create default values if missing properties
  const storeInfo: ExtendedStoreInfo = {
    name: user.storeInfo?.name || "",
    description: user.storeInfo?.description || "",
    logo: user.storeInfo?.logo || "",
    banner: user.storeInfo?.banner || "",
    contactEmail: user.storeInfo?.contactEmail || "",
    website: user.storeInfo?.website || "",
    address: user.storeInfo?.address || "",
    createdAt: user.storeInfo?.createdAt,
    verified: user.storeInfo?.verified,
  };
  
  // Ensure storeStrategy has required properties
  const completeStoreStrategy: ExtendedStoreStrategy = {
    storeDescription: storeStrategy?.storeDescription || "",
    storeObjectives: storeStrategy?.storeObjectives || "",
    targetAudience: storeStrategy?.targetAudience || "",
    competitiveAdvantage: storeStrategy?.competitiveAdvantage || "",
    marketPosition: storeStrategy?.marketPosition || "",
    growthPlans: storeStrategy?.growthPlans || "",
    seoSettings: {
      metaTitle: storeStrategy?.seoSettings?.metaTitle || "",
      metaDescription: storeStrategy?.seoSettings?.metaDescription || "",
      keywords: storeStrategy?.seoSettings?.keywords || [],
      socialMediaSharing: storeStrategy?.seoSettings?.socialMediaSharing || false,
      sitemap: storeStrategy?.seoSettings?.sitemap || false,
      canonicalUrls: storeStrategy?.seoSettings?.canonicalUrls || false,
      structuredData: storeStrategy?.seoSettings?.structuredData || false,
      robotsTxt: storeStrategy?.seoSettings?.robotsTxt || "",
      allowIndexing: storeStrategy?.seoSettings?.allowIndexing || true,
    },
    socialProfiles: storeStrategy?.socialProfiles || [],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2 sm:px-4 py-6 sm:py-8"
    >
      

      <Tabs defaultValue="user" className="space-y-4 sm:space-y-6">
        <TabsList className="mb-4 sm:mb-6 w-full sm:w-auto flex justify-center sm:justify-start">
          <TabsTrigger value="user" className="flex-1 sm:flex-initial flex items-center gap-2 px-3 py-2">
            <User className="h-4 w-4" />
            <span className={isMobile ? "hidden" : "inline"}>Profil Utilisateur</span>
            <span className={isMobile ? "inline" : "hidden"}>Profil</span>
          </TabsTrigger>
          <TabsTrigger value="store" className="flex-1 sm:flex-initial flex items-center gap-2 px-3 py-2">
            <Store className="h-4 w-4" />
            <span className={isMobile ? "hidden" : "inline"}>Boutique en ligne</span>
            <span className={isMobile ? "inline" : "hidden"}>Boutique</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex-1 sm:flex-initial flex items-center gap-2 px-3 py-2">
            <ArrowUpRightFromSquare className="h-4 w-4" />
            <span className={isMobile ? "hidden" : "inline"}>Réseaux sociaux</span>
            <span className={isMobile ? "inline" : "hidden"}>Sociaux</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex-1 sm:flex-initial flex items-center gap-2 px-3 py-2">
            <Settings2 className="h-4 w-4" />
            <span className={isMobile ? "hidden" : "inline"}>Optimisation SEO</span>
            <span className={isMobile ? "inline" : "hidden"}>SEO</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-4 sm:space-y-6 mt-2">
          <UserProfileStrategy user={user} />
        </TabsContent>

        <TabsContent value="store" className="space-y-4 sm:space-y-6 mt-2">
          <StoreProfileStrategy
            storeInfo={storeInfo}
            storeStrategy={completeStoreStrategy}
          />
        </TabsContent>

        <TabsContent value='social' className="space-y-4 sm:space-y-6 mt-2">
          <ProfileSection title='Réseaux sociaux'>
            <SocialMediaConnections socialProfiles={storeStrategy.socialProfiles} onSocialProfilesChange={() => { }} />
          </ProfileSection>
        </TabsContent>

        <TabsContent value='seo' className="space-y-4 sm:space-y-6 mt-2">
          <ProfileSection title='Optimisation SEO'>
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
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

                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Ajouter un mot clé"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                    className="w-full sm:w-auto sm:flex-1"
                  />
                  <Button onClick={handleAddKeyword} variant="outline" className="w-full sm:w-auto">
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
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Strategy;
