import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Import the new components
import { AdminHeader } from "@/components/admin/AdminHeader";
import { KPICards } from "@/components/admin/KPICards";
import { RequestsTab } from "@/components/admin/RequestsTab";
import { CourriersTab } from "@/components/admin/CourriersTab";
import { WorkflowTab } from "@/components/admin/WorkflowTab";
import { AdministrationsTab } from "@/components/admin/AdministrationsTab";
import { AppointmentsTab } from "@/components/admin/AppointmentsTab";
import { AnalyticsTab } from "@/components/admin/AnalyticsTab";
import { ReportsTab } from "@/components/admin/ReportsTab";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courrierSearchTerm, setCourrierSearchTerm] = useState("");
  const [courrierFilterStatus, setCourrierFilterStatus] = useState("all");
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

  const [courriers] = useState([
    {
      id: "COU-2024-001",
      objet: "Réponse permis de construire",
      type: "Sortant",
      destinataire: "Mohamed Benaissa",
      expediteur: "Service Urbanisme",
      date: "2024-01-15T10:30:00",
      statut: "Envoyé",
      pieceJointe: "reponse_permis.pdf",
      description: "Réponse officielle concernant la demande de permis de construire...",
      priority: "Moyenne",
      category: "Urbanisme"
    },
    {
      id: "COU-2024-002",
      objet: "Demande complément dossier",
      type: "Sortant",
      destinataire: "Fatima Zerhouni",
      expediteur: "Service Technique",
      date: "2024-01-14T08:15:00",
      statut: "En attente",
      pieceJointe: "demande_complement.pdf",
      description: "Demande de compléments pour finaliser le dossier...",
      priority: "Haute",
      category: "Transport"
    },
    {
      id: "COU-2024-003",
      objet: "Convocation audience",
      type: "Sortant",
      destinataire: "Ahmed Benali",
      expediteur: "Secrétariat Général",
      date: "2024-01-16T14:20:00",
      statut: "Brouillon",
      description: "Convocation pour audience concernant le recours administratif...",
      priority: "Haute",
      category: "Administratif"
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
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onGenerateReport={generateReport} />

      <div className="p-6">
        <KPICards stats={stats} />

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white">
            <TabsTrigger value="requests">Gestion Requêtes</TabsTrigger>
            <TabsTrigger value="courriers">Gestion Courriers</TabsTrigger>
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

          <TabsContent value="courriers">
            <CourriersTab 
              courriers={courriers}
              searchTerm={courrierSearchTerm}
              filterStatus={courrierFilterStatus}
              onSearchChange={setCourrierSearchTerm}
              onFilterChange={setCourrierFilterStatus}
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
  );
};

export default AdminDashboard;
