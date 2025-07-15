
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Plus, 
  Calendar, 
  User, 
  FileText, 
  ExternalLink,
  Trash2 
} from "lucide-react";
import { CourierDialog } from "./CourierDialog";
import { toast } from "sonner";

interface RequestCourierManagerProps {
  requestId: string;
  citizenName: string;
}

export const RequestCourierManager = ({ requestId, citizenName }: RequestCourierManagerProps) => {
  // Mock data pour les courriers liés à cette requête
  const [linkedCouriers, setLinkedCouriers] = useState([
    {
      id: "COU-001",
      objet: "Réponse permis de construire",
      type: "Sortant",
      destinataire: "Mohamed Benaissa",
      date: "2024-01-15",
      statut: "Envoyé",
      pieceJointe: "reponse_permis.pdf"
    }
  ]);

  const handleUnlinkCourier = (courierId: string) => {
    setLinkedCouriers(prev => prev.filter(c => c.id !== courierId));
    toast.success(`Courrier ${courierId} délié de la requête`);
  };

  const handleViewCourier = (courierId: string) => {
    toast.info(`Ouverture du courrier ${courierId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          Courriers Liés ({linkedCouriers.length})
        </h4>
        <CourierDialog requestId={requestId} citizenName={citizenName}>
          <Button size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Gérer les courriers
          </Button>
        </CourierDialog>
      </div>

      {linkedCouriers.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Aucun courrier lié à cette requête</p>
              <CourierDialog requestId={requestId} citizenName={citizenName}>
                <Button variant="ghost" size="sm" className="mt-2">
                  Ajouter un courrier
                </Button>
              </CourierDialog>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {linkedCouriers.map((courier) => (
            <Card key={courier.id} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-sm font-medium">{courier.id}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {courier.type}
                      </Badge>
                      <Badge 
                        variant={courier.statut === "Envoyé" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {courier.statut}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-900 mb-2">{courier.objet}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {courier.destinataire}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(courier.date).toLocaleDateString('fr-FR')}
                      </span>
                      {courier.pieceJointe && (
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {courier.pieceJointe}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewCourier(courier.id)}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUnlinkCourier(courier.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
