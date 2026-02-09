"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/server";
import { isValidGradeLevel } from "@/lib/gradeLevels";

export type UpdateTeacherPayload = {
  grade_levels?: string[];
};

export type UpdateTeacherResult = { success: true } | { success: false; error: string };

export async function updateTeacher(
  teacherId: string,
  payload: UpdateTeacherPayload
): Promise<UpdateTeacherResult> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return { success: false, error: userError.message };
  }

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id, organization_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError) {
    return { success: false, error: adminError.message };
  }

  if (!admin) {
    return { success: false, error: "Admin access required" };
  }

  const { data: teacher, error: teacherError } = await supabase
    .from("teachers")
    .select("id, organization_id")
    .eq("id", teacherId)
    .maybeSingle();

  if (teacherError) {
    return { success: false, error: teacherError.message };
  }

  if (!teacher || teacher.organization_id !== admin.organization_id) {
    return { success: false, error: "Teacher not found in your organization" };
  }

  if (payload.grade_levels !== undefined) {
    const invalid = payload.grade_levels.find((v) => !isValidGradeLevel(v));
    if (invalid !== undefined) {
      return { success: false, error: `Invalid grade level: ${invalid}` };
    }
  }

  const updateData: Record<string, unknown> = {};
  if (payload.grade_levels !== undefined) updateData.grade_levels = payload.grade_levels;

  if (Object.keys(updateData).length === 0) {
    return { success: true };
  }

  const { error: updateError } = await supabase
    .from("teachers")
    .update(updateData)
    .eq("id", teacherId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePath("/admin");
  return { success: true };
}
