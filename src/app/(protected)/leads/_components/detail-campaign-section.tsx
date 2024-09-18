import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Megaphone } from "lucide-react";

interface CampaignSectionProps {
  data: LeadsDetails;
  className?: string;
}

export const CampaignSection = ({ data, className }: CampaignSectionProps) => {
  return (
    <div className={className}>
      <Card className="shadow-none">
        <CardHeader className="flex-row space-x-2 capitalize items-center">
          <Megaphone className="w-8 h-8" />
          <div className="flex flex-col items-stretch">
            <CardTitle>{data?.campaign?.campaign_name}</CardTitle>
            <CardDescription className="text-xs">{data.lead_no}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <section id="campaign" className="grid grid-cols-2 gap-4 capitalize font-bold text-sm">
            <div className="col-span-1 flex flex-col gap-2">
              <p>Kategori Campaign</p>
              <p className="font-normal text-muted-foreground">{data?.campaign?.category || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p>Tipe Campaign</p>
              <p className="font-normal text-muted-foreground">{data?.campaign?.type || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2 capitalize">
              <p>Plan Start</p>
              <p className="font-normal text-muted-foreground">{format(data?.campaign?.plan_start_date, "dd/MM/yyyy | HH:mm:ss") || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p>Target Close Date</p>
              <p className="font-normal text-muted-foreground">{format(data?.campaign?.target_close_date, "dd/MM/yyyy | HH:mm:ss") || "-"}</p>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <p>Brief</p>
              <p className="font-normal text-muted-foreground">{data?.campaign?.brief || "-"}</p>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <p>Script</p>
              <p className="font-normal text-muted-foreground normal-case">{data?.campaign?.script || "-"}</p>
            </div>
          </section>
        </CardContent>
      </Card>

      <div id="timestamps-campaign" className="text-xs text-muted-foreground mt-4">
        <table className="table-auto">
          <tbody>
            <tr>
              <td>Created</td>
              <td>:</td>
              <td>{format(data?.campaign?.created_at, "MMMM, dd, yyyy, h:mmaaa") + " • " + (data?.campaign?.created_by || "-") }</td>
            </tr>
            <tr>
              <td>Updated</td>
              <td>:</td>
              <td>{format(data?.campaign?.updated_at, "MMMM, dd, yyyy, h:mmaaa") + " • " + (data?.campaign?.updated_by || "-") }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}