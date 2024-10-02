"use server";

import { cookies } from "next/headers";

import { useFetch as api } from "@/hooks/use-fetch";

type UsersSearchParams = Partial<SearchParams> & {
  name?: string;
}

export const getUsers = async (input: UsersSearchParams) => {
  const tenant = cookies().get('tenant')?.value || "";

  try {
    const response = await api(tenant)
      .get<UsersResponse>('users', {
        searchParams: input,
      })
      .json();
    const { totalPage: pageCount } = response?.data;

    return { data: response.data?.data, pageCount };
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
