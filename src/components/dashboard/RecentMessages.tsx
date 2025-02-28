
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { markAsRead } from "@/store/slices/messagesSlice";

interface RecentMessagesProps {
  darkMode: boolean;
}

const RecentMessages: React.FC<RecentMessagesProps> = ({ darkMode }) => {
  const dispatch = useAppDispatch();
  const { recentMessages } = useAppSelector(state => state.messages);

  const handleReplyClick = (id: string) => {
    dispatch(markAsRead(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Messages récents</CardTitle>
              <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Communication avec les clients
              </CardDescription>
            </div>
            <Button size="sm" variant="outline">
              Voir tous
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div 
                key={message.id}
                className={`p-3 rounded-lg border ${message.isNew ? 'border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10' : darkMode ? 'border-gray-700' : 'border-gray-100'} transition-colors duration-200`}
              >
                <div className="flex gap-3">
                  <img 
                    src={message.avatar} 
                    alt={message.customer} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm truncate">{message.customer}</p>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {message.time}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {message.message}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {message.date}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-xs"
                        onClick={() => handleReplyClick(message.id)}
                      >
                        Répondre
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentMessages;
