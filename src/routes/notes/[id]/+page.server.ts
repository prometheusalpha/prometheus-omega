import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load = (async ({ locals: { supabase, getSession }, params }) => {
  return {
    stream: {
      tags: Promise.resolve(supabase.from("tags").select("*")),
      note: Promise.resolve(
        supabase
          .from("notes")
          .select("*, tags (name)")
          .eq("id", params.id)
          .limit(1)
          .single()
      ),
    },
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  update: async ({ request, locals: { supabase, getSession }, params }) => {
    const formData = await request.formData();
    const note = formData.get("note") as string;
    const title = formData.get("title") as string;
    const id = params.id;

    if (!note || !id) {
      return fail(400, {});
    }

    const { error } = await supabase.from("notes").upsert({
      id,
      content: note,
      title,
      modified: new Date(),
    });
  },

  addtag: async ({ request, locals: { supabase, getSession }, params }) => {
    const formData = await request.formData();
    const tagId = formData.get("tagId") as string;
    const id = params.id;

    if (!tagId || !id) {
      return fail(400, {});
    }

    const { error } = await supabase.from("notes_tags").upsert({
      note_id: id,
      tag_id: tagId,
    });
  },
} satisfies Actions;
