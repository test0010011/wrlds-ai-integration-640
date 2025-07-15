
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Send, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

interface Administration {
  id: string;
  name: string;
  contact: string;
  phone: string;
  responsable: string;
  specialities: string[];
  activeRequests: number;
  avgResponseTime: string;
}

interface AdministrationsTabProps {
  administrations: Administration[];
}

export const AdministrationsTab = ({ administrations }: AdministrationsTabProps) => {
  const handleSendNotification = (administrationId: string) => {
    toast.success("Notification envoyée à l'administration concernée");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Gestion des Administrations Partenaires
        </CardTitle>
        <CardDescription>
          Coordination avec les services municipaux et organismes externes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {administrations.map((admin) => (
            <div key={admin.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{admin.name}</h3>
                  <p className="text-sm text-gray-600">Responsable: {admin.responsable}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSendNotification(admin.id)}
                >
                  <Send className="h-4 w-4 mr-1" />
                  Notifier
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  {admin.contact}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  {admin.phone}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">Spécialités:</h4>
                <div className="flex flex-wrap gap-2">
                  {admin.specialities.map((speciality, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {speciality}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Requêtes actives:</span>
                  <span className="ml-2 text-blue-600 font-semibold">{admin.activeRequests}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Temps réponse moyen:</span>
                  <span className="ml-2 text-green-600 font-semibold">{admin.avgResponseTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
