
import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
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

  // Handle form field changes
  const handleEventFormChange = (field: string, value: string) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
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

  // Handle slot selection in calendar
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setEventForm({
      ...eventForm,
      startDate: format(start, "yyyy-MM-dd"),
      startTime: format(start, "HH:mm"),
      endDate: format(end, "yyyy-MM-dd"),
      endTime: format(end, "HH:mm"),
    });
    setShowAddDialog(true);
  };

  // Focus calendar
  const handleFocusCalendar = () => {
    const calendarApi = document.querySelector('.rbc-calendar');
    if (calendarApi) {
      (calendarApi as any).focus();
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    dispatch(setActiveTab("all"));
    dispatch(setSearchTerm(""));
  };

  return (
    <div className="container p-4 md:p-6 mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Planning de Publication</h1>
      
      <Card className="mb-6 relative">
        <PlanningHeader 
          onFocusCalendar={handleFocusCalendar} 
          onAddPublication={openAddDialog} 
        />
        <CardContent>
          <PlanningFilters 
            activeTab={activeTab} 
            searchTerm={searchTerm} 
            onTabChange={handleTabChange} 
            onSearchChange={handleSearch} 
          />
          
          <CalendarComponent 
            events={filteredEvents}
            isLoading={isLoading}
            onSelectEvent={openEditDialog}
            onSelectSlot={handleSelectSlot}
          />
          
          <CalendarLegend />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 relative">
          <CardHeader>
            <CardTitle>Publications Programmées</CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduledEventsList 
              events={filteredEvents}
              isLoading={isLoading}
              onEditEvent={openEditDialog}
              onDeleteEvent={openDeleteDialog}
            />
          </CardContent>
        </Card>
        
        <Card className="relative">
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
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
