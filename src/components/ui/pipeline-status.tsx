"use client";

import { createContext, useContext, ReactNode } from "react";

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
      <div className="flex items-center">
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
    <div className="relative flex items-center justify-center px-4 text-white flex-1">
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
    <button
      onClick={onClick}
      className={`first-ribbon px-4 py-2 text-center flex-1 ${sequence <= currentStep ? "bg-green-500" : "bg-gray-200"
        } ${sequence === currentStep ? "bg-blue-500" : ""}`}
    >
      {name}
    </button>
  );
}
