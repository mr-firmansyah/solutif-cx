"use client"

import { Pipeline, PipelineItem, PipelineTrigger } from "@/components/ui/pipeline-status";

interface PipelineLeadsProps {
  data: LeadsDetails;
}

export default function PipelineStatusLeads({ data }: PipelineLeadsProps) {
  const { pipeline, current } = data.status;

  return (
    <Pipeline current={current}>
      {pipeline
        .sort((a, b) => a.sequence - b.sequence) // Sort by sequence to keep the order
        .map((step) => (
          <PipelineItem key={step.sequence}>
            <PipelineTrigger sequence={step.sequence} name={step.name} />
          </PipelineItem>
        ))}
    </Pipeline>
  );
}