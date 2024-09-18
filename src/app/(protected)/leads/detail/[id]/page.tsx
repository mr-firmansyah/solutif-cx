import { cookies } from "next/headers";

import { useFetch as ky } from "@/hooks/use-fetch";
import { Shell } from "@/components/ui/shell";
import { ProfileSection } from "../../_components/detail-profile-section";
import { CampaignSection } from "../../_components/detail-campaign-section";
import PipelineStatusLeads from "../../_components/pipeline-status-leads";

// NOTE: It's better to globally define this extended ky instance for v2 API isn't it?
// So we don't have to repeat this in every file
const api = (tenant: string) => ky(tenant).extend((options) => ({ prefixUrl: `${options.prefixUrl}/v2` }))

interface LeadsDetailPageProps {
  params: {
    id: string;
  };
}

export default async function LeadsDetailPage({ params }: LeadsDetailPageProps) {
  const { id } = params;
  const { data, error } = await getLeadsDetail(id);

  // NOTE: This should redirect to the error page
  // TODO: Later on, we will add a custom error page
  // eg. redirect('/error', { statusCode: 404 });
  if (error) {
    throw error;
  }

  return (
    <Shell className="gap-2" label="Leads">
      <PipelineStatusLeads data={data} />
      <div className="flex gap-4">
        <ProfileSection data={data} className="w-5/12" />
        <CampaignSection data={data} className="w-full" />
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Shell>
  );
}

// NOTE: This should be in a separate file if it's going to be reused
const getLeadsDetail = async (id: string) => {
  const tenant = cookies().get('tenant')?.value || "";

  try {
    const response = await api(tenant)
      .get<LeadsDetailsResponse>(`leads/${id}`)
      .json();

    return response;
  } catch (error: unknown) {
    throw error;
  }
}