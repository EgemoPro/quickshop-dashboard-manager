
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Mail, Edit2, Trash2, Send, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { EmailTemplate, addEmailTemplate, updateEmailTemplate, deleteEmailTemplate } from '@/store/slices/marketingSlice';

const EmailSection = () => {
  const dispatch = useDispatch();
  const { emailTemplates, emailSubscribers } = useSelector((state: RootState) => state.marketing);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  
  const resetForm = () => {
    setName('');
    setSubject('');
    setContent('');
    setEditingTemplate(null);
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setName(template.name);
    setSubject(template.subject);
    setContent(template.content);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce modèle d\'email ?')) {
      dispatch(deleteEmailTemplate(id));
    }
  };

  const handlePreview = (template: EmailTemplate) => {
    setPreviewTemplate(template);
    setIsPreviewDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailData = {
      name,
      subject,
      content,
    };

    if (editingTemplate) {
      dispatch(updateEmailTemplate({
        id: editingTemplate.id,
        ...emailData
      }));
    } else {
      dispatch(addEmailTemplate(emailData));
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleSendTest = (id: string) => {
    alert('Email de test envoyé ! Cette fonctionnalité sera implémentée dans une future mise à jour.');
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Modèles d'Emails</CardTitle>
            <CardDescription>Créez et gérez vos modèles d'emails marketing ({emailSubscribers} abonnés)</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Nouveau Modèle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingTemplate ? 'Modifier le Modèle' : 'Nouveau Modèle d\'Email'}</DialogTitle>
                <DialogDescription>
                  {editingTemplate 
                    ? 'Modifiez les détails de votre modèle d\'email.' 
                    : 'Créez un nouveau modèle d\'email pour vos campagnes marketing.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nom</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                      placeholder="Bienvenue Nouveaux Clients"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">Objet</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="col-span-3"
                      placeholder="Bienvenue sur notre boutique !"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="content" className="text-right pt-2">Contenu</Label>
                    <div className="col-span-3">
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        placeholder="<p>Bonjour {{prenom}},</p><p>Merci de vous être inscrit...</p>"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Utilisez {{prenom}}, {{nom}}, etc. pour les variables personnalisées.
                        Le HTML simple est supporté.
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingTemplate ? 'Mettre à jour' : 'Créer'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {emailTemplates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun modèle d'email n'a été créé. Cliquez sur "Nouveau Modèle" pour commencer.
            </div>
          ) : (
            emailTemplates.map((template) => (
              <div key={template.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      Modèle Email
                    </Badge>
                  </div>
                  <h3 className="font-medium">{template.name}</h3>
                  <div className="text-sm text-gray-500">
                    <div className="mt-1">
                      <span className="font-medium">Objet:</span> {template.subject}
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">Dernière modification:</span> {format(new Date(template.lastEdited), 'dd/MM/yyyy')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" onClick={() => handlePreview(template)}>
                    <Copy className="h-4 w-4 mr-1" />
                    Aperçu
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(template)}>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(template.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                  <Button variant="default" size="sm" onClick={() => handleSendTest(template.id)}>
                    <Send className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu de l'Email: {previewTemplate?.name}</DialogTitle>
            <DialogDescription>
              Objet: {previewTemplate?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-md p-4 bg-white">
            <div dangerouslySetInnerHTML={{ 
              __html: previewTemplate?.content
                .replace(/{{prenom}}/g, 'Jean')
                .replace(/{{nom}}/g, 'Dupont') || '' 
            }} />
          </div>
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                navigator.clipboard.writeText(previewTemplate?.content || '');
                alert('Contenu copié !');
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copier le HTML
            </Button>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EmailSection;
