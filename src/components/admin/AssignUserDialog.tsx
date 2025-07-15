
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, User, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  isOnline: boolean;
  workload: number;
}

interface AssignUserDialogProps {
  requestId: string;
  currentAssignee?: string;
  onAssign: (userId: string, userName: string) => void;
}

export const AssignUserDialog = ({ requestId, currentAssignee, onAssign }: AssignUserDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Mock users data
  const users: User[] = [
    {
      id: "USER-001",
      name: "Fatima Alami",
      email: "fatima.alami@mairie.ma",
      role: "Agent Urbanisme",
      department: "Service Urbanisme",
      isOnline: true,
      workload: 8
    },
    {
      id: "USER-002",
      name: "Ahmed Benali",
      email: "ahmed.benali@mairie.ma",
      role: "Technicien",
      department: "Service Technique",
      isOnline: true,
      workload: 5
    },
    {
      id: "USER-003",
      name: "Laila Benkirane",
      email: "laila.benkirane@mairie.ma",
      role: "Responsable Urbanisme",
      department: "Service Urbanisme",
      isOnline: false,
      workload: 12
    },
    {
      id: "USER-004",
      name: "Omar Fassi",
      email: "omar.fassi@mairie.ma",
      role: "Chef Technique",
      department: "Service Technique",
      isOnline: true,
      workload: 3
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedUser) {
      const user = users.find(u => u.id === selectedUser);
      if (user) {
        onAssign(selectedUser, user.name);
        toast.success(`Requête ${requestId} assignée à ${user.name}`);
      }
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getWorkloadColor = (workload: number) => {
    if (workload <= 5) return "bg-green-500";
    if (workload <= 10) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Assigner
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Assigner la requête {requestId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un agent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Current assignee */}
          {currentAssignee && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-1">Agent actuellement assigné</div>
              <div className="text-sm text-muted-foreground">{currentAssignee}</div>
            </div>
          )}

          {/* Users list */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedUser === user.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.role}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.isOnline ? "default" : "secondary"}>
                      {user.isOnline ? "En ligne" : "Hors ligne"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getWorkloadColor(user.workload)}`} />
                      <span className="text-xs">{user.workload} tâches</span>
                    </div>
                    {selectedUser === user.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {user.department}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button 
                onClick={handleAssign}
                disabled={!selectedUser}
              >
                Assigner
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
