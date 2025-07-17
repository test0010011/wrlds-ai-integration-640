
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Edit, 
  Save, 
  FileText,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

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

interface CourierEditDialogProps {
  courier: Courier;
  onUpdate?: (updatedCourier: Courier) => void;
}

export const CourierEditDialog = ({ courier, onUpdate }: CourierEditDialogProps) => {
  const [formData, setFormData] = useState<Courier>(courier);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: "brouillon", label: "Brouillon" },
    { value: "en_attente", label: "En attente" },
    { value: "en_cours", label: "En cours de traitement" },
    { value: "envoye", label: "Envoyé" },
    { value: "archive", label: "Archivé" },
    { value: "annule", label: "Annulé" }
  ];

  const typeOptions = [
    { value: "entrant", label: "Entrant" },
    { value: "sortant", label: "Sortant" },
    { value: "interne", label: "Interne" }
  ];

  const priorityOptions = [
    { value: "basse", label: "Basse" },
    { value: "moyenne", label: "Moyenne" },
    { value: "haute", label: "Haute" },
    { value: "urgente", label: "Urgente" }
  ];

  const categoryOptions = [
    { value: "urbanisme", label: "Urbanisme" },
    { value: "etat_civil", label: "État Civil" },
    { value: "fiscalite", label: "Fiscalité" },
    { value: "social", label: "Social" },
    { value: "environnement", label: "Environnement" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "autre", label: "Autre" }
  ];

  const handleInputChange = (field: keyof Courier, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulation d'une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onUpdate) {
        onUpdate(formData);
      }
      
      toast.success("Courrier mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(courier);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Modifier le Courrier {courier.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alerte si des modifications sont en cours */}
          {hasChanges && (
            <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-700">
                Vous avez des modifications non sauvegardées
              </span>
            </div>
          )}

          {/* Informations principales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informations Principales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="objet">Objet *</Label>
                  <Input
                    id="objet"
                    value={formData.objet}
                    onChange={(e) => handleInputChange("objet", e.target.value)}
                    placeholder="Objet du courrier"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expediteur">Expéditeur *</Label>
                  <Input
                    id="expediteur"
                    value={formData.expediteur}
                    onChange={(e) => handleInputChange("expediteur", e.target.value)}
                    placeholder="Nom de l'expéditeur"
                  />
                </div>
                <div>
                  <Label htmlFor="destinataire">Destinataire *</Label>
                  <Input
                    id="destinataire"
                    value={formData.destinataire}
                    onChange={(e) => handleInputChange("destinataire", e.target.value)}
                    placeholder="Nom du destinataire"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pieceJointe">Pièce jointe</Label>
                  <Input
                    id="pieceJointe"
                    value={formData.pieceJointe || ""}
                    onChange={(e) => handleInputChange("pieceJointe", e.target.value)}
                    placeholder="Nom du fichier joint"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Description détaillée du courrier"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Statut et priorité */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Statut et Priorité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="statut">Statut *</Label>
                  <Select 
                    value={formData.statut} 
                    onValueChange={(value) => handleInputChange("statut", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priorité *</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value) => handleInputChange("priority", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button 
              onClick={handleSubmit} 
              disabled={!hasChanges || isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
