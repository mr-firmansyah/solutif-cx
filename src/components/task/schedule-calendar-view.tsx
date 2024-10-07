import { format } from "date-fns";

import { Task } from "@/types/task";

interface CalendarEventViewProps {
	date: Date;
	events: GroupedEvent[];
}

interface CalendarProps {
	date: any;
	tasks?: Task[];
}

interface GroupedEvent {
	date: Date;
	event: {
		start_time: string;
		end_time: string;
		description: string;
	}[];
}

const SchedulesComponent: React.FC<CalendarProps> = ({ date, tasks }) => {
	const groupedEvents: GroupedEvent[] = (tasks ?? []).reduce<GroupedEvent[]>(
		(acc, event) => {
			const eventDate = new Date(event.date);
			const existingDate = acc.find(
				(group) => group.date.getTime() === eventDate.getTime(),
			);

			const eventData = {
				start_time: event.startTime,
				end_time: event.endTime,
				description: event.description || "",
			};

			if (existingDate) {
				// Kalau date udah ada, tambahin event ke event array
				existingDate.event.push(eventData);
			} else {
				// Kalau date belum ada, buat new group
				acc.push({
					date: eventDate,
					event: [eventData],
				});
			}

			return acc;
		},
		[],
	);

	return (
		<div className="w-full">
			<h1 className="text-center mb-4">Schedules</h1>
			{date ? (
				<>
					<CalendarEventView date={date} events={groupedEvents} />
				</>
			) : (
				<p>Please select a date.</p>
			)}
		</div>
	);
};

const CalendarEventView: React.FC<CalendarEventViewProps> = ({
	date,
	events,
}) => {
	// format date to Monday, January 30th 2023
	const formattedDate = format(date, "PPPP");

	// filter events by date
	const filteredEvents = events.filter((event) => {
		return event.date.toDateString() === date.toDateString();
	});

	// calculate position for each event based on start_time
	const calculateTopPosition = (time: string) => {
		const [hours, minutes] = time.split(":").map(Number);
		return ((hours * 60 + minutes) / 1440) * 100; // convert to percentage (24 hours = 1440 minutes)
	};

	// calculate height for each event based on start_time and end_time
	const calculateHeight = (startTime: string, endTime: string) => {
		const [startHours, startMinutes] = startTime.split(":").map(Number);
		const [endHours, endMinutes] = endTime.split(":").map(Number);

		const startTotalMinutes = startHours * 60 + startMinutes;
		const endTotalMinutes = endHours * 60 + endMinutes;

		const durationInMinutes = endTotalMinutes - startTotalMinutes;

		// Calculate the height based on the duration in minutes, relative to a full day (1440 minutes)
		return (durationInMinutes / 1440) * 2 * 100; // convert to percentage of the day
	};

	return (
		<div>
			<h2 className="mb-2 font-bold">{formattedDate}</h2>
			<div className="relative flex flex-col flex-grow overflow-y-auto max-h-96">
				<div className="relative flex-grow">
					{/* Time Slots */}
					{Array.from({ length: 24 }).map((_, index) => {
						const time = `${index.toString().padStart(2, "0")}:00`;
						return <TimeSlot key={time} time={time} />;
					})}

					{/* Events */}
					{filteredEvents.map((groupedEvent) =>
						groupedEvent.event.map((event, index) => {
							const topPosition = calculateTopPosition(event.start_time);
							const height = calculateHeight(event.start_time, event.end_time);

							return (
								<div
									className="absolute left-16 bg-primary/90 text-primary-foreground p-2 mb-2 rounded w-3/4 shadow-md"
									key={event.start_time + event.end_time + event.description}
									style={{
										top: `${topPosition}%`,
										height: `${height}%`,
									}}
								>
									<div>
										{event.start_time} - {event.end_time}
									</div>
									<div>{event.description}</div>
								</div>
							);
						}),
					)}
				</div>
			</div>
		</div>
	);
};

const TimeSlot: React.FC<{ time: string }> = ({ time }) => {
	return (
		<div className="relative flex pr-2 h-16">
			<div className="w-16 text-muted-foreground">{time}</div>
		</div>
	);
};

export default SchedulesComponent;
