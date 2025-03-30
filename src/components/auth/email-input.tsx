import { Mail } from "lucide-react"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface EmailInputProps {
  field: any
  disabled?: boolean
}

export function EmailInput({ field, disabled = false }: EmailInputProps) {
  return (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="name@example.com" className="pl-10" {...field} disabled={disabled} />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

