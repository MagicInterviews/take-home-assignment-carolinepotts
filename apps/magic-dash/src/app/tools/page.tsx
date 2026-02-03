import { AppHeader } from "@/app/components/AppHeader";
import { fetchToolsData } from "@/lib/tools";
import { redirect } from "next/navigation";
import { ToolList } from "./ToolList";

export default async function ToolsPage() {
  const { response, data } = await fetchToolsData();

  if (response.status === 401) redirect("/login");
  if (!response.ok) redirect("/error");

  return (
    <>
      <AppHeader />
      <ToolList
        tools={data.tools ?? []}
        teacherName={data?.teacherName}
        organizationName={data?.organizationName}
        teacherActive={data?.teacherActive}
      />
    </>
  );
}
