import { createClient } from "@/utils/server";
import { request } from "./request";

export type AdminData = {
  organizationName: string;
  teachers: Array<{
    id: string;
    name: string;
    active: boolean;
    organization_id: string;
    grade_levels: string[] | null;
  }>;
};

export async function checkIsAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return false;

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError) return false;
  return admin != null;
}

const defaultAdminData: AdminData = {
  organizationName: "",
  teachers: [],
};

export async function fetchAdminData() {
  const response = await request("api/admin");
  const data: AdminData = response.ok ? await response.json() : defaultAdminData;
  return { response, data };
}
