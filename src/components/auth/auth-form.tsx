"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { Check, UserRound } from "lucide-react"
// import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { EmailInput } from "./email-input"
import { PasswordInput } from "./password-input"
import { SocialLoginButtons } from "./social-login-buttons"
import { FormDivider } from "./form-divider"
import { SubmitButton } from "./submit-button"

// Zod schemas for form validation
const passwordlessSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    fullname: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type AuthFormProps = {
  onSubmit?: (data: any, type: "passwordless" | "login" | "register") => Promise<void>
  onSocialLogin?: (provider: "google" | "facebook") => Promise<void>
  logo?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  title?: string
  description?: string
  className?: string
}

export default function AuthForm({
  onSubmit,
  onSocialLogin,
  logo,
  imageSrc = "/placeholder.svg?height=800&width=600",
  imageAlt = "Dashboard illustration",
  title = "Shadow Shop",
  description = "Sign in to your account",
  className,
}: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<"passwordless" | "login" | "register">("passwordless")
  const [lastEmail, setLastEmail] = useState("")

  // Form for passwordless login
  const passwordlessForm = useForm<z.infer<typeof passwordlessSchema>>({
    resolver: zodResolver(passwordlessSchema),
    defaultValues: {
      email: "",
    },
  })

  // Form for traditional login
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Form for registration
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullname: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handlePasswordlessSubmit = useCallback(
    async (data: z.infer<typeof passwordlessSchema>) => {
      setIsLoading(true)
      setLastEmail(data.email)

      try {
        if (onSubmit) {
          await onSubmit(data, "passwordless")
        } else {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }
        setIsSuccess(true)
      } catch (error) {
        console.error("Login error:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [onSubmit],
  )

  const handleLoginSubmit = useCallback(
    async (data: z.infer<typeof loginSchema>) => {
      setIsLoading(true)

      try {
        if (onSubmit) {
          await onSubmit(data, "login")
        } else {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500))
          console.log("Login submitted:", data)
        }
      } catch (error) {
        console.error("Login error:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [onSubmit],
  )

  const handleRegisterSubmit = useCallback(
    async (data: z.infer<typeof registerSchema>) => {
      setIsLoading(true)

      try {
        if (onSubmit) {
          await onSubmit(data, "register")
        } else {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500))
          console.log("Registration submitted:", data)
        }
      } catch (error) {
        console.error("Registration error:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [onSubmit],
  )

  const handleSocialLogin = useCallback(
    async (provider: "google" | "facebook") => {
      setIsLoading(true)

      try {
        if (onSocialLogin) {
          await onSocialLogin(provider)
        } else {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500))
          console.log(`${provider} login initiated`)
        }
      } catch (error) {
        console.error(`${provider} login error:`, error)
      } finally {
        setIsLoading(false)
      }
    },
    [onSocialLogin],
  )

  // Memoize the logo component to prevent unnecessary re-renders
  const logoComponent = useMemo(() => {
    return (
      logo || (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <span className="text-xl font-bold">{title}</span>
        </div>
      )
    )
  }, [logo, title])

  return (
    <div className={cn("grid min-h-screen w-full lg:grid-cols-2", className)}>
      {/* Image Section */}
      <div className="relative hidden lg:block">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          className="absolute h-full inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute left-8 top-8 z-20 max-md:bg-violet-800">
          {logo || (
            <div className="flex items-center gap-2 text-white">
              <div className="h-8 w-8 rounded-full bg-white/90" />
              <span className="text-xl font-bold">{title}</span>
            </div>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center overflow-hidden  max-md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full h-full flex items-center justify-center max-w-md"
        >
          <div className="flex flex-col max-md:space-y-2 text-center lg:hidden">
            <div className="mx-auto">{logoComponent}</div>
          </div>

          <Card className="max-md:mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">{isSuccess ? "Check your email" : title}</CardTitle>
              <CardDescription>{isSuccess ? `We've sent a magic link to ${lastEmail}` : description}</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <SuccessMessage />
              ) : (
                <Tabs
                  defaultValue="passwordless"
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value as any)}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="passwordless">Passwordless</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  {/* Passwordless Login Tab */}
                  <TabsContent value="passwordless">
                    <PasswordlessLoginForm
                      form={passwordlessForm}
                      onSubmit={handlePasswordlessSubmit}
                      onSocialLogin={handleSocialLogin}
                      isLoading={isLoading}
                    />
                  </TabsContent>

                  {/* Traditional Login Tab */}
                  <TabsContent value="login">
                    <LoginForm
                      form={loginForm}
                      onSubmit={handleLoginSubmit}
                      onSocialLogin={handleSocialLogin}
                      isLoading={isLoading}
                    />
                  </TabsContent>

                  {/* Registration Tab */}
                  <TabsContent value="register">
                    <RegisterForm
                      form={registerForm}
                      onSubmit={handleRegisterSubmit}
                      onSocialLogin={handleSocialLogin}
                      isLoading={isLoading}
                    />
                  </TabsContent>
                </Tabs>
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

function SuccessMessage() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
    >
      <Check className="h-10 w-10 text-primary" />
    </motion.div>
  )
}

function PasswordlessLoginForm({
  form,
  onSubmit,
  onSocialLogin,
  isLoading,
}: {
  form: any
  onSubmit: (data: any) => Promise<void>
  onSocialLogin: (provider: "google" | "facebook") => Promise<void>
  isLoading: boolean
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <EmailInput field={field} disabled={isLoading} />}
        />

        <SubmitButton isLoading={isLoading} loadingText="Sending Link..." text="Send Magic Link" />

        <FormDivider />

        <SocialLoginButtons onSocialLogin={onSocialLogin} isLoading={isLoading} />
      </form>
    </Form>
  )
}

function LoginForm({
  form,
  onSubmit,
  onSocialLogin,
  isLoading,
}: {
  form: any
  onSubmit: (data: any) => Promise<void>
  onSocialLogin: (provider: "google" | "facebook") => Promise<void>
  isLoading: boolean
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <EmailInput field={field} disabled={isLoading} />}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <PasswordInput label="Password" field={field} disabled={isLoading} />}
        />

        <SubmitButton isLoading={isLoading} loadingText="Signing in..." text="Sign in" />

        <FormDivider />

        <SocialLoginButtons onSocialLogin={onSocialLogin} isLoading={isLoading} />
      </form>
    </Form>
  )
}

function RegisterForm({
  form,
  onSubmit,
  onSocialLogin,
  isLoading,
}: {
  form: any
  onSubmit: (data: any) => Promise<void>
  onSocialLogin: (provider: "google" | "facebook") => Promise<void>
  isLoading: boolean
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <EmailInput field={field} disabled={isLoading} />}
        />

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="John Doe" className="pl-10" {...field} disabled={isLoading} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <PasswordInput label="Password" field={field} disabled={isLoading} />}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => <PasswordInput label="Confirm Password" field={field} disabled={isLoading} />}
        />

        <SubmitButton isLoading={isLoading} loadingText="Creating Account..." text="Create Account" />

        <FormDivider />

        <SocialLoginButtons onSocialLogin={onSocialLogin} isLoading={isLoading} />
      </form>
    </Form>
  )
}

