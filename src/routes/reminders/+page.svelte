<script lang="ts">
  import Reminder from "$lib/shared/components/reminder/Reminder.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  // export let form: ActionData;

  let input: HTMLInputElement;

  let { session, reminders } = data;

  let markAsDone = async (id: string) => {
    reminders = reminders.filter((note: any) => note.id !== id);
    let form = new FormData();
    form.append("id", id);
    await fetch(`?/delete`, {
      method: "POST",
      headers: {},
      body: form,
    });
  };

  // send the form data to the server by fetching the API
  let submitForm = async (content: string) => {
    // reminders = [...reminders, { content }];
    let form = new FormData();
    form.append("reminder", content);
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

  // add the event listener
  onMount(() => {
    input.addEventListener("keyup", onEnter);
  });
</script>

<div class="p-5">
  <h1 class="py-5 text-4xl font-bold">Reminders</h1>

  <div class="flex gap-5 py-5">
    <input
      type="text"
      id="reminder"
      autocomplete="off"
      bind:this={input}
      name="reminder"
      class="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-green-500 dark:focus:ring-green-500"
      placeholder="What do you have to do?"
      required
    />
    <button
      type="submit"
      on:click={() => submitForm(input.value)}
      class="inline-flex items-center rounded-lg bg-green-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >Add</button
    >
  </div>

  <!-- loop the notes -->
  <div class="space-y-5">
    {#each reminders as reminder}
      <Reminder {reminder} {markAsDone} />
      <!-- <NoteCard {note} deleteNote={markAsDone} /> -->
    {/each}
  </div>
</div>
