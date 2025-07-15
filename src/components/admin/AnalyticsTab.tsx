
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, AlertCircle, Zap } from "lucide-react";

export const AnalyticsTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Performance IA Avancée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Classification Automatique</span>
              <Badge className="bg-green-500">94%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Réponses Automatiques</span>
              <Badge className="bg-blue-500">78%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="font-medium">Analyse de Sentiment</span>
              <Badge className="bg-purple-500">91%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="font-medium">OCR Documents</span>
              <Badge className="bg-orange-500">96%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
              <span className="font-medium">Prédiction Priorité</span>
              <Badge className="bg-pink-500">89%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tendances et Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-red-900">Problèmes Récurrents</h4>
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-sm text-red-800">
                <p>• Éclairage Public: 23 signalements (Secteur Nord)</p>
                <p>• Permis de Construire: Délais dépassés (15% des cas)</p>
                <p>• Transport Public: Plaintes fréquentes Ligne 12</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-900">Insights IA</h4>
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm text-blue-800">
                <p>• Pics de requêtes: Lundi 9h-11h</p>
                <p>• Satisfaction élevée: Services en ligne</p>
                <p>• Réduction 25% temps traitement avec IA</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
