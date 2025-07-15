
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  MessageSquare, 
  Paperclip, 
  User, 
  Clock,
  FileText,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "comment" | "attachment" | "status_change" | "assignment" | "reminder";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actor: {
    name: string;
    type: "citizen" | "agent" | "system";
  };
  metadata?: {
    attachmentName?: string;
    oldStatus?: string;
    newStatus?: string;
    assignedTo?: string;
  };
}

interface RequestNotificationsDialogProps {
  requestId: string;
  citizenName: string;
}

export const RequestNotificationsDialog = ({ requestId, citizenName }: RequestNotificationsDialogProps) => {
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "NOTIF-001",
      type: "comment",
      title: "Nouveau commentaire du citoyen",
      description: "Le citoyen a ajouté un commentaire concernant les délais de traitement.",
      timestamp: "2024-01-16T15:30:00",
      isRead: false,
      actor: {
        name: citizenName,
        type: "citizen"
      }
    },
    {
      id: "NOTIF-002",
      type: "attachment",
      title: "Nouvelle pièce jointe ajoutée",
      description: "Le citoyen a téléchargé un document complémentaire.",
      timestamp: "2024-01-16T14:15:00",
      isRead: false,
      actor: {
        name: citizenName,
        type: "citizen"
      },
      metadata: {
        attachmentName: "justificatif_revenus.pdf"
      }
    },
    {
      id: "NOTIF-003",
      type: "status_change",
      title: "Statut de la requête modifié",
      description: "Le statut a été changé par l'agent assigné.",
      timestamp: "2024-01-16T10:20:00",
      isRead: true,
      actor: {
        name: "Fatima Alami",
        type: "agent"
      },
      metadata: {
        oldStatus: "En attente",
        newStatus: "En cours"
      }
    },
    {
      id: "NOTIF-004",
      type: "assignment",
      title: "Requête assignée",
      description: "La requête a été assignée à un nouvel agent.",
      timestamp: "2024-01-15T16:45:00",
      isRead: true,
      actor: {
        name: "Système",
        type: "system"
      },
      metadata: {
        assignedTo: "Fatima Alami"
      }
    },
    {
      id: "NOTIF-005",
      type: "reminder",
      title: "Rappel SLA",
      description: "La requête approche de la limite SLA (24h restantes).",
      timestamp: "2024-01-15T11:00:00",
      isRead: true,
      actor: {
        name: "Système",
        type: "system"
      }
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "attachment":
        return <Paperclip className="h-4 w-4" />;
      case "status_change":
        return <CheckCircle className="h-4 w-4" />;
      case "assignment":
        return <User className="h-4 w-4" />;
      case "reminder":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "comment":
        return "text-blue-600";
      case "attachment":
        return "text-green-600";
      case "status_change":
        return "text-purple-600";
      case "assignment":
        return "text-orange-600";
      case "reminder":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getActorBadge = (actorType: string) => {
    switch (actorType) {
      case "citizen":
        return <Badge variant="default" className="text-xs">Citoyen</Badge>;
      case "agent":
        return <Badge variant="secondary" className="text-xs">Agent</Badge>;
      case "system":
        return <Badge variant="outline" className="text-xs">Système</Badge>;
      default:
        return null;
    }
  };

  const handleMarkAllAsRead = () => {
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1 relative">
          <Bell className="h-4 w-4" />
          Notifier
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications - Requête {requestId}
            </DialogTitle>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleMarkAllAsRead}
              >
                Marquer tout comme lu
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span>{notifications.length} notification(s) au total</span>
              {unreadCount > 0 && (
                <span className="text-destructive font-medium">
                  {unreadCount} non lue(s)
                </span>
              )}
            </div>
          </div>

          {/* Notifications list */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className={`p-4 rounded-lg border transition-colors ${
                  !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-background'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-muted ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          {getActorBadge(notification.actor.type)}
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.description}
                      </p>
                      
                      {/* Metadata */}
                      {notification.metadata && (
                        <div className="text-xs text-muted-foreground mb-2">
                          {notification.metadata.attachmentName && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span>Fichier: {notification.metadata.attachmentName}</span>
                            </div>
                          )}
                          {notification.metadata.oldStatus && notification.metadata.newStatus && (
                            <div>
                              Statut: {notification.metadata.oldStatus} → {notification.metadata.newStatus}
                            </div>
                          )}
                          {notification.metadata.assignedTo && (
                            <div>
                              Assigné à: {notification.metadata.assignedTo}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{notification.actor.name}</span>
                        <span>•</span>
                        <span>
                          {new Date(notification.timestamp).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(notification.timestamp).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator className="my-3" />}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
