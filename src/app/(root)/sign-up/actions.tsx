"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: "/auth/confirm/",
    },
  });

  if (error) {
    console.log(error);
    redirect("/signup?message=Could not authenticate user");
  }

  // revalidatePath("/", "layout");

  // redirect("/");

  redirect(
    "/auth/confirm?message=Check email (${email}) to continue user sign in"
  );
}
