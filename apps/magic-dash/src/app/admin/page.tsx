import { AppHeader } from "@/app/components/AppHeader";
import { fetchAdminData } from "@/lib/admin";
import { redirect } from "next/navigation";
import { NoAccess } from "./NoAccess";
import { TeacherList } from "./TeacherList";

export default async function AdminPage() {
  const { response, data } = await fetchAdminData();

  if (response.status === 401) redirect("/login");
  if (response.status === 403) return <NoAccess />;
  
  if (!response.ok) redirect("/error");

  return (
    <>
      <AppHeader />
      <TeacherList
        teachers={data?.teachers ?? []}
        organizationName={data?.organizationName}
      />
    </>
  );
}
