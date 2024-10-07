import { MapPinHouse } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card";

interface AddressSectionProps {
  data: LeadsDetails | undefined;
  className?: string;
}

export default function AddressSection({ data, className }: AddressSectionProps) {
  return (
    <Card className="shadow-none rounded-md">
      <CardContent className="pb-0">
        <Accordion collapsible type="single">
          <AccordionItem className="border-b-0" value='additionalInfo'>
            <AccordionTrigger>
              <div className="flex items-center justify-between">
                <h2>Alamat</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <section className="grid grid-cols-2 gap-4 capitalize" id="address">
                <div className="col-span-2 flex flex-col gap-2">
                  <p className="text-muted-foreground text-xs">Alamat KTP</p>
                  <div className="flex">
                    <MapPinHouse className="w-4 h-4 inline-block mr-2 text-muted-foreground" />
                    <p className="text-sm">{data?.address?.ktpAddress || "-"}</p>
                  </div>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <p className="text-muted-foreground text-xs">Alamat Domisili</p>
                  <div className="flex">
                    <MapPinHouse className="w-4 h-4 inline-block mr-2 text-muted-foreground" />
                    <p className="text-sm">{data?.address?.homeAddress || "-"}</p>
                  </div>
                </div>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}