<script lang="ts">
  import type { PageData } from "./$types";
  import SvelteMarkdown from "svelte-markdown";

  export let data: PageData;

  let saved: string;

  $: data.stream.note.then((note) => {
    saved = note.data.content;
  });

  const updateMarkdown = (e: Event) => {
    saved = e.target ? (e.target as HTMLTextAreaElement).value : "";
  };

  // update the note by fetching api
  const saveNote = async () => {
    let form: FormData = new FormData();
    form.append("note", saved);
    const res = await fetch(`?/update`, {
      method: "POST",
      headers: {},
      body: form,
    });
  };
</script>

<div class="h-full">
  <div class="sticky top-0 bg-zinc-900 p-4">
    <button
      on:click={saveNote}
      type="button"
      class="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >Save</button
    >
    <label
      for="preview-toggle"
      class="cursor-pointer select-none rounded-lg bg-gray-700 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:hidden"
      >Preview
    </label>
  </div>
  {#await data.stream.note then note}
    <div
      class="mx-3 mt-3 grid rounded-xl border-2 border-zinc-700 md:grid-cols-2"
    >
      <input
        type="checkbox"
        name="preview-toggle"
        id="preview-toggle"
        class="peer hidden"
      />
      <textarea
        class="bg-transparent p-2 focus:outline-none max-md:peer-checked:hidden md:border-r md:border-zinc-700"
        value={note.data.content}
        on:input={updateMarkdown}
      />
      <div
        class="prose prose-invert max-w-none p-2 max-md:hidden max-md:peer-checked:block"
      >
        <SvelteMarkdown source={saved} />
      </div>
    </div>
  {/await}
</div>
