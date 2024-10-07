"use client";

import { toast } from "sonner";

import {
	Pipeline,
	PipelineItem,
	PipelineTrigger,
} from "@/components/ui/pipeline-status";
import { useAlertDialog } from "@/provider/alert-dialog-provider";

interface PipelineLeadsProps {
	data: LeadsDetails | undefined;
}

export default function PipelineStatusLeads({ data }: PipelineLeadsProps) {
	const { showAlert } = useAlertDialog();

	if (!data) return null;
	const { pipeline, current } = data?.status;

	const handlePiplineChange = () => {
		showAlert.confirm(
			<>
				<p>Are you sure you want to change the stage?</p>
			</>,
			async () => {
				try {
					// await HttpClient.put(`/opportunity/${opty.id}/status`, {
					//   stage: stage[index].id,
					// });
					toast.success("Dummy Success Message");
					// fetchCategories();
					// setCurrentStep(index + 1);
				} catch (error) {
					toast.error("Failed to update stage", {
						description: (error as Error).message,
					});
				}
			},
		);
	};

	return (
		<Pipeline current={current}>
			{pipeline
				.sort((a, b) => a.sequence - b.sequence)
				.map((step) => (
					<PipelineItem key={step.sequence}>
						<PipelineTrigger
							name={step.name}
							onClick={handlePiplineChange}
							sequence={step.sequence}
						/>
					</PipelineItem>
				))}
		</Pipeline>
	);
}
