import { AppBreadcrumb, LinkBreadcrumb } from "@/components/app-breadcrumb";
import { Shell } from "@/components/ui/shell";

const breadcrumb: LinkBreadcrumb[] = [
  { href: "/leads", label: "Leads" },
  { label: "Create Lead" },
];

export default async function LeadsCreatePage() {
  return (
    <Shell className="gap-4" label={ <AppBreadcrumb items={breadcrumb} /> }>
      Test
    </Shell>
  );
}