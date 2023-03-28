<script lang="ts">
  import type { PageData } from "./$types";
  import SvelteMarkdown from "svelte-markdown";

  export let data: PageData;

  let saved: string;
  let isPreview: boolean = false;

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
  <div class="sticky top-0 flex items-center gap-4 bg-zinc-900 p-4">
    <a href="." class="inline-block px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6 dark:text-zinc-400"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </a>
    <button
      on:click={saveNote}
      type="button"
      class="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >Save</button
    >
    <label
      for="preview-toggle"
      class="cursor-pointer select-none rounded-lg bg-gray-700 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:hidden"
      >{isPreview ? "Edit" : "Preview"}
    </label>
  </div>
  {#await data.stream.note then note}
    <div
      class="mx-3 mt-3 grid min-h-[60vh] rounded-xl border-zinc-700 md:grid-cols-2 md:border-2"
    >
      <input
        type="checkbox"
        name="preview-toggle"
        id="preview-toggle"
        class="peer hidden"
        on:change={() => (isPreview = !isPreview)}
      />
      <textarea
        class="bg-transparent p-2 focus:outline-none max-md:peer-checked:hidden md:border-r-2 md:border-zinc-700"
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
