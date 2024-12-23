import RegisterForm from "@/components/layouts/Auth/Register/Form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register a new account",
};

const RegisterPage = () => {
  return (
    <main className="min-h-screen w-full">
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8",
          )}
        >
          <>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your email below to create your account
              </p>
            </div>
            <RegisterForm />
            <p className="text-muted-foreground px-8 text-center text-sm">
              <Link
                href="/login"
                className="hover:text-brand underline underline-offset-4"
              >
                Already have an account? Sign In
              </Link>
            </p>
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking register, you agree to our{" "}
              <span className="hover:text-brand underline underline-offset-4">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="hover:text-brand underline underline-offset-4">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
