import { format } from "date-fns";

interface LogComponentProps {
	logs: LogsResponse | null;
}

export function LogComponent({ logs }: LogComponentProps) {
	return (
		<>
			<h2>Changelog</h2>

			{logs?.data.data.length === 0 && (
				<p className="text-center font-normal text-sm">No logs found</p>
			)}
			{logs?.data.data.map((log) => (
				<article
					className="mt-4 flex flex-col gap-2 font-normal text-sm md:flex-row md:gap-8"
					key={log?.id + log?.createdAt}
				>
					<p className="min-w-44 text-muted-foreground">
						{format(new Date(log?.date), "eee, dd MMM yyy hh:mm:ss")}
					</p>

					<div>
						<p className="font-semibold">
							{log?.actor}{" "}
							<span className="font-normal text-muted-foreground">
								{log?.action}
							</span>{" "}
							{log?.module?.length > 0 && <span>{log?.module.join(", ")}</span>}
						</p>

						<div className="flex gap-2 text-muted-foreground">
							{log?.before && (
								<div>
									{Object.keys(log?.before).map((key) => (
										<p key={key}>
											{key}: {log?.before[key] || "-"}
										</p>
									))}
								</div>
							)}

							{log?.after?.length &&
							log?.before?.length && <p className="mx-1">{">"}</p>
								? ""
								: null}

							{log?.after && (
								<div>
									{Object.keys(log?.after).map((key) => (
										<p key={key}>
											{key}: {log?.after[key] || "-"}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
				</article>
			))}
		</>
	);
}
