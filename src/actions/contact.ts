"use server";

import { cookies } from "next/headers";

import { useFetch as ky } from "@/hooks/use-fetch";

type ContactsSearchParams = Partial<SearchParams> & {
	name?: string;
};

const api = (tenant: string) =>
	ky(tenant).extend((options) => ({ prefixUrl: `${options.prefixUrl}/v2` }));

export const getContacts = async (input: ContactsSearchParams) => {
	const tenant = cookies().get("tenant")?.value || "";

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
