import { getCampaign } from "@/actions/campaign";
import { AppBreadcrumb, type LinkBreadcrumb } from "@/components/app-breadcrumb";
import { Shell } from "@/components/ui/shell";

interface CampaignsDetailPageProps {
  params: {
    id: string;
  };
}

const breadcrumb: LinkBreadcrumb[] = [
  { href: "/campaigns", label: "Campaigns" },
  { label: "Detail Campaign" },
];

export default async function CampaignsDetailPage({ params }: CampaignsDetailPageProps) {
  const { id } = params;
  const promiseCampaignsDetail = getCampaign(id);

  const [campaigns] = await Promise.all([promiseCampaignsDetail]);

  const data = {
    campaigns,
  }

  // NOTE: This should redirect to the error page
  // TODO: Later on, we will add a custom error page
  // TODO: eg. redirect('/error', { statusCode: 404 });
  // if (campaigns.error || logs.error) {
  //   redirect('/error');
  // }

  return (
    <Shell className="gap-4" label={<AppBreadcrumb items={breadcrumb} />}>
      <pre>{JSON.stringify(data.campaigns, null, 2)}</pre>
    </Shell>
  );
}