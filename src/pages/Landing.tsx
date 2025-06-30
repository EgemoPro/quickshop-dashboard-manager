
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import {
  Package2,
  ShoppingCart,
  Shield,
  // UserCircle,
  // CreditCard,
  // Truck,
  // Headphones,
  // Bell,
  BarChart3,
  ChevronRight,
  // Lock,
  // Users,
  // Search,
  // TrendingUp,
  MessageCircle,
  Tag,
  Star,
  CheckCircle,
  Zap,
  PlusCircle,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  // Eye,
  // EyeOff,
  Menu,
  X,
  Blocks,
  Package2Icon,
  Globe2,
  SearchCheckIcon,
  AirplayIcon,
  PlaneTakeoff,
  // Mail
} from "lucide-react";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Refs pour la navigation fluide
  const heroRef = useRef<HTMLElement>(null);
  const advantagesRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [id]: value }));
  // };

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   // Simuler un délai d'authentification
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     // Pour l'instant, on considère tous les logins comme réussis
  //     toast({
  //       title: "Connexion réussie",
  //       description: "Bienvenue sur QuickShop!",
  //     });
  //     // Rediriger vers le dashboard
  //     navigate("/dashboard");
  //   }, 1500);
  // };

  // const handleRegister = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validation simple
  //   if (formData.password !== formData.confirmPassword) {
  //     toast({
  //       title: "Erreur d'inscription",
  //       description: "Les mots de passe ne correspondent pas.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simuler un délai d'inscription
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     toast({
  //       title: "Inscription réussie",
  //       description: "Votre compte a été créé avec succès!",
  //     });
  //     // Rediriger vers le dashboard
  //     navigate("/dashboard");
  //   }, 1500);
  // };

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

  // const fadeIn = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: { duration: 0.6 }
  //   }
  // };

  const slideInLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // const slideInRight = {
  //   hidden: { x: 60, opacity: 0 },
  //   visible: {
  //     x: 0,
  //     opacity: 1,
  //     transition: { duration: 0.6 }
  //   }
  // };

  const advantages = [
    {
      icon: Package2,
      title: "Gestion complète de votre boutique",
      description: "Ajoutez des produits, gérez vos stocks, et suivez vos commandes en temps réel"
    },
    {
      icon: BarChart3,
      title: "Analyse en temps réel",
      description: "Suivez vos ventes, identifiez les tendances et optimisez vos performances"
    },
    {
      icon: MessageCircle,
      title: "Communication directe avec vos clients",
      description: "Messagerie intégrée et notifications pour un service client exceptionnel"
    },
    {
      icon: Tag,
      title: "Promotions & marketing simplifiés",
      description: "Créez des codes promo et lancez des campagnes publicitaires en quelques clics"
    },
    {
      icon: Zap,
      title: "Interface moderne et intuitive",
      description: "Rapide, mobile-friendly et entièrement personnalisable selon vos besoins"
    },
  ];

  const testimonials = [
    {
      name: "Fatima K.",
      business: "Bijouterie Éclat",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100",
      rating: 5,
      text: "QuickShop a changé mon business ! Grâce à leur dashboard, je gère tout en quelques clics et mes ventes ont explosé de 35% en seulement deux mois."
    },
    {
      name: "Thomas M.",
      business: "TechStore",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100",
      rating: 5,
      text: "L'interface est incroyablement intuitive et les analyses m'aident à prendre des décisions commerciales éclairées. Le support client est également remarquable."
    },
    {
      name: "Sophie L.",
      business: "Mode Éthique",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      rating: 4,
      text: "Depuis que j'utilise QuickShop, je passe moins de temps sur la gestion et plus de temps sur la création. Mes clients sont plus satisfaits et mes ventes ont augmenté de 28%."
    }
  ];

  const faqs = [
    {
      question: "Est-ce vraiment gratuit ?",
      answer: "Oui, vous bénéficiez d'un mois d'essai complet sans engagement. Tous les outils et fonctionnalités sont disponibles pendant cette période."
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer: "Absolument ! Vous pouvez annuler votre abonnement à tout moment pendant la période d'essai sans aucuns frais ni engagement."
    },
    {
      question: "Comment QuickShop m'aide à vendre plus ?",
      answer: "QuickShop offre des outils de gestion avancés, des analyses détaillées et des fonctionnalités marketing qui vous permettent d'optimiser votre stratégie de vente, d'améliorer l'expérience client et d'augmenter votre chiffre d'affaires."
    },
    {
      question: "Est-ce que je peux intégrer QuickShop à mon site existant ?",
      answer: "Oui, QuickShop s'intègre facilement avec la plupart des plateformes e-commerce. Notre équipe d'assistance est disponible pour vous aider avec l'intégration."
    }
  ];

  // Navbar items pour la navigation fluide
  const navItems = [
    { name: "Accueil", ref: heroRef },
    { name: "Avantages", ref: advantagesRef },
    { name: "Dashboard", ref: dashboardRef },
    { name: "Témoignages", ref: testimonialsRef },
    { name: "FAQ", ref: faqRef },
    { name: "Démarrer", ref: ctaRef }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 overflow-x-hidden">
      {/* Barre de navigation fixe */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                QuickShop
              </span>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden lg:w-2/3 md:flex items-center justify-betwee space-x-8 lg:gap-16">
              <div className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.ref)}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="gap-3 flex flex-row">
                <Link to={"/login"} className="text-gray-500">
                  Connexion
                </Link>
                <Link to={"/login"} className="text-blue-600 hover:text-blue-700">
                  Inscription
                </Link>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-3 space-y-3">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.ref)}
                  className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-2 pb-3">
                <Button onClick={() => {
                  setActiveTab("login");
                  setMobileMenuOpen(false);
                }} variant="outline" className="w-full">
                  Connexion
                </Button>
                <Button onClick={() => {
                  setActiveTab("register");
                  setMobileMenuOpen(false);
                }} className="w-full bg-blue-600 hover:bg-blue-700">
                  Inscription
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <div className="mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16 px-4 md:px-8 lg:px-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-70"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <motion.div
                className="w-full lg:w-1/2 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
              >
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-3">
                  1 mois d'essai gratuit
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mt-4 mb-4 leading-tight">
                  Vendez mieux, vendez plus,
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}vendez intelligemment !
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Rejoignez QuickShop et accédez à un outil puissant pour gérer vos ventes,
                  suivre vos commandes et booster votre chiffre d'affaires, sans effort.
                  Profitez d'un mois d'essai GRATUIT, sans engagement !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 shadow-lg shadow-blue-500/20 transition-all w-full sm:w-auto">
                    Commencez GRATUITEMENT
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="font-semibold text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 border-2 w-full sm:w-auto">
                    Voir la démo
                  </Button>
                </div>
                <div className="mt-4 text-sm text-gray-500 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                  <span>Sans carte bancaire • Annulation facile</span>
                </div>
              </motion.div>

              {/* <motion.div 
                className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
                  <Card className="relative w-full overflow-hidden border-0 shadow-2xl">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="login">Connexion</TabsTrigger>
                        <TabsTrigger value="register">Inscription</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4 px-4 sm:px-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder="votre@email.com" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password">Mot de passe</Label>
                              <Link to="#" className="text-sm text-blue-600 hover:underline">
                                Mot de passe oublié?
                              </Link>
                            </div>
                            <div className="relative">
                              <Input 
                                id="password" 
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <button 
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-5 sm:py-6 text-base" disabled={isLoading}>
                            {isLoading ? "Connexion en cours..." : "Se connecter"}
                          </Button>
                          <div className="text-center text-sm text-gray-500 mt-4 pb-4">
                            Pas encore de compte?{" "}
                            <button 
                              type="button"
                              className="text-blue-600 hover:underline" 
                              onClick={() => setActiveTab("register")}
                            >
                              S'inscrire
                            </button>
                          </div>
                        </form>
                      </TabsContent>
                      <TabsContent value="register">
                        <form onSubmit={handleRegister} className="space-y-4 px-4 sm:px-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">Prénom</Label>
                              <Input 
                                id="firstName" 
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Nom</Label>
                              <Input 
                                id="lastName" 
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder="votre@email.com" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <div className="relative">
                              <Input 
                                id="password" 
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <button 
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                            <div className="relative">
                              <Input 
                                id="confirmPassword" 
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <button 
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-5 sm:py-6 text-base" disabled={isLoading}>
                            {isLoading ? "Inscription en cours..." : "Commencez gratuitement"}
                          </Button>
                          <div className="text-center text-sm text-gray-500 mt-4 pb-4">
                            Déjà un compte?{" "}
                            <button 
                              type="button"
                              className="text-blue-600 hover:underline" 
                              onClick={() => setActiveTab("login")}
                            >
                              Se connecter
                            </button>
                          </div>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </Card>
                </div>
              </motion.div> */}
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <motion.div
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-3xl sm:text-4xl font-bold">+10 000</h3>
                <p className="text-blue-100">vendeurs déjà inscrits</p>
              </motion.div>
              <motion.div
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl sm:text-4xl font-bold">+80%</h3>
                <p className="text-blue-100">de croissance moyenne des ventes</p>
              </motion.div>
              <motion.div
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-3xl sm:text-4xl font-bold">4,8/5</h3>
                <p className="text-blue-100">de satisfaction client</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section ref={advantagesRef} className="py-12 sm:py-20 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi QuickShop ?</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez comment notre dashboard vendeur peut transformer votre activité e-commerce
                et vous faire gagner du temps et de l'argent.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {advantages.map((advantage, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-100"
                >
                  <div className="bg-blue-50 rounded-full w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center mb-4 sm:mb-5">
                    <advantage.icon className="h-6 sm:h-7 w-6 sm:w-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{advantage.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section ref={dashboardRef} className="py-12 sm:py-20 px-4 md:px-8 lg:px-16 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-70"></div>
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Un Dashboard Puissant et Intuitif</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Gérez votre boutique en ligne comme un pro grâce à notre interface intuitive
                et nos outils d'analyse avancés.
              </p>
            </motion.div>

            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-20"></div>
              <motion.div
                className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1531973486364-5fa64260d75b?auto=format&fit=crop&q=80&w=1000"
                  alt="QuickShop Dashboard Preview"
                  className="w-full h-auto rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                  <div className="p-4 sm:p-8 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Dashboard vendeur complet</h3>
                    <p className="text-gray-200 mb-4 text-sm sm:text-base">Toutes vos données importantes à portée de clic</p>
                    <Button className="bg-white text-blue-600 hover:bg-blue-50 text-sm sm:text-base">
                      Explorer les fonctionnalités
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 sm:mt-12">
              <motion.div
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                    <BarChart3 className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold">Analyse des ventes</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Visualisez vos performances et identifiez les opportunités de croissance</p>
              </motion.div>

              <motion.div
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                    <ShoppingCart className="h-5 sm:h-6 w-5 sm:w-6 text-green-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold">Gestion des commandes</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Suivez et traitez vos commandes plus efficacement que jamais</p>
              </motion.div>

              <motion.div
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                    <MessageCircle className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold">Support client</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Communiquez avec vos clients et résolvez leurs problèmes rapidement</p>
              </motion.div>

              <motion.div
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                    <Blocks className="h-5 sm:h-6 w-5 sm:w-6 text-orange-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold">+200 Modules complémentaires</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Intégrez facilement des modules complémentaires selon vos besoins, CRM et outils de workflow pour optimiser vos processus et améliorer la gestion de votre boutique.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                    <SearchCheckIcon className="h-5 sm:h-6 w-5 sm:w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold">SEO et Reférencement</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Reférencement de votre boutique sur notre moteur intelligent pour augmenter votre visibilité et vos ventes.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-cyan-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                    <PlaneTakeoff className="h-5 sm:h-6 w-5 sm:w-6 text-cyan-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold">Livraison</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Intégrez simplement des services de Livraison de colis pour vos clients, et suivez les en temps réel en choisissant parmi nos partenaires.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Offer Section */}
        <section className="py-12 sm:py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full">
                  <PlusCircle className="h-12 sm:h-16 w-12 sm:w-16" />
                </div>
              </motion.div>
              <motion.h2
                className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                1 Mois d'Essai Gratuit !
              </motion.h2>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 sm:mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Essayez QuickShop gratuitement pendant 30 jours et découvrez comment
                transformer votre boutique en véritable machine à vendre !
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-7 shadow-xl shadow-blue-800/20 transition-all">
                  <Link to={"/dashboard"}>
                  Je profite de mon mois GRATUIT
                  </Link>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="mt-5 text-sm text-blue-100 flex items-center justify-center flex-wrap">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  <span>Sans engagement • Annulation facile • Accès complet</span>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialsRef} className="py-12 sm:py-20 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos vendeurs</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez comment QuickShop a aidé des milliers de vendeurs à développer leur activité en ligne.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-50 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{testimonial.business}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="py-12 sm:py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Tout ce que vous devez savoir avant de commencer
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    className="flex justify-between items-center w-full p-4 sm:p-6 text-left focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === i ? 'transform rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-40 px-4 sm:px-6 pb-4 sm:pb-6' : 'max-h-0'
                      }`}
                  >
                    <p className="text-gray-600 text-sm sm:text-base">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={ctaRef} className="py-12 sm:py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Rejoignez la Révolution du E-commerce !
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Plus de 10 000 vendeurs ont déjà transformé leur business grâce à QuickShop.
              Ne restez pas à la traîne et commencez dès aujourd'hui !
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 shadow-xl shadow-blue-900/30 transition-all hover:scale-105"
                onClick={() => setActiveTab("register")}
              >
                <Link to={"/dashboard"}>
                Démarrer Mon Mois Gratuit
                </Link>
              </Button>
                
              <p className="mt-5 text-sm text-blue-100 flex items-center justify-center flex-wrap">
                <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Garantie satisfaction • Annulation sans engagement</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-4 md:px-8 lg:px-16 bg-gray-900 text-gray-400">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
              <div className="col-span-1 sm:col-span-2">
                <h3 className="text-white text-lg font-semibold mb-4">QuickShop</h3>
                <p className="mb-4 text-gray-400 max-w-md text-sm sm:text-base">
                  La plateforme e-commerce moderne qui aide les vendeurs à développer
                  leur activité grâce à des outils puissants et une interface intuitive.
                </p>
                <div className="flex space-x-4">
                  {/* Social icons placeholders */}
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Liens utiles</h3>
                <ul className="space-y-2">
                  {["Fonctionnalités", "Tarifs", "Blog", "À propos", "Contact"].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  {["Centre d'aide", "Documentation", "Communauté", "Tutoriels vidéo"].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} QuickShop. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
