import React, { useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Plus, MessageCircle, Package2, Filter, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  setActiveTab, 
  setSearchTerm, 
  setLoading,
  type ScheduledEvent 
} from "@/store/slices/planningSlice";

const locales = { fr };
// Create a proper localizer for react-big-calendar
const localizer = dateFnsLocalizer({
  format: (date, formatStr) => format(date, formatStr, { locale: fr }),
  parse: (str, formatStr) => parse(str, formatStr, new Date()), // `locale` n'est pas utilisé ici
  startOfWeek: (date) => startOfWeek(date, { locale: fr }),
  getDay,
  locales
});


const ProductPlanning = () => {
  const dispatch = useAppDispatch();
  const { events, isLoading, activeTab, searchTerm } = useAppSelector(state => state.planning);

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

  // Custom event component
  const EventComponent = ({ event }: { event: ScheduledEvent }) => (
    <div className={`rounded px-2 py-1 ${event.type === "product" ? "bg-blue-100" : "bg-green-100"}`}>
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
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Aujourd'hui
              </Button>
              <Button variant="default" size="sm">
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
              localizer={localizer as any}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              components={{
                event: EventComponent as any,
              }}
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
                        </div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">Modifier</Button>
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductPlanning;
