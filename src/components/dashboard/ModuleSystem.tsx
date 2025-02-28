
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, ArrowRight, CheckCircle, BarChart3, ShoppingCart, Users, DollarSign, TrendingUp } from "lucide-react";

interface ModuleSystemProps {
  darkMode: boolean;
}

const ModuleSystem: React.FC<ModuleSystemProps> = ({ darkMode }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const handleAddModule = () => {
    setOpen(false);
    toast({
      title: "Module ajouté",
      description: "Le nouveau module a été ajouté avec succès.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader>
          <CardTitle>Modules complémentaires</CardTitle>
          <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            Améliorez votre tableau de bord avec des modules additionnels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={`border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50'} h-32 flex flex-col justify-center items-center cursor-pointer hover:shadow-md transition-all duration-300`}>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <div className="text-center p-4">
                    <PlusCircle className={`h-8 w-8 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Ajouter un module</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau module</DialogTitle>
                    <DialogDescription>
                      Choisissez parmi notre catalogue de modules pour améliorer votre tableau de bord.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="analytics">
                    <TabsList className="w-full">
                      <TabsTrigger value="analytics" className="flex-1">Analytiques</TabsTrigger>
                      <TabsTrigger value="marketing" className="flex-1">Marketing</TabsTrigger>
                      <TabsTrigger value="social" className="flex-1">Réseaux sociaux</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="analytics" className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                          <div className="flex items-start gap-3">
                            <BarChart3 className="h-5 w-5 text-blue-500 mt-1" />
                            <div>
                              <h4 className="text-base font-medium">Analyses avancées</h4>
                              <p className="text-sm text-gray-500 mt-1">Obtenez des insights détaillés sur les performances de votre boutique.</p>
                              <div className="flex justify-between items-center mt-3">
                                <span className="text-sm font-medium">9.99€/mois</span>
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="h-4 w-4 mr-1" /> Populaire
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                          <div className="flex items-start gap-3">
                            <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
                            <div>
                              <h4 className="text-base font-medium">Prévisions de ventes</h4>
                              <p className="text-sm text-gray-500 mt-1">Prédisez vos ventes futures avec l'IA.</p>
                              <div className="flex justify-between items-center mt-3">
                                <span className="text-sm font-medium">14.99€/mois</span>
                                <Button size="sm" variant="ghost">Détails</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                          <div className="flex items-start gap-3">
                            <ShoppingCart className="h-5 w-5 text-orange-500 mt-1" />
                            <div>
                              <h4 className="text-base font-medium">Analyse du panier</h4>
                              <p className="text-sm text-gray-500 mt-1">Comprendre le comportement d'achat de vos clients.</p>
                              <div className="flex justify-between items-center mt-3">
                                <span className="text-sm font-medium">7.99€/mois</span>
                                <Button size="sm" variant="ghost">Détails</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-purple-500 mt-1" />
                            <div>
                              <h4 className="text-base font-medium">Segmentation clients</h4>
                              <p className="text-sm text-gray-500 mt-1">Segmentez votre clientèle pour des campagnes ciblées.</p>
                              <div className="flex justify-between items-center mt-3">
                                <span className="text-sm font-medium">12.99€/mois</span>
                                <Button size="sm" variant="ghost">Détails</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="marketing" className="mt-4">
                      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Modules de marketing bientôt disponibles</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="social" className="mt-4">
                      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Modules de réseaux sociaux bientôt disponibles</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                    <Button onClick={handleAddModule}>Ajouter le module</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>
            
            <Card className={`border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50'} h-32 flex flex-col justify-center items-center cursor-pointer hover:shadow-md transition-all duration-300`}>
              <div className="text-center p-4">
                <DollarSign className={`h-8 w-8 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Explorer la marketplace</p>
              </div>
            </Card>
          </div>
          
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center justify-between">
            <div>
              <h3 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Plan Premium</h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Accédez à tous les modules avec notre plan premium
              </p>
            </div>
            <Button variant="default" size="sm" className="whitespace-nowrap">
              Voir les offres <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModuleSystem;
