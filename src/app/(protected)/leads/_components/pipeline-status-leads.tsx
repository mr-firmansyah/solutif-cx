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
        .sort((a, b) => a.sequence - b.sequence)
        .map((step) => (
          <PipelineItem key={step.sequence}>
            <PipelineTrigger name={step.name} sequence={step.sequence} />
          </PipelineItem>
        ))}
    </Pipeline>
  );
}