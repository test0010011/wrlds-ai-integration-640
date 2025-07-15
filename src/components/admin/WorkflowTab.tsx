
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

export const WorkflowTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RefreshCw className="mr-2 h-5 w-5" />
            Workflow ITIL en Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-blue-900">Incident Management</h4>
                <p className="text-sm text-blue-700">Gestion des incidents selon ITIL</p>
              </div>
              <Badge className="bg-blue-500">23 Actifs</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-green-900">Service Request</h4>
                <p className="text-sm text-green-700">Demandes de services standard</p>
              </div>
              <Badge className="bg-green-500">45 Actifs</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-orange-900">Problem Management</h4>
                <p className="text-sm text-orange-700">Résolution des causes racines</p>
              </div>
              <Badge className="bg-orange-500">12 Actifs</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-purple-900">Change Management</h4>
                <p className="text-sm text-purple-700">Gestion des changements</p>
              </div>
              <Badge className="bg-purple-500">8 Actifs</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SLA Compliance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Conformité SLA Globale</span>
                <span className="text-sm text-green-600 font-semibold">96%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Temps de Première Réponse</span>
                <span className="text-sm text-blue-600 font-semibold">2.4h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Temps de Résolution</span>
                <span className="text-sm text-purple-600 font-semibold">1.8j</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
