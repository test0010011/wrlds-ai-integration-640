
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
  Edit,
  Eye,
  Download,
  Archive,
  Trash2,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

interface CourierActionsMenuProps {
  courierId: string;
}

export const CourierActionsMenu = ({ courierId }: CourierActionsMenuProps) => {
  const handleView = () => {
    toast.info(`Ouverture du courrier ${courierId}`);
  };

  const handleEdit = () => {
    toast.info(`Modification du courrier ${courierId}`);
  };

  const handleSend = () => {
    toast.success(`Courrier ${courierId} envoyé`);
  };

  const handleDownload = () => {
    toast.info(`Téléchargement du courrier ${courierId}`);
  };

  const handleArchive = () => {
    toast.success(`Courrier ${courierId} archivé`);
  };

  const handleResend = () => {
    toast.info(`Renvoi du courrier ${courierId}`);
  };

  const handleDelete = () => {
    toast.error(`Courrier ${courierId} supprimé`);
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
        <DropdownMenuItem onClick={handleView}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Voir détails</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Modifier</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSend}>
          <Send className="mr-2 h-4 w-4" />
          <span>Envoyer</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          <span>Télécharger</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleResend}>
          <Mail className="mr-2 h-4 w-4" />
          <span>Renvoyer</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          <span>Archiver</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
