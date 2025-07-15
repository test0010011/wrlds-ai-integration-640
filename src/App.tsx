
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CitizenPortal from "./pages/CitizenPortal";
import AdminDashboard from "./pages/AdminDashboard";
import LegalLibrary from "./pages/LegalLibrary";
import CitizenRegistration from "./pages/CitizenRegistration";
import RequestDetails from "./pages/RequestDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/citizen-portal" element={<CitizenPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/citizens" element={<CitizenRegistration />} />
          <Route path="/admin/requests/:requestId" element={<RequestDetails />} />
          <Route path="/legal-library" element={<LegalLibrary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
