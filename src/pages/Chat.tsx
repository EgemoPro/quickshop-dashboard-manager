
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addMessage, markAllAsRead } from "@/store/slices/messagesSlice";
import { MessageCircle, Send, User, Users, Search, PlusCircle } from "lucide-react";

export default function Chat() {
  const [activeTab, setActiveTab] = useState("active");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { recentMessages, unreadCount } = useAppSelector(state => state.messages);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would be sent to a backend
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
    
    setMessageText("");
  };
  
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
    toast({
      title: "Messages lus",
      description: "Tous les messages ont été marqués comme lus.",
    });
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messagerie</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left sidebar - Contacts */}
        <div className="md:col-span-1">
          <Card className="h-[calc(100vh-180px)]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Conversations</CardTitle>
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                    Marquer tout comme lu
                  </Button>
                )}
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un client..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
                <div className="px-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="active" className="flex-1">
                      Actifs
                      {unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="all" className="flex-1">Tous</TabsTrigger>
                    <TabsTrigger value="archived" className="flex-1">Archivés</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="active" className="m-0">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {recentMessages.map((message) => (
                      <div 
                        key={message.id}
                        className={`p-3 mx-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 border-b last:border-b-0 transition-colors duration-200 ${
                          message.isNew ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div className="flex gap-3 w-full">
                          <img 
                            src={message.avatar} 
                            alt={message.customer} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-sm truncate">{message.customer}</p>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {message.time}
                              </span>
                            </div>
                            <p className="text-sm max-w-72 mt-1 truncate line-clamp px-1 text-gray-600 dark:text-gray-300">
                              {message.message}
                            </p>
                            <div className="mt-1 flex justify-between items-center">
                              <span className="text-xs text-gray-500">{message.date}</span>
                              {message.isNew && (
                                <Badge variant="default" className="text-xs">Nouveau</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <ScrollBar orientation="vertical"  />
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="all" className="m-0">
                  <div className="flex items-center justify-center h-[calc(100vh-300px)] text-gray-500">
                    Tous les conversations seront affichées ici
                  </div>
                </TabsContent>
                
                <TabsContent value="archived" className="m-0">
                  <div className="flex items-center justify-center h-[calc(100vh-300px)] text-gray-500">
                    Les conversations archivées s'afficheront ici
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Main chat area */}
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-180px)] flex flex-col">
            <CardHeader className="pb-2 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://i.pravatar.cc/40?img=3" 
                    alt="Customer" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">Jean Dupont</CardTitle>
                    <p className="h-3 w-3 bg-green-300 rounded-full transform -translate-x-5"></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {/* Customer message */}
                <div className="flex gap-3 max-w-[80%]">
                  <img 
                    src="https://i.pravatar.cc/40?img=3" 
                    alt="Customer" 
                    className="w-8 h-8 rounded-full object-cover mt-1"
                  />
                  <div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm">Bonjour, est-ce que ce produit est disponible en rouge ?</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">10:23</span>
                  </div>
                </div>
                
                {/* Vendor message */}
                <div className="flex flex-row-reverse gap-3 max-w-[80%] ml-auto">
                  <img 
                    src="https://i.pravatar.cc/40?img=12" 
                    alt="You" 
                    className="w-8 h-8 rounded-full object-cover mt-1"
                  />
                  <div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <p className="text-sm">Bonjour ! Oui, nous avons ce produit en rouge. Il sera expédié sous 24h.</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block text-right">10:25</span>
                  </div>
                </div>
                
                {/* Customer message */}
                <div className="flex gap-3 max-w-[80%]">
                  <img 
                    src="https://i.pravatar.cc/40?img=3" 
                    alt="Customer" 
                    className="w-8 h-8 rounded-full object-cover mt-1"
                  />
                  <div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm">Parfait ! Je vais passer ma commande tout de suite. Merci !</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">10:28</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input 
                  placeholder="Écrivez votre message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
