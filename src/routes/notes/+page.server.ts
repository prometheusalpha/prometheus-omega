import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export interface NoteData {
  note: string;
  created: Date;
  modified: Date;
}

export const load = (async ({ locals: { supabase, getSession } }) => {
  // const session = await getSession();

  return {
    stream: {
      notes: supabase.from("notes").select("*").select("*"),
    },
  };

  // let { data: notes, error } = await supabase.from("notes").select("*");

  // return { session, notes };
}) satisfies PageServerLoad;

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const note = formData.get("note") as string;

    if (!note) {
      return fail(400, {});
    }

    const session = await getSession();

    const { error } = await supabase.from("notes").upsert({
      content: note,
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
