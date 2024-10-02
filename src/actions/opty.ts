"use server";

import { cookies } from "next/headers"

import { useFetch as api } from "@/hooks/use-fetch";

type OptysSearchParams = Partial<SearchParams> & {
  search?: string;
}

export const getOptys = async (input: OptysSearchParams) => {
  const tenant = cookies().get('tenant')?.value || "";

  try {
    const response = await api(tenant)
      .get<any>("opportunity", {
        searchParams: input,
      })
      .json();
    const { totalPage: pageCount } = response?.data;

    return { data: response.data?.data, pageCount };
  } catch (error) {
    throw error;
  }
};
