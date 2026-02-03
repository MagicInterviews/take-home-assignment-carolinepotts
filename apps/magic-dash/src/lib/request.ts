import { cookies, headers } from "next/headers";

export const request = async (url: string) => {
  const cookieStore = await cookies();
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${protocol}://${host}` : "http://localhost:3000";
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  return fetch(`${baseUrl}/${url}`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
}
