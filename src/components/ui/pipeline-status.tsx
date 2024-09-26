"use client";

import { createContext, useContext, ReactNode } from "react";

import PipelineMiddle from "../svg/middle-pipeline";
import PipelineStart from "../svg/start-pipeline";

interface PipelineContextType {
  currentStep: number;
}

const PipelineContext = createContext<PipelineContextType | undefined>(undefined);

interface PipelineProps {
  children: ReactNode;
  current: number; // This determines the active step
}

export function Pipeline({ children, current }: PipelineProps) {
  return (
    <PipelineContext.Provider value={{ currentStep: current }}>
      <div className="flex items-center space-x-4 overflow-x-auto">
        {children}
      </div>
    </PipelineContext.Provider>
  );
}

interface PipelineItemProps {
  children: ReactNode;
}

export function PipelineItem({ children }: PipelineItemProps) {
  return (
    <div className="relative flex items-center justify-center text-white flex-1 capitalize">
      {children}
    </div>
  );
}

interface PipelineTriggerProps {
  sequence: number; // Sequence just for ordering, not state
  name: string;
  onClick?: () => void;
}

export function PipelineTrigger({ sequence, name, onClick }: PipelineTriggerProps) {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error("PipelineTrigger must be used within Pipeline component");
  }

  const { currentStep } = context;

  return (
    sequence === 0 ? (
      <PipelineStart
        borderColor={sequence <= currentStep ? "#D2D6DC" : "#263238"}
        color={sequence <= currentStep ? "white" : "#ECEFF1"}
        text={name}
      />
    ) : (
      <PipelineMiddle
        borderColor={sequence <= currentStep ? "#D2D6DC" : "#263238"}
        color={sequence <= currentStep ? "white" : "#ECEFF1"}
        text={name}
      />
    )
  );
}
