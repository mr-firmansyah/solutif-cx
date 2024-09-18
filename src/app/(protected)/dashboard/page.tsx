import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
// import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <div className="h-full rounded-md border-2 border-dashed p-2">
      <pre className="max-w-5xl">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
