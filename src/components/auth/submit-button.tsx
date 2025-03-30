"use client"

import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
  isLoading: boolean
  loadingText: string
  text: string
  disabled?: boolean
}

export function SubmitButton({ isLoading, loadingText, text, disabled = false }: SubmitButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button type="submit" className="w-full" disabled={isLoading || disabled}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
        {isLoading ? loadingText : text}
      </Button>
    </motion.div>
  )
}

