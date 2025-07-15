
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, Clock, CheckCircle, TrendingUp, Target, Star, Brain, Calendar
} from "lucide-react";

interface KPICardsProps {
  stats: {
    totalRequests: number;
    pendingRequests: number;
    resolvedToday: number;
    avgResponseTime: string;
    slaCompliance: string;
    citizenSatisfaction: string;
    aiAccuracy: string;
    appointmentsToday: number;
  };
}

export const KPICards = ({ stats }: KPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.totalRequests}</p>
              <p className="text-xs text-blue-100">Total Requêtes</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.pendingRequests}</p>
              <p className="text-xs text-orange-100">En Attente</p>
            </div>
            <Clock className="h-8 w-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.resolvedToday}</p>
              <p className="text-xs text-green-100">Résolues/Jour</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.avgResponseTime}</p>
              <p className="text-xs text-purple-100">Temps Réponse</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.slaCompliance}</p>
              <p className="text-xs text-indigo-100">Conformité SLA</p>
            </div>
            <Target className="h-8 w-8 text-indigo-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.citizenSatisfaction}</p>
              <p className="text-xs text-teal-100">Satisfaction</p>
            </div>
            <Star className="h-8 w-8 text-teal-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.aiAccuracy}</p>
              <p className="text-xs text-pink-100">Précision IA</p>
            </div>
            <Brain className="h-8 w-8 text-pink-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{stats.appointmentsToday}</p>
              <p className="text-xs text-amber-100">RDV Aujourd'hui</p>
            </div>
            <Calendar className="h-8 w-8 text-amber-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
