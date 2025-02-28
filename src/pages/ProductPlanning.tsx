
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Plus, MessageCircle, Package2, Filter } from "lucide-react";

// Create a date localizer for react-big-calendar
const localize = {
  format: (date: Date, format: string) => format(date, format, { locale: fr }),
  parse: (str: string, format: string) => parse(str, format, new Date(), { locale: fr }),
  startOfWeek: (date: Date) => startOfWeek(date, { locale: fr }),
  getDay: (date: Date) => getDay(date),
  localize: fr,
};

const localizer = {
  ...localize,
  formats: {
    dateFormat: 'dd',
    dayFormat: 'dd ddd',
    monthHeaderFormat: 'MMMM yyyy',
    dayHeaderFormat: 'dddd MMM dd',
    dayRangeHeaderFormat: ({ start, end }: { start: Date, end: Date }) => 
      `${format(start, 'dd MMM yyyy')} - ${format(end, 'dd MMM yyyy')}`,
  },
};

// Event types
type EventType = "product" | "message";

interface ScheduledEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  description?: string;
  productId?: string;
}

// Sample data
const generateSampleEvents = (): ScheduledEvent[] => {
  const today = new Date();
  
  return [
    {
      id: "1",
      title: "Promotion T-shirt Premium",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 0),
      type: "product",
      productId: "PRD-12345"
    },
    {
      id: "2",
      title: "Annonce Nouvelle Collection",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 15, 0),
      type: "message",
      description: "Message pour annoncer l'arrivée de la nouvelle collection d'été"
    },
    {
      id: "3",
      title: "Promotion Jean Classique",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 10, 0),
      type: "product",
      productId: "PRD-23456"
    }
  ];
};

const ProductPlanning = () => {
  const [events, setEvents] = useState<ScheduledEvent[]>(generateSampleEvents());
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
      
      <Card className="mb-6">
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="ghost" size="icon" className="ml-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="h-[600px]">
            <Calendar
              localizer={localizer as any}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              components={{
                event: EventComponent as any,
              }}
              views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
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
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Publications Programmées</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductPlanning;
