"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { loginSchema } from "@/schemas/auth-schema";
import type { LoginFormValues } from "@/types/auth-types";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleGoogleLogin() {
    try {
      setIsGoogleLoading(true);
      // TODO: Implement Google OAuth login
      // This is a placeholder - you'll need to implement the actual OAuth flow
      console.log("Google login clicked");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      setIsLoading(true);
      setError(null);

      await login(data.email, data.password);
    } catch (err) {
      // Check if this is a Next.js redirect error (redirect() throws a special error)
      // Redirect errors have a digest property starting with 'NEXT_REDIRECT'
      if (
        err &&
        typeof err === 'object' &&
        'digest' in err &&
        typeof err.digest === 'string' &&
        err.digest.startsWith('NEXT_REDIRECT')
      ) {
        // This is a redirect, not an error - let it happen
        return;
      }

      // Handle actual errors
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-lg border">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login to EOTC Hub</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password to access your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      disabled={isLoading}
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-base font-medium" 
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form> 

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full h-11 text-base font-medium"
          onClick={handleGoogleLogin}
          disabled={isLoading || isGoogleLoading}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account? <Link href="/auth/register" className="text-blue-500 hover:text-blue-600">Register</Link>
      </p>
    </div>
  );
}