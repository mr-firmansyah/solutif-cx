import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { toast } from "sonner";

import { useFetch as ky } from "@/hooks/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { getAttachmentsById, getLogsById } from "@/actions/misc";
import { Shell } from "@/components/ui/shell";
import {
	AppBreadcrumb,
	type LinkBreadcrumb,
} from "@/components/app-breadcrumb";

import { ProfileSection } from "../../_components/detail-profile-section";
import { CampaignSection } from "../../_components/detail-campaign-section";
import { DetailTabs } from "../../_components/detail-tabs";
import PipelineStatusLeads from "../../_components/pipeline-status-leads";
import NewInformationSection from "../../_components/detail-new-info";
import AddressSection from "../../_components/detail-address";

// NOTE: I personally didn't know why this should be dynamic with ssr: false
// but maybe it's because the parent component is server-rendered?
const ConvertLeadsModal = dynamic(
	() => import("../../_components/convert-leads"),
	{ ssr: false, loading: () => <Skeleton className="w-full h-9" /> },
);

interface LeadsDetailPageProps {
	params: {
		id: string;
	};
}

// NOTE: It's better to globally define this extended ky instance for v2 API isn't it?
// So we don't have to repeat this in every file
const api = (tenant: string) =>
	ky(tenant).extend((options) => ({ prefixUrl: `${options.prefixUrl}/v2` }));
const breadcrumb: LinkBreadcrumb[] = [
	{ href: "/leads", label: "Leads" },
	{ label: "Detail Lead" },
];

export default async function LeadsDetailPage({
	params,
}: LeadsDetailPageProps) {
	const { id } = params;
	const promiseLeadsDetail = getLeadsDetail(id);
	const promiseLogs = getLogsById(id);
	const promiseAttachments = getAttachmentsById(id);

	const [leads, logs, attachments] = await Promise.all([
		promiseLeadsDetail,
		promiseLogs,
		promiseAttachments,
	]);

	const data = {
		logs,
		leads,
		attachments,
	};

	// NOTE: This should redirect to the error page
	// TODO: Later on, we will add a custom error page
	// TODO: eg. redirect('/error', { statusCode: 404 });
	// if (leads.error || logs.error) {
	//   redirect('/error');
	// }

	return (
		<Shell className="gap-4" label={<AppBreadcrumb items={breadcrumb} />}>
			<PipelineStatusLeads data={data.leads?.data} />

			<div className="flex flex-col md:flex-row gap-4">
				<ProfileSection className="md:w-5/12" data={data.leads?.data}>
					<ConvertLeadsModal />
				</ProfileSection>
				<CampaignSection className="w-full" data={data.leads?.data} />
			</div>

			<div>
				<h3 className="mb-2 ml-3 font-semibold">Overview</h3>
				<AddressSection data={data.leads?.data} />
			</div>
			<NewInformationSection data={data.leads?.data} />
			<DetailTabs attachments={data.attachments} logs={data.logs} />
			{/* <pre>{JSON.stringify(data.leads, null, 2)}</pre> */}
		</Shell>
	);
}

// NOTE: This should be in a separate file if it's going to be reused
const getLeadsDetail = async (id: string) => {
	const tenant = cookies().get("tenant")?.value || "";

	try {
		const response = await api(tenant)
			.get<LeadsDetailsResponse>(`leads/${id}`)
			.json();

		return response;
	} catch (error: unknown) {
		throw error;
	}
};
