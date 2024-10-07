import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { cookies } from "next/headers";

import { useFetch as ky } from "@/hooks/use-fetch";

const api = (tenant: string) =>
	ky(tenant).extend(() => ({ hooks: { beforeRequest: [] } }));

export default {
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) {
					throw new Error("Invalid credentials");
				}

				const tenant = cookies().get("tenant")?.value || "";

				try {
					const response = await api(tenant)
						.post("login", {
							json: {
								email: credentials.email,
								password: credentials.password,
							},
						})
						.json();

					const data = response as UserResponse;

					if (data.error) {
						throw new Error(data.message);
					}

					const user = {
						id: data.data.user.id,
						name: data.data.user.name,
						email: data.data.user.email,
						roles: data.data.user.roles,
						permissions: data.data.user.permissions,
						token: data.data.token,
					};

					return user;
				} catch (error) {
					if (error instanceof Error) {
						throw new Error(error.message || "Login failed");
					} else {
						throw new Error("Login failed");
					}
				}
			},
		}),
		// ! This is an example of how to add custom provider
		// ! Workaround for Genesys SSO
		// ! This is not a complete implementation
		{
			id: "genesys",
			name: "Genesys",
			type: "oauth",
			clientId: process.env.GENESYS_CLIENT_ID!,
			clientSecret: process.env.GENESYS_CLIENT_SECRET!,
			checks: ["none"],
			authorization: {
				url: "https://login.mypurecloud.jp/oauth/authorize",
				params: {
					client_id: process.env.GENESYS_CLIENT_ID!,
					response_type: "code",
					redirect_uri:
						"http://hibank.localhost:3000/api/auth/callback/genesys",
				},
			},
			token: {
				url: "https://login.mypurecloud.jp/oauth/token",
				params: {
					grant_type: "authorization_code",
					code: "{authorizationCode}",
					redirect_uri:
						"http://hibank.localhost:3000/api/auth/callback/genesys",
				},
			},
			userinfo: {
				url: "https://api.mypurecloud.jp/api/v2/users/me",
				async request(context) {
					const res = await fetch(
						"https://api.mypurecloud.jp/api/v2/users/me",
						{
							headers: {
								Authorization: `Bearer ${context.tokens.access_token}`,
							},
						},
					);
					const profile = await res.json();
					return profile;
				},
			},
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name,
					email: profile.email,
					roles: [], // Add appropriate roles if available
					permissions: [], // Add appropriate permissions if available
					token: "", // Add appropriate token if available
				};
			},
		},
	],
} satisfies NextAuthOptions;
