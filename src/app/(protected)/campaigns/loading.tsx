import { Spinner } from "@/components/ui/loading";

export default function loading() {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Spinner />
		</div>
	);
}
