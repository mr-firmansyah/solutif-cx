import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card";

interface NewInformationSectionProps {
  data: LeadsDetails | undefined;
  className?: string;
}

export default function NewInformationSection({ data, className }: NewInformationSectionProps) {
  return (
    <Card className="shadow-none rounded-md">
      <CardContent className="pb-0">
        <Accordion collapsible type="single">
          <AccordionItem className="border-b-0" value='additionalInfo'>
            <AccordionTrigger>
              <div className="flex items-center justify-between">
                <h2>Informasi Lainnya</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <section className="grid grid-cols-3 gap-4 capitalize">
                <div className="col-span-1 flex flex-col gap-2">
                  <p className="text-muted-foreground text-xs">Status QC</p>
                  <p className="text-sm">{data?.qcInformation.qcStatus || "-"}</p>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <p className="text-muted-foreground text-xs">Tanggal Survey</p>
                  <p className="text-sm">{data?.qcInformation.surveyDate || "-"}</p>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <p className="text-muted-foreground text-xs">Jam Survey</p>
                  <p className="text-sm">{data?.qcInformation.surveyTime || "-"}</p>
                </div>
              </section>
              <section className="grid grid-cols-2 gap-4" id="additional-info">
                {data?.additionalInformation ? Object.keys(data.additionalInformation).map((key) => (
                  <div className="col-span-2 flex flex-col gap-2" key={key}>
                    <p>{key.split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ")}</p>
                    <p className="font-normal text-muted-foreground">{data?.additionalInformation?.[key] || "-"}</p>
                  </div>
                )) : "-"}
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}