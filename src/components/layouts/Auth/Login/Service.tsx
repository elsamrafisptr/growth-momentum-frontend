"use client";

import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type IUser = {
  id: string;
  name: string;
  email: string;
};

export type User = {
  userId: string;
};

export type GetUser = () => User | undefined;

export const loginSchema = z.object({
  email: z.string().min(5).email(),
  password: z.string().min(5),
});

export default function useLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        const response = await axiosInstance.post(
          "/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        );

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("username", response.data.user.username);

        if (response.status === 200) {
          router.push("/dashboard");
        } else {
          throw new Error("Unexpected response from server.");
        }
      } catch (err: any) {
        console.error("Login error: ", err);
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else if (err.message) {
          alert(err.message);
        } else {
          alert("Registration failed, please try again.");
        }
      }
    });
  }

  return { form, isPending, onSubmit };
}
