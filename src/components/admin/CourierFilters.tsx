
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Filter } from "lucide-react";
import { CourierDialog } from "./CourierDialog";

interface CourierFiltersProps {
  searchTerm: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onCourrierCreated: (courrier: any) => void;
}

export const CourierFilters = ({
  searchTerm,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onCourrierCreated,
}: CourierFiltersProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher un courrier..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-80"
        />
      </div>
      
      <Select value={filterStatus} onValueChange={onFilterChange}>
        <SelectTrigger className="w-48">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filtrer par statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="brouillon">Brouillon</SelectItem>
          <SelectItem value="en-attente">En attente</SelectItem>
          <SelectItem value="envoye">Envoyé</SelectItem>
          <SelectItem value="archive">Archivé</SelectItem>
        </SelectContent>
      </Select>

      <CourierDialog requestId="" citizenName="">
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Courrier
        </Button>
      </CourierDialog>
    </div>
  );
};
