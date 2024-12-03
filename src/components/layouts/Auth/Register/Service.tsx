"use client";

import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type IUser = {
  id: string;
  username: string;
  email: string;
};

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/
);

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must have at least 3 characters")
    .max(100, "Max length is 100 characters"),
  email: z
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .email({
      message: "Must be a valid email",
    }),
  password: z
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .regex(passwordValidation, {
      message: "Your password is not valid",
    }),
});

export default function useRegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(async () => {
      try {
        const response = await axiosInstance.post("/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        });

        if (response.status === 201) {
          router.push("/login");
        } else {
          throw new Error("Unexpected response from server.");
        }
      } catch (err: any) {
        console.error("Registration error: ", err);
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
