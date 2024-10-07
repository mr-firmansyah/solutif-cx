import { cookies } from "next/headers";

export function getTenant() {
  return cookies().get("tenant")?.value || "";
}