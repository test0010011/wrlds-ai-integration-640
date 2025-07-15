
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { NewRequestDialog } from "./NewRequestDialog";

interface RequestFiltersProps {
  searchTerm: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onRequestCreated: (newRequest: any) => void;
}

export const RequestFilters = ({ 
  searchTerm, 
  filterStatus, 
  onSearchChange, 
  onFilterChange,
  onRequestCreated 
}: RequestFiltersProps) => {
  return (
    <div className="flex space-x-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher une requête..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-64"
        />
      </div>
      <Select value={filterStatus} onValueChange={onFilterChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="new">Nouveau</SelectItem>
          <SelectItem value="progress">En cours</SelectItem>
          <SelectItem value="resolved">Résolu</SelectItem>
        </SelectContent>
      </Select>
      <NewRequestDialog onRequestCreated={onRequestCreated} />
    </div>
  );
};
