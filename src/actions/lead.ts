"use server";

import { cookies } from "next/headers"

import { GetTicketsSchema } from "@/app/(protected)/service-request/_table/validations";
import { useFetch as ky } from "@/hooks/use-fetch";

const api = (tenant: string) => ky(tenant).extend((options) => ({ prefixUrl: `${options.prefixUrl}/v2` }))

export const getLeads = async (input: GetTicketsSchema) => {
  const tenant = cookies().get('tenant')?.value || "";

  try {
    const response = await api(tenant)
      .get<LeadsResponse>("leads", {
        searchParams: input,
      })
      .json();
    const { totalPage: pageCount } = response?.data;

    return { data: response.data?.data, pageCount };
  } catch (error) {
    throw error;
  }
};

export const convertLead = async (payload) => {
  const tenant = cookies().get('tenant')?.value || "";

  try {
    const response = await api(tenant)
      .post<LeadsResponse>(`leads/convert/v2`, { json: payload })
      .json();

    return response;
  } catch (error) {
    throw error;
  }
}
