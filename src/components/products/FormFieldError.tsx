import React, { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormFieldErrorProps {
  error?: string;
  children: React.ReactNode;
}

const FormFieldError: React.FC<FormFieldErrorProps> = ({ error, children }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [error]);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <div className="relative">
            {children}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
                >
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TooltipTrigger>
        {error && (
          <TooltipContent 
            side="right" 
            className="bg-destructive text-destructive-foreground border-destructive/50 font-medium shadow-lg"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default FormFieldError;
