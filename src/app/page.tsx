import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from '@/auth';
// import { login } from "@/actions/genesys";
// import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard")
  }

  // const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   startTransition(() => {
  //     login().then((data) => {
  //       // eslint-disable-next-line no-console
  //       console.log(data)
  //     })
  //   })
  // }

  return (
    <div>
      {/* <form onSubmit={onSubmit}>
        <Button>Login</Button>
      </form> */}
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
