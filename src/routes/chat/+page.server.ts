import { Action } from "$lib/shared/enums/action.enum";
import { Type } from "$lib/shared/enums/type.enum";
import { process, type Command } from "$lib/shared/logic/commandParser";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase, getSession } }) => {
  // let { data: messages, error } = await supabase.from("messages").select("*");
  return {
    stream: {
      messages: Promise.resolve(supabase.from("messages").select("*")),
    },
  };
  // return { messages };
}) satisfies PageServerLoad;

// map between the type and the column name
const typeToColumn = {
  [Type.LINK]: "link",
  [Type.NOTE]: "content",
  [Type.REMINDER]: "note",
};

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const message = formData.get("message") as string;
    const { data, error } = await supabase
      .from("messages")
      .insert({ content: message });

    let command: Command = process(message);

    if (command.action === Action.CREATE) {
      const { data, error } = await supabase
        .from(command.type)
        .insert({ [typeToColumn[command.type]]: command.value });

      let response = `Saved in ${command.type} with content "${command.value}"`;
      const { data: response_data, error: response_error } = await supabase
        .from("messages")
        .insert({ content: response, from_user: false });
    }

    return {};
  },
} satisfies Actions;
