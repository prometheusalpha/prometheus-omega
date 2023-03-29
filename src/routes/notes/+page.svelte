<script lang="ts">
  import NoteCard from "./NoteCard.svelte";
  import type { ActionData, PageData } from "./$types";
  import { goto } from "$app/navigation";
  import { Plus } from "svelte-heros-v2";

  export let data: PageData;
  let input: HTMLInputElement;

  let notes: any[];

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
</script>

<div class="p-5">
  <h1 class="py-5 text-4xl font-bold">Notes</h1>

  <button
    class="fixed bottom-24 right-8 rounded-xl bg-green-800 p-4 md:bottom-4"
    on:click={addNote}
  >
    <Plus class="h-8 w-8 text-green-400" />
  </button>

  {#if notes}
    <div class="space-y-5">
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
