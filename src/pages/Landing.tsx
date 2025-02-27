
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  Package2,
  ShoppingCart,
  Shield,
  UserCircle,
  CreditCard,
  Truck,
  Headphones,
  Bell,
  BarChart3,
  ChevronRight,
  Lock,
  Users,
  Search
} from "lucide-react";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const microservices = [
    {
      id: 1,
      title: "Authentification",
      description: "Gestion sécurisée des utilisateurs et des connexions",
      icon: <UserCircle className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Catalogue Produits",
      description: "Gestion avancée et recherche avec ElasticSearch",
      icon: <Package2 className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-100",
    },
    {
      id: 3,
      title: "Panier & Commandes",
      description: "Traitement fluide des commandes et codes promo",
      icon: <ShoppingCart className="h-8 w-8 text-green-500" />,
      color: "bg-green-100",
    },
    {
      id: 4,
      title: "Paiement Sécurisé",
      description: "Intégration avec PayPal, Stripe et systèmes mobiles",
      icon: <CreditCard className="h-8 w-8 text-red-500" />,
      color: "bg-red-100",
    },
    {
      id: 5,
      title: "Service de Livraison",
      description: "Suivi des colis en temps réel",
      icon: <Truck className="h-8 w-8 text-amber-500" />,
      color: "bg-amber-100",
    },
    {
      id: 6,
      title: "Support Client",
      description: "Chatbot intelligent et assistance personnalisée",
      icon: <Headphones className="h-8 w-8 text-indigo-500" />,
      color: "bg-indigo-100",
    },
    {
      id: 7,
      title: "Notifications",
      description: "Alertes par email, SMS et notifications push",
      icon: <Bell className="h-8 w-8 text-pink-500" />,
      color: "bg-pink-100",
    },
    {
      id: 8,
      title: "Analyse & Reporting",
      description: "Visualisation avancée des données commerciales",
      icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
      color: "bg-teal-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                QuickShop
              </span>
              <br />
              <span className="text-3xl">Plateforme E-commerce Évolutive</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Une architecture moderne basée sur des microservices pour une expérience
              utilisateur fluide et une gestion efficace de votre commerce en ligne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-semibold px-8 py-6">
                Découvrir
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="font-semibold px-8 py-6">
                Voir la démo
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="register">Inscription</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Link to="#" className="text-sm text-blue-600 hover:underline">
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <Input id="password" type="password" />
                    </div>
                    <Button className="w-full">Se connecter</Button>
                    <div className="text-center text-sm text-gray-500 mt-4">
                      Pas encore de compte?{" "}
                      <button 
                        className="text-blue-600 hover:underline" 
                        onClick={() => setActiveTab("register")}
                      >
                        S'inscrire
                      </button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="register">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Prénom</Label>
                        <Input id="first-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Nom</Label>
                        <Input id="last-name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="w-full">S'inscrire</Button>
                    <div className="text-center text-sm text-gray-500 mt-4">
                      Déjà un compte?{" "}
                      <button 
                        className="text-blue-600 hover:underline" 
                        onClick={() => setActiveTab("login")}
                      >
                        Se connecter
                      </button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Une Architecture Microservices Complète</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              QuickShop est construit sur une architecture moderne et modulaire, permettant une scalabilité et une maintenance aisées.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {microservices.map((service, i) => (
              <motion.div
                key={service.id}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`rounded-lg p-3 w-fit ${service.color}`}>
                      {service.icon}
                    </div>
                    <CardTitle className="mt-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-16 bg-white rounded-2xl shadow-sm p-8 mb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça fonctionne</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez le parcours d'une commande à travers notre plateforme QuickShop.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ol className="relative border-l border-gray-200 ml-3">
              {[
                {
                  title: "Inscription & Authentification",
                  description: "L'utilisateur crée un compte et se connecte de manière sécurisée",
                  icon: <UserCircle className="h-5 w-5 text-white" />,
                  color: "bg-blue-500"
                },
                {
                  title: "Navigation & Sélection",
                  description: "L'utilisateur navigue dans le catalogue et ajoute des produits à son panier",
                  icon: <Search className="h-5 w-5 text-white" />,
                  color: "bg-purple-500"
                },
                {
                  title: "Validation & Paiement",
                  description: "L'utilisateur valide sa commande et effectue un paiement sécurisé",
                  icon: <CreditCard className="h-5 w-5 text-white" />,
                  color: "bg-green-500"
                },
                {
                  title: "Traitement & Livraison",
                  description: "La commande est traitée et expédiée avec suivi en temps réel",
                  icon: <Truck className="h-5 w-5 text-white" />,
                  color: "bg-amber-500"
                },
                {
                  title: "Notifications & Support",
                  description: "Le client reçoit des mises à jour par email/SMS et peut contacter l'assistance",
                  icon: <Bell className="h-5 w-5 text-white" />,
                  color: "bg-indigo-500"
                },
              ].map((step, index) => (
                <motion.li 
                  key={index} 
                  className="mb-10 ml-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span className={`absolute flex items-center justify-center w-10 h-10 ${step.color} rounded-full -left-5`}>
                    {step.icon}
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technologies Utilisées</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              QuickShop s'appuie sur des technologies modernes pour offrir une expérience de qualité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
                <CardDescription>Interface utilisateur réactive et fluide</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "React.js (Next.js) pour un rendu optimisé",
                    "Tailwind CSS pour une UI responsive et moderne",
                    "Lazy Loading pour une performance améliorée",
                    "Server-Side Rendering pour un SEO optimal"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 bg-green-500 rounded-full p-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle>Backend & Infrastructure</CardTitle>
                <CardDescription>Systèmes robustes et scalables</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Node.js (NestJS) pour un backend structuré",
                    "PostgreSQL et Redis pour le stockage et mise en cache",
                    "AWS S3 pour le stockage des fichiers et images",
                    "Docker et Kubernetes pour un déploiement scalable"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-500 rounded-full p-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-full shadow-lg">
                <Shield className="h-24 w-24 text-blue-500" />
              </div>
            </motion.div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sécurité et Performance</h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "Cryptage Avancé",
                    description: "Protection des données sensibles avec bcrypt et HTTPS"
                  },
                  {
                    title: "Protection contre les Attaques",
                    description: "Sécurisation contre les injections SQL, XSS et CSRF"
                  },
                  {
                    title: "Monitoring Proactif",
                    description: "Surveillance des activités suspectes en temps réel"
                  },
                  {
                    title: "Performances Optimisées",
                    description: "Réduction de la latence et mise en cache avec Redis"
                  }
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="mr-4 mt-1">
                      <Lock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Prêt à révolutionner votre commerce en ligne ?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Rejoignez QuickShop dès aujourd'hui et découvrez une plateforme e-commerce moderne, 
            rapide et sécurisée pour développer votre activité.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="font-semibold px-8 py-6">
              Commencer maintenant
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 py-6">
              Discuter avec un expert
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">QuickShop</h3>
              <p className="text-gray-500">
                Une plateforme e-commerce moderne basée sur les microservices pour une expérience
                utilisateur fluide et une gestion efficace.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                {["Fonctionnalités", "Tarifs", "Documentation", "Support", "Blog"].map((item, i) => (
                  <li key={i}>
                    <Link to="#" className="text-gray-500 hover:text-blue-600">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-500 mb-4">
                Besoin d'aide ou d'informations supplémentaires ? N'hésitez pas à nous contacter.
              </p>
              <Button variant="outline" onClick={() => window.location.href = "/chat"}>
                <Headphones className="mr-2 h-4 w-4" />
                Contactez-nous
              </Button>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-12">
            &copy; {new Date().getFullYear()} QuickShop. Tous droits réservés.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
