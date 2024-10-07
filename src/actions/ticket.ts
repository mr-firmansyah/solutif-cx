"use server";

import { cookies } from "next/headers";

import { GetTicketsSchema } from "@/app/(protected)/service-request/_table/validations";
import { useFetch as api } from "@/hooks/use-fetch";

export const getTickets = async (input: GetTicketsSchema) => {
	const tenant = cookies().get("tenant")?.value || "";

	try {
		const response = await api(tenant)
			.get<TicketsResponse>("ticket", {
				searchParams: input,
			})
			.json();
		const { totalPage: pageCount } = response?.data;

		return { data: response.data?.data, pageCount };
	} catch (error: unknown) {
		throw error;
	}
};
