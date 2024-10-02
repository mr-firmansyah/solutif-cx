"use server";

import { cookies } from "next/headers"

import { useFetch as api } from "@/hooks/use-fetch";

type BranchesSearchParams = Partial<SearchParams> & {
  name?: string;
}

export const getBranches = async (input?: BranchesSearchParams) => {
  const tenant = cookies().get('tenant')?.value || "";

  try {
    const response = await api(tenant)
      .get<BranchesResponse>("branch", {
        searchParams: input,
      })
      .json();
    const { totalPage: pageCount } = response?.data;

    return { data: response.data?.data, pageCount };
  } catch (error) {
    throw error;
  }
};
