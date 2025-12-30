import React, { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthFormFieldErrorProps {
  error?: string;
  children: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconOffset?: string;
}

const AuthFormFieldError: React.FC<AuthFormFieldErrorProps> = ({ 
  error, 
  children, 
  iconPosition = 'right',
  iconOffset = 'right-3'
}) => {
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
                  className={`absolute ${iconOffset} top-1/2 -translate-y-1/2 z-10`}
                >
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TooltipTrigger>
        {error && (
          <TooltipContent 
            side="right" 
            className="bg-destructive text-destructive-foreground border-destructive/50 font-medium shadow-lg text-xs"
          >
            <div className="flex items-center gap-1.5">
              <AlertCircle className="h-3 w-3" />
              <span>{error}</span>
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default AuthFormFieldError;
