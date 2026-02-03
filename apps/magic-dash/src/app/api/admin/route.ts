import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id, name, organization_id, organizations ( id, name )")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError) {
    return NextResponse.json({ error: adminError.message }, { status: 500 });
  }

  if (!admin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { data: teachers, error: teachersError } = await supabase
    .from("teachers")
    .select("id, name, active, organization_id")
    .eq("organization_id", admin.organization_id)
    .order("name");

  if (teachersError) {
    return NextResponse.json({ error: teachersError.message }, { status: 500 });
  }

  return NextResponse.json({
    admin,
    teachers: teachers ?? [],
    organizationName: admin.organizations?.name ?? "Your Organization",
  });
}
