import { format } from "date-fns";

interface LogComponentProps {
  logs: LogsResponse | null;
}

export function LogComponent({ logs }: LogComponentProps) {
  return (
    <>
      <h2>Changelog</h2>

      {logs?.data.data.length === 0 && <p className="font-normal text-sm text-center">No logs found</p>}
      {logs?.data.data.map((log) => (
        <article
          className="flex flex-col md:flex-row gap-2 md:gap-8 mt-4 font-normal text-sm"
          key={log?.id + log?.createdAt}
        >
          <p className="text-muted-foreground min-w-44">
            {format(new Date(log?.date), "eee, dd MMM yyy hh:mm:ss")}
          </p>

          <div>
            <p className="font-semibold">
              {log?.actor}{" "}
              <span className="font-normal text-muted-foreground">{log?.action}</span>{" "}
              {log?.module?.length > 0 && <span>{log?.module.join(", ")}</span>}
            </p>

            <div className="flex gap-2 text-muted-foreground">
              {log?.before && <div>{Object.keys(log?.before).map((key) => (
                <p key={key}>{key}: {log?.before[key] || "-"}</p>
              ))}</div>}

              {log?.after?.length && log?.before?.length && <p className="mx-1">{">"}</p> ? "" : null}

              {log?.after && <div>{Object.keys(log?.after).map((key) => (
                <p key={key}>{key}: {log?.after[key] || "-"}</p>
              ))}</div>}
            </div>
          </div>
        </article>
      ))}
    </>
  )
}