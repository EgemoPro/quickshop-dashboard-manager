
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOSettings as SEOSettingsType } from '@/store/slices/strategySlice';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/store/hooks';
import { updateSEOSettings } from '@/store/slices/strategySlice';
import { Search, Share, Wifi, Link, Globe, Rss } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SEOSettingsProps {
  seoSettings: SEOSettingsType;
}

const SEOSettings: React.FC<SEOSettingsProps> = ({ seoSettings }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [localSettings, setLocalSettings] = useState(seoSettings);
  
  // Handle meta description change
  const handleMetaDescriptionChange = (value: string) => {
    setLocalSettings(prev => ({ ...prev, metaDescription: value }));
  };
  
  // Save changes to redux store
  const saveChanges = () => {
    dispatch(updateSEOSettings(localSettings));
    
    toast({
      title: "Paramètres SEO mis à jour",
      description: "Les paramètres SEO ont été enregistrés avec succès.",
    });
  };
  
  // Handle toggle change
  const handleToggle = (field: keyof Omit<SEOSettingsType, 'keywords' | 'metaDescription' | 'openGraph' | 'analytics'>) => {
    setLocalSettings(prev => ({ 
      ...prev, 
      [field]: !prev[field] 
    }));
  };

  // Handle open graph data change
  const handleOpenGraphChange = (field: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      openGraph: {
        ...prev.openGraph,
        [field]: value
      }
    }));
  };

  // Handle analytics change
  const handleAnalyticsChange = (field: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        [field]: value
      }
    }));
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Basique
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Réseaux sociaux
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Avancé
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="metaDescription">Meta description</Label>
            <Textarea
              id="metaDescription"
              value={localSettings.metaDescription}
              onChange={(e) => handleMetaDescriptionChange(e.target.value)}
              rows={2}
            />
            <p className="text-xs text-gray-500">
              {localSettings.metaDescription.length}/160 caractères. La meta description apparaît dans les résultats de recherche.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Paramètres techniques</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Sitemap XML</p>
                <p className="text-xs text-gray-500">Générer un sitemap pour les moteurs de recherche</p>
              </div>
              <Switch 
                id="sitemap-switch" 
                checked={localSettings.sitemap}
                onCheckedChange={() => handleToggle('sitemap')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Partage social</p>
                <p className="text-xs text-gray-500">Optimiser pour les réseaux sociaux</p>
              </div>
              <Switch 
                id="social-switch" 
                checked={localSettings.socialSharing}
                onCheckedChange={() => handleToggle('socialSharing')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">URLs canoniques</p>
                <p className="text-xs text-gray-500">Éviter le contenu dupliqué</p>
              </div>
              <Switch 
                id="canonical-switch" 
                checked={localSettings.canonicalUrls}
                onCheckedChange={() => handleToggle('canonicalUrls')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Données structurées</p>
                <p className="text-xs text-gray-500">Améliorer la visibilité dans les résultats de recherche</p>
              </div>
              <Switch 
                id="structured-switch" 
                checked={localSettings.structuredData}
                onCheckedChange={() => handleToggle('structuredData')}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Paramètres Open Graph</h4>
            <p className="text-sm text-gray-500">
              Ces informations sont utilisées lorsque votre site est partagé sur les réseaux sociaux.
            </p>
            
            <div className="grid gap-2">
              <Label htmlFor="og-title">Titre (Open Graph)</Label>
              <Input
                id="og-title"
                value={localSettings.openGraph?.title || ''}
                onChange={(e) => handleOpenGraphChange('title', e.target.value)}
                placeholder="Titre pour les réseaux sociaux"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="og-description">Description (Open Graph)</Label>
              <Textarea
                id="og-description"
                value={localSettings.openGraph?.description || ''}
                onChange={(e) => handleOpenGraphChange('description', e.target.value)}
                rows={2}
                placeholder="Description pour les réseaux sociaux"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="og-image">URL de l'image (Open Graph)</Label>
              <Input
                id="og-image"
                value={localSettings.openGraph?.imageUrl || ''}
                onChange={(e) => handleOpenGraphChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500">
                Taille recommandée: 1200 x 630 pixels
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Twitter Cards</p>
                <p className="text-xs text-gray-500">Activer les Twitter Cards pour un meilleur affichage sur Twitter</p>
              </div>
              <Switch 
                id="twitter-cards-switch" 
                checked={localSettings.openGraph?.twitterCards || false}
                onCheckedChange={() => handleOpenGraphChange('twitterCards', (!localSettings.openGraph?.twitterCards).toString())}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Paramètres avancés</h4>
            
            <div className="grid gap-2">
              <Label htmlFor="robots-txt">Contenu robots.txt</Label>
              <Textarea
                id="robots-txt"
                value={localSettings.robotsTxt || ''}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, robotsTxt: e.target.value }))}
                rows={3}
                placeholder="User-agent: *\nDisallow: /admin/\nAllow: /"
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500">
                Le fichier robots.txt indique aux robots d'indexation quelles pages peuvent être crawlées.
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="analytics-id">ID Google Analytics</Label>
              <Input
                id="analytics-id"
                value={localSettings.analytics?.googleAnalyticsId || ''}
                onChange={(e) => handleAnalyticsChange('googleAnalyticsId', e.target.value)}
                placeholder="UA-XXXXXXXXX-X ou G-XXXXXXXXXX"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="gtm-id">ID Google Tag Manager</Label>
              <Input
                id="gtm-id"
                value={localSettings.analytics?.googleTagManagerId || ''}
                onChange={(e) => handleAnalyticsChange('googleTagManagerId', e.target.value)}
                placeholder="GTM-XXXXXXX"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Indexation par les moteurs</p>
                <p className="text-xs text-gray-500">Autoriser l'indexation par les moteurs de recherche</p>
              </div>
              <Switch 
                id="indexing-switch" 
                checked={localSettings.allowIndexing || false}
                onCheckedChange={() => handleToggle('allowIndexing')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Compression GZIP</p>
                <p className="text-xs text-gray-500">Améliorer les performances avec la compression</p>
              </div>
              <Switch 
                id="gzip-switch" 
                checked={localSettings.gzipCompression || false}
                onCheckedChange={() => handleToggle('gzipCompression')}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={saveChanges}>
          Enregistrer les paramètres SEO
        </Button>
      </div>
    </div>
  );
};

export default SEOSettings;
