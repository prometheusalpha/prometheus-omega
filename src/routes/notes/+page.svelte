<script lang="ts">
  import NoteCard from "$lib/shared/components/note/NoteCard.svelte";
  import type { ActionData, PageData } from "./$types";
  export let data: PageData;
  export let form: ActionData;

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
    // reload the page
    if (data.type === "success") {
      location.reload();
    }
  };
</script>

<div class="p-5">
  <h1 class="py-5 text-4xl font-bold">Notes</h1>

  <!-- input new notes -->
  <div class="py-5">
    <form action="?/update" method="post" bind:this={form} class="flex gap-5">
      <input
        type="text"
        id="note"
        name="note"
        class="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-green-500 dark:focus:ring-green-500"
        placeholder="What are you thinking about?"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center rounded-lg bg-green-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >Add</button
      >
    </form>
  </div>

  {#await data.stream.notes}
    <div class="text-center p-5">
      <p class="text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  {:then notes}
    <div class="grid gap-5 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))]">
      {#each notes.data as note}
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
