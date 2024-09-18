import ky, { type KyInstance } from "ky";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";

import { authOptions } from "@/auth";

export const useFetch = (tenant: string): KyInstance => {
  if (!tenant || tenant === "") {
    throw new Error("Tenant is required");
  }

  return ky.create({
    prefixUrl: `https://${tenant}.${process.env.NEXT_PUBLIC_API_PATH}.${process.env.NEXT_PUBLIC_API_DOMAIN}/api`,
    hooks: {
      beforeRequest: [
        async (request) => {
          request.headers.set("Content-Type", "application/json");
          const session = await getServerSession(authOptions)
          const token = (session as Session & { accessToken?: string })?.accessToken;
          if (token) request.headers.set("Authorization", `Bearer ${token}`);
        },
      ],
      // beforeError: [
      //   error => {
      //     console.log("error", error);
      //     if (error.response?.status === 401) {
      //       console.log("Logging out due to 401");
      //       // logout();
      //     }
      //     return error;
      //   },
      // ],
      afterResponse: [
        async (request, options, response) => {
          if (response.status === 401) {
            // eslint-disable-next-line no-console
            console.log("Logging out due to 401");
            // clear all cookies
          }
          return response;
        },  
      ],
    },
  });
};
