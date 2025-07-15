
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Send,
  History,
  Archive,
  Trash2,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface RequestActionsMenuProps {
  requestId: string;
}

export const RequestActionsMenu = ({ requestId }: RequestActionsMenuProps) => {
  const handleTransfer = () => {
    toast.info(`Transfert de la requête ${requestId} en cours...`);
  };

  const handleHistory = () => {
    toast.info(`Affichage de l'historique de ${requestId}`);
  };

  const handleArchive = () => {
    toast.success(`Requête ${requestId} archivée`);
  };

  const handlePriority = () => {
    toast.info(`Modification de la priorité de ${requestId}`);
  };

  const handleGenerateReport = () => {
    toast.info(`Génération du rapport pour ${requestId}`);
  };

  const handleEscalate = () => {
    toast.warning(`Escalade de la requête ${requestId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleTransfer}>
          <Send className="mr-2 h-4 w-4" />
          <span>Transférer</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHistory}>
          <History className="mr-2 h-4 w-4" />
          <span>Historique</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePriority}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          <span>Modifier priorité</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleGenerateReport}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Générer rapport</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          <span>Archiver</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEscalate} className="text-orange-600">
          <AlertTriangle className="mr-2 h-4 w-4" />
          <span>Escalader</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
