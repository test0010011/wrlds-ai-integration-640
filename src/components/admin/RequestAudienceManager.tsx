
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Link, Trash2 } from "lucide-react";
import { AudienceDialog } from "./AudienceDialog";
import { toast } from "sonner";

interface Audience {
  id: string;
  sujet: string;
  date: string;
  pieceJointe?: string;
  citoyen: string;
  chargeDuDossier?: string;
  status: string;
  requestId?: string;
}

interface RequestAudienceManagerProps {
  requestId: string;
  citizenName: string;
}

export const RequestAudienceManager = ({ 
  requestId, 
  citizenName 
}: RequestAudienceManagerProps) => {
  const [linkedAudiences, setLinkedAudiences] = useState<Audience[]>([]);
  const [existingAudiences] = useState<Audience[]>([
    {
      id: "AUD-001",
      sujet: "Révision dossier urbanisme",
      date: "2024-01-20T14:00:00",
      citoyen: "Mohamed Benaissa",
      chargeDuDossier: "Fatima Alami",
      status: "Programmée",
    },
    {
      id: "AUD-002",
      sujet: "Consultation permis de construire",
      date: "2024-01-22T10:30:00",
      citoyen: "Amina Kettani",
      chargeDuDossier: "Omar Fassi",
      status: "Confirmée",
    },
  ]);

  const handleNewAudience = (audience: Audience) => {
    const audienceWithRequest = { ...audience, requestId };
    setLinkedAudiences(prev => [...prev, audienceWithRequest]);
    toast.success("Audience liée à la requête avec succès");
  };

  const handleLinkExistingAudience = (audienceId: string) => {
    const audience = existingAudiences.find(a => a.id === audienceId);
    if (audience && !linkedAudiences.find(a => a.id === audienceId)) {
      const linkedAudience = { ...audience, requestId };
      setLinkedAudiences(prev => [...prev, linkedAudience]);
      toast.success("Audience existante liée à la requête");
    }
  };

  const handleUnlinkAudience = (audienceId: string) => {
    setLinkedAudiences(prev => prev.filter(a => a.id !== audienceId));
    toast.success("Audience dissociée de la requête");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "Programmée": "default",
      "Confirmée": "secondary",
      "Terminée": "outline",
      "Annulée": "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Gestion des Audiences
          </div>
          <div className="flex gap-2">
            <Select onValueChange={handleLinkExistingAudience}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Lier une audience existante" />
              </SelectTrigger>
              <SelectContent>
                {existingAudiences
                  .filter(a => !linkedAudiences.find(la => la.id === a.id))
                  .map((audience) => (
                    <SelectItem key={audience.id} value={audience.id}>
                      {audience.sujet} - {new Date(audience.date).toLocaleDateString('fr-FR')}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <AudienceDialog 
              onAudienceCreated={handleNewAudience}
              requestId={requestId}
              defaultCitoyen={citizenName}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {linkedAudiences.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Aucune audience liée</p>
            <p className="text-sm">Créez ou liez une audience à cette requête</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sujet</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Pièce Jointe</TableHead>
                <TableHead>Citoyen</TableHead>
                <TableHead>Chargé de l'audience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {linkedAudiences.map((audience) => (
                <TableRow key={audience.id}>
                  <TableCell className="font-medium">{audience.sujet}</TableCell>
                  <TableCell>
                    {new Date(audience.date).toLocaleDateString('fr-FR')} à{' '}
                    {new Date(audience.date).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </TableCell>
                  <TableCell>
                    {audience.pieceJointe || (
                      <span className="text-muted-foreground text-sm">Aucune</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {audience.citoyen}
                    </div>
                  </TableCell>
                  <TableCell>
                    {audience.chargeDuDossier || (
                      <span className="text-muted-foreground text-sm">Non assigné</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(audience.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUnlinkAudience(audience.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
