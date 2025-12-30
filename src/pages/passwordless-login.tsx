"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Loader2, Mail } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import AuthFormFieldError from "@/components/auth/AuthFormFieldError"

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type LoginFormProps = {
  onSubmit?: (email: string) => Promise<void>
  logo?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  title?: string
  description?: string
  className?: string
}

export default function PasswordlessLogin({
  onSubmit,
  logo,
  imageSrc = "/placeholder.svg?height=800&width=600",
  imageAlt = "Dashboard illustration",
  title = "Shadow Shop",
  description = "Enter your email to sign in to your account",
  className,
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [lastEmail, setLastEmail] = useState("")

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  })

  const handleSubmit = async (data: z.infer<typeof emailSchema>) => {
    setIsLoading(true)
    setLastEmail(data.email)

    try {
      if (onSubmit) {
        await onSubmit(data.email)
      } else {
        // If no custom onSubmit is provided, simulate success after 1.5s
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setIsSuccess(true)
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid min-h-screen w-full lg:grid-cols-2", className)}>
      {/* Image Section */}
      <div className="relative hidden lg:block">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute left-8 top-8 z-20">
          {logo || (
            <div className="flex items-center gap-2 text-white">
              <div className="h-8 w-8 rounded-full bg-white/90" />
              <span className="text-xl font-bold">{title}</span>
            </div>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="flex flex-col space-y-2 text-center lg:hidden">
            {logo || (
              <div className="mx-auto flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary" />
                <span className="text-xl font-bold">{title}</span>
              </div>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">{isSuccess ? "Check your email" : "Sign In"}</CardTitle>
              <CardDescription>{isSuccess ? `We've sent a magic link to ${lastEmail}` : description}</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                >
                  <Check className="h-10 w-10 text-primary" />
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <AuthFormFieldError error={fieldState.error?.message}>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                <Input
                                  type="email"
                                  placeholder="name@example.com"
                                  className={cn(
                                    "pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/50",
                                    fieldState.error && "border-destructive focus:border-destructive focus:ring-destructive/50"
                                  )}
                                  {...field}
                                  disabled={isLoading}
                                />
                              </div>
                            </AuthFormFieldError>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="mr-2 h-4 w-4" />
                        )}
                        {isLoading ? "Sending Link..." : "Send Magic Link"}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                {isSuccess ? (
                  <p>
                    Didn't receive the email?{" "}
                    <Button variant="link" className="p-0 text-primary" onClick={() => setIsSuccess(false)}>
                      Try again
                    </Button>
                  </p>
                ) : (
                  <p>
                    By continuing, you agree to our{" "}
                    <Button variant="link" className="p-0 text-primary">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="p-0 text-primary">
                      Privacy Policy
                    </Button>
                    .
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
