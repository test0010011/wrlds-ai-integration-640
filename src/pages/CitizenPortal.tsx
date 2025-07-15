
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
  ArrowLeft, Send, Upload, Mic, MessageSquare, User, Mail, Phone, Eye, EyeOff,
  Calendar, Clock, FileText, CreditCard, MapPin, Camera, Scan, CheckCircle,
  Users, Video, Bell, MessageCircle, Star, Award, Shield, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CitizenPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isRecording, setIsRecording] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ocrMode, setOcrMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    idNumber: "",
    requestType: "",
    subject: "",
    description: "",
    priority: "medium",
    appointmentType: "presentiel",
    preferredDate: "",
    preferredTime: ""
  });

  const [myRequests] = useState([
    {
      id: "REQ-2024-001250",
      subject: "Demande de certificat de résidence",
      status: "En cours",
      priority: "Moyenne",
      createdAt: "2024-01-15",
      lastUpdate: "2024-01-16",
      assignedTo: "Service État Civil",
      progress: 60
    },
    {
      id: "REQ-2024-001249",
      subject: "Signalement éclairage public",
      status: "Résolu",
      priority: "Haute",
      createdAt: "2024-01-10",
      lastUpdate: "2024-01-14",
      assignedTo: "Service Technique",
      progress: 100
    }
  ]);

  const requestTypes = [
    "Administrative",
    "Sociale", 
    "Urbanisme",
    "Transport",
    "Environnement",
    "Santé",
    "Éducation",
    "Sécurité",
    "Fiscalité",
    "Autre"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOCRScan = () => {
    setOcrMode(true);
    toast.info("Activation de la reconnaissance OCR...");
    // Simulate OCR processing
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        firstName: "Mohamed",
        lastName: "Benaissa",
        idNumber: "AB123456",
        address: "123 Rue de la Paix, Casablanca"
      }));
      setOcrMode(false);
      toast.success("Données extraites avec succès de la carte d'identité !");
    }, 3000);
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    toast.info("Enregistrement vocal démarré...");
    setTimeout(() => {
      setIsRecording(false);
      handleInputChange("description", formData.description + " [Audio converti: Je souhaite signaler un problème de voirie dans ma rue...]");
      toast.success("Audio converti en texte avec succès !");
    }, 3000);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Requête soumise avec succès ! Numéro de suivi: REQ-2024-001251");
    setTimeout(() => {
      toast.info(`IA: Requête classifiée automatiquement - Type: ${formData.requestType}, Priorité: ${formData.priority}`);
    }, 2000);
  };

  const handleAppointmentRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Demande de rendez-vous envoyée ! Vous recevrez une confirmation sous 24h.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nouveau": return "bg-blue-500";
      case "En cours": return "bg-orange-500";
      case "Résolu": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Accueil
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Portail Citoyen
                </h1>
                <p className="text-sm text-gray-500">Gestion intelligente de vos requêtes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Service IA Actif
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications (2)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Tableau de Bord</span>
            </TabsTrigger>
            <TabsTrigger value="submit" className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Nouvelle Requête</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Rendez-vous</span>
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Inscription</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Mon Profil</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Requêtes</p>
                      <p className="text-3xl font-bold">12</p>
                    </div>
                    <MessageSquare className="h-12 w-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">En Attente</p>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                    <Clock className="h-12 w-12 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Résolues</p>
                      <p className="text-3xl font-bold">9</p>
                    </div>
                    <CheckCircle className="h-12 w-12 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">RDV Programmés</p>
                      <p className="text-3xl font-bold">2</p>
                    </div>
                    <Users className="h-12 w-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Requests */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Mes Requêtes Récentes
                </CardTitle>
                <CardDescription>Suivi en temps réel de vos demandes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {request.id}
                            </span>
                            <Badge className={`${getStatusColor(request.status)} text-white`}>
                              {request.status}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900">{request.subject}</h3>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Créé le:</span> {request.createdAt}
                        </div>
                        <div>
                          <span className="font-medium">Dernière MAJ:</span> {request.lastUpdate}
                        </div>
                        <div>
                          <span className="font-medium">Assigné à:</span> {request.assignedTo}
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getStatusColor(request.status)}`}
                          style={{ width: `${request.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Progression: {request.progress}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Request Tab */}
          <TabsContent value="submit">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                  Nouvelle Requête - Assistée par IA
                </CardTitle>
                <CardDescription>
                  Notre IA analysera automatiquement votre demande pour un traitement optimal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitRequest} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="requestType">Type de requête</Label>
                      <Select value={formData.requestType} onValueChange={(value) => handleInputChange("requestType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type" />
                        </SelectTrigger>
                        <SelectContent>
                          {requestTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priorité estimée</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Basse
                            </div>
                          </SelectItem>
                          <SelectItem value="medium">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                              Moyenne
                            </div>
                          </SelectItem>
                          <SelectItem value="high">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                              Haute
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet de la requête</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Résumez votre demande en quelques mots"
                      className="bg-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description détaillée</Label>
                    <div className="relative">
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Décrivez votre demande en détail..."
                        className="min-h-32 bg-white pr-20"
                        required
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={startVoiceRecording}
                          disabled={isRecording}
                          className="bg-white"
                        >
                          <Mic className={`h-4 w-4 ${isRecording ? 'text-red-500 animate-pulse' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Documents joints (optionnel)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-600 mb-2">
                        Glissez-déposez vos fichiers ici
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        PDF, Images, Documents (Max. 10MB par fichier)
                      </p>
                      <Button type="button" variant="outline" className="bg-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Choisir des fichiers
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      Assistant IA Intelligent
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-blue-800">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Classification automatique
                      </div>
                      <div className="flex items-center text-blue-800">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Détection de priorité
                      </div>
                      <div className="flex items-center text-blue-800">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Analyse de sentiment
                      </div>
                      <div className="flex items-center text-blue-800">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Suggestions de réponses
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    Soumettre la requête
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Demander un Rendez-vous
                  </CardTitle>
                  <CardDescription>
                    Planifiez une audience pour présenter votre requête
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAppointmentRequest} className="space-y-4">
                    <div>
                      <Label htmlFor="appointmentType">Type de rendez-vous</Label>
                      <Select value={formData.appointmentType} onValueChange={(value) => handleInputChange("appointmentType", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="presentiel">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              Présentiel
                            </div>
                          </SelectItem>
                          <SelectItem value="telephone">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              Téléphone
                            </div>
                          </SelectItem>
                          <SelectItem value="visioconference">
                            <div className="flex items-center">
                              <Video className="h-4 w-4 mr-2" />
                              Visioconférence
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredDate">Date souhaitée</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                          className="bg-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">Heure souhaitée</Label>
                        <Input
                          id="preferredTime"
                          type="time"
                          value={formData.preferredTime}
                          onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                          className="bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="appointmentReason">Motif du rendez-vous</Label>
                      <Textarea
                        id="appointmentReason"
                        placeholder="Expliquez brièvement l'objet de votre demande de rendez-vous..."
                        className="bg-white"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Demander le rendez-vous
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Mes Rendez-vous</CardTitle>
                  <CardDescription>Planning de vos audiences programmées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-blue-500">Confirmé</Badge>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-1" />
                          Rejoindre
                        </Button>
                      </div>
                      <h4 className="font-semibold">Audience - Demande de certificat</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        25 Janvier 2024 à 14:00
                      </p>
                      <p className="text-sm text-gray-600">
                        <Video className="h-4 w-4 inline mr-1" />
                        Visioconférence
                      </p>
                    </div>

                    <div className="border rounded-lg p-4 bg-orange-50">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-orange-500">En attente</Badge>
                        <Button variant="outline" size="sm" disabled>
                          En attente de confirmation
                        </Button>
                      </div>
                      <h4 className="font-semibold">Consultation - Problème urbanisme</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        28 Janvier 2024 à 10:00 (demandé)
                      </p>
                      <p className="text-sm text-gray-600">
                        <Users className="h-4 w-4 inline mr-1" />
                        Présentiel
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Inscription avec OCR intelligent
                </CardTitle>
                <CardDescription>
                  Inscription simplifiée avec reconnaissance automatique de carte d'identité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* OCR Section */}
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50">
                    <Camera className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Reconnaissance OCR de Carte d'Identité
                    </h3>
                    <p className="text-blue-700 mb-4">
                      Scannez votre carte d'identité pour remplir automatiquement vos informations
                    </p>
                    <div className="flex space-x-3 justify-center">
                      <Button 
                        onClick={handleOCRScan} 
                        disabled={ocrMode}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Scan className="mr-2 h-4 w-4" />
                        {ocrMode ? "Analyse en cours..." : "Scanner la carte"}
                      </Button>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger image
                      </Button>
                    </div>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="bg-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="idNumber">Numéro de carte d'identité</Label>
                      <Input
                        id="idNumber"
                        value={formData.idNumber}
                        onChange={(e) => handleInputChange("idNumber", e.target.value)}
                        className="bg-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse complète</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="bg-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="bg-white pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Un email et SMS de confirmation seront envoyés pour valider votre compte
                      </p>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" size="lg">
                      <User className="mr-2 h-4 w-4" />
                      Créer mon compte
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Profil Citoyen</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Mohamed Benaissa</h3>
                  <p className="text-gray-600">Citoyen Certifié</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    Compte Vérifié
                  </Badge>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Statistiques de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">4.8/5</div>
                      <p className="text-sm text-gray-600">Satisfaction Moyenne</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">2.1j</div>
                      <p className="text-sm text-gray-600">Temps Moyen de Résolution</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">12</div>
                      <p className="text-sm text-gray-600">Requêtes Totales</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">95%</div>
                      <p className="text-sm text-gray-600">Taux de Résolution</p>
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

export default CitizenPortal;
