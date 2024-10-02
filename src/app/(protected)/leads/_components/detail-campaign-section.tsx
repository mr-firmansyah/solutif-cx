import { format } from "date-fns";
import { Megaphone } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface CampaignSectionProps {
  data: LeadsDetails | undefined;
  className?: string;
}

export const CampaignSection = ({ data, className }: CampaignSectionProps) => {
  if (!data) return null;
  return (
    <div className={className}>
      <Card className="shadow-none rounded-md">
        <CardHeader className="flex-row space-x-2 capitalize items-center">
          <Megaphone className="w-8 h-8" />
          <div className="flex flex-col items-stretch">
            <CardTitle>{data?.campaign?.campaignName}</CardTitle>
            <CardDescription className="text-xs">{data.leadNo}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <section className="grid grid-cols-2 gap-4 capitalize font-bold text-sm pb-4 border-b" id="campaign">
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
              <p className="font-normal text-muted-foreground">{format(data?.campaign?.planStartDate, "dd/MM/yyyy | HH:mm:ss") || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p>Target Close Date</p>
              <p className="font-normal text-muted-foreground">{format(data?.campaign?.targetCloseDate, "dd/MM/yyyy | HH:mm:ss") || "-"}</p>
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

          <Accordion collapsible type="single">
            <AccordionItem value='additionalInfo'>
              <AccordionTrigger>
                <div className="flex items-center justify-between">
                  <h2>Informasi Tambahan</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="grid grid-cols-2 gap-4" id="additional-info">
                  {data?.additionalInformation ? Object.keys(data.additionalInformation).map((key) => (
                    <div className="col-span-2 flex flex-col gap-2" key={key}>
                      <p>{key.split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ")}</p>
                      <p className="font-normal text-muted-foreground">{data.additionalInformation[key] || "-"}</p>
                    </div>
                  )) : "-"}
                </section>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground mt-4" id="timestamps-campaign">
        <table className="table-auto">
          <tbody>
            <tr>
              <td>Created</td>
              <td>:</td>
              <td>{format(data?.campaign?.createdAt, "MMMM, dd, yyyy, h:mmaaa") + " • " + (data?.campaign?.createdBy || "-") }</td>
            </tr>
            <tr>
              <td>Updated</td>
              <td>:</td>
              <td>{format(data?.campaign?.updatedAt, "MMMM, dd, yyyy, h:mmaaa") + " • " + (data?.campaign?.updatedBy || "-") }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}