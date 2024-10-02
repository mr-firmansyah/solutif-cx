"use client";

import { useState } from "react";

import TaskCreateForm from "./create-form";
import SchedulesComponent from "./schedule-calendar-view";

export function TaskComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <div className="flex divide-x-2">
      <TaskCreateForm setDate={setSelectedDate} />

      <div className="pl-2 w-full">
        <SchedulesComponent date={selectedDate} />
      </div>
    </div>
  );
}