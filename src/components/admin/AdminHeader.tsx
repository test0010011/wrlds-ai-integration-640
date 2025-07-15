
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Bell, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AdminHeaderProps {
  onGenerateReport: () => void;
}

export const AdminHeader = ({ onGenerateReport }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Accueil
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrateur ITIL</h1>
              <p className="text-sm text-gray-600">Gestion professionnelle des requêtes citoyennes</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Activity className="h-3 w-3 mr-1" />
              Système Opérationnel
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alertes (3)
            </Button>
            <Button onClick={onGenerateReport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Rapport ITIL
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
