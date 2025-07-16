
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
  UserPlus,
  Bell,
} from "lucide-react";
import { toast } from "sonner";
import { AssignUserDialog } from "./AssignUserDialog";
import { CourierDetailsDialog } from "./CourierDetailsDialog";
import { CourierNotificationsDialog } from "./CourierNotificationsDialog";

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

interface CourierActionsMenuProps {
  courier: Courier;
}

export const CourierActionsMenu = ({ courier }: CourierActionsMenuProps) => {
  const handleEdit = () => {
    toast.info(`Modification du courrier ${courier.id}`);
  };

  const handleSend = () => {
    toast.success(`Courrier ${courier.id} envoyé`);
  };

  const handleDownload = () => {
    toast.info(`Téléchargement du courrier ${courier.id}`);
  };

  const handleArchive = () => {
    toast.success(`Courrier ${courier.id} archivé`);
  };

  const handleResend = () => {
    toast.info(`Renvoi du courrier ${courier.id}`);
  };

  const handleDelete = () => {
    toast.error(`Courrier ${courier.id} supprimé`);
  };

  const handleAssignUser = (userId: string, userName: string) => {
    toast.success(`Courrier ${courier.id} assigné à ${userName}`);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Boutons d'action principaux */}
      <CourierDetailsDialog courier={courier} />
      
      <AssignUserDialog 
        requestId={courier.id}
        onAssign={handleAssignUser}
      />
      
      <CourierNotificationsDialog courierId={courier.id} />

      {/* Menu déroulant pour les autres actions */}
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
    </div>
  );
};
