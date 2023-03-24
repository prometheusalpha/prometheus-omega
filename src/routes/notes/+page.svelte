<script lang="ts">
  import NoteCard from "$lib/shared/components/note/NoteCard.svelte";
  import type { ActionData, PageData } from "./$types";
  export let data: PageData;
  export let form: ActionData;

  let { session, notes } = data;

  // function to delete a note
  let deleteNote = async (id: string) => {
    let form = new FormData();
    form.append("id", id);
    let res = await fetch(`?/delete`, {
      method: "POST",
      headers: {},
      body: form,
    });
    let data = await res.json();
    if (data.type === "success") {
      notes = notes.filter((note: any) => note.id !== id);
    }
  };
</script>

<div class="p-5">
  <h1 class="font-bold text-4xl py-5">Notes</h1>

  <!-- input new notes -->
  <div class="py-5">
    <form action="?/update" method="post" bind:this={form} class="flex gap-5">
      <input
        type="text"
        id="note"
        name="note"
        class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
        placeholder="What are you thinking about?"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >Add</button
      >
    </form>
  </div>

  {#await notes}
    <div class="text-center">
      <p class="text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  {:then notes}
    <div class="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-5">
      {#each notes as note}
        <NoteCard {note} {deleteNote} />
      {/each}
    </div>
  {:catch error}
    <div class="text-center">
      <p class="text-zinc-500 dark:text-zinc-400">Error: {error.message}</p>
    </div>
  {/await}
  <!-- loop the notes -->
</div>
