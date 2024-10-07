import * as React from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface UseUploadFileProps {
	defaultUploadedFiles?: any[];
}

export function useUploadFile(
	type: string,
	{ defaultUploadedFiles = [] }: UseUploadFileProps = {},
) {
	const [uploadedFiles, setUploadedFiles] =
		React.useState<AttachmentsList[]>(defaultUploadedFiles);
	const [progresses, setProgresses] = React.useState<Record<string, number>>(
		{},
	);
	const [isUploading, setIsUploading] = React.useState(false);
	const { id } = useParams();

	async function onUpload(file: File) {
		setIsUploading(true);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("model_type", type);
		formData.append("model_id", id.toString());

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", "/api/attachments", true);

			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const progressPercent = Math.round(
						(event.loaded / event.total) * 100,
					);
					setProgresses((prev) => ({
						...prev,
						[file.name]: progressPercent,
					}));
				}
			};

			xhr.onload = () => {
				if (xhr.status === 200) {
					const res = JSON.parse(xhr.responseText);
					setUploadedFiles((prev) => [...prev, res.data]);
					setProgresses((prev) => ({
						...prev,
						[file.name]: 100,
					}));

					resolve(res.data);
				} else {
					// toast.error("Upload failed.");
					reject(new Error("Upload failed."));
				}
				setIsUploading(false);
			};

			xhr.onerror = () => {
				toast.error("An error occurred during the upload.");
				setIsUploading(false);
				reject(new Error("An error occurred during the upload."));
			};

			xhr.send(formData);
		});

		// try {
		//   const res: AttachmentsPostResponse = await fetch("/api/attachments", {
		//     method: "POST",
		//     body: formData,
		//   }).then((res) => res.json());

		//   setUploadedFiles((prev) => [...prev, res.data]);
		// } catch (err) {
		//   if (err instanceof Error) {
		//     toast.error(err.message);
		//   } else {
		//     toast.error("An unknown error occurred");
		//   }
		// } finally {
		//   setProgresses({});
		//   setIsUploading(false);
		// }
	}

	return {
		onUpload,
		uploadedFiles,
		progresses,
		isUploading,
	};
}
