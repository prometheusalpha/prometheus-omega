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
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
        placeholder="What are you thinking about?"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Add</button
      >
    </form>
  </div>

  <!-- loop the notes -->
  <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
    {#each notes as note}
      <NoteCard {note} {deleteNote} />
    {/each}
  </div>
</div>
