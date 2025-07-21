
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
    promoCodes,
    campaigns,
    activeCampaigns,
    promoCodesCount,
    emailSubscribers
  } = useSelector((state: RootState) => state.marketing);

  const isMobile = useIsMobile();

  return (
    <div className=" animate-fade-in w-full px-2 sm:px-4 space-y-4">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Marketing</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Gérez vos campagnes marketing, promotions et programmes de fidélité
        </p>
      </div>

      <Tabs defaultValue="overview" className="flex flex-row gap-2">
        <div className=" w-1/4">
          <TabsList className="p-2 w-full h-auto justify-around items-center flex flex-col">
            <TabsTrigger value="overview" className="w-full flex justify-start items-start gap-1 p-3">
              <LineChart className="h-4 w-4" />
              {!isMobile && "Aperçu"}
            </TabsTrigger>
            <TabsTrigger value="performance" className="p-3 w-full flex justify-start items-start gap-1">
              <Activity className="h-4 w-4" />
              {!isMobile && "Performance"}
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="p-3 w-full flex justify-start items-start gap-1">
              <MessageSquare className="h-4 w-4" />
              {!isMobile && "Campagnes"}
              {activeCampaigns > 0 && <Badge variant="secondary" className="ml-1">{activeCampaigns}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="promotions" className="p-3 w-full flex justify-start items-start gap-1">
              <Gift className="h-4 w-4" />
              {!isMobile && "Promotions"}
              {promoCodesCount > 0 && <Badge variant="secondary" className="ml-1">{promoCodesCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="emails" className="p-3 w-full flex justify-start items-start gap-1">
              <Mail className="h-4 w-4" />
              {!isMobile && "Emails"}
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="p-3 w-full flex justify-start items-start gap-1">
              <BarChart3 className="h-4 w-4" />
              {!isMobile && "Fidélité"}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className='w-3/4'>
          <TabsContent value="overview" className="w-full m-0 space-y-3">
            <MarketingOverview />
            <MarketingStats />
          </TabsContent>

          <TabsContent value="performance" className="w-full m-0 space-y-3">
            <MarketingPerformanceMetrics />
          </TabsContent>

          <TabsContent value="campaigns" className="w-full m-0 space-y-3">
            <CampaignsSection />
          </TabsContent>

          <TabsContent value="promotions" className="w-full m-0 space-y-3">
            <PromotionSection promoCodes={promoCodes} />
          </TabsContent>

          <TabsContent value="emails" className="w-full m-0 space-y-3">
            <EmailSection />
          </TabsContent>

          <TabsContent value="loyalty" className="w-full m-0 space-y-3">
            <LoyaltySection />
          </TabsContent>
        </div>
      </Tabs>
    </div >
  );
};

export default Marketing;
