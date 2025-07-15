
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Plus, 
  Link, 
  User, 
  Calendar, 
  FileText,
  Building,
  Upload,
  Send
} from "lucide-react";
import { toast } from "sonner";

interface CourierDialogProps {
  requestId: string;
  citizenName: string;
  children: React.ReactNode;
}

export const CourierDialog = ({ requestId, citizenName, children }: CourierDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [newCourierData, setNewCourierData] = useState({
    // Section Courrier
    voieTransmission: "",
    categorieCourrier: "",
    numeroCourrier: "",
    
    // Section Destinataire
    secteurConcerne: "Primature > Habitat, Urbanisme et Ville",
    serviceDestinataire: "",
    
    // Section Requérant
    nomPrenom: citizenName,
    labelSocial: "",
    adresse: "",
    telephone: "",
    email: "",
    
    // Section Contenu
    objet: "",
    description: "",
    pieceJointe: ""
  });

  // Mock data pour les courriers existants
  const existingCouriers = [
    {
      id: "COU-001",
      objet: "Réponse permis de construire",
      type: "Sortant",
      destinataire: "Mohamed Benaissa",
      date: "2024-01-15",
      statut: "Envoyé"
    },
    {
      id: "COU-002", 
      objet: "Demande complément dossier",
      type: "Sortant",
      destinataire: "Fatima Zerhouni",
      date: "2024-01-14",
      statut: "En attente"
    }
  ];

  const handleLinkExistingCourier = () => {
    if (!selectedCourier) {
      toast.error("Veuillez sélectionner un courrier");
      return;
    }
    
    toast.success(`Courrier ${selectedCourier} lié à la requête ${requestId}`);
    setOpen(false);
  };

  const handleCreateNewCourier = () => {
    if (!newCourierData.objet || !newCourierData.voieTransmission) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    const courrierId = `COU-${Date.now()}`;
    toast.success(`Nouveau courrier ${courrierId} créé et lié à la requête ${requestId}`);
    setOpen(false);
    
    // Reset form
    setNewCourierData({
      voieTransmission: "",
      categorieCourrier: "",
      numeroCourrier: "",
      secteurConcerne: "Primature > Habitat, Urbanisme et Ville",
      serviceDestinataire: "",
      nomPrenom: citizenName,
      labelSocial: "",
      adresse: "",
      telephone: "",
      email: "",
      objet: "",
      description: "",
      pieceJointe: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Gestion des Courriers - Requête {requestId}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link" className="flex items-center">
              <Link className="mr-2 h-4 w-4" />
              Lier un courrier existant
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Créer un nouveau courrier
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Courriers disponibles</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {existingCouriers.map((courier) => (
                  <div
                    key={courier.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedCourier === courier.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedCourier(courier.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{courier.id}</span>
                          <Badge variant="outline">{courier.type}</Badge>
                          <Badge 
                            variant={courier.statut === "Envoyé" ? "default" : "secondary"}
                          >
                            {courier.statut}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{courier.objet}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {courier.destinataire}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(courier.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleLinkExistingCourier}>
                Lier le courrier sélectionné
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            {/* Section Courrier */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Courrier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="voieTransmission">Voie de transmission *</Label>
                    <Select
                      value={newCourierData.voieTransmission}
                      onValueChange={(value) => setNewCourierData({...newCourierData, voieTransmission: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la voie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Courrier postal">Courrier postal</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Fax">Fax</SelectItem>
                        <SelectItem value="Remise en main propre">Remise en main propre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categorieCourrier">Catégorie du Courrier</Label>
                    <Select
                      value={newCourierData.categorieCourrier}
                      onValueChange={(value) => setNewCourierData({...newCourierData, categorieCourrier: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entrant">Entrant</SelectItem>
                        <SelectItem value="Sortant">Sortant</SelectItem>
                        <SelectItem value="Interne">Interne</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numeroCourrier">N° du courrier</Label>
                    <Input
                      id="numeroCourrier"
                      value={newCourierData.numeroCourrier}
                      onChange={(e) => setNewCourierData({...newCourierData, numeroCourrier: e.target.value})}
                      placeholder="Numéro automatique"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section Destinataire */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Destinataire
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="secteurConcerne">Secteur concerné</Label>
                  <Input
                    id="secteurConcerne"
                    value={newCourierData.secteurConcerne}
                    onChange={(e) => setNewCourierData({...newCourierData, secteurConcerne: e.target.value})}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDestinataire">Service</Label>
                  <Select
                    value={newCourierData.serviceDestinataire}
                    onValueChange={(value) => setNewCourierData({...newCourierData, serviceDestinataire: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Habitat, Urbanisme et Ville" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Service Urbanisme">Service Urbanisme</SelectItem>
                      <SelectItem value="Service Technique">Service Technique</SelectItem>
                      <SelectItem value="Service Habitat">Service Habitat</SelectItem>
                      <SelectItem value="Service Environnement">Service Environnement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Section Requérant */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Requérant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomPrenom">Nom, Prénom</Label>
                    <Input
                      id="nomPrenom"
                      value={newCourierData.nomPrenom}
                      onChange={(e) => setNewCourierData({...newCourierData, nomPrenom: e.target.value})}
                      placeholder="Nom et prénom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="labelSocial">Label social</Label>
                    <Input
                      id="labelSocial"
                      value={newCourierData.labelSocial}
                      onChange={(e) => setNewCourierData({...newCourierData, labelSocial: e.target.value})}
                      placeholder="Profession ou titre"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse</Label>
                  <Input
                    id="adresse"
                    value={newCourierData.adresse}
                    onChange={(e) => setNewCourierData({...newCourierData, adresse: e.target.value})}
                    placeholder="Adresse complète"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      value={newCourierData.telephone}
                      onChange={(e) => setNewCourierData({...newCourierData, telephone: e.target.value})}
                      placeholder="Numéro de téléphone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCourierData.email}
                      onChange={(e) => setNewCourierData({...newCourierData, email: e.target.value})}
                      placeholder="Adresse email"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section Contenu */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Contenu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="objet">Objet *</Label>
                  <Input
                    id="objet"
                    value={newCourierData.objet}
                    onChange={(e) => setNewCourierData({...newCourierData, objet: e.target.value})}
                    placeholder="Objet du courrier"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourierData.description}
                    onChange={(e) => setNewCourierData({...newCourierData, description: e.target.value})}
                    placeholder="Contenu détaillé du courrier..."
                    rows={6}
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pieceJointe">Joindre les documents</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Cliquez pour télécharger ou glissez-déposez</p>
                    <p className="text-xs text-gray-500">1 Mio maximum</p>
                    <Input
                      id="pieceJointe"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewCourierData({...newCourierData, pieceJointe: file.name});
                        }
                      }}
                    />
                  </div>
                  {newCourierData.pieceJointe && (
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {newCourierData.pieceJointe}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateNewCourier} className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Créer et lier le courrier
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
