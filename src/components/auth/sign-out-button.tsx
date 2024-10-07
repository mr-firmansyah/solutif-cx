"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
	const { hostname } = window.location;
	const tenant = hostname.split(".")[0];

	const handleSignOut = async () => {
		if (!tenant) {
			return;
		}

		await fetch(
			`https://${tenant}.${process.env.NEXT_PUBLIC_API_PATH}.${process.env.NEXT_PUBLIC_API_DOMAIN}/api/logout`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		signOut();
	};

	return (
		<button className="w-full text-left" onClick={handleSignOut}>
			Sign out
		</button>
	);
}
