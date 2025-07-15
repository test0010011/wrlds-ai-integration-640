
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
  Send,
  Archive,
  Trash2,
  AlertTriangle,
  FileText,
  CheckSquare,
  Square,
} from "lucide-react";
import { toast } from "sonner";

interface RequestsBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  allSelected: boolean;
}

export const RequestsBulkActions = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  allSelected,
}: RequestsBulkActionsProps) => {
  const handleBulkTransfer = () => {
    toast.info(`Transfert de ${selectedCount} requête(s) en cours...`);
  };

  const handleBulkArchive = () => {
    toast.success(`${selectedCount} requête(s) archivée(s)`);
  };

  const handleBulkPriority = () => {
    toast.info(`Modification de la priorité pour ${selectedCount} requête(s)`);
  };

  const handleBulkReport = () => {
    toast.info(`Génération du rapport pour ${selectedCount} requête(s)`);
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
              <DropdownMenuItem onClick={handleBulkTransfer}>
                <Send className="mr-2 h-4 w-4" />
                <span>Transférer tout</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkPriority}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span>Modifier priorité</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleBulkReport}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Générer rapport</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkArchive}>
                <Archive className="mr-2 h-4 w-4" />
                <span>Archiver tout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
