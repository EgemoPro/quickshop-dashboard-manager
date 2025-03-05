
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Mail, Send, CheckCheck, Users } from "lucide-react";
import { addEmailTemplate, updateEmailTemplate, deleteEmailTemplate, setEmailSubscribers } from "@/store/slices/marketingSlice";
import { format } from "date-fns";

interface EmailSectionProps {
  darkMode: boolean;
}

const EmailSection: React.FC<EmailSectionProps> = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { emailTemplates, emailSubscribers } = useSelector((state: RootState) => state.marketing);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const [templateForm, setTemplateForm] = useState({
    name: "",
    subject: "",
    content: "",
  });
  
  const [sendForm, setSendForm] = useState({
    template: "",
    segment: "all",
    scheduleDate: format(new Date(), "yyyy-MM-dd"),
    scheduleTime: "12:00",
  });
  
  const resetTemplateForm = () => {
    setTemplateForm({
      name: "",
      subject: "",
      content: "",
    });
    setEditingTemplate(null);
  };
  
  const handleOpenDialog = (templateId?: string) => {
    if (templateId) {
      const template = emailTemplates.find(t => t.id === templateId);
      if (template) {
        setTemplateForm({
          name: template.name,
          subject: template.subject,
          content: template.content,
        });
        setEditingTemplate(templateId);
      }
    } else {
      resetTemplateForm();
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetTemplateForm();
  };
  
  const handleSubmitTemplate = () => {
    if (!templateForm.name || !templateForm.subject || !templateForm.content) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont requis",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (editingTemplate) {
        dispatch(updateEmailTemplate({
          id: editingTemplate,
          ...templateForm,
        }));
        toast({
          title: "Succès",
          description: "Le modèle d'e-mail a été mis à jour",
        });
      } else {
        dispatch(addEmailTemplate(templateForm));
        toast({
          title: "Succès",
          description: "Le modèle d'e-mail a été créé",
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = (id: string) => {
    dispatch(deleteEmailTemplate(id));
    toast({
      title: "Succès",
      description: "Le modèle d'e-mail a été supprimé",
    });
  };
  
  const handleOpenSendDialog = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSendForm({
        ...sendForm,
        template: templateId,
      });
      setSelectedTemplate(templateId);
      setSendDialogOpen(true);
    }
  };
  
  const handleCloseSendDialog = () => {
    setSendDialogOpen(false);
    setSelectedTemplate(null);
  };
  
  const handleSendEmail = () => {
    const template = emailTemplates.find(t => t.id === sendForm.template);
    if (!template) {
      toast({
        title: "Erreur",
        description: "Modèle d'e-mail non trouvé",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate sending email
    toast({
      title: "E-mails programmés",
      description: `La campagne "${template.name}" a été programmée pour le ${sendForm.scheduleDate} à ${sendForm.scheduleTime}`,
    });
    handleCloseSendDialog();
  };
  
  return (
    <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300 mt-6`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Marketing par E-mail</CardTitle>
            <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Gérez vos templates d'e-mails et vos campagnes
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" /> Nouveau template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <CardContent className="p-4 flex flex-col items-center">
              <Users className={`h-8 w-8 mb-2 mt-2 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              <p className="text-2xl font-bold">{emailSubscribers}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Abonnés à la newsletter</p>
            </CardContent>
          </Card>
          
          <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <CardContent className="p-4 flex flex-col items-center">
              <Mail className={`h-8 w-8 mb-2 mt-2 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              <p className="text-2xl font-bold">{emailTemplates.length}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Templates d'emails</p>
            </CardContent>
          </Card>
          
          <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <CardContent className="p-4 flex flex-col items-center">
              <Send className={`h-8 w-8 mb-2 mt-2 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              <p className="text-2xl font-bold">78%</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Taux d'ouverture moyen</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2">Templates d'e-mails</h3>
          
          {emailTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emailTemplates.map((template) => (
                <Card key={template.id} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Dernière modification: {template.lastEdited}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenSendDialog(template.id)}>
                          <Send className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(template.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(template.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className={`mt-2 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} pt-2`}>
                      <p className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sujet:</p>
                      <p className="text-sm mt-1">{template.subject}</p>
                    </div>
                    <div className={`mt-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} pt-2`}>
                      <p className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contenu:</p>
                      <div className={`text-sm mt-1 p-2 rounded border ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'} max-h-24 overflow-y-auto`}>
                        <p className="text-xs" dangerouslySetInnerHTML={{ __html: template.content }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <Mail className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Aucun template d'e-mail</p>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Dialog pour ajouter/éditer un template */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} sm:max-w-[650px]`}>
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "Modifier le template" : "Créer un nouveau template"}</DialogTitle>
            <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {editingTemplate ? "Modifiez les détails du template" : "Créez un nouveau template d'e-mail"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-name" className="text-right">Nom</Label>
              <Input
                id="template-name"
                value={templateForm.name}
                onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                placeholder="Bienvenue"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-subject" className="text-right">Sujet</Label>
              <Input
                id="template-subject"
                value={templateForm.subject}
                onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                placeholder="Bienvenue chez QuickShop!"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="template-content" className="text-right mt-2">Contenu</Label>
              <Textarea
                id="template-content"
                value={templateForm.content}
                onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
                placeholder="<p>Bonjour {{prenom}},</p><p>Merci de vous être inscrit chez QuickShop!</p>"
                className="col-span-3 min-h-[200px]"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div></div>
              <div className="col-span-3">
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Variables disponibles: {"{{prenom}}"}, {"{{nom}}"}, {"{{email}}"}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Vous pouvez utiliser du HTML basique pour la mise en forme.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleSubmitTemplate} className="bg-teal-600 hover:bg-teal-700">
              {editingTemplate ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog pour envoyer un e-mail */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} sm:max-w-[500px]`}>
          <DialogHeader>
            <DialogTitle>Programmer l'envoi d'e-mails</DialogTitle>
            <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Choisissez quand et à qui envoyer ce template
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="send-segment" className="text-right">Segment</Label>
              <div className="col-span-3">
                <select
                  id="send-segment"
                  value={sendForm.segment}
                  onChange={(e) => setSendForm({ ...sendForm, segment: e.target.value })}
                  className={`w-full h-10 px-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="all">Tous les abonnés ({emailSubscribers})</option>
                  <option value="active">Clients actifs (823)</option>
                  <option value="inactive">Clients inactifs (425)</option>
                  <option value="new">Nouveaux clients (76)</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="send-date" className="text-right">Date</Label>
              <Input
                id="send-date"
                type="date"
                value={sendForm.scheduleDate}
                onChange={(e) => setSendForm({ ...sendForm, scheduleDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="send-time" className="text-right">Heure</Label>
              <Input
                id="send-time"
                type="time"
                value={sendForm.scheduleTime}
                onChange={(e) => setSendForm({ ...sendForm, scheduleTime: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <div className={`col-span-3 p-3 rounded-lg ${darkMode ? 'bg-teal-900/20 border border-teal-800' : 'bg-teal-50 border border-teal-100'}`}>
                <div className="flex items-center">
                  <CheckCheck className={`h-5 w-5 mr-2 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
                  <p className={`text-sm ${darkMode ? 'text-teal-400' : 'text-teal-800'}`}>
                    Les e-mails seront envoyés au moment programmé
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseSendDialog}>Annuler</Button>
            <Button onClick={handleSendEmail} className="bg-teal-600 hover:bg-teal-700">Programmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EmailSection;
