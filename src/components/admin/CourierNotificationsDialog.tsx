
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  MessageSquare, 
  Send, 
  Clock,
  User,
  Plus,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "response" | "comment" | "status_change" | "assignment";
  title: string;
  message: string;
  author: string;
  timestamp: string;
  isRead: boolean;
}

interface CourierNotificationsDialogProps {
  courierId: string;
}

export const CourierNotificationsDialog = ({ courierId }: CourierNotificationsDialogProps) => {
  const [newComment, setNewComment] = useState("");

  // Mock notifications data
  const [notifications] = useState<Notification[]>([
    {
      id: "NOT-001",
      type: "response",
      title: "Réponse administrative envoyée",
      message: "Une réponse officielle a été envoyée au citoyen concernant sa demande de permis de construire.",
      author: "Fatima Alami",
      timestamp: "2024-01-16T14:30:00",
      isRead: true
    },
    {
      id: "NOT-002",
      type: "comment",
      title: "Commentaire ajouté",
      message: "Le dossier nécessite une vérification supplémentaire des plans d'architecture avant validation finale.",
      author: "Ahmed Benali",
      timestamp: "2024-01-16T11:15:00",
      isRead: true
    },
    {
      id: "NOT-003",
      type: "status_change",
      title: "Statut modifié",
      message: "Le statut du courrier a été changé de 'Brouillon' à 'En attente'.",
      author: "Système",
      timestamp: "2024-01-15T16:45:00",
      isRead: false
    },
    {
      id: "NOT-004",
      type: "assignment",
      title: "Courrier assigné",
      message: "Le courrier a été assigné à l'équipe du Service Urbanisme pour traitement.",
      author: "Laila Benkirane",
      timestamp: "2024-01-15T10:30:00",
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "response": return <Send className="h-4 w-4 text-green-600" />;
      case "comment": return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case "status_change": return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case "assignment": return <User className="h-4 w-4 text-purple-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
      case "response": return "default";
      case "comment": return "secondary";
      case "status_change": return "outline";
      case "assignment": return "secondary";
      default: return "outline";
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast.success("Commentaire ajouté avec succès");
      setNewComment("");
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Bell className="h-4 w-4" />
          Notifier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications - Courrier {courierId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ajouter un nouveau commentaire */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="font-medium">Ajouter un commentaire</span>
                </div>
                <Textarea
                  placeholder="Tapez votre commentaire ou notification..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des notifications */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Historique des notifications</h3>
            
            {notifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.isRead ? 'border-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {notification.author === "Système" ? "SYS" : getInitials(notification.author)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getNotificationIcon(notification.type)}
                          <span className="font-medium">{notification.title}</span>
                          <Badge variant={getNotificationBadgeVariant(notification.type)} className="text-xs">
                            {notification.type === "response" && "Réponse"}
                            {notification.type === "comment" && "Commentaire"}
                            {notification.type === "status_change" && "Statut"}
                            {notification.type === "assignment" && "Assignation"}
                          </Badge>
                          {!notification.isRead && (
                            <Badge variant="destructive" className="text-xs">Nouveau</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(notification.timestamp).toLocaleString('fr-FR')}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      
                      <div className="text-xs text-muted-foreground">
                        Par: {notification.author}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
