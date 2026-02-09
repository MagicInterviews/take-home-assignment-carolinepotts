"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/server";
import { GRADE_LEVELS, GradeLevel } from "@/lib/constants";

export type UpdateToolPayload = {
  name?: string;
  description?: string;
  grade_levels?: string[];
};

export type UpdateToolResult = { success: true } | { success: false; error: string };

function isValidGradeLevel(value: string): value is GradeLevel {
  return (GRADE_LEVELS as readonly string[]).includes(value);
}

export async function updateTool(
  id: string,
  payload: UpdateToolPayload
): Promise<UpdateToolResult> {
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
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError) {
    return { success: false, error: adminError.message };
  }

  if (!admin) {
    return { success: false, error: "Admin access required" };
  }

  if (payload.grade_levels !== undefined) {
    const invalid = payload.grade_levels.find((v) => !isValidGradeLevel(v));
    if (invalid !== undefined) {
      return { success: false, error: `Invalid grade level: ${invalid}` };
    }
  }

  const updateData: Record<string, unknown> = {};
  if (payload.name !== undefined) updateData.name = payload.name;
  if (payload.description !== undefined) updateData.description = payload.description;
  if (payload.grade_levels !== undefined) updateData.grade_levels = payload.grade_levels;

  if (Object.keys(updateData).length === 0) {
    return { success: true };
  }

  const { error: updateError } = await supabase.from("tools").update(updateData).eq("id", id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePath("/tools");
  return { success: true };
}
