<script lang="ts">
  import NoteCard from "$lib/shared/components/note/NoteCard.svelte";
  import type { ActionData, PageData } from "./$types";
  export let data: PageData;
  let input: HTMLInputElement;

  let notes: any[];

  // function to delete a note
  let deleteNote = async (id: string) => {
    notes = notes.filter((note: any) => note.id !== id);
    let form = new FormData();
    form.append("id", id);
    await fetch(`?/delete`, {
      method: "POST",
      headers: {},
      body: form,
    });
  };

  $: data.stream.notes.then((data) => {
    notes = data.data;
  });

  // send the form data to the server by fetching the API
  let submitForm = async (content: string) => {
    let form = new FormData();
    form.append("note", content);
    let res = await fetch(`?/update`, {
      method: "POST",
      headers: {},
      body: form,
    });
    location.reload();
  };

  let onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      submitForm(input.value);
    }
  };
</script>

<div class="p-5">
  <h1 class="py-5 text-4xl font-bold">Notes</h1>

  <!-- input new notes -->
  <div class="py-5">
    <div class="flex gap-5">
      <input
        type="text"
        id="note"
        autocomplete="off"
        on:keydown={onEnter}
        bind:this={input}
        name="note"
        class="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-green-500 dark:focus:ring-green-500"
        placeholder="What are you thinking about?"
        required
      />
      <button
        type="submit"
        on:click={() => submitForm(input.value)}
        class="inline-flex items-center rounded-lg bg-green-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >Add</button
      >
    </div>
  </div>

  {#if notes}
    <div class="grid gap-5 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))]">
      {#each notes as note}
        <NoteCard {note} {deleteNote} />
      {/each}
    </div>
  {:else}
    <div class="p-5 text-center">
      <p class="text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  {/if}
</div>
