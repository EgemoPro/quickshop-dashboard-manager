
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketingOverview from '@/components/marketing/MarketingOverview';
import MarketingStats from '@/components/marketing/MarketingStats';
import CampaignsSection from '@/components/marketing/CampaignsSection';
import PromotionSection from '@/components/marketing/PromotionSection';
import EmailSection from '@/components/marketing/EmailSection';
import LoyaltySection from '@/components/marketing/LoyaltySection';
import MarketingPerformanceMetrics from '@/components/marketing/MarketingPerformanceMetrics';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  MessageSquare, 
  BarChart3, 
  Gift, 
  Mail,
  Activity
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Marketing = () => {
  const { 
    activeCampaigns, 
    promoCodesCount, 
    emailSubscribers 
  } = useSelector((state: RootState) => state.marketing);
  
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in w-full px-2 sm:px-4 py-4 sm:py-6">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Marketing</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Gérez vos campagnes marketing, promotions et programmes de fidélité
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center overflow-x-auto pb-2">
          <TabsList className="w-full sm:w-auto flex">
            <TabsTrigger value="overview" className="flex items-center gap-1 flex-1 sm:flex-initial">
              <LineChart className="h-4 w-4" />
              {!isMobile && "Aperçu"}
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1 flex-1 sm:flex-initial">
              <Activity className="h-4 w-4" />
              {!isMobile && "Performance"}
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-1 flex-1 sm:flex-initial">
              <MessageSquare className="h-4 w-4" />
              {!isMobile && "Campagnes"}
              {activeCampaigns > 0 && <Badge variant="secondary" className="ml-1">{activeCampaigns}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-1 flex-1 sm:flex-initial">
              <Gift className="h-4 w-4" />
              {!isMobile && "Promotions"}
              {promoCodesCount > 0 && <Badge variant="secondary" className="ml-1">{promoCodesCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center gap-1 flex-1 sm:flex-initial">
              <Mail className="h-4 w-4" />
              {!isMobile && "Emails"}
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="flex items-center gap-1 flex-1 sm:flex-initial">
              <BarChart3 className="h-4 w-4" />
              {!isMobile && "Fidélité"}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <MarketingOverview />
          <MarketingStats />
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4 sm:space-y-6">
          <MarketingPerformanceMetrics />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4 sm:space-y-6">
          <CampaignsSection />
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4 sm:space-y-6">
          <PromotionSection />
        </TabsContent>

        <TabsContent value="emails" className="space-y-4 sm:space-y-6">
          <EmailSection />
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-4 sm:space-y-6">
          <LoyaltySection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketing;
