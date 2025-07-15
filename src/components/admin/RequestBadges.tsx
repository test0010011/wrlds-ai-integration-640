
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

interface RequestBadgesProps {
  status: string;
  priority: string;
  slaStatus: string;
  aiClassification: string;
}

export const RequestBadges = ({ status, priority, slaStatus, aiClassification }: RequestBadgesProps) => {
  const getStatusBadge = (status: string) => {
    const colors = {
      "Nouveau": "bg-blue-500",
      "En cours": "bg-orange-500", 
      "Résolu": "bg-green-500",
      "Fermé": "bg-gray-500"
    };
    return <Badge className={`${colors[status]} text-white`}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      "Haute": "bg-red-500",
      "Moyenne": "bg-orange-500",
      "Basse": "bg-green-500"
    };
    return <Badge className={`${colors[priority]} text-white`}>{priority}</Badge>;
  };

  const getSLABadge = (slaStatus: string) => {
    const colors = {
      "En temps": "bg-green-500",
      "Attention": "bg-yellow-500",
      "Dépassé": "bg-red-500"
    };
    return <Badge className={`${colors[slaStatus]} text-white`}>{slaStatus}</Badge>;
  };

  return (
    <div className="flex items-center space-x-3">
      {getStatusBadge(status)}
      {getPriorityBadge(priority)}
      {getSLABadge(slaStatus)}
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <Brain className="h-3 w-3 mr-1" />
        IA: {aiClassification}
      </Badge>
    </div>
  );
};
