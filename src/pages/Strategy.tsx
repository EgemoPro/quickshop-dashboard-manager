
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Store } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import UserProfileStrategy from '@/components/strategy/UserProfileStrategy';
import StoreProfileStrategy from '@/components/strategy/StoreProfileStrategy';

const Strategy = () => {
  const { user } = useAppSelector(state => state.auth);
  const { storeStrategy } = useAppSelector(state => state.strategy);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Stratégie</h1>
        <p className="text-gray-600 mt-1">
          Gérez votre profil utilisateur et optimisez votre boutique en ligne
        </p>
      </header>

      <Tabs defaultValue="user" className="space-y-6">
        <TabsList className="mb-6">
          <TabsTrigger value="user" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profil Utilisateur
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Boutique en ligne
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-6">
          <UserProfileStrategy user={user} />
        </TabsContent>

        <TabsContent value="store" className="space-y-6">
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
