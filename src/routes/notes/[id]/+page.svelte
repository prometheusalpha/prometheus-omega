<script lang="ts">
  import { formatDate } from "$lib/shared/util/util";
  import { ArrowLeft, Check } from "svelte-heros-v2";
  import SvelteMarkdown from "svelte-markdown";
  import type { PageData } from "./$types";

  export let data: PageData;

  let isPreview: boolean = true;

  let titleInput: HTMLInputElement;
  let noteInput: HTMLTextAreaElement;

  let timeout: NodeJS.Timeout;

  const updateMarkdown = (e: Event) => {
    clearTimeout(timeout);
    timeout = setTimeout(saveNote, 1000);
  };

  // update the note by fetching api
  const saveNote = async () => {
    // update data in the preview by reassigning the value
    noteInput = noteInput;
    let form: FormData = new FormData();
    form.append("note", noteInput.value);
    form.append("title", titleInput.value);
    const res = await fetch(`?/update`, {
      method: "POST",
      headers: {},
      body: form,
    });
    // toggle the notification
    document.getElementById("notification")?.classList.toggle("invisible");
    setTimeout(() => {
      document.getElementById("notification")?.classList.toggle("invisible");
    }, 1000);
  };

  const addTag = (tagId: string) => {
    let form: FormData = new FormData();
    form.append("tagId", tagId);
    fetch(`?/addtag`, {
      method: "POST",
      headers: {},
      body: form,
    });
  };
</script>

<div class="h-full p-3">
  <div
    class="sticky top-0 flex items-center justify-between gap-4 border-zinc-500 bg-zinc-950 py-4 max-md:border-b"
  >
    <a href="." class="inline-block px-2">
      <ArrowLeft class="h-6 w-6 dark:text-zinc-400" />
    </a>
    <div
      class="invisible flex items-center gap-2 text-zinc-500"
      id="notification"
    >
      <Check class="h-6 w-6" />
      Saved
    </div>
    <label
      for="preview-toggle"
      class="cursor-pointer select-none rounded-lg px-5 py-3 text-sm font-medium text-white focus:outline-none"
      >{isPreview ? "Edit" : "Preview"}
    </label>
  </div>
  {#await data.stream.note then note}
    <div class="justify-between sm:flex">
      <div class="py-6 text-zinc-400">{formatDate(note.data.modified)}</div>
      <div class="flex items-center gap-2">
        {#each note.data.tags as tag}
          <span
            class="text-md inline py-1 pr-2.5 font-medium text-zinc-700 dark:text-zinc-100"
          >
            #{tag.name}
          </span>
        {/each}
      </div>
    </div>
    <input
      type="text"
      name="title"
      bind:this={titleInput}
      on:input={saveNote}
      class="w-[80vw] bg-transparent py-6 text-4xl focus:outline-none"
      value={note.data.title}
    />
    <div class="grid min-h-[60vh] rounded-xl border-zinc-700">
      <input
        type="checkbox"
        name="preview-toggle"
        id="preview-toggle"
        class="peer hidden"
        on:change={() => (isPreview = !isPreview)}
      />
      <textarea
        class="hidden bg-transparent py-3 text-zinc-200 focus:outline-none peer-checked:block md:border-zinc-700"
        value={note.data.content}
        bind:this={noteInput}
        on:input={updateMarkdown}
      />
      <div class="prose prose-invert max-w-none py-3 peer-checked:hidden">
        <SvelteMarkdown source={noteInput?.value || ""} />
      </div>
    </div>
  {/await}

  {#await data.stream.tags}
    <div class="p-3 text-gray-700">Loading tags...</div>
  {:then tags}
    <div class="p-5">Add tags</div>
    <div class="mx-3 mt-3 flex items-center gap-2">
      {#each tags.data as tag}
        <button
          on:click={() => addTag(tag.id)}
          class="inline rounded-full border border-zinc-600 px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-700 dark:text-zinc-100"
        >
          #{tag.name}
        </button>
      {/each}
    </div>
  {/await}
</div>
