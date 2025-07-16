
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Mail, 
  Plus, 
  Calendar, 
  User, 
  FileText,
} from "lucide-react";
import { CourierDialog } from "./CourierDialog";
import { CourierActionsMenu } from "./CourierActionsMenu";
import { CourierBulkActions } from "./CourierBulkActions";
import { toast } from "sonner";

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

interface RequestCourierManagerProps {
  requestId: string;
  citizenName: string;
}

export const RequestCourierManager = ({ requestId, citizenName }: RequestCourierManagerProps) => {
  const [linkedCouriers, setLinkedCouriers] = useState<Courier[]>([
    {
      id: "COU-001",
      objet: "Réponse permis de construire",
      type: "Sortant",
      destinataire: "Mohamed Benaissa",
      expediteur: "Service Urbanisme",
      date: "2024-01-15",
      statut: "Envoyé",
      pieceJointe: "reponse_permis.pdf",
      description: "Réponse officielle concernant la demande de permis de construire",
      priority: "Moyenne",
      category: "Urbanisme"
    }
  ]);
  
  const [selectedCouriers, setSelectedCouriers] = useState<Set<string>>(new Set());

  const handleUnlinkCourier = (courierId: string) => {
    setLinkedCouriers(prev => prev.filter(c => c.id !== courierId));
    setSelectedCouriers(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(courierId);
      return newSelected;
    });
    toast.success(`Courrier ${courierId} délié de la requête`);
  };

  const handleSelectCourier = (courierId: string, selected: boolean) => {
    const newSelected = new Set(selectedCouriers);
    if (selected) {
      newSelected.add(courierId);
    } else {
      newSelected.delete(courierId);
    }
    setSelectedCouriers(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedCouriers(new Set(linkedCouriers.map(c => c.id)));
  };

  const handleDeselectAll = () => {
    setSelectedCouriers(new Set());
  };

  const allSelected = linkedCouriers.length > 0 && selectedCouriers.size === linkedCouriers.length;

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

      {linkedCouriers.length > 0 && (
        <CourierBulkActions
          selectedCount={selectedCouriers.size}
          totalCount={linkedCouriers.length}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          allSelected={allSelected}
        />
      )}

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
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedCouriers.has(courier.id)}
                      onCheckedChange={(checked) => 
                        handleSelectCourier(courier.id, checked as boolean)
                      }
                    />
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
                  </div>
                  <CourierActionsMenu courier={courier} />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
