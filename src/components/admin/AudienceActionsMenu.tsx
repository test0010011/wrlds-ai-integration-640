
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
  Calendar,
  Edit,
  Trash2,
  UserCheck,
  Clock,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface AudienceActionsMenuProps {
  audienceId: string;
}

export const AudienceActionsMenu = ({ audienceId }: AudienceActionsMenuProps) => {
  const handleEdit = () => {
    toast.info(`Modification de l'audience ${audienceId}`);
  };

  const handleConfirm = () => {
    toast.success(`Audience ${audienceId} confirmée`);
  };

  const handleReschedule = () => {
    toast.info(`Reprogrammation de l'audience ${audienceId}`);
  };

  const handleGenerateReport = () => {
    toast.info(`Génération du rapport pour l'audience ${audienceId}`);
  };

  const handleCancel = () => {
    toast.warning(`Audience ${audienceId} annulée`);
  };

  const handleDelete = () => {
    toast.error(`Audience ${audienceId} supprimée`);
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
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Modifier</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleConfirm}>
          <UserCheck className="mr-2 h-4 w-4" />
          <span>Confirmer</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleReschedule}>
          <Clock className="mr-2 h-4 w-4" />
          <span>Reprogrammer</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleGenerateReport}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Générer rapport</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCancel} className="text-orange-600">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Annuler</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
