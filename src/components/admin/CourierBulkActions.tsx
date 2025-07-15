
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
  Download,
  Archive,
  Mail,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";
import { toast } from "sonner";

interface CourierBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  allSelected: boolean;
}

export const CourierBulkActions = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  allSelected,
}: CourierBulkActionsProps) => {
  const handleBulkSend = () => {
    toast.success(`${selectedCount} courrier(s) envoyé(s)`);
  };

  const handleBulkDownload = () => {
    toast.info(`Téléchargement de ${selectedCount} courrier(s)`);
  };

  const handleBulkArchive = () => {
    toast.success(`${selectedCount} courrier(s) archivé(s)`);
  };

  const handleBulkResend = () => {
    toast.info(`Renvoi de ${selectedCount} courrier(s)`);
  };

  const handleBulkDelete = () => {
    toast.error(`${selectedCount} courrier(s) supprimé(s)`);
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
              <DropdownMenuItem onClick={handleBulkSend}>
                <Send className="mr-2 h-4 w-4" />
                <span>Envoyer tout</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkResend}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Renvoyer tout</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleBulkDownload}>
                <Download className="mr-2 h-4 w-4" />
                <span>Télécharger tout</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkArchive}>
                <Archive className="mr-2 h-4 w-4" />
                <span>Archiver tout</span>
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
