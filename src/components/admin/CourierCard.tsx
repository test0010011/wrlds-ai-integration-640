
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  User, 
  FileText, 
  AlertTriangle, 
  Clock,
  Building,
  Mail,
  Link2
} from "lucide-react";
import { CourierActionsMenu } from "./CourierActionsMenu";

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

interface CourierCardProps {
  courrier: Courier;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}

export const CourierCard = ({ courrier, isSelected, onSelect }: CourierCardProps) => {
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{courrier.id}</h3>
                <Badge variant={getStatusBadgeVariant(courrier.statut)}>
                  {courrier.statut}
                </Badge>
                <Badge variant={getPriorityBadgeVariant(courrier.priority)}>
                  {courrier.priority}
                </Badge>
                <Badge variant="outline">{courrier.type}</Badge>
                
                {/* Badge pour la liaison avec une requête */}
                {courrier.requeteId && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Link2 className="h-3 w-3 mr-1" />
                    {courrier.requeteId}
                  </Badge>
                )}
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{courrier.objet}</h4>
              
              {/* Affichage des informations de la requête liée */}
              {courrier.requeteId && (
                <div className="mb-3 p-2 bg-green-50 rounded border border-green-200">
                  <div className="flex items-center gap-2 text-sm">
                    <Link2 className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-700">
                      Lié à la requête: {courrier.requeteId}
                    </span>
                  </div>
                  {(courrier.requeteCitizen || courrier.requeteSubject) && (
                    <div className="mt-1 text-xs text-green-600">
                      {courrier.requeteCitizen && <span>Citoyen: {courrier.requeteCitizen}</span>}
                      {courrier.requeteCitizen && courrier.requeteSubject && <span> • </span>}
                      {courrier.requeteSubject && <span>Sujet: {courrier.requeteSubject}</span>}
                    </div>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>De: {courrier.expediteur}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>À: {courrier.destinataire}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{new Date(courrier.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  <span>{courrier.category}</span>
                </div>
              </div>

              {courrier.pieceJointe && (
                <div className="flex items-center mt-2 text-sm text-blue-600">
                  <FileText className="mr-1 h-4 w-4" />
                  <span>{courrier.pieceJointe}</span>
                </div>
              )}
            </div>
          </div>
          
          <CourierActionsMenu courierId={courrier.id} />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 line-clamp-2">{courrier.description}</p>
      </CardContent>
    </Card>
  );
};
