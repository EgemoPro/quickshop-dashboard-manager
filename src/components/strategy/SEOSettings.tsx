
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SEOSettings as SEOSettingsType } from '@/store/slices/strategySlice';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/store/hooks';
import { updateSEOSettings } from '@/store/slices/strategySlice';

interface SEOSettingsProps {
  seoSettings: SEOSettingsType;
}

const SEOSettings: React.FC<SEOSettingsProps> = ({ seoSettings }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  // Handle meta description change
  const handleMetaDescriptionChange = (value: string) => {
    dispatch(updateSEOSettings({ metaDescription: value }));
  };
  
  // Handle toggle change
  const handleToggle = (field: keyof Omit<SEOSettingsType, 'keywords' | 'metaDescription'>) => {
    dispatch(updateSEOSettings({ [field]: !seoSettings[field] }));
    
    toast({
      title: "Paramètre SEO mis à jour",
      description: `Le paramètre ${field} a été ${!seoSettings[field] ? 'activé' : 'désactivé'}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="metaDescription">Meta description</Label>
        <Textarea
          id="metaDescription"
          value={seoSettings.metaDescription}
          onChange={(e) => handleMetaDescriptionChange(e.target.value)}
          rows={2}
        />
        <p className="text-xs text-gray-500">
          {seoSettings.metaDescription.length}/160 caractères. La meta description apparaît dans les résultats de recherche.
        </p>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium">Paramètres techniques</h4>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Sitemap XML</p>
            <p className="text-xs text-gray-500">Générer un sitemap pour les moteurs de recherche</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={seoSettings.sitemap}
              onChange={() => handleToggle('sitemap')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Partage social</p>
            <p className="text-xs text-gray-500">Optimiser pour les réseaux sociaux</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={seoSettings.socialSharing}
              onChange={() => handleToggle('socialSharing')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">URLs canoniques</p>
            <p className="text-xs text-gray-500">Éviter le contenu dupliqué</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={seoSettings.canonicalUrls}
              onChange={() => handleToggle('canonicalUrls')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Données structurées</p>
            <p className="text-xs text-gray-500">Améliorer la visibilité dans les résultats de recherche</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={seoSettings.structuredData}
              onChange={() => handleToggle('structuredData')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SEOSettings;
