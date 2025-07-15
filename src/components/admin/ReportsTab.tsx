
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, PieChart, BarChart3, Brain, Star, Shield, TrendingUp, Download
} from "lucide-react";
import { toast } from "sonner";

export const ReportsTab = () => {
  const generateReport = () => {
    toast.success("Génération du rapport ITIL en cours...");
    setTimeout(() => {
      toast.success("Rapport ITIL généré et téléchargé avec succès !");
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Rapports ITIL Automatisés
        </CardTitle>
        <CardDescription>
          Génération de rapports conformes aux standards ITIL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Rapport SLA</h3>
              <PieChart className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Conformité SLA et performance des services
            </p>
            <Button onClick={generateReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer
            </Button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Rapport ITIL</h3>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Indicateurs ITIL et métriques de performance
            </p>
            <Button onClick={generateReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer
            </Button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Rapport IA</h3>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Performance IA et recommandations d'amélioration
            </p>
            <Button onClick={generateReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer
            </Button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Satisfaction Citoyens</h3>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enquêtes de satisfaction et feedback citoyens
            </p>
            <Button onClick={generateReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer
            </Button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Audit de Conformité</h3>
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Audit des processus et conformité réglementaire
            </p>
            <Button onClick={generateReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer
            </Button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Tendances Prédictives</h3>
              <TrendingUp className="h-8 w-8 text-indigo-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Analyses prédictives et recommandations IA
            </p>
            <Button onClick={generateReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
