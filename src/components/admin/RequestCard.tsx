
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  Building,
  FileText,
  Eye,
  UserPlus,
  Bell,
} from "lucide-react";
import { RequestBadges } from "./RequestBadges";
import { RequestCitizenInfo } from "./RequestCitizenInfo";
import { RequestWorkflow } from "./RequestWorkflow";
import { RequestAudienceManager } from "./RequestAudienceManager";
import { RequestCourierManager } from "./RequestCourierManager";
import { toast } from "sonner";

interface Request {
  id: string;
  citizen: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  type: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  slaStatus: string;
  aiClassification: string;
  sentiment: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  assignedAgent: string;
  estimatedResolution?: string;
  workflow: {
    current: string;
    steps: string[];
  };
  attachments?: string[];
  relatedAdministrations: string[];
  satisfactionScore?: number;
  resolvedAt?: string;
}

interface RequestCardProps {
  request: Request;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  const handleViewDetails = () => {
    toast.info(`Ouverture des détails de la requête ${request.id}`);
  };

  const handleAssign = () => {
    toast.info(`Assignation de la requête ${request.id}`);
  };

  const handleNotify = () => {
    toast.success(`Notification envoyée pour la requête ${request.id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{request.id}</h3>
              <RequestBadges 
                status={request.status}
                priority={request.priority}
                slaStatus={request.slaStatus}
                aiClassification={request.aiClassification}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{request.subject}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {request.citizen.name}
              </span>
              <span className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                {request.type}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(request.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleViewDetails}
              className="flex items-center gap-1"
            >
              <Eye className="h-4 w-4" />
              Détail
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAssign}
              className="flex items-center gap-1"
            >
              <UserPlus className="h-4 w-4" />
              Assigner
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleNotify}
              className="flex items-center gap-1"
            >
              <Bell className="h-4 w-4" />
              Notifier
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-6">
        <Separator />
        
        {/* Description */}
        <div>
          <h4 className="font-medium mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Description
          </h4>
          <p className="text-sm text-muted-foreground">{request.description}</p>
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
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Agent assigné:</span>
            <p className="text-muted-foreground">{request.assignedAgent}</p>
          </div>
          <div>
            <span className="font-medium">Classification IA:</span>
            <p className="text-muted-foreground">{request.aiClassification}</p>
          </div>
        </div>

        {request.attachments && request.attachments.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Pièces jointes</h4>
            <div className="flex flex-wrap gap-2">
              {request.attachments.map((attachment, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {attachment}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
