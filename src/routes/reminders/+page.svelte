<script lang="ts">
  import Reminder from "./Reminder.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  // export let form: ActionData;

  let input: HTMLInputElement;
  let dateInput: HTMLInputElement;
  let timeInput: HTMLInputElement;

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
  let addReminder = async (content: string) => {
    let dateString = dateInput.value;
    let timeString = timeInput.value;

    let form = new FormData();
    form.append("reminder", content);
    form.append("date", dateString + " " + timeString);

    await fetch(`?/update`, {
      method: "POST",
      headers: {},
      body: form,
    });
    location.reload();
  };

  let onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addReminder(input.value);
    }
  };

  // add the event listener
  onMount(() => {
    input.addEventListener("keyup", onEnter);
  });
</script>

<div class="p-5">
  <h1 class="py-5 text-4xl font-bold">Reminders</h1>

  <div class="grid gap-5 py-5 md:grid-cols-[3fr_1fr_1fr_100px]">
    <input
      type="text"
      id="reminder"
      autocomplete="off"
      bind:this={input}
      name="reminder"
      class="block min-w-0 grow rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-green-500 dark:focus:ring-green-500"
      placeholder="What do you have to do?"
      required
    />
    <!-- Calendar -->
    <input
      bind:this={dateInput}
      type="date"
      class="block min-w-0 rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-green-500 dark:focus:ring-green-500"
    />
    <!-- Time -->
    <input
      bind:this={timeInput}
      type="time"
      class="block rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-green-500 dark:focus:ring-green-500"
    />
    <button
      type="submit"
      on:click={() => addReminder(input.value)}
      class="inline-block items-center rounded-lg bg-green-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
