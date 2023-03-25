import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getOpenGraph } from "$shared/logic/openGraph";

export interface LinkCardData {
  link: string;
  created_at: Date;
  // og_title: string;
  // og_description: string;
  // og_image: string;
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

  let { data: links, error } = await supabase.from("links").select("*");

  let cards: LinkCardData[] = [];

  for (links of links) {
    let ogTitle, ogDescription, ogImage;
    let data;

    try {
      data = getOpenGraph(links.link as string);
    } catch (error) {
      // ({ ogTitle, ogDescription, ogImage } = {
      //   ogTitle: "Untitled",
      //   ogDescription: "No description",
      //   ogImage: "",
      // });
    }
    let imageUrl = ogImage || "";
    const card = {
      link: links.link as string,
      created_at: links.created_at as Date,
      data: data || Promise.resolve({} as any),
      // og_title: ogTitle as string,
      // og_description: ogDescription as string,
      // og_image: imageUrl,
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

    const session = await getSession();

    const { error } = await supabase.from("links").upsert({
      link: link,
      created_at: new Date(),
    });

    if (error) {
      return fail(500, {});
    }

    return {};
  },
  signout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (session) {
      await supabase.auth.signOut();
      throw redirect(303, "/");
    }
  },
} satisfies Actions;
