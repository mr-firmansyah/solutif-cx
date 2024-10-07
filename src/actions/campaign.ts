"use server";

import { useFetch as api } from "@/hooks/use-fetch";
import { getTenant } from "@/config";

type CampaignsSearchParams = Partial<SearchParams> & {
  name?: string;
};

const handleApiRequest = async <T>(request: Promise<Response>): Promise<T> => {
  try {
    const response = await request;
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export const getCampaigns = async (input: CampaignsSearchParams) => {
  const tenant = getTenant();
  const response = await handleApiRequest<CampaignsResponse>(
    api(tenant).get("campaigns", { searchParams: input })
  );

  const { totalPage: pageCount } = response?.data;
  return { data: response.data?.data, pageCount };
};

export const getCampaign = async (id: string) => {
  const tenant = getTenant();
  const response = await handleApiRequest<CampaignDetailsResponse>(
    api(tenant).get(`campaigns/${id}`)
  );

  return response.data;
};
