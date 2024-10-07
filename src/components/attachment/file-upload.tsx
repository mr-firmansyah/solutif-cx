"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useUploadFile } from "@/hooks/use-upload-file";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "@/components/ui/file-uploader";

import { UploadedFilesCard } from "./uploaded-files-card";

// Update schema to validate supported file types
const schema = z.object({
	image: z
		.instanceof(File)
		.refine(
			(file) =>
				[
					"image/jpeg",
					"image/png",
					"image/svg+xml",
					"application/zip",
				].includes(file.type),
			{
				message: "Only .jpg, .png, .svg and .zip files are supported",
			},
		),
});

type Schema = z.infer<typeof schema>;

export function FileUploadComponent() {
	const [loading, setLoading] = React.useState(false);
	const { progresses, uploadedFiles, isUploading, onUpload } = useUploadFile(
		"leads",
		{ defaultUploadedFiles: [] },
	);
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			image: undefined,
		},
	});

	async function onSubmit(input: Schema) {
		setLoading(true);

		try {
			const result = await onUpload(input.image);

			form.reset();
			toast.success("File uploaded successfully");
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : "An unknown error occurred",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-6"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<div className="space-y-6">
							<FormItem className="w-full">
								<FormControl>
									<FileUploader
										accept={{
											"image/*": [],
											"application/x-zip-compressed": [],
											"application/x-zip": [],
											"application/zip": [],
											"application/x-7z-compressed": [],
											"application/x-rar-compressed": [],
											"application/octet-stream": [],
										}}
										disabled={isUploading}
										maxFileCount={1}
										maxSize={4 * 1024 * 1024}
										onValueChange={(files) => field.onChange(files[0])}
										progresses={progresses}
										value={field.value ? [field.value] : []}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
							{uploadedFiles.length > 0 ? (
								<UploadedFilesCard
									key={uploadedFiles[0].createdAt}
									uploadedFiles={uploadedFiles}
								/>
							) : null}
						</div>
					)}
				/>
				<Button className="w-fit" disabled={loading || isUploading}>
					Save
				</Button>
			</form>
		</Form>
	);
}
