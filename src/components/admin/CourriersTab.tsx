
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, LayoutGrid, Table as TableIcon } from "lucide-react";
import { CourierFilters } from "./CourierFilters";
import { CourierCard } from "./CourierCard";
import { CourierBulkActions } from "./CourierBulkActions";
import { CourierTableView } from "./CourierTableView";

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
}

interface CourriersTabProps {
  courriers: Courier[];
  searchTerm: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export const CourriersTab = ({ 
  courriers, 
  searchTerm, 
  filterStatus, 
  onSearchChange, 
  onFilterChange 
}: CourriersTabProps) => {
  const [selectedCourriers, setSelectedCourriers] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const handleNewCourrier = (newCourrier: any) => {
    console.log("New courrier created:", newCourrier);
  };

  const handleSelectCourrier = (courrierId: string, selected: boolean) => {
    const newSelected = new Set(selectedCourriers);
    if (selected) {
      newSelected.add(courrierId);
    } else {
      newSelected.delete(courrierId);
    }
    setSelectedCourriers(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedCourriers(new Set(courriers.map(c => c.id)));
  };

  const handleDeselectAll = () => {
    setSelectedCourriers(new Set());
  };

  const allSelected = courriers.length > 0 && selectedCourriers.size === courriers.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Gestion Professionnelle des Courriers
            </CardTitle>
            <CardDescription>
              Workflow ITIL avec classification IA et SLA tracking
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
                className="flex items-center gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                Cartes
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="flex items-center gap-2"
              >
                <TableIcon className="h-4 w-4" />
                Tableau
              </Button>
            </div>
            <CourierFilters 
              searchTerm={searchTerm}
              filterStatus={filterStatus}
              onSearchChange={onSearchChange}
              onFilterChange={onFilterChange}
              onCourrierCreated={handleNewCourrier}
            />
          </div>
        </div>
      </CardHeader>
      
      <CourierBulkActions
        selectedCount={selectedCourriers.size}
        totalCount={courriers.length}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        allSelected={allSelected}
      />
      
      <CardContent>
        {viewMode === 'cards' ? (
          <div className="space-y-4">
            {courriers.map((courrier) => (
              <CourierCard 
                key={courrier.id} 
                courrier={courrier}
                isSelected={selectedCourriers.has(courrier.id)}
                onSelect={(selected) => handleSelectCourrier(courrier.id, selected)}
              />
            ))}
          </div>
        ) : (
          <CourierTableView
            courriers={courriers}
            selectedCourriers={selectedCourriers}
            onSelectCourrier={handleSelectCourrier}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            allSelected={allSelected}
          />
        )}
      </CardContent>
    </Card>
  );
};
