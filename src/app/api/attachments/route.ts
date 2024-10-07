import { NextRequest, NextResponse } from "next/server";

import { getTenant } from "@/config";
import { useFetch as api } from "@/hooks/use-fetch";

export async function POST(req: NextRequest) {
	const tenant = getTenant();
	const formData = await req.formData();

	try {
		const response = await api(tenant)
			.post<any>("attachments", {
				body: formData,
			})
			.json();

		return NextResponse.json(response, { status: 200 });
	} catch (error: any) {
		if (error.name === "HTTPError") {
			const errorJson = await error.response.json();
			return NextResponse.json(
				{ message: errorJson.message, errors: errorJson.errors },
				{ status: error.response.status },
			);
		}

		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 },
		);
	}
}
