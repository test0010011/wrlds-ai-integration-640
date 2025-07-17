
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  Clock,
  User,
  FileText,
  Phone,
  Mail,
  Building
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: string;
  role: "admin" | "citizen" | "system";
  message: string;
  timestamp: string;
  attachments?: string[];
}

interface CourierCommunicationDialogProps {
  courierId: string;
}

export const CourierCommunicationDialog = ({ courierId }: CourierCommunicationDialogProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [newSubject, setNewSubject] = useState("");

  // Mock messages data
  const [messages] = useState<Message[]>([
    {
      id: "MSG-001",
      sender: "Mohamed Benaissa",
      role: "citizen",
      message: "Bonjour, je souhaiterais connaître l'état d'avancement de ma demande de permis de construire.",
      timestamp: "2024-01-15T10:30:00",
    },
    {
      id: "MSG-002",
      sender: "Fatima Alami",
      role: "admin",
      message: "Bonjour Monsieur Benaissa, votre dossier est actuellement en cours d'examen par nos services techniques. Nous vous tiendrons informé sous 5 jours ouvrables.",
      timestamp: "2024-01-15T14:20:00",
    },
    {
      id: "MSG-003",
      sender: "Système",
      role: "system",
      message: "Le statut du courrier a été modifié de 'En attente' à 'En cours de traitement'.",
      timestamp: "2024-01-15T14:25:00",
    },
    {
      id: "MSG-004",
      sender: "Mohamed Benaissa",
      role: "citizen",
      message: "Merci pour votre réponse. J'aimerais savoir si des documents supplémentaires sont nécessaires.",
      timestamp: "2024-01-16T09:15:00",
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success("Message envoyé avec succès");
      setNewMessage("");
      setNewSubject("");
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-blue-100 text-blue-700";
      case "citizen": return "bg-green-100 text-green-700";
      case "system": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin": return "Administration";
      case "citizen": return "Citoyen";
      case "system": return "Système";
      default: return role;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          Échanger
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Communication - Courrier {courierId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations de contact */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Contacts Administration
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Fatima Alami - Service Urbanisme</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>f.alami@ville.ma</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+212 5 22 XX XX XX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Lun-Ven: 8h-16h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historique des messages */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Historique des échanges</h3>
            
            <div className="max-h-96 overflow-y-auto space-y-3 border rounded-lg p-4">
              {messages.map((message) => (
                <Card key={message.id} className="border-l-4 border-l-primary/20">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {message.role === "system" ? "SYS" : getInitials(message.sender)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{message.sender}</span>
                            <Badge variant="outline" className={`text-xs ${getRoleColor(message.role)}`}>
                              {getRoleBadge(message.role)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(message.timestamp).toLocaleString('fr-FR')}
                          </div>
                        </div>
                        
                        <p className="text-sm">{message.message}</p>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="flex items-center gap-2">
                            <FileText className="h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-600">
                              {message.attachments.length} pièce(s) jointe(s)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Nouveau message */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span className="font-medium">Nouveau message</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="subject">Sujet (optionnel)</Label>
                    <Input
                      id="subject"
                      placeholder="Objet du message..."
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Joindre fichier
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
