"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { BookUser } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormItem,
	FormField,
	FormMessage,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MultipleSelector, { type Option } from "@/components/ui/multi-select";
import { getContacts } from "@/actions/contact";
import { getOptys } from "@/actions/opty";
import { getBranches } from "@/actions/branch";
import { convertLead } from "@/actions/lead";

const ConvertSchema = z.object({
	leadsId: z.string().optional(),
	contactExisting: z.boolean(),
	contact: z.union([
		z.string(),
		z.array(z.any()).transform((val) => (val.length > 0 ? val[0].label : "")),
	]),
	opportunityExisting: z.boolean(),
	opportunity: z.union([
		z.string(),
		z.array(z.any()).transform((val) => (val.length > 0 ? val[0].label : "")),
	]),
	branchCode: z
		.array(z.any())
		.transform((val) => (val.length > 0 ? val[0].value : "")),
});

export type ConvertSchema = z.infer<typeof ConvertSchema>;

export default function ConvertLeadsModal() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	const form = useForm({
		resolver: zodResolver(ConvertSchema),
		defaultValues: {
			leadsId: id as string,
			contactExisting: true,
			contact: "",
			opportunityExisting: true,
			opportunity: "",
			branchCode: [],
		},
	});

	const isContactExist = useWatch({
		control: form.control,
		name: "contactExisting",
	});

	const isOptyExist = useWatch({
		control: form.control,
		name: "opportunityExisting",
	});

	const onSubmit = async (data: z.infer<typeof ConvertSchema>) => {
		try {
			setLoading(true);
			await convertLead(data);
			setOpen(false);
			toast.success("Lead converted successfully");
		} catch (error) {
			toast.error("Failed to convert lead", {
				description:
					error instanceof Error ? error.message : "An unknown error occurred",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button className="w-full">
					<BookUser className="w-4 h-4 mr-2" />
					Convert
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle>Convert</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when youre done.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						className="flex flex-col gap-2"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<Card className="mt-4 bg-muted w-full shadow-none">
							<CardHeader className="p-4">Contact</CardHeader>

							<div className="p-2 space-y-2">
								<FormField
									control={form.control}
									name="contactExisting"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<RadioGroup
													className="flex"
													onValueChange={(value) => {
														field.onChange(value === "true");
														form.setValue("contact", "");
													}}
													value={field.value.toString()}
												>
													<FormItem className="flex items-center space-y-0 space-x-2">
														<RadioGroupItem id="existingContact" value="true" />
														<FormLabel htmlFor="existingContact">
															Existing
														</FormLabel>
													</FormItem>
													<FormLabel className="text-muted-foreground">
														or
													</FormLabel>
													<FormItem className="flex items-center space-y-0 space-x-2">
														<RadioGroupItem id="newContact" value="false" />
														<FormLabel htmlFor="newContact">New</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="contact"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												{isContactExist ? (
													<MultipleSelector
														{...field}
														emptyIndicator={
															<p className="text-center text-gray-600 dark:text-gray-400">
																no results found.
															</p>
														}
														hideClearAllButton
														hidePlaceholderWhenSelected
														loadingIndicator={
															<p className="py-2 text-center text-lg leading-10 text-muted-foreground">
																loading...
															</p>
														}
														maxSelected={1}
														onChange={(selectedOptions) => {
															const selectedValue =
																selectedOptions.length > 0
																	? selectedOptions[0].label
																	: "";
															field.onChange(selectedValue);
														}}
														onSearch={async (value) => {
															const res = await getContacts({ name: value });
															return res.data.map(
																(contact) =>
																	({
																		label: contact.name,
																		value: contact.id,
																	}) as Option,
															);
														}}
														placeholder="Cari Contact"
														triggerSearchOnFocus
														value={
															field.value
																? [{ label: field.value, value: field.value }]
																: ([] as Option[])
														}
													/>
												) : (
													<Input {...field} placeholder="Nama Contact" />
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</Card>

						<Card className="mt-4 bg-muted w-full shadow-none">
							<CardHeader className="p-4">Opportunity</CardHeader>

							<div className="p-2 space-y-2">
								<FormField
									control={form.control}
									name="opportunityExisting"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<RadioGroup
													className="flex"
													onValueChange={(value) => {
														field.onChange(value === "true");
														form.setValue("opportunity", "");
													}}
													value={field.value.toString()}
												>
													<FormItem className="flex items-center space-y-0 space-x-2">
														<RadioGroupItem id="existingOpty" value="true" />
														<FormLabel htmlFor="existingOpty">
															Existing
														</FormLabel>
													</FormItem>
													<FormLabel className="text-muted-foreground">
														or
													</FormLabel>
													<FormItem className="flex items-center space-y-0 space-x-2">
														<RadioGroupItem id="newOpty" value="false" />
														<FormLabel htmlFor="newOpty">New</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="opportunity"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												{isOptyExist ? (
													<MultipleSelector
														{...field}
														emptyIndicator={
															<p className="text-center text-gray-600 dark:text-gray-400">
																no results found.
															</p>
														}
														hideClearAllButton
														hidePlaceholderWhenSelected
														loadingIndicator={
															<p className="py-2 text-center text-lg leading-10 text-muted-foreground">
																loading...
															</p>
														}
														maxSelected={1}
														onChange={(selectedOptions) => {
															const selectedValue =
																selectedOptions.length > 0
																	? selectedOptions[0].label
																	: "";
															field.onChange(selectedValue);
														}}
														onSearch={async (value) => {
															const res = await getOptys({ search: value });
															return res.data.map(
																(opty: { name: any; id: any }) =>
																	({
																		label: opty.name,
																		value: opty.id,
																	}) as Option,
															);
														}}
														placeholder="Cari Opportunity"
														triggerSearchOnFocus
														value={
															field.value
																? [{ label: field.value, value: field.value }]
																: []
														}
													/>
												) : (
													<Input {...field} placeholder="Nama Opportunity" />
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</Card>

						<Card className="mt-4 bg-muted w-full shadow-none">
							<CardHeader className="p-4">Branch</CardHeader>

							<div className="p-2 space-y-2">
								<FormField
									control={form.control}
									name="branchCode"
									render={({ field }) => (
										<FormItem className="md:basis-1/3">
											<FormControl>
												<MultipleSelector
													{...field}
													emptyIndicator={
														<p className="text-center text-gray-600 dark:text-gray-400">
															no results found.
														</p>
													}
													hideClearAllButton
													hidePlaceholderWhenSelected
													loadingIndicator={
														<p className="py-2 text-center text-lg leading-10 text-muted-foreground">
															loading...
														</p>
													}
													maxSelected={1}
													onChange={(selectedOptions) =>
														field.onChange(
															selectedOptions.length > 0
																? [selectedOptions[0]]
																: [],
														)
													}
													onSearch={async (value) => {
														const res = await getBranches({ name: value });
														return res.data.map(
															(branch) =>
																({
																	label: branch.branchName,
																	value: branch.branchCode,
																}) as Option,
														);
													}}
													placeholder="Select Branch"
													triggerSearchOnFocus
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</Card>

						<DialogFooter>
							<Button disabled={loading} type="submit">
								{loading ? "Loading..." : "Convert"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
