"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useRegisterForm from "./Service";

export default function RegisterForm() {
  const { form, isPending, onSubmit } = useRegisterForm();
  const isFormValid = form.formState.isDirty && form.formState.isValid;

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col justify-center space-y-8 rounded-xl p-8 dark:bg-neutral-950 md:w-max md:min-w-[30rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Enter your full name"
                      disabled={isPending}
                      {...field}
                      aria-invalid={!!form.formState.errors.username}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      disabled={isPending}
                      {...field}
                      aria-invalid={!!form.formState.errors.email}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="password"
                    className="flex items-center gap-2"
                  >
                    Password{" "}
                    <span className="text-xs font-normal text-red-700">
                      (Min 8 Characters)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      disabled={isPending}
                      {...field}
                      aria-invalid={!!form.formState.errors.password}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isFormValid || isPending}
              aria-busy={isPending}
              aria-disabled={!isFormValid || isPending}
            >
              {isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
