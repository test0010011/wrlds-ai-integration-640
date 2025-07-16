
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Calendar, 
  User, 
  FileText, 
  Building,
  Link2,
  LayoutGrid,
  Table as TableIcon
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

interface CourierTableViewProps {
  courriers: Courier[];
  selectedCourriers: Set<string>;
  onSelectCourrier: (courrierId: string, selected: boolean) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  allSelected: boolean;
}

export const CourierTableView = ({ 
  courriers, 
  selectedCourriers, 
  onSelectCourrier, 
  onSelectAll, 
  onDeselectAll, 
  allSelected 
}: CourierTableViewProps) => {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={allSelected ? onDeselectAll : onSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Entité</TableHead>
            <TableHead>Demandeur</TableHead>
            <TableHead>Plugin - Voie de transmission</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Dernière modification</TableHead>
            <TableHead>Date d'ouverture</TableHead>
            <TableHead>Date de résolution</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courriers.map((courrier) => (
            <TableRow key={courrier.id} className="hover:bg-muted/50">
              <TableCell>
                <Checkbox
                  checked={selectedCourriers.has(courrier.id)}
                  onCheckedChange={(checked) => 
                    onSelectCourrier(courrier.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell className="font-medium">{courrier.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{courrier.objet}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                    {courrier.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{courrier.category}</span>
                  {courrier.requeteId && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      <Link2 className="h-3 w-3 mr-1" />
                      {courrier.requeteId}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{courrier.destinataire}</span>
                  {courrier.requeteCitizen && (
                    <span className="text-xs text-muted-foreground">
                      {courrier.requeteCitizen}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className="text-xs w-fit">
                    {courrier.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {courrier.expediteur}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge variant={getStatusBadgeVariant(courrier.statut)} className="text-xs w-fit">
                    {courrier.statut}
                  </Badge>
                  <Badge variant={getPriorityBadgeVariant(courrier.priority)} className="text-xs w-fit">
                    {courrier.priority}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-sm">
                {new Date(courrier.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell className="text-sm">
                {new Date(courrier.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell className="text-sm">
                {courrier.statut === "Envoyé" ? 
                  new Date(courrier.date).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 
                  "-"
                }
              </TableCell>
              <TableCell>
                <CourierActionsMenu courier={courrier} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
