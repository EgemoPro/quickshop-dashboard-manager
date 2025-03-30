"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface PasswordInputProps {
  label: string
  field: any
  placeholder?: string
  disabled?: boolean
}

export function PasswordInput({ label, field, placeholder = "••••••••", disabled = false }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className="pl-10 pr-10"
            {...field}
            disabled={disabled}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

