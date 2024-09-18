"use server";

import * as zod from "zod";
import { signIn } from "next-auth/react";

import { LoginSchema } from "@/schema";

export const login = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    // if (error instanceof Error) {
    //   throw new Error(error.message);
    // }

    throw error;
  }

  return { error: "Something went wrong!" };
};
