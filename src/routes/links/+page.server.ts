import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getOpenGraph } from "$shared/logic/openGraph";

export interface LinkCardData {
  id: string;
  link: string;
  created_at: Date;
  data: Promise<{
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  }>;
}

export const load = (async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  // if (!session) {
  //   throw redirect(303, "/");
  // }

  let { data: links, error } = await supabase.from("links").select("*").order("created_at", { ascending: false });

  let cards: LinkCardData[] = [];

  for (links of links) {
    let data;

    try {
      data = getOpenGraph(links.link as string);
    } catch (error) {
      console.error(error);
    }
    const card = {
      id: links.id as string,
      link: links.link as string,
      created_at: links.created_at as Date,
      data:
        data ||
        Promise.resolve({
          ogTitle: "",
          ogDescription: "",
          ogImage: "",
        }),
    };
    cards.push(card);
  }

  return { session, cards };
}) satisfies PageServerLoad;

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const link = formData.get("link") as string;

    if (!link) {
      return fail(400, {});
    }

    const { error } = await supabase.from("links").upsert({
      link: link,
      created_at: new Date(),
    });

    if (error) {
      return fail(500, {});
    }

    return {};
  },
  delete: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return fail(400, {});
    }

    const { error } = await supabase.from("links").delete().eq("id", id);

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
