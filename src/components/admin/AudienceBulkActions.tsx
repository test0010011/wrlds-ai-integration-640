
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  UserCheck,
  Clock,
  Calendar,
  FileText,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";
import { toast } from "sonner";

interface AudienceBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  allSelected: boolean;
}

export const AudienceBulkActions = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  allSelected,
}: AudienceBulkActionsProps) => {
  const handleBulkConfirm = () => {
    toast.success(`${selectedCount} audience(s) confirmée(s)`);
  };

  const handleBulkReschedule = () => {
    toast.info(`Reprogrammation de ${selectedCount} audience(s)`);
  };

  const handleBulkCancel = () => {
    toast.warning(`${selectedCount} audience(s) annulée(s)`);
  };

  const handleBulkReport = () => {
    toast.info(`Génération du rapport pour ${selectedCount} audience(s)`);
  };

  const handleBulkDelete = () => {
    toast.error(`${selectedCount} audience(s) supprimée(s)`);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 border-b">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={allSelected ? onDeselectAll : onSelectAll}
          className="flex items-center gap-2"
        >
          {allSelected ? (
            <CheckSquare className="h-4 w-4" />
          ) : (
            <Square className="h-4 w-4" />
          )}
          {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
        </Button>
        
        {selectedCount > 0 && (
          <span className="text-sm text-muted-foreground">
            {selectedCount} sur {totalCount} sélectionnée(s)
          </span>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Actions groupées</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleBulkConfirm}>
                <UserCheck className="mr-2 h-4 w-4" />
                <span>Confirmer tout</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkReschedule}>
                <Clock className="mr-2 h-4 w-4" />
                <span>Reprogrammer</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleBulkReport}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Générer rapport</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkCancel}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Annuler tout</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Supprimer tout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
