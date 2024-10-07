import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

export default async function Page() {
	const session = await getServerSession(authOptions);

	return (
		<div className="h-full rounded-md border-2 border-dashed p-2">
			<pre className="max-w-5xl">{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
}
