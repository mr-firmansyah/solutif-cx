import Image from "next/image";
import { ReactNode } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface IAuthLayout {
  children: ReactNode;
}

export default function AuthLayout({ children }: IAuthLayout) {
  return (
    <section className="container grid grid-cols-2 mt-10 mx-auto">
      <div className="bg-primary text-white p-16 rounded-s-3xl">
        <Image
          alt="solutif-logo"
          height={50}
          src="/assets/logo/solutifcx_white_logo.png"
          width={150}
        />
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-4xl my-16">
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
      <div className="bg-white rounded-e-3xl flex flex-col items-center justify-center">{children}</div>
    </section>
  );
}
