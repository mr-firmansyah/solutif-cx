import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { LoginForm } from "@/components/auth/login-form";
import { authOptions } from "@/auth";

export default async function LoginPage() {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/dashboard");
	}

	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	);
}
