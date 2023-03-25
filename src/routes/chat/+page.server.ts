import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase, getSession } }) => {
  let { data: messages, error } = await supabase.from("messages").select("*");
  return { messages };
}) satisfies PageServerLoad;

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const message = formData.get("message") as string;
    // const session = await getSession();
    // const { user } = session;
    const { data, error } = await supabase
      .from("messages")
      .insert({ content: message });
    return {};
  },
} satisfies Actions;
