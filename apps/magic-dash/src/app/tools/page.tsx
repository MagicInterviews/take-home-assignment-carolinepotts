import { AppHeader } from "@/app/components/AppHeader";
import { checkIsAdmin } from "@/lib/admin";
import { fetchToolsData } from "@/lib/tools";
import { redirect } from "next/navigation";
import { ToolList } from "./ToolList";

export default async function ToolsPage() {
  const [isAdmin, { response, data }] = await Promise.all([checkIsAdmin(), fetchToolsData()]);

  if (response.status === 401) redirect("/login");
  if (!response.ok) redirect("/error");

  return (
    <>
      <AppHeader isAdmin={isAdmin} />
      <ToolList
        tools={data.tools ?? []}
        teacherName={data?.teacherName}
        organizationName={data?.organizationName}
        teacherActive={data?.teacherActive}
      />
    </>
  );
}
