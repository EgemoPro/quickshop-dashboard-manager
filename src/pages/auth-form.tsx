"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Loader2, Mail, Lock, Facebook, UserRound, Eye, EyeOff } from "lucide-react"
// img 
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

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
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
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
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handlePasswordlessSubmit = async (data: z.infer<typeof passwordlessSchema>) => {
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
  }

  const handleLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
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
  }

  const handleRegisterSubmit = async (data: z.infer<typeof registerSchema>) => {
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
  }

  const handleSocialLogin = async (provider: "google" | "facebook") => {
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
  }

  return (
    <div className={cn("grid min-h-screen w-full lg:grid-cols-2", className)}>
      {/* image Section */}
      <div className="relative hidden lg:block">
        
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          // fill = "cover"
          className="absolute inset-0 object-cover"
          // priority
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
              <CardTitle className="text-2xl">{isSuccess ? "Check your email" : title}</CardTitle>
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
                    <Form {...passwordlessForm}>
                      <form onSubmit={passwordlessForm.handleSubmit(handlePasswordlessSubmit)} className="space-y-4">
                        <FormField
                          control={passwordlessForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="name@example.com"
                                    className="pl-10"
                                    {...field}
                                    disabled={isLoading}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
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

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleSocialLogin("google")}
                          >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                              <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                              />
                              <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                              />
                              <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            Google
                          </Button>
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleSocialLogin("facebook")}
                          >
                            <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
                            Facebook
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>

                  {/* Traditional Login Tab */}
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="name@example.com"
                                    className="pl-10"
                                    {...field}
                                    disabled={isLoading}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    type={showLoginPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    {...field}
                                    disabled={isLoading}
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                    tabIndex={-1}
                                  >
                                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span className="sr-only">
                                      {showLoginPassword ? "Hide password" : "Show password"}
                                    </span>
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
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
                            {isLoading ? "Signing in..." : "Sign in"}
                          </Button>
                        </motion.div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleSocialLogin("google")}
                          >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                              <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                              />
                              <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                              />
                              <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            Google
                          </Button>
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleSocialLogin("facebook")}
                          >
                            <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
                            Facebook
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>

                  {/* Registration Tab */}
                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="name@example.com"
                                    className="pl-10"
                                    {...field}
                                    disabled={isLoading}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="fullName"
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
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    type={showRegisterPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    {...field}
                                    disabled={isLoading}
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                    tabIndex={-1}
                                  >
                                    {showRegisterPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                      {showRegisterPassword ? "Hide password" : "Show password"}
                                    </span>
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    {...field}
                                    disabled={isLoading}
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex={-1}
                                  >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span className="sr-only">
                                      {showConfirmPassword ? "Hide password" : "Show password"}
                                    </span>
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
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
                            {isLoading ? "Creating Account..." : "Create Account"}
                          </Button>
                        </motion.div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleSocialLogin("google")}
                          >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                              <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                              />
                              <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                              />
                              <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            Google
                          </Button>
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleSocialLogin("facebook")}
                          >
                            <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
                            Facebook
                          </Button>
                        </div>
                      </form>
                    </Form>
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

