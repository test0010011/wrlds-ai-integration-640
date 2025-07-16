
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  Calendar, 
  User, 
  Mail, 
  FileText, 
  Building,
  AlertTriangle,
  Clock,
  Link2,
  Phone,
  MapPin
} from "lucide-react";

interface Courier {
  id: string;
  objet: string;
  type: string;
  destinataire: string;
  expediteur: string;
  date: string;
  statut: string;
  pieceJointe?: string;
  description: string;
  priority: string;
  category: string;
  requeteId?: string;
  requeteCitizen?: string;
  requeteSubject?: string;
}

interface CourierDetailsDialogProps {
  courier: Courier;
}

// Mock data pour la requête liée
const mockRequest = {
  id: "REQ-2024-001250",
  citizen: {
    name: "Mohamed Benaissa",
    email: "mohamed@email.com",
    phone: "+212 6 12 34 56 78",
    address: "123 Rue de la Paix, Casablanca"
  },
  type: "Urbanisme",
  category: "Permis de Construire",
  subject: "Demande de permis de construire - Extension maison",
  description: "Je souhaite obtenir un permis pour l'extension de ma maison familiale...",
  status: "En cours",
  priority: "Moyenne",
  createdAt: "2024-01-15T10:30:00",
  assignedAgent: "Fatima Alami"
};

export const CourierDetailsDialog = ({ courier }: CourierDetailsDialogProps) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "envoyé": return "default";
      case "en attente": return "secondary";
      case "brouillon": return "outline";
      case "archivé": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "haute": return "destructive";
      case "moyenne": return "secondary";
      case "basse": return "outline";
      default: return "secondary";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          Détails
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Détails du Courrier {courier.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations principales du courrier */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informations du Courrier
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Objet</label>
                  <p className="mt-1 font-medium">{courier.objet}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="mt-1">{courier.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Expéditeur</label>
                  <p className="mt-1">{courier.expediteur}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Destinataire</label>
                  <p className="mt-1">{courier.destinataire}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(courier.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Catégorie</label>
                  <p className="mt-1">{courier.category}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge variant={getStatusBadgeVariant(courier.statut)}>
                  {courier.statut}
                </Badge>
                <Badge variant={getPriorityBadgeVariant(courier.priority)}>
                  Priorité {courier.priority}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="mt-1 text-sm bg-muted p-3 rounded-md">{courier.description}</p>
              </div>

              {courier.pieceJointe && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pièce jointe</label>
                  <div className="flex items-center gap-2 mt-1">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {courier.pieceJointe}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Détails de la requête liée */}
          {courier.requeteId && (
            <>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-green-600" />
                    Requête Liée: {courier.requeteId}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Sujet</label>
                      <p className="mt-1 font-medium">{mockRequest.subject}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Type</label>
                      <p className="mt-1">{mockRequest.type} - {mockRequest.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Statut</label>
                      <Badge variant="secondary">{mockRequest.status}</Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Priorité</label>
                      <Badge variant="outline">{mockRequest.priority}</Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Date de création</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(mockRequest.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Agent assigné</label>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{mockRequest.assignedAgent}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description de la requête</label>
                    <p className="mt-1 text-sm bg-muted p-3 rounded-md">{mockRequest.description}</p>
                  </div>

                  {/* Informations du citoyen */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Informations du Citoyen
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Nom complet</label>
                        <p className="mt-1">{mockRequest.citizen.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{mockRequest.citizen.email}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{mockRequest.citizen.phone}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Adresse</label>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{mockRequest.citizen.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
