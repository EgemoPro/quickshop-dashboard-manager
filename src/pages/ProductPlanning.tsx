
import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { formatDate, addDays, getDateForInput, getTimeForInput } from "@/utils/formatDate";

// Import des composants refactorisés
import PlanningHeader from "@/components/planning/PlanningHeader";
import PlanningFilters from "@/components/planning/PlanningFilters";
import CalendarComponent from "@/components/planning/CalendarComponent";
import CalendarLegend from "@/components/planning/CalendarLegend";
import ScheduledEventsList from "@/components/planning/ScheduledEventsList";
import PlanningStats from "@/components/planning/PlanningStats";
import AddEventDialog from "@/components/planning/AddEventDialog";
import EditEventDialog from "@/components/planning/EditEventDialog";
import DeleteEventDialog from "@/components/planning/DeleteEventDialog";

const ProductPlanning = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { events, isLoading, activeTab, searchTerm, error } = useAppSelector(state => state.planning);

  // Local state for dialogs and forms
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ScheduledEvent | null>(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    type: "product" as EventType,
    startDate: getDateForInput(new Date()),
    startTime: "10:00",
    endDate: getDateForInput(new Date()),
    endTime: "11:00",
    productId: "",
    campaignId: "",
    orderId: ""
  });

  useEffect(() => {
    // Simulate data loading
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Erreur",
        description: error,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  // Memoized filtered events for performance
  const filteredEvents = React.useMemo(() => {
    return events.filter(event => {
      const matchesType =
        activeTab === "all" ||
        (activeTab === "products" && event.type === "product") ||
        (activeTab === "messages" && event.type === "message") ||
        (activeTab === "marketing" && event.type === "marketing") ||
        (activeTab === "orders" && event.type === "order");

      const matchesSearch =
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesType && matchesSearch;
    });
  }, [events, activeTab, searchTerm]);

  // Handle tab change
  const handleTabChange = React.useCallback((value: string) => {
    dispatch(setActiveTab(value));
  }, [dispatch]);

  // Handle search
  const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  }, [dispatch]);

  // Open add event dialog with default time
  const openAddDialog = React.useCallback(() => {
    const now = new Date();
    const tomorrow = addDays(now, 1);

    setEventForm({
      title: "",
      description: "",
      type: "product",
      startDate: getDateForInput(tomorrow),
      startTime: "10:00",
      endDate: getDateForInput(tomorrow),
      endTime: "11:00",
      productId: "",
      campaignId: "",
      orderId: ""
    });

    setShowAddDialog(true);
  }, []);

  // Handle form field changes
  const handleEventFormChange = React.useCallback((field: string, value: string) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Open edit dialog with event data
  const openEditDialog = React.useCallback((event: ScheduledEvent) => {
    setCurrentEvent(event);
    setEventForm({
      title: event.title,
      description: event.description || "",
      type: event.type,
      startDate: getDateForInput(event.start),
      startTime: getTimeForInput(event.start),
      endDate: getDateForInput(event.end),
      endTime: getTimeForInput(event.end),
      productId: event.productId || "",
      campaignId: event.campaignId || "",
      orderId: event.orderId || ""
    });

    setShowEditDialog(true);
  }, []);

  // Open delete confirmation dialog
  const openDeleteDialog = React.useCallback((event: ScheduledEvent) => {
    setCurrentEvent(event);
    setShowDeleteDialog(true);
  }, []);

  // Handle add event
  const handleAddEvent = React.useCallback(() => {
    try {
      const startDateTime = new Date(`${eventForm.startDate}T${eventForm.startTime}`);
      const endDateTime = new Date(`${eventForm.endDate}T${eventForm.endTime}`);

      // Validation
      if (startDateTime >= endDateTime) {
        toast({
          title: "Erreur de validation",
          description: "La date de fin doit être postérieure à la date de début.",
          variant: "destructive"
        });
        return;
      }

      const newEvent: ScheduledEvent = {
        id: Math.random().toString(36).substring(2, 11),
        title: eventForm.title,
        start: startDateTime,
        end: endDateTime,
        type: eventForm.type,
        description: eventForm.description,
        ...(eventForm.type === "product" && { productId: eventForm.productId || undefined }),
        ...(eventForm.type === "marketing" && { campaignId: eventForm.campaignId || undefined }),
        ...(eventForm.type === "order" && { orderId: eventForm.orderId || undefined })
      };

      dispatch(addEvent(newEvent));
      setShowAddDialog(false);

      toast({
        title: "Événement ajouté",
        description: `L'événement "${newEvent.title}" a été ajouté au calendrier.`
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'événement. Vérifiez les dates saisies.",
        variant: "destructive"
      });
    }
  }, [eventForm, dispatch, toast]);

  // Handle edit event
  const handleEditEvent = React.useCallback(() => {
    if (!currentEvent) return;

    try {
      const startDateTime = new Date(`${eventForm.startDate}T${eventForm.startTime}`);
      const endDateTime = new Date(`${eventForm.endDate}T${eventForm.endTime}`);

      // Validation
      if (startDateTime >= endDateTime) {
        toast({
          title: "Erreur de validation",
          description: "La date de fin doit être postérieure à la date de début.",
          variant: "destructive"
        });
        return;
      }

      const updatedEvent: ScheduledEvent = {
        ...currentEvent,
        title: eventForm.title,
        start: startDateTime,
        end: endDateTime,
        type: eventForm.type,
        description: eventForm.description,
        productId: undefined,
        campaignId: undefined,
        orderId: undefined,
        ...(eventForm.type === "product" && { productId: eventForm.productId || undefined }),
        ...(eventForm.type === "marketing" && { campaignId: eventForm.campaignId || undefined }),
        ...(eventForm.type === "order" && { orderId: eventForm.orderId || undefined })
      };

      dispatch(updateEvent(updatedEvent));
      setShowEditDialog(false);
      setCurrentEvent(null);

      toast({
        title: "Événement modifié",
        description: `L'événement "${updatedEvent.title}" a été mis à jour.`
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'événement. Vérifiez les dates saisies.",
        variant: "destructive"
      });
    }
  }, [currentEvent, eventForm, dispatch, toast]);

  // Handle delete event
  const handleDeleteEvent = React.useCallback(() => {
    if (!currentEvent) return;

    dispatch(deleteEvent(currentEvent.id));
    setShowDeleteDialog(false);
    setCurrentEvent(null);

    toast({
      title: "Événement supprimé",
      description: `L'événement a été supprimé du calendrier.`,
      variant: "destructive"
    });
  }, [currentEvent, dispatch, toast]);

  // Handle slot selection in calendar
  const handleSelectSlot = React.useCallback(({ start, end }: { start: Date; end: Date }) => {
    setEventForm({
      ...eventForm,
      startDate: getDateForInput(start),
      startTime: getTimeForInput(start),
      endDate: getDateForInput(end),
      endTime: getTimeForInput(end),
    });
    setShowAddDialog(true);
  }, [eventForm]);

  // Focus calendar
  const handleFocusCalendar = React.useCallback(() => {
    const calendarApi = document.querySelector('.rbc-calendar');
    if (calendarApi) {
      (calendarApi as any).focus();
    }
  }, []);

  // Reset filters
  const handleResetFilters = React.useCallback(() => {
    dispatch(setActiveTab("all"));
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  return (
    <div className="container p-3 sm:p-4 md:p-6 mx-auto animate-fade-in max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Planning de Publication</h1>
        <Button 
          variant="default" 
          size="sm" 
          onClick={openAddDialog}
          className="sm:hidden"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau
        </Button>
      </div>

      <Card className="mb-4 sm:mb-6 relative overflow-hidden">
        <PlanningHeader
          onFocusCalendar={handleFocusCalendar}
          onAddPublication={openAddDialog}
        />
        <CardContent className="p-3 sm:p-6">
          <PlanningFilters
            activeTab={activeTab}
            searchTerm={searchTerm}
            onTabChange={handleTabChange}
            onSearchChange={handleSearch}
          />

          <div className="mb-4">
            <CalendarComponent
              events={filteredEvents}
              isLoading={isLoading}
              onSelectEvent={openEditDialog}
              onSelectSlot={handleSelectSlot}
            />
          </div>

          <div className="hidden sm:block">
            <CalendarLegend />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2 relative order-2 lg:order-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl">Publications Programmées</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <ScheduledEventsList
              events={filteredEvents}
              isLoading={isLoading}
              onEditEvent={openEditDialog}
              onDeleteEvent={openDeleteDialog}
            />
          </CardContent>
        </Card>

        <Card className="relative order-1 lg:order-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl">Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <PlanningStats
              events={events}
              isLoading={isLoading}
              onAddEvent={openAddDialog}
              onResetFilters={handleResetFilters}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <AddEventDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        eventForm={eventForm}
        onEventFormChange={handleEventFormChange}
        onAddEvent={handleAddEvent}
      />

      <EditEventDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        eventForm={eventForm}
        onEventFormChange={handleEventFormChange}
        onEditEvent={handleEditEvent}
        onDeletePrompt={() => {
          setShowEditDialog(false);
          if (currentEvent) {
            openDeleteDialog(currentEvent);
          }
        }}
      />

      <DeleteEventDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        event={currentEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default ProductPlanning;
