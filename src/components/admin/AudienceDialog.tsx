
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, User, FileText } from "lucide-react";
import { toast } from "sonner";

const audienceSchema = z.object({
  sujet: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  date: z.string().min(1, "Date requise"),
  pieceJointe: z.string().optional(),
  citoyen: z.string().min(2, "Nom du citoyen requis"),
  chargeDuDossier: z.string().optional(),
});

type AudienceFormData = z.infer<typeof audienceSchema>;

interface AudienceDialogProps {
  onAudienceCreated?: (audience: any) => void;
  requestId?: string;
  defaultCitoyen?: string;
}

export const AudienceDialog = ({ 
  onAudienceCreated, 
  requestId,
  defaultCitoyen 
}: AudienceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AudienceFormData>({
    resolver: zodResolver(audienceSchema),
    defaultValues: {
      sujet: "",
      date: "",
      pieceJointe: "",
      citoyen: defaultCitoyen || "",
      chargeDuDossier: "",
    },
  });

  const onSubmit = async (data: AudienceFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAudience = {
        id: `AUD-${Date.now()}`,
        sujet: data.sujet,
        date: data.date,
        pieceJointe: data.pieceJointe,
        citoyen: data.citoyen,
        chargeDuDossier: data.chargeDuDossier,
        status: "Programmée",
        requestId: requestId,
        createdAt: new Date().toISOString(),
      };

      toast.success("Audience créée avec succès !", {
        description: `Audience programmée pour le ${new Date(data.date).toLocaleDateString('fr-FR')}`
      });

      if (onAudienceCreated) {
        onAudienceCreated(newAudience);
      }

      // Reset form and close dialog
      form.reset();
      setOpen(false);
      
    } catch (error) {
      toast.error("Erreur lors de la création de l'audience");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Audience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Calendar className="h-5 w-5 mr-2" />
            Programmer une Audience
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-700">
                  <FileText className="h-5 w-5 mr-2" />
                  Informations de l'Audience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="sujet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet *</FormLabel>
                      <FormControl>
                        <Input placeholder="Sujet de l'audience" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date *</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pieceJointe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pièce Jointe</FormLabel>
                        <FormControl>
                          <Input placeholder="Document de référence" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="citoyen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Citoyen *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom du citoyen" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="chargeDuDossier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chargé de l'audience</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un agent" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ahmed.benali">Ahmed Benali</SelectItem>
                            <SelectItem value="fatima.alami">Fatima Alami</SelectItem>
                            <SelectItem value="omar.fassi">Omar Fassi</SelectItem>
                            <SelectItem value="laila.benkirane">Laila Benkirane</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Création..." : "Programmer l'Audience"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
