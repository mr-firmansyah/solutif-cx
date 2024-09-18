"use server";

import { cookies } from "next/headers"

import { GetTicketsSchema } from "@/app/(protected)/service-request/_table/validations";
import { useFetch as ky } from "@/hooks/use-fetch";

const api = (tenant: string) => ky(tenant).extend((options) => ({ prefixUrl: `${options.prefixUrl}/v2` }))

export const getContacts = async (input: GetTicketsSchema) => {
  const tenant = cookies().get('tenant')?.value || "";

  try {
    const response = await api(tenant)
      .get<ContactsResponse>("contact", {
        searchParams: input,
      })
      .json();
    const { totalPage: pageCount } = response?.data;

    return { data: response.data?.data, pageCount };
  } catch (error) {
    throw error;
  }
};
