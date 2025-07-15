
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, Users, Brain, Shield, Zap, Star, Award, TrendingUp,
  CheckCircle, ArrowRight, Calendar, FileText, Bot, Phone, Video,
  Building, Globe, Lock, Activity, BarChart3, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: "Intelligence Artificielle",
      description: "Classification automatique, analyse de sentiment et réponses intelligentes",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      title: "Gestion ITIL",
      description: "Workflow professionnel conforme aux standards ITIL",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Portail Citoyen",
      description: "Interface moderne avec OCR et reconnaissance vocale",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Calendar className="h-8 w-8 text-orange-500" />,
      title: "Gestion d'Audiences",
      description: "Rendez-vous présentiels, téléphone et visioconférence",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Shield className="h-8 w-8 text-cyan-500" />,
      title: "Sécurité Avancée",
      description: "Authentification multi-facteurs et chiffrement",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-pink-500" />,
      title: "Analytics IA",
      description: "Rapports automatisés et analyses prédictives",
      color: "from-pink-500 to-rose-600"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Disponibilité", icon: <Activity className="h-5 w-5" /> },
    { value: "2.4h", label: "Temps Réponse", icon: <Clock className="h-5 w-5" /> },
    { value: "94%", label: "Précision IA", icon: <Brain className="h-5 w-5" /> },
    { value: "4.8/5", label: "Satisfaction", icon: <Star className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Plateforme IA Nouvelle Génération
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
              Gestion Intelligente des 
              <br />
              Requêtes Citoyennes
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Solution complète inspirée de GLPI avec workflow ITIL, intelligence artificielle avancée 
              et gestion professionnelle des requêtes citoyennes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/citizen-portal')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Portail Citoyen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/admin')}
                className="border-2 border-gray-300 hover:border-blue-300 px-8 py-4 text-lg"
              >
                <Shield className="mr-2 h-5 w-5" />
                Dashboard Admin
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md mb-3">
                    <div className="text-blue-600">{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités Avancées
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une suite complète d'outils intelligents pour moderniser la gestion des services publics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm group">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                <Brain className="h-4 w-4 mr-2" />
                Intelligence Artificielle
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                IA Intégrée pour une 
                <span className="text-purple-600"> Efficacité Maximale</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Classification Automatique</h4>
                    <p className="text-gray-600">Analyse NLP pour catégoriser automatiquement les requêtes selon leur type et priorité</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Réponses Intelligentes</h4>
                    <p className="text-gray-600">Génération automatique de réponses contextuelles avec ChatGPT</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">OCR Avancé</h4>
                    <p className="text-gray-600">Reconnaissance optique de caractères pour extraction automatique de données</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Analytics Prédictifs</h4>
                    <p className="text-gray-600">Détection de tendances et prédiction des problèmes récurrents</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <Bot className="h-12 w-12 mb-4 opacity-80" />
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-blue-100">Précision IA</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <TrendingUp className="h-12 w-12 mb-4 opacity-80" />
                  <div className="text-2xl font-bold">78%</div>
                  <div className="text-green-100">Réponses Auto</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 mb-4 opacity-80" />
                  <div className="text-2xl font-bold">96%</div>
                  <div className="text-purple-100">OCR Précision</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <Star className="h-12 w-12 mb-4 opacity-80" />
                  <div className="text-2xl font-bold">4.8/5</div>
                  <div className="text-orange-100">Satisfaction</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ITIL Workflow Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 mr-2" />
              Standard ITIL
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Workflow Professionnel ITIL
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gestion des requêtes selon les meilleures pratiques ITIL avec SLA tracking et métriques de performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Incident Management</h4>
              <p className="text-gray-600 text-sm">Gestion professionnelle des incidents selon ITIL</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Service Request</h4>
              <p className="text-gray-600 text-sm">Demandes de services standardisées</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Problem Management</h4>
              <p className="text-gray-600 text-sm">Résolution des causes racines</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Change Management</h4>
              <p className="text-gray-600 text-sm">Gestion contrôlée des changements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à Moderniser vos Services ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment notre plateforme IA peut transformer la gestion de vos requêtes citoyennes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/citizen-portal')}
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
            >
              <Users className="mr-2 h-5 w-5" />
              Accès Citoyen
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/legal-library')}
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
            >
              <FileText className="mr-2 h-5 w-5" />
              Bibliothèque Juridique
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
