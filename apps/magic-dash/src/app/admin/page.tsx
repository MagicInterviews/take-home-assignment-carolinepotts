import { AppHeader } from "@/app/components/AppHeader";
import { fetchAdminData } from "@/lib/admin";
import { redirect } from "next/navigation";
import { TeacherList } from "./TeacherList";

export default async function AdminPage() {
  const { response, data } = await fetchAdminData();

  if (response.status === 401) redirect("/login");
  if (response.status === 403) redirect("/tools");

  if (!response.ok) redirect("/error");

  return (
    <>
      <AppHeader isAdmin={true} />
      <TeacherList teachers={data?.teachers ?? []} organizationName={data?.organizationName} />
    </>
  );
}
