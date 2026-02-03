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

  const { data: teacher, error: teacherError } = await supabase
    .from("teachers")
    .select("id, name, active, organization_id, organizations ( name )")
    .eq("user_id", user.id)
    .maybeSingle();

  if (teacherError) {
    return NextResponse.json({ error: teacherError.message }, { status: 500 });
  }

  if (!teacher) {
    const { data: admin } = await supabase
      .from("admins")
      .select("id, name, organization_id, organizations ( id, name )")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!admin) {
      return NextResponse.json({ error: "Teacher access required" }, { status: 403 });
    }
  }

  const { data: tools, error: toolsError } = await supabase
    .from("tools")
    .select(
      "id, name, description, created_at, updated_at, teacher_tools ( disabled, teacher_id )",
    );

  if (toolsError) {
    return NextResponse.json({ error: toolsError.message }, { status: 500 });
  }

  return NextResponse.json({
    tools: tools ?? [],
    teacherName: teacher?.name || 'All Teachers',
    organizationName: teacher?.organizations?.name ?? "Your Organization",
    teacherActive: teacher?.active ?? true,
  });
}
