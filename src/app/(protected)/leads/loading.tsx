import { Spinner } from "@/components/ui/loading";

export default function loading() {
	return (
		<div className="flex w-full h-screen justify-center items-center">
			<Spinner />
		</div>
	);
}
