import TaskCreateForm from "./create-form";
import SchedulesComponent from "./schedule-calendar-view";

export function TaskComponent() {
  return (
    <div className="flex divide-x-2">
      <TaskCreateForm />

      <div className="pl-2 w-full">
        <SchedulesComponent date={null} />
      </div>
    </div>
  );
}