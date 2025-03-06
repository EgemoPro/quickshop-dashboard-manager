
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Store } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import UserProfileStrategy from '@/components/strategy/UserProfileStrategy';
import StoreProfileStrategy from '@/components/strategy/StoreProfileStrategy';
import { useIsMobile } from '@/hooks/use-mobile';

const Strategy = () => {
  const { user } = useAppSelector(state => state.auth);
  const { storeStrategy } = useAppSelector(state => state.strategy);
  const isMobile = useIsMobile();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2 sm:px-4 py-6 sm:py-8"
    >
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Stratégie</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Gérez votre profil utilisateur et optimisez votre boutique en ligne
        </p>
      </header>

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
        </TabsList>

        <TabsContent value="user" className="space-y-4 sm:space-y-6 mt-2">
          <UserProfileStrategy user={user} />
        </TabsContent>

        <TabsContent value="store" className="space-y-4 sm:space-y-6 mt-2">
          <StoreProfileStrategy 
            storeInfo={user.storeInfo} 
            storeStrategy={storeStrategy} 
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Strategy;
