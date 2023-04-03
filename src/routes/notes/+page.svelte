<script lang="ts">
  import { goto } from "$app/navigation";
  import { Plus } from "svelte-heros-v2";
  import type { PageData } from "./$types";
  import NoteCard from "./NoteCard.svelte";

  export let data: PageData;

  let notes: any[];
  let currentTag: string[] = [];

  // function to delete a note
  let deleteNote = async (id: string) => {
    notes = notes.filter((note: any) => note.id !== id);
    let form = new FormData();
    form.append("id", id);
    fetch(`?/delete`, {
      method: "POST",
      headers: {},
      body: form,
    });
  };

  $: data.stream.notes.then((data) => {
    notes = data.data;
  });

  // send the form data to the server by fetching the API
  let addNote = async () => {
    let form = new FormData();
    form.append("note", "");
    let res = await fetch(`?/update`, {
      method: "POST",
      headers: {},
      body: form,
    });
    let data = await res.json();
    let json = JSON.parse(data.data);
    let id = json[2];
    goto(`/notes/${id}`);
  };

  let toggleTag = (tag: string) => {
    if (currentTag.includes(tag)) {
      currentTag = currentTag.filter((t) => t !== tag);
    } else {
      currentTag = [...currentTag, tag];
    }
  };

  $: if (currentTag != null) {
    notes = notes;
  }

  let checkHasTag = (note: any) => {
    if (currentTag.length === 0) return true;
    let tagNames = note.tags.map((tag: any) => tag.name);
    return currentTag.every((tag: string) => tagNames.includes(tag));
  };
</script>

<div class="p-5">
  <h1 class="py-10 text-6xl">
    <span>your notes</span>
  </h1>

  {#await data.stream.tags}
    <div class="p-5 text-center">
      <p class="text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  {:then tags}
    <div
      class="scrollbar-hide mb-5 flex items-center gap-2 overflow-x-auto py-2"
    >
      {#each tags.data as tag}
        <div class="">
          <input
            type="checkbox"
            class="peer hidden"
            id="tag-{tag.name}"
            on:change={() => toggleTag(tag.name)}
          />
          <label
            for="tag-{tag.name}"
            class="text-md inline cursor-pointer rounded-full border border-zinc-400 px-3 py-2 font-medium text-zinc-700 hover:bg-zinc-700 peer-checked:border-green-600 peer-checked:bg-green-600 peer-checked:text-zinc-950 dark:text-zinc-100"
          >
            #{tag.name}
          </label>
        </div>
      {/each}
    </div>
  {/await}

  <button
    class="fixed bottom-24 right-8 rounded-xl bg-green-800 p-4 md:bottom-4"
    on:click={addNote}
  >
    <Plus class="h-8 w-8 text-green-400" />
  </button>

  {#if notes}
    <div
      class="grid grid-cols-1 gap-5 max-md:divide-y-2 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]"
    >
      {#each notes as note}
        {#if checkHasTag(note)}
          <NoteCard {note} {deleteNote} />
        {/if}
      {/each}
    </div>
  {:else}
    <div class="p-5 text-center">
      <p class="text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  {/if}
</div>
