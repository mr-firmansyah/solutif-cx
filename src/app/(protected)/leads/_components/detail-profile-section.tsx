import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";

interface ProfileSectionProps {
  data: LeadsDetails | undefined;
  className?: string;
  children?: React.ReactNode;
}

export const ProfileSection = ({ data, className, children }: ProfileSectionProps) => {
  if (!data) return null;

  return (
    <section className={cn("flex flex-col gap-2", className)} id="profile-section">
      {children}
      <Card className="shadow-none rounded-md">
        <CardHeader className="flex-row space-x-2 capitalize">
          <Avatar>
            <AvatarImage alt={data?.name} src={undefined} />
            <AvatarFallback>{data.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-stretch">
            <CardTitle>{data.name}</CardTitle>
            <CardDescription className="text-xs">{data.leadNo}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <section className="grid grid-cols-2 gap-4 capitalize pb-4 border-b" id="bio">
            <div className="col-span-2 font-semibold text-sm">Bio</div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Tempat Lahir</p>
              <p className="text-sm">{data?.bio?.placeOfBirth || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Tanggal Lahir</p>
              <p className="text-sm">{data?.bio?.dateOfBirth?.toLocaleString() || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2 capitalize">
              <p className="text-muted-foreground text-xs">Jenis Kelamin</p>
              <p className="text-sm">{data?.bio?.gender || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Nomor Handphone</p>
              <p className="text-sm">{data?.bio?.phoneNumber || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">No. Telp Rumah</p>
              <p className="text-sm">{data?.bio?.homePhoneNo || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Email</p>
              <p className="text-sm normal-case">{data?.bio?.email || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Nomor KTP</p>
              <p className="text-sm">{data?.bio?.ktpNo || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Nomor NPWP</p>
              <p className="text-sm">{data?.bio?.npwpNo || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Nama Perusahaan</p>
              <p className="text-sm">{data?.bio?.companyName || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Status Pegawai</p>
              <p className="text-sm">{data?.bio?.employeeStatus || "-"}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">Source Data</p>
              <p className="text-sm">{data?.bio?.sourceData || "-"}</p>
            </div>
          </section>

          <Accordion type="multiple">
            <AccordionItem value='profile'>
              <AccordionTrigger>
                <div className="flex items-center justify-between">
                  <h2>Profile</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="grid grid-cols-2 gap-4 capitalize" id="address">
                  <div className="col-span-1 flex flex-col gap-2">
                    <p className="text-muted-foreground text-xs">Alamat KTP</p>
                    <p className="text-sm">{data?.address?.ktpAddress || "-"}</p>
                  </div>
                  <div className="col-span-1 flex flex-col gap-2">
                    <p className="text-muted-foreground text-xs">Alamat Rumah</p>
                    <p className="text-sm">{data?.address?.homeAddress || "-"}</p>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='address'>
              <AccordionTrigger>
                <div className="flex items-center justify-between">
                  <h2>Alamat</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="grid grid-cols-2 gap-4 capitalize" id="address">
                  <div className="col-span-2 flex flex-col gap-2">
                    <p className="text-muted-foreground text-xs">Alamat KTP</p>
                    <p className="text-sm">{data?.address?.ktpAddress || "-"}</p>
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <p className="text-muted-foreground text-xs">Alamat Domisili</p>
                    <p className="text-sm">{data?.address?.homeAddress || "-"}</p>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}