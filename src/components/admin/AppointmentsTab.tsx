
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone, MapPin } from "lucide-react";

interface Appointment {
  id: string;
  citizen: string;
  type: string;
  date: string;
  subject: string;
  status: string;
  requestId: string;
}

interface AppointmentsTabProps {
  appointments: Appointment[];
}

export const AppointmentsTab = ({ appointments }: AppointmentsTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Gestion des Audiences
          </CardTitle>
          <CardDescription>
            Planning des rendez-vous citoyens (présentiel, téléphone, visioconférence)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{appointment.subject}</h4>
                    <p className="text-sm text-gray-600">Citoyen: {appointment.citizen}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={appointment.status === 'Confirmé' ? 'bg-green-500' : 'bg-orange-500'}>
                      {appointment.status}
                    </Badge>
                    {appointment.type === 'Visioconférence' && (
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Lien
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(appointment.date).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {new Date(appointment.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex items-center">
                    {appointment.type === 'Visioconférence' ? (
                      <Video className="h-4 w-4 mr-2" />
                    ) : appointment.type === 'Téléphone' ? (
                      <Phone className="h-4 w-4 mr-2" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2" />
                    )}
                    {appointment.type}
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Lié à la requête: {appointment.requestId}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Planning du Jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-blue-800">RDV Programmés</div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Prochains rendez-vous</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>10:30 - Consultation</span>
                  <Badge variant="outline" className="text-xs">Présentiel</Badge>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>14:00 - Suivi dossier</span>
                  <Badge variant="outline" className="text-xs">Visio</Badge>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>16:30 - Médiation</span>
                  <Badge variant="outline" className="text-xs">Téléphone</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
