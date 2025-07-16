import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";

// Import the new components
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { KPICards } from "@/components/admin/KPICards";
import { RequestsTab } from "@/components/admin/RequestsTab";
import { WorkflowTab } from "@/components/admin/WorkflowTab";
import { AdministrationsTab } from "@/components/admin/AdministrationsTab";
import { AppointmentsTab } from "@/components/admin/AppointmentsTab";
import { AnalyticsTab } from "@/components/admin/AnalyticsTab";
import { ReportsTab } from "@/components/admin/ReportsTab";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Enhanced mock data with ITIL workflow
  const [stats] = useState({
    totalRequests: 1247,
    pendingRequests: 89,
    resolvedToday: 23,
    avgResponseTime: "2.4h",
    slaCompliance: "96%",
    citizenSatisfaction: "4.7/5",
    aiAccuracy: "94%",
    appointmentsToday: 12
  });

  const [requests] = useState([
    {
      id: "REQ-2024-001250",
      citizen: {
        name: "Mohamed Benaissa",
        email: "mohamed@email.com",
        phone: "+212 6 12 34 56 78",
        address: "123 Rue de la Paix, Casablanca"
      },
      type: "Urbanisme",
      category: "Permis de Construire",
      subject: "Demande de permis de construire - Extension maison",
      description: "Je souhaite obtenir un permis pour l'extension de ma maison...",
      status: "En cours",
      priority: "Moyenne",
      slaStatus: "En temps",
      aiClassification: "Automatique",
      sentiment: "Neutre",
      createdAt: "2024-01-15T10:30:00",
      updatedAt: "2024-01-16T14:20:00",
      assignedTo: "Service Urbanisme",
      assignedAgent: "Fatima Alami",
      estimatedResolution: "2024-01-20",
      workflow: {
        current: "Analyse technique",
        steps: ["Réception", "Classification", "Analyse technique", "Validation", "Réponse", "Clôture"]
      },
      attachments: ["plan_extension.pdf", "photo_terrain.jpg"],
      relatedAdministrations: ["Municipalité", "Service Technique"]
    },
    {
      id: "REQ-2024-001249",
      citizen: {
        name: "Fatima Zerhouni",
        email: "fatima@email.com",
        phone: "+212 6 98 76 54 32",
        address: "456 Avenue des Martyrs, Rabat"
      },
      type: "Transport",
      category: "Éclairage Public",
      subject: "Problème éclairage public rue des Martyrs",
      description: "L'éclairage public ne fonctionne plus depuis 3 jours...",
      status: "Résolu",
      priority: "Haute",
      slaStatus: "Respecté",
      aiClassification: "Automatique",
      sentiment: "Négatif",
      createdAt: "2024-01-14T08:15:00",
      updatedAt: "2024-01-16T16:45:00",
      assignedTo: "Service Technique",
      assignedAgent: "Ahmed Benali",
      resolvedAt: "2024-01-16T16:45:00",
      workflow: {
        current: "Clôturé",
        steps: ["Réception", "Classification", "Intervention", "Réparation", "Vérification", "Clôture"]
      },
      satisfactionScore: 5,
      relatedAdministrations: ["Service Technique", "Électricité Municipale"]
    }
  ]);

  const [administrations] = useState([
    {
      id: "ADM-001",
      name: "Service Urbanisme",
      contact: "urbanisme@mairie.ma",
      phone: "+212 5 22 12 34 56",
      responsable: "Mme. Laila Benkirane",
      specialities: ["Permis de construire", "Autorisations", "Urbanisme"],
      activeRequests: 23,
      avgResponseTime: "3.2j"
    },
    {
      id: "ADM-002", 
      name: "Service Technique",
      contact: "technique@mairie.ma",
      phone: "+212 5 22 98 76 54",
      responsable: "M. Omar Fassi",
      specialities: ["Voirie", "Éclairage", "Maintenance"],
      activeRequests: 18,
      avgResponseTime: "1.8j"
    }
  ]);

  const [appointments] = useState([
    {
      id: "RDV-001",
      citizen: "Mohamed Benaissa",
      type: "Visioconférence",
      date: "2024-01-18T14:00:00",
      subject: "Suivi demande permis",
      status: "Confirmé",
      requestId: "REQ-2024-001250"
    },
    {
      id: "RDV-002",
      citizen: "Amina Kettani",
      type: "Présentiel",
      date: "2024-01-18T10:30:00",
      subject: "Consultation dossier social",
      status: "En attente",
      requestId: "REQ-2024-001248"
    }
  ]);

  const generateReport = () => {
    toast.success("Génération du rapport ITIL en cours...");
    setTimeout(() => {
      toast.success("Rapport ITIL généré et téléchargé avec succès !");
    }, 2000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AdminSidebar />
        
        <SidebarInset className="flex-1">
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b shadow-sm">
              <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <SidebarTrigger className="text-gray-600" />
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

            <div className="p-6">
              <KPICards stats={stats} />

              <Tabs defaultValue="requests" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6 bg-white">
                  <TabsTrigger value="requests">Gestion Requêtes</TabsTrigger>
                  <TabsTrigger value="workflow">Workflow ITIL</TabsTrigger>
                  <TabsTrigger value="administrations">Administrations</TabsTrigger>
                  <TabsTrigger value="appointments">Audiences</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics IA</TabsTrigger>
                  <TabsTrigger value="reports">Rapports</TabsTrigger>
                </TabsList>

                <TabsContent value="requests">
                  <RequestsTab 
                    requests={requests}
                    searchTerm={searchTerm}
                    filterStatus={filterStatus}
                    onSearchChange={setSearchTerm}
                    onFilterChange={setFilterStatus}
                  />
                </TabsContent>

                <TabsContent value="workflow">
                  <WorkflowTab />
                </TabsContent>

                <TabsContent value="administrations">
                  <AdministrationsTab administrations={administrations} />
                </TabsContent>

                <TabsContent value="appointments">
                  <AppointmentsTab appointments={appointments} />
                </TabsContent>

                <TabsContent value="analytics">
                  <AnalyticsTab />
                </TabsContent>

                <TabsContent value="reports">
                  <ReportsTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
