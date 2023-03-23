import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export interface RemindData {
  note: string;
  created: Date;
  modified: Date;
  deadline: Date;
}

export const load = (async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  let { data: reminders, error } = await supabase.from("reminds").select("*");

  return { session, reminders };
}) satisfies PageServerLoad;

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const reminder = formData.get("reminder") as string;

    if (!reminder) {
      return fail(400, {});
    }

    const session = await getSession();

    const { error } = await supabase.from("reminds").upsert({
      note: reminder,
      deadline: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });

    if (error) {
      return fail(500, {});
    }
  },
  delete: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const id = formData.get("id") as string;

    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      return fail(500, {});
    }
  },
  signout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (session) {
      await supabase.auth.signOut();
      throw redirect(303, "/");
    }
  },
} satisfies Actions;
