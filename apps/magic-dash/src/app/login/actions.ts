"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/server";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const client = await createClient();
  const { data: authData, error } = await client.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  (await cookies()).set("x-authenticated", "true");
  revalidatePath("/", "layout");

  const userId = authData.user?.id;
  if (!userId) {
    redirect("/error");
  }

  const { data: admin } = await client
    .from("admins")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (admin) {
    redirect("/admin");
  }

  const { data: teacher } = await client
    .from("teachers")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (teacher) {
    redirect("/tools");
  }

  redirect("/admin");
}

export async function signup(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const client = await createClient();
  const { data: authData, error } = await client.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  (await cookies()).set("x-authenticated", "true");
  revalidatePath("/", "layout");

  const userId = authData.user?.id;
  if (!userId) {
    redirect("/error");
  }

  const { data: admin } = await client
    .from("admins")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (admin) {
    redirect("/admin");
  }

  const { data: teacher } = await client
    .from("teachers")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (teacher) {
    redirect("/tools");
  }

  redirect("/admin");
}
