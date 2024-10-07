"use server";

// import { AuthError } from "next-auth";
import * as zod from "zod";

// import { signIn } from "@/auth";
import { LoginSchema } from "@/schema";

export const login = async () => {
  // const validatedFields = LoginSchema.safeParse(values);

  // if (!validatedFields.success) {
  //   return { error: 'Invalid fields!' };
  // }

  // const { email, password } = validatedFields.data

  try {
    // await signIn("genesys", {
    //   redirectTo: '/dashboard',
    // });
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.log(error);

    throw error;
  }

  return { error: "Something went wrong!" };
};
