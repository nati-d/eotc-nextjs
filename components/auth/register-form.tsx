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

import { registerSchema } from "@/schemas/auth-schema";
import type { RegisterFormValues } from "@/types/auth-types";
import { register } from "@/app/actions/auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { NavbarLogo } from "@/components/navbar-logo";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleGoogleRegister() {
    try {
      setIsGoogleLoading(true);
      // TODO: Implement Google OAuth registration
      // This is a placeholder - you'll need to implement the actual OAuth flow
      console.log("Google register clicked");
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

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      setIsLoading(true);
      setError(null);

      await register(
        data.email,
        data.password,
        data.first_name,
        data.last_name
      );
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
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <NavbarLogo showLink={false} className="mx-auto" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Enter your information to get started
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Doe"
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
            {isLoading ? "Creating account..." : "Create account"}
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
          onClick={handleGoogleRegister}
          disabled={isLoading || isGoogleLoading}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          {isGoogleLoading ? "Signing up..." : "Sign up with Google"}
        </Button>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/auth/login" className="text-blue-500 hover:text-blue-600">Sign in</Link>
      </p>
    </div>
  );
}

