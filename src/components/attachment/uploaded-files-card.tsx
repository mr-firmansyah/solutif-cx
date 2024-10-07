import Image from "next/image";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { EmptyCard } from "@/components/empty-card"

interface UploadedFilesCardProps {
	uploadedFiles: AttachmentsList[];
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Uploaded files</CardTitle>
				<CardDescription>View the uploaded files here</CardDescription>
			</CardHeader>
			<CardContent>
				<pre>{JSON.stringify(uploadedFiles, null, 2)}</pre>
				{uploadedFiles.length > 0 ? (
					<ScrollArea className="pb-4">
						<div className="flex w-max space-x-2.5">
							{uploadedFiles.map((file) => (
								<div className="relative aspect-video w-64" key={file.id}>
									<Image
										alt={file.fileName}
										className="rounded-md object-cover"
										fill
										loading="lazy"
										sizes="(min-width: 640px) 640px, 100vw"
										src={file.fileUrl}
									/>
								</div>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				) : (
					<p>No Files Uploaded</p>
				)}
			</CardContent>
		</Card>
	);
}
