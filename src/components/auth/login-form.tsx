"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MoveRight } from "lucide-react";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schema";

export function LoginForm() {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof LoginSchema>) {
		setError("");
		setSuccess("");
		startTransition(() => {
			signIn("credentials", {
				email: values.email,
				password: values.password,
				redirectTo: "/dashboard",
			})
				.then((data) => {
					if (data?.error) {
						setError(data.error);
					}

					if (!data?.error) {
						form.reset();
						setSuccess("Logged in successfully");
					}
				})
				.catch(() => setError("Something went wrong"));
		});
	}

	return (
		<Form {...form}>
			<form
				className="space-y-4 min-w-96"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Address</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center space-x-2">
					<Checkbox id="remember" />
					<label
						className="text-xs font-medium leading-none text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						htmlFor="remember"
					>
						Remember me
					</label>
				</div>
				<Button className="font-bold" type="submit">
					Sign In <MoveRight className="ml-3" size={24} />
				</Button>
			</form>
		</Form>
	);
}
