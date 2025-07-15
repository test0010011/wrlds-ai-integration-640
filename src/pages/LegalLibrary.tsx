
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Scale, 
  Search, 
  Book, 
  FileText, 
  MessageSquare, 
  ArrowLeft,
  Download,
  Eye,
  Bot,
  Sparkles,
  Filter,
  Calendar,
  Tag,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LegalLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  // Mock legal documents data
  const [legalDocs] = useState([
    {
      id: "LOI-2023-001",
      title: "Loi sur l'Administration Électronique",
      type: "Loi",
      category: "Administration",
      date: "2023-03-15",
      status: "En vigueur",
      summary: "Cadre juridique pour la digitalisation des services publics et les droits des citoyens en matière d'administration électronique.",
      relevanceScore: 95,
      keywords: ["administration", "numérique", "services publics", "citoyens"],
      source: "Journal Officiel N°15-2023"
    },
    {
      id: "DECRET-2023-045",
      title: "Décret d'application des procédures administratives",
      type: "Décret",
      category: "Procédures",
      date: "2023-05-22",
      status: "En vigueur",
      summary: "Modalités d'application des nouvelles procédures administratives simplifiées pour les citoyens.",
      relevanceScore: 87,
      keywords: ["procédures", "simplification", "délais", "recours"],
      source: "Journal Officiel N°22-2023"
    },
    {
      id: "CODE-ADMIN-2024",
      title: "Code de l'Administration",
      type: "Code",
      category: "Administration",
      date: "2024-01-01",
      status: "En vigueur",
      summary: "Compilation des textes régissant l'administration publique et les relations avec les citoyens.",
      relevanceScore: 92,
      keywords: ["code", "administration", "droits", "obligations"],
      source: "Édition Officielle 2024"
    }
  ]);

  const [chatHistory] = useState([
    {
      role: "user",
      message: "Quels sont les délais pour répondre à une requête administrative ?",
      timestamp: "14:30"
    },
    {
      role: "assistant",
      message: "Selon l'article 15 du Décret 2023-045, les administrations disposent d'un délai maximum de 15 jours ouvrés pour répondre aux requêtes citoyennes standard, et de 30 jours pour les dossiers complexes nécessitant une instruction approfondie.",
      timestamp: "14:31",
      sources: ["DECRET-2023-045", "LOI-2023-001"]
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Loi":
        return "bg-blue-100 text-blue-800";
      case "Décret":
        return "bg-green-100 text-green-800";
      case "Code":
        return "bg-purple-100 text-purple-800";
      case "Arrêté":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = () => {
    toast.success("Recherche intelligente en cours...");
    setTimeout(() => {
      toast.success(`${legalDocs.length} documents trouvés avec IA !`);
    }, 1500);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    toast.success("Question envoyée à l'assistant juridique IA...");
    setChatMessage("");
    
    setTimeout(() => {
      toast.success("Réponse générée avec références juridiques !");
    }, 2000);
  };

  const generateSummary = (docId: string) => {
    toast.success("Génération du résumé IA en cours...");
    setTimeout(() => {
      toast.success("Résumé intelligent généré avec succès !");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Bibliothèque Juridique IA</h1>
                  <p className="text-sm text-gray-600">Assistant intelligent pour la recherche juridique</p>
                </div>
              </div>
            </div>
            <Button onClick={() => navigate('/admin')}>
              Dashboard Admin
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Recherche Juridique Intelligente
            </CardTitle>
            <CardDescription>
              Utilisez l'IA pour trouver les textes juridiques pertinents avec analyse sémantique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Ex: délais de réponse administrative, permis de construire, recours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="loi">Lois</SelectItem>
                  <SelectItem value="decret">Décrets</SelectItem>
                  <SelectItem value="code">Codes</SelectItem>
                  <SelectItem value="arrete">Arrêtés</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes années</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch}>
                <Sparkles className="mr-2 h-4 w-4" />
                Rechercher IA
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              💡 L'IA analysera sémantiquement votre requête pour trouver les textes les plus pertinents
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents">Documents Juridiques</TabsTrigger>
            <TabsTrigger value="assistant">Assistant IA</TabsTrigger>
            <TabsTrigger value="analytics">Analyses et Statistiques</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="space-y-6">
              {legalDocs.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={getTypeColor(doc.type)}>
                            {doc.type}
                          </Badge>
                          <Badge variant="outline">
                            {doc.category}
                          </Badge>
                          <Badge variant="secondary">
                            <Calendar className="h-3 w-3 mr-1" />
                            {doc.date}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Pertinence: {doc.relevanceScore}%
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {doc.summary}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => generateSummary(doc.id)}>
                          <Bot className="h-4 w-4 mr-1" />
                          Résumé IA
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Consulter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Mots-clés détectés par IA:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {doc.keywords.map((keyword) => (
                            <Badge key={keyword} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                          <strong>Source:</strong> {doc.source}
                        </span>
                        <span>
                          <strong>Statut:</strong> {doc.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assistant Tab */}
          <TabsContent value="assistant">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chat Interface */}
              <Card className="flex flex-col h-96">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Assistant Juridique IA
                  </CardTitle>
                  <CardDescription>
                    Posez vos questions juridiques, obtenez des réponses avec références
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                    {chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-3/4 p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          {message.sources && (
                            <div className="mt-2 text-xs opacity-75">
                              <strong>Sources:</strong> {message.sources.join(', ')}
                            </div>
                          )}
                          <div className="text-xs mt-1 opacity-75">
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <Input
                      placeholder="Posez votre question juridique..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Bot className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* AI Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Fonctionnalités IA Avancées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Search className="h-4 w-4 mr-2" />
                        Recherche Sémantique
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Compréhension du contexte et intention de recherche
                      </p>
                      <Badge className="bg-green-100 text-green-800">
                        Précision: 94%
                      </Badge>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Extraction Automatique
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        OCR et analyse des documents PDF/images
                      </p>
                      <Badge className="bg-blue-100 text-blue-800">
                        Traités: 1,247 docs
                      </Badge>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Bot className="h-4 w-4 mr-2" />
                        Résumés Intelligents
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Synthèse automatique des textes complexes
                      </p>
                      <Badge className="bg-purple-100 text-purple-800">
                        Temps gagné: 85%
                      </Badge>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Intégration Sources
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Connexion bases de données juridiques externes
                      </p>
                      <Badge className="bg-orange-100 text-orange-800">
                        5 sources connectées
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Utilisation de la Bibliothèque</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Documents consultés</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Recherches IA effectuées</span>
                      <span className="font-semibold">1,243</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Questions chatbot</span>
                      <span className="font-semibold">567</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Résumés générés</span>
                      <span className="font-semibold">234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Types de Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lois</span>
                      <Badge className="bg-blue-100 text-blue-800">156</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Décrets</span>
                      <Badge className="bg-green-100 text-green-800">89</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Codes</span>
                      <Badge className="bg-purple-100 text-purple-800">23</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Arrêtés</span>
                      <Badge className="bg-orange-100 text-orange-800">67</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Précision recherche</span>
                      <Badge className="bg-green-500">94%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Qualité résumés</span>
                      <Badge className="bg-green-500">91%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Temps de réponse</span>
                      <Badge className="bg-blue-500">0.8s</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Satisfaction utilisateur</span>
                      <Badge className="bg-green-500">89%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recherches Populaires</CardTitle>
                  <CardDescription>
                    Questions et recherches les plus fréquentes cette semaine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Questions Chatbot</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>• Délais de réponse administratifs</div>
                        <div>• Procédure de recours</div>
                        <div>• Droits des citoyens</div>
                        <div>• Permis de construire</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Recherches Documents</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>• Code de l'administration</div>
                        <div>• Loi sur les services publics</div>
                        <div>• Décrets d'application</div>
                        <div>• Jurisprudence administrative</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LegalLibrary;
