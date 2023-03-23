import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import ogs from "open-graph-scraper";
import type { ImageObject } from "open-graph-scraper/lib/types";

export interface LinkCardData {
  link: string;
  created_at: Date;
  og_title: string;
  og_description: string;
  og_image: string;
}

export const load = (async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  // if (!session) {
  //   throw redirect(303, "/");
  // }

  let { data: links, error } = await supabase.from("links").select("*");

  let cards: LinkCardData[] = [];

  for (links of links) {
    const options = { url: links.link };
    const { result } = await ogs(options);
    const { ogTitle, ogDescription, ogImage } = result;
    let imageUrl = "";
    if (typeof ogImage === "string") {
      imageUrl = ogImage;
    } else if (ogImage instanceof Array) {
      imageUrl = ogImage[0].url;
    } else {
      imageUrl = (ogImage as ImageObject).url;
    }
    const card = {
      link: links.link as string,
      created_at: links.created_at as Date,
      og_title: ogTitle as string,
      og_description: ogDescription as string,
      og_image: imageUrl,
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
