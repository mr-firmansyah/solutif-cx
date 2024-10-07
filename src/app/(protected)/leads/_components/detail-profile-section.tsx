import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProfileSectionProps {
	data: LeadsDetails | undefined;
	className?: string;
	children?: React.ReactNode;
}

export const ProfileSection = ({
	data,
	className,
	children,
}: ProfileSectionProps) => {
	if (!data) return null;

	return (
		<section
			className={cn("flex flex-col gap-2", className)}
			id="profile-section"
		>
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
					<section className="grid grid-cols-2 gap-4 capitalize" id="bio">
						<div className="col-span-2 font-semibold text-sm">
							Informasi Pribadi
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Tempat Lahir</p>
							<p className="text-sm">{data?.bio?.placeOfBirth || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Tanggal Lahir</p>
							<p className="text-sm">
								{data?.bio?.dateOfBirth?.toLocaleString() || "-"}
							</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2 capitalize">
							<p className="text-muted-foreground text-xs">Jenis Kelamin</p>
							<p className="text-sm">{data?.bio?.gender || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2 capitalize">
							<p className="text-muted-foreground text-xs">Agama</p>
							<p className="text-sm">{data?.bio?.agama || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2 capitalize">
							<p className="text-muted-foreground text-xs">Status Perkawinan</p>
							<p className="text-sm">{data?.bio?.statusPerkawinan || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2 capitalize">
							<p className="text-muted-foreground text-xs">
								Nama Gadis Ibu Kandung
							</p>
							<p className="text-sm">{data?.bio?.namaGadisIbuKandung || "-"}</p>
						</div>
						<div className="col-span-2 font-semibold text-sm">Kontak</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Nomor Handphone 1</p>
							<p className="text-sm">{data?.bio?.phoneNo || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Nomor Handphone 2</p>
							<p className="text-sm">{data?.bio?.phoneNo2 || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Nomor Handphone 3</p>
							<p className="text-sm">{data?.bio?.phoneNo3 || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">
								Nomor Telepon Rumah
							</p>
							<p className="text-sm">{data?.bio?.homePhoneNo || "-"}</p>
						</div>
						<div className="col-span-2 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Email</p>
							<p className="text-sm normal-case">{data?.bio?.email || "-"}</p>
						</div>
						<div className="col-span-2 font-semibold text-sm">Dokumen</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Nomor KTP</p>
							<p className="text-sm">{data?.bio?.ktpNo || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Nomor NPWP</p>
							<p className="text-sm">{data?.bio?.npwpNo || "-"}</p>
						</div>
						<div className="col-span-2 font-semibold text-sm">Pekerjaan</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Nama Perusahaan</p>
							<p className="text-sm">{data?.bio?.companyName || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Pekerjaan</p>
							<p className="text-sm">{data?.bio?.pekerjaan || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Status Pegawai</p>
							<p className="text-sm">{data?.bio?.employeeStatus || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Source Data</p>
							<p className="text-sm">{data?.bio?.sourceData || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Tipe Customer</p>
							<p className="text-sm">{data?.bio?.tipeLead || "-"}</p>
						</div>
						<div className="col-span-1 flex flex-col gap-2">
							<p className="text-muted-foreground text-xs">Penghasilan</p>
							<p className="text-sm">
								{data?.bio?.penghasilan
									? new Intl.NumberFormat("id-ID", {
											style: "currency",
											currency: "IDR",
										}).format(Number(data.bio.penghasilan))
									: "-"}
							</p>
						</div>
					</section>
				</CardContent>
			</Card>
		</section>
	);
};
