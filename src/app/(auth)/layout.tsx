import Image from "next/image";
import { ReactNode } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface IAuthLayout {
	children: ReactNode;
}

export default function AuthLayout({ children }: IAuthLayout) {
	return (
		<section className="container mx-auto mt-10 grid grid-cols-2">
			<div className="rounded-s-3xl bg-primary p-16 text-white">
				<Image
					alt="solutif-logo"
					height={50}
					src="/assets/logo/solutifcx_white_logo.png"
					width={150}
				/>
				<h1 className="my-16 scroll-m-20 font-bold text-2xl tracking-tight lg:text-4xl">
					Welcome to Solutif Telesales System
				</h1>
				<AspectRatio ratio={16 / 9}>
					<Image
						alt="sign-in-illustration"
						className="object-contain"
						fill
						sizes="100%"
						src="/assets/illustration.png"
					/>
				</AspectRatio>
			</div>
			<div className="flex flex-col items-center justify-center rounded-e-3xl bg-white">
				{children}
			</div>
		</section>
	);
}
