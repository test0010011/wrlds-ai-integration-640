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
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Upload,
  X,
  User,
  FileText,
  AlertCircle,
  Calendar,
  Building,
} from "lucide-react";
import { toast } from "sonner";

const requestSchema = z.object({
  // Renseignements
  numeroRequete: z.string().optional(),
  dateRequete: z.string().min(1, "Date de la requête requise"),
  nomPrenomCitoyen: z.string().min(2, "Nom et prénom requis"),
  
  // Type de la Requête
  centraleDelegue: z.string().min(1, "Centrale/Délégué requis"),
  typeRequete: z.enum(["personne_physique", "developpement_local"], {
    message: "Type de requête requis",
  }),
  
  // Pour personne physique
  secteur: z.string().optional(),
  administrationFinances: z.string().optional(),
  objetDomaines: z.string().optional(),
  
  // Pour développement local
  objetDeveloppementLocal: z.string().optional(),
  
  // La requête
  objet: z.string().min(5, "L'objet doit contenir au moins 5 caractères"),
  description: z.string().min(20, "La description doit contenir au moins 20 caractères"),
});

type RequestFormData = z.infer<typeof requestSchema>;

interface NewRequestDialogProps {
  onRequestCreated?: (request: any) => void;
}

const centralesDelegues = [
  "Dépendance Institutionnelles > Médiateur de la République > Services déconcentrés > Wilaya 01",
  "Dépendance Institutionnelles > Médiateur de la République > Services déconcentrés > Wilaya 02",
  "Dépendance Institutionnelles > Médiateur de la République > Services déconcentrés > Wilaya 03",
];

const secteurs = [
  "Finances",
  "Santé",
  "Éducation",
  "Justice",
  "Transport",
  "Environnement",
  "Urbanisme",
  "Agriculture",
];

// Administrations par secteur
const administrationsBySecteur: Record<string, string[]> = {
  "Finances": [
    "Direction des Domaines",
    "Direction des Impôts",
    "Direction du Budget",
    "Direction de la Comptabilité",
    "Direction des Marchés Publics",
  ],
  "Santé": [
    "Direction de la Santé Publique",
    "Direction des Hôpitaux",
    "Direction de la Pharmacie",
    "Direction de la Prévention",
  ],
  "Éducation": [
    "Direction de l'Éducation Nationale",
    "Direction de l'Enseignement Supérieur",
    "Direction de la Formation Professionnelle",
  ],
  "Justice": [
    "Direction des Affaires Juridiques",
    "Direction de l'État Civil",
    "Direction des Greffes",
  ],
  "Transport": [
    "Direction des Transports",
    "Direction de la Circulation",
    "Direction des Travaux Publics",
  ],
  "Environnement": [
    "Direction de l'Environnement",
    "Direction des Forêts",
    "Direction de l'Assainissement",
  ],
  "Urbanisme": [
    "Direction de l'Urbanisme",
    "Direction de la Construction",
    "Direction de l'Habitat",
  ],
  "Agriculture": [
    "Direction de l'Agriculture",
    "Direction de l'Élevage",
    "Direction de la Pêche",
  ],
};

// Objets par administration
const objetsByAdministration: Record<string, string[]> = {
  "Direction des Domaines": [
    "Requête > Ministère des finances > Direction des Domaines > Actes de propriétés",
    "Requête > Ministère des finances > Direction des Domaines > Titres fonciers",
    "Requête > Ministère des finances > Direction des Domaines > Bornage",
    "Requête > Ministère des finances > Direction des Domaines > Mutation",
  ],
  "Direction des Impôts": [
    "Requête > Ministère des finances > Direction des Impôts > Déclarations fiscales",
    "Requête > Ministère des finances > Direction des Impôts > Remboursements",
    "Requête > Ministère des finances > Direction des Impôts > Contrôles fiscaux",
  ],
  "Direction de la Santé Publique": [
    "Requête > Ministère de la santé > Direction de la Santé Publique > Cartes de santé",
    "Requête > Ministère de la santé > Direction de la Santé Publique > Vaccinations",
    "Requête > Ministère de la santé > Direction de la Santé Publique > Épidémiologie",
  ],
  // Ajouter d'autres objets par administration selon les besoins
};

export const NewRequestDialog = ({ onRequestCreated }: NewRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      numeroRequete: "",
      dateRequete: "",
      nomPrenomCitoyen: "",
      centraleDelegue: "",
      typeRequete: "personne_physique",
      secteur: "",
      administrationFinances: "",
      objetDomaines: "",
      objetDeveloppementLocal: "",
      objet: "",
      description: "",
    },
  });

  const selectedTypeRequete = form.watch("typeRequete");
  const selectedSecteur = form.watch("secteur");
  const selectedAdministration = form.watch("administrationFinances");

  // Réinitialiser les champs dépendants quand le secteur change
  const handleSecteurChange = (value: string) => {
    form.setValue("secteur", value);
    form.setValue("administrationFinances", "");
    form.setValue("objetDomaines", "");
  };

  // Réinitialiser l'objet quand l'administration change
  const handleAdministrationChange = (value: string) => {
    form.setValue("administrationFinances", value);
    form.setValue("objetDomaines", "");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: RequestFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newRequest = {
        id: `REQ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
        citizen: {
          name: data.nomPrenomCitoyen,
          email: "",
          phone: "",
          address: "",
        },
        type: data.typeRequete === "personne_physique" ? "Personne Physique" : "Développement Local",
        category: data.secteur || "Général",
        subject: data.objet,
        description: data.description,
        status: "Nouveau",
        priority: "Moyenne",
        slaStatus: "En temps",
        aiClassification: "Auto-classifiée",
        sentiment: "Neutre",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: "",
        assignedAgent: "Non assigné",
        workflow: {
          current: "Réception",
          steps: ["Réception", "Analyse", "Traitement", "Validation", "Clôture"]
        },
        attachments: attachments.map(file => file.name),
        relatedAdministrations: [data.administrationFinances || "Général"],
        centraleDelegue: data.centraleDelegue,
        numeroRequete: data.numeroRequete,
      };

      toast.success(`Requête ${newRequest.id} créée avec succès !`, {
        description: "La requête a été enregistrée dans le système"
      });

      if (onRequestCreated) {
        onRequestCreated(newRequest);
      }

      // Reset form and close dialog
      form.reset();
      setAttachments([]);
      setOpen(false);
      
    } catch (error) {
      toast.error("Erreur lors de la création de la requête");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Requête
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <FileText className="h-5 w-5 mr-2" />
            Requêtes des citoyens
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Ce service est destiné à introduire les requêtes auprès du Médiateur de la République, par les agents de l'administration
          </p>
          <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-600">
            Les informations incorrectes et l'utilisation irresponsable des formulaires transmis peuvent exposer l'utilisateur à des poursuites judiciaires.
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Renseignements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-700">
                  <User className="h-5 w-5 mr-2" />
                  Renseignements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="numeroRequete"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de la Requête</FormLabel>
                        <FormControl>
                          <Input placeholder="Numéro automatique" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateRequete"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de la Requête *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nomPrenomCitoyen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom et Prénom du Citoyen *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom complet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Type de la Requête */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-700">
                  <Building className="h-5 w-5 mr-2" />
                  Type de la Requête
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="centraleDelegue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Centrale/Délégué *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la centrale/délégué" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {centralesDelegues.map((centrale) => (
                            <SelectItem key={centrale} value={centrale}>
                              {centrale}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="typeRequete"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de la Requête *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="personne_physique" id="personne_physique" />
                            <Label htmlFor="personne_physique">Requête relative aux personnes physiques</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="developpement_local" id="developpement_local" />
                            <Label htmlFor="developpement_local">Requête relative au développement local</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedTypeRequete === "personne_physique" && (
                  <Card className="bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-base text-blue-700">Requête : personne physique</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="secteur"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secteur *</FormLabel>
                            <Select onValueChange={handleSecteurChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner le secteur" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {secteurs.map((secteur) => (
                                  <SelectItem key={secteur} value={secteur}>
                                    {secteur}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedSecteur && (
                        <FormField
                          control={form.control}
                          name="administrationFinances"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Administration - {selectedSecteur} *</FormLabel>
                              <Select onValueChange={handleAdministrationChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner l'administration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {(administrationsBySecteur[selectedSecteur] || []).map((admin) => (
                                    <SelectItem key={admin} value={admin}>
                                      {admin}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {selectedAdministration && (
                        <FormField
                          control={form.control}
                          name="objetDomaines"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Objet - {selectedAdministration} *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner l'objet" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {(objetsByAdministration[selectedAdministration] || []).map((objet) => (
                                    <SelectItem key={objet} value={objet}>
                                      {objet}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </CardContent>
                  </Card>
                )}

                {selectedTypeRequete === "developpement_local" && (
                  <Card className="bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-base text-green-700">Requête : développement local</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="objetDeveloppementLocal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objet *</FormLabel>
                            <FormControl>
                              <Input placeholder="Saisir l'objet de la requête" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* La requête */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-700">
                  <FileText className="h-5 w-5 mr-2" />
                  La requête
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="objet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objet *</FormLabel>
                      <FormControl>
                        <Input placeholder="Objet de la requête" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description détaillée de la requête..."
                          {...field}
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Joindre les documents */}
                <div>
                  <Label className="text-sm font-medium">Joindre les documents *</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">
                      Fichier(s) (1 Mio maximum) :
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      Glissez et déposez votre fichier ici, ou
                    </div>
                    <div className="space-x-2">
                      <Input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Sélect. fichiers
                      </Button>
                      <span className="text-sm text-gray-500">Aucun fichier choisi</span>
                    </div>
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
