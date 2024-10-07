"use server";

import { cookies } from "next/headers";

import { useFetch as ky } from "@/hooks/use-fetch";

const api = (tenant: string) => ky(tenant);

export const getLogsById = async (id: string) => {
	const tenant = cookies().get("tenant")?.value || "";

	try {
		const response = await api(tenant).get<LogsResponse>(`logs/${id}`).json();

		return response;
	} catch (error: unknown) {
		throw new Error(error as string);
	}
};

export const getAttachmentsById = async (id: string) => {
	const tenant = cookies().get("tenant")?.value || "";

	try {
		const response = await api(tenant)
			.get<AttachmentsResponse>(`attachments/${id}`)
			.json();

		return response;
	} catch (error: unknown) {
		throw new Error(error as string);
	}
};
