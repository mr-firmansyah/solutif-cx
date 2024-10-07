import { AppBreadcrumb, LinkBreadcrumb } from "@/components/app-breadcrumb";
import { Shell } from "@/components/ui/shell";

const breadcrumb: LinkBreadcrumb[] = [
	{ href: "/service-request", label: "Service Request" },
	{ label: "Create" },
];

export default function TicketCreatePage() {
	return (
		<Shell label={<AppBreadcrumb items={breadcrumb} />}>
			<div>test</div>
		</Shell>
	);
}
