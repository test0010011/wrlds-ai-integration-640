
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, Scan, Upload, User, Mail, Phone, MapPin, CreditCard, 
  CheckCircle, AlertCircle, Loader, FileText, Eye, Download,
  UserPlus, Users, Search, Filter, Edit, Trash2, ArrowLeft, XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CitizenRegistration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("register");
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    birthDate: "",
    birthPlace: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    profession: "",
    nationality: "Marocaine",
    maritalStatus: "",
    emergencyContact: "",
    emergencyPhone: ""
  });

  const [citizens] = useState([
    {
      id: "CIT-001",
      name: "Mohamed Benaissa",
      email: "mohamed@email.com",
      phone: "+212 6 12 34 56 78",
      idNumber: "AB123456",
      status: "Vérifié",
      registrationDate: "2024-01-10",
      lastActivity: "2024-01-16",
      requests: 5
    },
    {
      id: "CIT-002", 
      name: "Fatima Zerhouni",
      email: "fatima@email.com",
      phone: "+212 6 98 76 54 32",
      idNumber: "CD789012",
      status: "En attente",
      registrationDate: "2024-01-15",
      lastActivity: "2024-01-15",
      requests: 2
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }));
  };

  const handleOCRScan = () => {
    setOcrProcessing(true);
    toast.info("Démarrage de l'analyse OCR de la carte d'identité...");
    
    // Simulate OCR processing
    setTimeout(() => {
      setRegistrationData(prev => ({
        ...prev,
        firstName: "Ahmed",
        lastName: "Benali", 
        idNumber: "EF345678",
        birthDate: "1985-03-15",
        birthPlace: "Casablanca",
        address: "456 Boulevard Mohammed V, Casablanca"
      }));
      setOcrProcessing(false);
      toast.success("Données extraites avec succès ! Veuillez vérifier et compléter les informations.");
    }, 4000);
  };

  const handleBulkImport = () => {
    toast.info("Importation en cours depuis le fichier Excel...");
    setTimeout(() => {
      toast.success("25 citoyens importés avec succès !");
    }, 3000);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inscription réussie ! SMS et email de confirmation envoyés.");
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      "Vérifié": "bg-green-500",
      "En attente": "bg-yellow-500", 
      "Suspendu": "bg-red-500"
    };
    return <Badge className={`${colors[status]} text-white`}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/admin')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour Admin
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Gestion des Inscriptions Citoyens
                </h1>
                <p className="text-sm text-gray-500">Inscription avec OCR, validation automatique et gestion complète</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              OCR & IA Actifs
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="register" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Nouvelle Inscription</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Gestion Citoyens</span>
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Import/Export</span>
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Vérification</span>
            </TabsTrigger>
          </TabsList>

          {/* Registration Tab */}
          <TabsContent value="register">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Inscription Citoyen avec OCR Intelligent
                </CardTitle>
                <CardDescription>
                  Saisie manuelle ou automatique via reconnaissance OCR de carte d'identité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* OCR Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Camera OCR */}
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50">
                      <Camera className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                      <h3 className="font-semibold text-blue-900 mb-2">Scanner avec Caméra</h3>
                      <p className="text-sm text-blue-700 mb-3">
                        Utilisez votre caméra pour scanner la carte d'identité
                      </p>
                      <Button 
                        onClick={handleOCRScan}
                        disabled={ocrProcessing}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {ocrProcessing ? (
                          <>
                            <Loader className="h-4 w-4 mr-2 animate-spin" />
                            Analyse en cours...
                          </>
                        ) : (
                          <>
                            <Scan className="h-4 w-4 mr-2" />
                            Scanner maintenant
                          </>
                        )}
                      </Button>
                    </div>

                    {/* File Upload OCR */}
                    <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center bg-green-50">
                      <Upload className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <h3 className="font-semibold text-green-900 mb-2">Uploader Image</h3>
                      <p className="text-sm text-green-700 mb-3">
                        Téléchargez une photo de la carte d'identité
                      </p>
                      <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                        <Upload className="h-4 w-4 mr-2" />
                        Choisir fichier
                      </Button>
                    </div>

                    {/* Manual Entry */}
                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center bg-purple-50">
                      <Edit className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                      <h3 className="font-semibold text-purple-900 mb-2">Saisie Manuelle</h3>
                      <p className="text-sm text-purple-700 mb-3">
                        Remplir manuellement les informations
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                        onClick={() => setManualEntry(true)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Saisie manuelle
                      </Button>
                    </div>
                  </div>

                  {/* Registration Form */}
                  {(manualEntry || registrationData.firstName) && (
                    <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          Informations d'Identité
                          {registrationData.firstName && (
                            <Badge className="ml-2 bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              OCR Extrait
                            </Badge>
                          )}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="firstName">Prénom *</Label>
                            <Input
                              id="firstName"
                              value={registrationData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              className="bg-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Nom *</Label>
                            <Input
                              id="lastName"
                              value={registrationData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              className="bg-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="idNumber">N° Carte d'Identité *</Label>
                            <Input
                              id="idNumber"
                              value={registrationData.idNumber}
                              onChange={(e) => handleInputChange("idNumber", e.target.value)}
                              className="bg-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="birthDate">Date de Naissance *</Label>
                            <Input
                              id="birthDate"
                              type="date"
                              value={registrationData.birthDate}
                              onChange={(e) => handleInputChange("birthDate", e.target.value)}
                              className="bg-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="birthPlace">Lieu de Naissance</Label>
                            <Input
                              id="birthPlace"
                              value={registrationData.birthPlace}
                              onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="nationality">Nationalité</Label>
                            <Select value={registrationData.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
                              <SelectTrigger className="bg-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Marocaine">Marocaine</SelectItem>
                                <SelectItem value="Française">Française</SelectItem>
                                <SelectItem value="Autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Mail className="h-5 w-5 mr-2" />
                          Informations de Contact
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={registrationData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="bg-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Téléphone *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={registrationData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="bg-white"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="address">Adresse Complète *</Label>
                            <Textarea
                              id="address"
                              value={registrationData.address}
                              onChange={(e) => handleInputChange("address", e.target.value)}
                              className="bg-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">Ville *</Label>
                            <Input
                              id="city"
                              value={registrationData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className="bg-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="postalCode">Code Postal</Label>
                            <Input
                              id="postalCode"
                              value={registrationData.postalCode}
                              onChange={(e) => handleInputChange("postalCode", e.target.value)}
                              className="bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Informations Complémentaires
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="profession">Profession</Label>
                            <Input
                              id="profession"
                              value={registrationData.profession}
                              onChange={(e) => handleInputChange("profession", e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="maritalStatus">Situation Familiale</Label>
                            <Select value={registrationData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="single">Célibataire</SelectItem>
                                <SelectItem value="married">Marié(e)</SelectItem>
                                <SelectItem value="divorced">Divorcé(e)</SelectItem>
                                <SelectItem value="widowed">Veuf/Veuve</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="emergencyContact">Contact d'Urgence</Label>
                            <Input
                              id="emergencyContact"
                              value={registrationData.emergencyContact}
                              onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="emergencyPhone">Téléphone d'Urgence</Label>
                            <Input
                              id="emergencyPhone"
                              type="tel"
                              value={registrationData.emergencyPhone}
                              onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                              className="bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-900">Processus de Validation</h4>
                            <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                              <li>• Email de confirmation envoyé automatiquement</li>
                              <li>• SMS de vérification sur le numéro de téléphone</li>
                              <li>• Validation manuelle par l'administration</li>
                              <li>• Compte activé sous 24-48h ouvrables</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="lg">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Créer le Compte Citoyen
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Citizens Tab */}
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Gestion des Citoyens Enregistrés
                    </CardTitle>
                    <CardDescription>
                      Recherche, modification et gestion des comptes citoyens
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un citoyen..."
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="verified">Vérifiés</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="suspended">Suspendus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {citizens.map((citizen) => (
                    <div key={citizen.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{citizen.name}</h3>
                            <p className="text-sm text-gray-600">ID: {citizen.id}</p>
                          </div>
                          {getStatusBadge(citizen.status)}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>
                          <p className="text-gray-600">{citizen.email}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Téléphone:</span>
                          <p className="text-gray-600">{citizen.phone}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">N° ID:</span>
                          <p className="text-gray-600">{citizen.idNumber}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Requêtes:</span>
                          <p className="text-blue-600 font-semibold">{citizen.requests}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Inscription:</span>
                          <p className="text-gray-600">{new Date(citizen.registrationDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Dernière activité:</span>
                          <p className="text-gray-600">{new Date(citizen.lastActivity).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bulk Import/Export Tab */}
          <TabsContent value="bulk">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    Import en Masse
                  </CardTitle>
                  <CardDescription>
                    Importation de citoyens depuis fichiers Excel/CSV
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Glissez votre fichier ici
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Formats supportés: Excel (.xlsx), CSV (.csv)
                    </p>
                    <Button onClick={handleBulkImport}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choisir un fichier
                    </Button>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Format requis:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Prénom, Nom, Email, Téléphone (obligatoires)</li>
                      <li>• N° Carte d'identité, Date de naissance</li>
                      <li>• Adresse complète, Ville, Code postal</li>
                      <li>• Profession, Situation familiale (optionnels)</li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger modèle Excel
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="mr-2 h-5 w-5" />
                    Export des Données
                  </CardTitle>
                  <CardDescription>
                    Exportation des données citoyens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">Export Excel Complet</h4>
                          <p className="text-sm text-gray-600">Toutes les données citoyens</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Exporter
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">Export CSV Contacts</h4>
                          <p className="text-sm text-gray-600">Nom, email, téléphone uniquement</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Exporter
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">Rapport Statistiques</h4>
                          <p className="text-sm text-gray-600">Analyses et métriques</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Générer
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Derniers exports:</h4>
                    <div className="space-y-1 text-sm text-green-800">
                      <p>• 16/01/2024 - Export Excel (1,247 citoyens)</p>
                      <p>• 15/01/2024 - Rapport mensuel (PDF)</p>
                      <p>• 10/01/2024 - Export CSV contacts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Centre de Vérification
                </CardTitle>
                <CardDescription>
                  Validation des comptes citoyens et gestion des confirmations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl font-bold text-yellow-600">15</div>
                    <div className="text-sm text-yellow-800">En Attente de Vérification</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600">234</div>
                    <div className="text-sm text-green-800">Comptes Vérifiés</div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-3xl font-bold text-red-600">3</div>
                    <div className="text-sm text-red-800">Vérifications Échouées</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-yellow-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Amina Kettani</h4>
                        <p className="text-sm text-gray-600">amina.kettani@email.com</p>
                        <p className="text-sm text-gray-600">ID: GH901234</p>
                      </div>
                      <Badge className="bg-yellow-500">En attente</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Inscrit le: 16/01/2024 - Email confirmé ✓ - SMS en attente
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-yellow-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Youssef Alami</h4>
                        <p className="text-sm text-gray-600">youssef@email.com</p>
                        <p className="text-sm text-gray-600">ID: IJ567890</p>
                      </div>
                      <Badge className="bg-yellow-500">En attente</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Inscrit le: 15/01/2024 - Email confirmé ✓ - SMS confirmé ✓
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CitizenRegistration;
