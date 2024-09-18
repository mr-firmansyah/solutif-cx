import { Spinner } from "@/components/ui/loading";

export default function Page() {
  return (
    <div>
      <Spinner>
        <span className="animate-pulse text-sm">Loading...</span>
      </Spinner>
    </div>
  );
}