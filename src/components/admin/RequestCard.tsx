
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Clock,
  User,
  Building,
  FileText,
  ExternalLink,
} from "lucide-react";
import { RequestBadges } from "./RequestBadges";
import { AssignUserDialog } from "./AssignUserDialog";
import { RequestNotificationsDialog } from "./RequestNotificationsDialog";
import { RequestActionsMenu } from "./RequestActionsMenu";
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
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}

export const RequestCard = ({ request, isSelected, onSelect }: RequestCardProps) => {
  const handleViewDetails = () => {
    const detailsUrl = `/admin/requests/${request.id}`;
    window.open(detailsUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
  };

  const handleAssignUser = (userId: string, userName: string) => {
    toast.success(`Requête ${request.id} assignée à ${userName}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              className="mt-1"
            />
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
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleViewDetails}
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              Détail
            </Button>
            <AssignUserDialog
              requestId={request.id}
              currentAssignee={request.assignedAgent}
              onAssign={handleAssignUser}
            />
            <RequestNotificationsDialog
              requestId={request.id}
              citizenName={request.citizen.name}
            />
            <RequestActionsMenu requestId={request.id} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Separator className="mb-4" />
        
        {/* Description abrégée */}
        <div className="mb-4">
          <h4 className="font-medium mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Description
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>
        </div>

        {/* Informations de base */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Agent assigné:</span>
            <p className="text-muted-foreground">{request.assignedAgent}</p>
          </div>
          <div>
            <span className="font-medium">Workflow:</span>
            <p className="text-muted-foreground">{request.workflow.current}</p>
          </div>
        </div>

        {request.attachments && request.attachments.length > 0 && (
          <div className="mt-4">
            <span className="text-xs text-muted-foreground">
              {request.attachments.length} pièce(s) jointe(s)
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
