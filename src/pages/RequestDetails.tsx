
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  Building,
  FileText,
  ArrowLeft,
  X,
} from "lucide-react";
import { RequestBadges } from "@/components/admin/RequestBadges";
import { RequestCitizenInfo } from "@/components/admin/RequestCitizenInfo";
import { RequestWorkflow } from "@/components/admin/RequestWorkflow";
import { RequestAudienceManager } from "@/components/admin/RequestAudienceManager";
import { RequestCourierManager } from "@/components/admin/RequestCourierManager";
import { Badge } from "@/components/ui/badge";

const RequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, this would be fetched based on requestId
  const request = {
    id: requestId || "REQ-2024-001250",
    citizen: {
      name: "Mohamed Benaissa",
      email: "mohamed@email.com",
      phone: "+212 6 12 34 56 78",
      address: "123 Rue de la Paix, Casablanca"
    },
    type: "Urbanisme",
    category: "Permis de Construire",
    subject: "Demande de permis de construire - Extension maison",
    description: "Je souhaite obtenir un permis pour l'extension de ma maison familiale. Le projet consiste à ajouter une pièce supplémentaire de 20m² à l'arrière de la propriété existante. Tous les plans architecturaux ont été préparés selon les normes en vigueur.",
    status: "En cours",
    priority: "Moyenne",
    slaStatus: "En temps",
    aiClassification: "Automatique",
    sentiment: "Neutre",
    createdAt: "2024-01-15T10:30:00",
    updatedAt: "2024-01-16T14:20:00",
    assignedTo: "Service Urbanisme",
    assignedAgent: "Fatima Alami",
    estimatedResolution: "2024-01-20",
    workflow: {
      current: "Analyse technique",
      steps: ["Réception", "Classification", "Analyse technique", "Validation", "Réponse", "Clôture"]
    },
    attachments: ["plan_extension.pdf", "photo_terrain.jpg", "estimation_cout.xlsx"],
    relatedAdministrations: ["Municipalité", "Service Technique"]
  };

  const handleClose = () => {
    if (window.opener) {
      window.close();
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold">Détails de la requête {request.id}</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClose}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Fermer
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-xl">{request.id}</h2>
                  <RequestBadges 
                    status={request.status}
                    priority={request.priority}
                    slaStatus={request.slaStatus}
                    aiClassification={request.aiClassification}
                  />
                </div>
                <p className="text-lg text-muted-foreground mb-2">{request.subject}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {request.citizen.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {request.type}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Créé le {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0 space-y-8">
            <Separator />
            
            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Description détaillée
              </h3>
              <p className="text-base leading-relaxed">{request.description}</p>
            </div>

            {/* Citizen Information */}
            <RequestCitizenInfo citizen={request.citizen} />

            {/* Workflow */}
            <RequestWorkflow workflow={request.workflow} />

            {/* Audience Management */}
            <RequestAudienceManager 
              requestId={request.id}
              citizenName={request.citizen.name}
            />

            {/* Courier Management */}
            <RequestCourierManager 
              requestId={request.id}
              citizenName={request.citizen.name}
            />

            {/* Additional Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-base mb-2">Informations de traitement</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Agent assigné:</span>
                      <p className="text-muted-foreground">{request.assignedAgent}</p>
                    </div>
                    <div>
                      <span className="font-medium">Service responsable:</span>
                      <p className="text-muted-foreground">{request.assignedTo}</p>
                    </div>
                    <div>
                      <span className="font-medium">Résolution estimée:</span>
                      <p className="text-muted-foreground">
                        {new Date(request.estimatedResolution).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-base mb-2">Classification automatique</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Type de classification:</span>
                      <p className="text-muted-foreground">{request.aiClassification}</p>
                    </div>
                    <div>
                      <span className="font-medium">Sentiment détecté:</span>
                      <p className="text-muted-foreground">{request.sentiment}</p>
                    </div>
                    <div>
                      <span className="font-medium">Dernière mise à jour:</span>
                      <p className="text-muted-foreground">
                        {new Date(request.updatedAt).toLocaleDateString('fr-FR')} à {' '}
                        {new Date(request.updatedAt).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {request.attachments && request.attachments.length > 0 && (
              <div>
                <h4 className="font-medium text-lg mb-3">Pièces jointes ({request.attachments.length})</h4>
                <div className="grid grid-cols-3 gap-3">
                  {request.attachments.map((attachment, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium truncate">{attachment}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Related Administrations */}
            <div>
              <h4 className="font-medium text-lg mb-3">Administrations impliquées</h4>
              <div className="flex flex-wrap gap-2">
                {request.relatedAdministrations.map((admin, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {admin}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestDetails;
