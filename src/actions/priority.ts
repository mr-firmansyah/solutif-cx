"use server";

import { cookies } from "next/headers";

import { useFetch as api } from "@/hooks/use-fetch";

type PrioritiesSearchParams = Partial<SearchParams> & {
  search?: string;
}

export const getPriorities = async (input: PrioritiesSearchParams) => {
  const tenant = cookies().get('tenant')?.value || "";

  try {
    const response = await api(tenant)
      .get<PrioritiesResponse>("priority", {
        searchParams: input,
      })
      .json();
    const { totalPage: pageCount } = response?.data;

    return { data: response.data?.data, pageCount };
  } catch (error: unknown) {
    throw error;
  }
};
