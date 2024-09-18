// "use server";

// import { cookies } from "next/headers";

// import { signOut as naSignOut } from "@/auth";

// export async function signOut() {
//   const tenant = cookies().get('tenant')?.value;

//   try {
//     await fetch(`https://${tenant}.${process.env.NEXT_PUBLIC_API_PATH}.${process.env.NEXT_PUBLIC_API_DOMAIN}/api/logout`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     await naSignOut();
//   } catch (error) {
//     throw error;
//   }
// }
