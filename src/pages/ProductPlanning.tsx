
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Plus, MessageCircle, Package2, Filter, Loader2, Trash2, Edit, AlertTriangle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  setActiveTab, 
  setSearchTerm, 
  setLoading,
  addEvent,
  updateEvent,
  deleteEvent,
  type ScheduledEvent,
  type EventType
} from "@/store/slices/planningSlice";
import { useToast } from "@/components/ui/use-toast";

const locales = { fr };
// Create a proper localizer for react-big-calendar
const localizer = dateFnsLocalizer({
  format: (date, formatStr) => format(date, formatStr, { locale: fr }),
  parse: (str, formatStr) => parse(str, formatStr, new Date()),
  startOfWeek: (date) => startOfWeek(date, { locale: fr }),
  getDay,
  locales
});

const ProductPlanning = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { events, isLoading, activeTab, searchTerm } = useAppSelector(state => state.planning);

  // Local state for dialogs and forms
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ScheduledEvent | null>(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    type: "product" as EventType,
    startDate: format(new Date(), "yyyy-MM-dd"),
    startTime: "10:00",
    endDate: format(new Date(), "yyyy-MM-dd"),
    endTime: "11:00",
    productId: ""
  });

  useEffect(() => {
    // Simulate data loading
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  // Filter events based on active tab and search term
  const filteredEvents = events.filter(event => {
    const matchesType = 
      activeTab === "all" || 
      (activeTab === "products" && event.type === "product") || 
      (activeTab === "messages" && event.type === "message");
    
    const matchesSearch = 
      searchTerm === "" || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  // Handle tab change
  const handleTabChange = (value: string) => {
    dispatch(setActiveTab(value));
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Open add event dialog with default time
  const openAddDialog = () => {
    const now = new Date();
    const tomorrow = addDays(now, 1);
    
    setEventForm({
      title: "",
      description: "",
      type: "product",
      startDate: format(tomorrow, "yyyy-MM-dd"),
      startTime: "10:00",
      endDate: format(tomorrow, "yyyy-MM-dd"),
      endTime: "11:00",
      productId: ""
    });
    
    setShowAddDialog(true);
  };

  // Open edit dialog with event data
  const openEditDialog = (event: ScheduledEvent) => {
    setCurrentEvent(event);
    setEventForm({
      title: event.title,
      description: event.description || "",
      type: event.type,
      startDate: format(event.start, "yyyy-MM-dd"),
      startTime: format(event.start, "HH:mm"),
      endDate: format(event.end, "yyyy-MM-dd"),
      endTime: format(event.end, "HH:mm"),
      productId: event.productId || ""
    });
    
    setShowEditDialog(true);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (event: ScheduledEvent) => {
    setCurrentEvent(event);
    setShowDeleteDialog(true);
  };

  // Handle add event
  const handleAddEvent = () => {
    const startDateTime = new Date(`${eventForm.startDate}T${eventForm.startTime}`);
    const endDateTime = new Date(`${eventForm.endDate}T${eventForm.endTime}`);
    
    const newEvent: ScheduledEvent = {
      id: Math.random().toString(36).substring(2, 11),
      title: eventForm.title,
      start: startDateTime,
      end: endDateTime,
      type: eventForm.type,
      description: eventForm.description,
      ...(eventForm.type === "product" && { productId: eventForm.productId || undefined })
    };
    
    dispatch(addEvent(newEvent));
    setShowAddDialog(false);
    
    toast({
      title: "Événement ajouté",
      description: `L'événement "${newEvent.title}" a été ajouté au calendrier.`
    });
  };

  // Handle edit event
  const handleEditEvent = () => {
    if (!currentEvent) return;
    
    const startDateTime = new Date(`${eventForm.startDate}T${eventForm.startTime}`);
    const endDateTime = new Date(`${eventForm.endDate}T${eventForm.endTime}`);
    
    const updatedEvent: ScheduledEvent = {
      ...currentEvent,
      title: eventForm.title,
      start: startDateTime,
      end: endDateTime,
      type: eventForm.type,
      description: eventForm.description,
      ...(eventForm.type === "product" 
          ? { productId: eventForm.productId || undefined }
          : { productId: undefined })
    };
    
    dispatch(updateEvent(updatedEvent));
    setShowEditDialog(false);
    setCurrentEvent(null);
    
    toast({
      title: "Événement modifié",
      description: `L'événement "${updatedEvent.title}" a été mis à jour.`
    });
  };

  // Handle delete event
  const handleDeleteEvent = () => {
    if (!currentEvent) return;
    
    dispatch(deleteEvent(currentEvent.id));
    setShowDeleteDialog(false);
    setCurrentEvent(null);
    
    toast({
      title: "Événement supprimé",
      description: `L'événement a été supprimé du calendrier.`,
      variant: "destructive"
    });
  };

  // Custom event component
  const EventComponent = ({ event }: { event: ScheduledEvent }) => (
    <div 
      className={`rounded px-2 py-1 ${event.type === "product" ? "bg-blue-100" : "bg-green-100"} flex items-center justify-between group`}
      onClick={(e) => {
        e.stopPropagation();
        openEditDialog(event);
      }}
    >
      <div className="flex items-center gap-1">
        {event.type === "product" ? (
          <Package2 className="h-3 w-3" />
        ) : (
          <MessageCircle className="h-3 w-3" />
        )}
        <span className="text-xs font-medium truncate">
          {event.title}
        </span>
      </div>
      <div className="hidden group-hover:flex">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            openDeleteDialog(event);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="container p-4 md:p-6 mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Planning de Publication</h1>
      
      <Card className="mb-6 relative">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <CardTitle>Calendrier des Publications</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const calendarApi = document.querySelector('.rbc-calendar');
                  if (calendarApi) {
                    (calendarApi as any).focus();
                  }
                }}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Aujourd'hui
              </Button>
              <Button variant="default" size="sm" onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Publication
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="products">Produits</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex w-full sm:w-auto">
              <Input
                placeholder="Rechercher..."
                className="max-w-sm"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button variant="ghost" size="icon" className="ml-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="h-[600px] relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-sm font-medium">Chargement du calendrier...</span>
              </div>
            ) : null}
            
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              components={{
                event: EventComponent as any,
              }}
              onSelectEvent={openEditDialog}
              onSelectSlot={({ start, end }) => {
                setEventForm({
                  ...eventForm,
                  startDate: format(start, "yyyy-MM-dd"),
                  startTime: format(start, "HH:mm"),
                  endDate: format(end, "yyyy-MM-dd"),
                  endTime: format(end, "HH:mm"),
                });
                setShowAddDialog(true);
              }}
              selectable
              messages={{
                next: "Suivant",
                previous: "Précédent",
                today: "Aujourd'hui",
                month: "Mois",
                week: "Semaine",
                day: "Jour",
                agenda: "Agenda",
                date: "Date",
                time: "Heure",
                event: "Événement",
                noEventsInRange: "Aucun événement dans cette période",
              }}
            />
          </div>
          
          <div className="flex gap-4 mt-4 justify-end">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-100">
                <Package2 className="h-3 w-3 mr-1" />
                Produit
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100">
                <MessageCircle className="h-3 w-3 mr-1" />
                Message
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 relative">
          <CardHeader>
            <CardTitle>Publications Programmées</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                <span>Chargement des publications...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <div key={event.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-md p-2 ${event.type === "product" ? "bg-blue-100" : "bg-green-100"}`}>
                          {event.type === "product" ? (
                            <Package2 className="h-5 w-5" />
                          ) : (
                            <MessageCircle className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {format(event.start, "EEEE d MMMM yyyy, HH:mm", { locale: fr })}
                          </p>
                          {event.description && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openEditDialog(event)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteDialog(event)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    Aucune publication programmée correspondant à vos critères.
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="relative">
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                <span>Chargement...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Publications totales</span>
                  <span className="font-bold">{events.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Produits</span>
                  <span className="font-bold">{events.filter(e => e.type === "product").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Messages</span>
                  <span className="font-bold">{events.filter(e => e.type === "message").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ce mois-ci</span>
                  <span className="font-bold">
                    {events.filter(e => e.start.getMonth() === new Date().getMonth()).length}
                  </span>
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <h4 className="font-medium mb-3">Actions rapides</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={openAddDialog}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un événement
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        dispatch(setActiveTab("all"));
                        dispatch(setSearchTerm(""));
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Add Event Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une publication</DialogTitle>
            <DialogDescription>
              Créez une nouvelle publication pour votre planning.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-title" className="text-right font-medium">
                Titre
              </label>
              <Input
                id="event-title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-type" className="text-right font-medium">
                Type
              </label>
              <Select
                value={eventForm.type}
                onValueChange={(value: EventType) => setEventForm({ ...eventForm, type: value })}
              >
                <SelectTrigger className="col-span-3" id="event-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Produit</SelectItem>
                  <SelectItem value="message">Message</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {eventForm.type === "product" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="product-id" className="text-right font-medium">
                  ID Produit
                </label>
                <Input
                  id="product-id"
                  value={eventForm.productId}
                  onChange={(e) => setEventForm({ ...eventForm, productId: e.target.value })}
                  className="col-span-3"
                  placeholder="PRD-12345"
                />
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="start-date" className="text-right font-medium">
                Date de début
              </label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input
                  id="start-date"
                  type="date"
                  value={eventForm.startDate}
                  onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                />
                <Input
                  type="time"
                  value={eventForm.startTime}
                  onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="end-date" className="text-right font-medium">
                Date de fin
              </label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input
                  id="end-date"
                  type="date"
                  value={eventForm.endDate}
                  onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                />
                <Input
                  type="time"
                  value={eventForm.endTime}
                  onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="event-description" className="text-right font-medium">
                Description
              </label>
              <textarea
                id="event-description"
                rows={3}
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                className="col-span-3 min-h-[80px] border rounded-md p-2"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleAddEvent}
              disabled={!eventForm.title || !eventForm.startDate || !eventForm.endDate}
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Event Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la publication</DialogTitle>
            <DialogDescription>
              Modifiez les détails de la publication.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-title" className="text-right font-medium">
                Titre
              </label>
              <Input
                id="edit-title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-type" className="text-right font-medium">
                Type
              </label>
              <Select
                value={eventForm.type}
                onValueChange={(value: EventType) => setEventForm({ ...eventForm, type: value })}
              >
                <SelectTrigger className="col-span-3" id="edit-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Produit</SelectItem>
                  <SelectItem value="message">Message</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {eventForm.type === "product" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-product-id" className="text-right font-medium">
                  ID Produit
                </label>
                <Input
                  id="edit-product-id"
                  value={eventForm.productId}
                  onChange={(e) => setEventForm({ ...eventForm, productId: e.target.value })}
                  className="col-span-3"
                  placeholder="PRD-12345"
                />
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-start-date" className="text-right font-medium">
                Date de début
              </label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input
                  id="edit-start-date"
                  type="date"
                  value={eventForm.startDate}
                  onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                />
                <Input
                  type="time"
                  value={eventForm.startTime}
                  onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-end-date" className="text-right font-medium">
                Date de fin
              </label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input
                  id="edit-end-date"
                  type="date"
                  value={eventForm.endDate}
                  onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                />
                <Input
                  type="time"
                  value={eventForm.endTime}
                  onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="edit-description" className="text-right font-medium">
                Description
              </label>
              <textarea
                id="edit-description"
                rows={3}
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                className="col-span-3 min-h-[80px] border rounded-md p-2"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="destructive" 
              onClick={() => {
                setShowEditDialog(false);
                if (currentEvent) {
                  openDeleteDialog(currentEvent);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
            <div className="flex-1"></div>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleEditEvent}
              disabled={!eventForm.title || !eventForm.startDate || !eventForm.endDate}
            >
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette publication ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          {currentEvent && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg mb-4">
                <div className={`rounded-md p-2 ${currentEvent.type === "product" ? "bg-blue-100" : "bg-green-100"}`}>
                  {currentEvent.type === "product" ? (
                    <Package2 className="h-5 w-5" />
                  ) : (
                    <MessageCircle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{currentEvent.title}</h3>
                  <p className="text-sm text-gray-500">
                    {format(currentEvent.start, "EEEE d MMMM yyyy, HH:mm", { locale: fr })}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductPlanning;
