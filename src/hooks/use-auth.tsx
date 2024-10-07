"use client";
import { useSession, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
	return function IsAuth(props: any) {
		const { data: auth } = useSession();

		useEffect(() => {
			if (!auth) {
				return redirect("/login");
			}

			return () => {};
		}, [auth]);

		if (!auth) {
			return null;
		}

		return (
			<SessionProvider>
				<Component {...props} />
			</SessionProvider>
		);
	};
}
