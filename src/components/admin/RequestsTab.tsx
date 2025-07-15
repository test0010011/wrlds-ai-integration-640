import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { RequestFilters } from "./RequestFilters";
import { RequestCard } from "./RequestCard";
import { RequestsBulkActions } from "./RequestsBulkActions";

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

interface RequestsTabProps {
  requests: Request[];
  searchTerm: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export const RequestsTab = ({ 
  requests, 
  searchTerm, 
  filterStatus, 
  onSearchChange, 
  onFilterChange 
}: RequestsTabProps) => {
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());

  const handleNewRequest = (newRequest: any) => {
    console.log("New request created:", newRequest);
  };

  const handleSelectRequest = (requestId: string, selected: boolean) => {
    const newSelected = new Set(selectedRequests);
    if (selected) {
      newSelected.add(requestId);
    } else {
      newSelected.delete(requestId);
    }
    setSelectedRequests(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedRequests(new Set(requests.map(r => r.id)));
  };

  const handleDeselectAll = () => {
    setSelectedRequests(new Set());
  };

  const allSelected = requests.length > 0 && selectedRequests.size === requests.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Gestion Professionnelle des Requêtes
            </CardTitle>
            <CardDescription>
              Workflow ITIL avec classification IA et SLA tracking
            </CardDescription>
          </div>
          <RequestFilters 
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onRequestCreated={handleNewRequest}
          />
        </div>
      </CardHeader>
      
      <RequestsBulkActions
        selectedCount={selectedRequests.size}
        totalCount={requests.length}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        allSelected={allSelected}
      />
      
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard 
              key={request.id} 
              request={request}
              isSelected={selectedRequests.has(request.id)}
              onSelect={(selected) => handleSelectRequest(request.id, selected)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
