<script lang="ts">
  import Reminder from "$lib/shared/components/reminder/Reminder.svelte";
  import type { ActionData, PageData } from "./$types";
  export let data: PageData;
  export let form: ActionData;

  let { session, reminders } = data;

  let markAsDone = async (id: string) => {
    let form = new FormData();
    form.append("id", id);
    let res = await fetch(`?/delete`, {
      method: "POST",
      headers: {},
      body: form,
    });
    let data = await res.json();
    if (data.type === "success") {
      reminders = reminders.filter((note: any) => note.id !== id);
    }
  };
</script>

<div class="p-5">
  <h1 class="py-5 text-4xl font-bold">Reminders</h1>

  <!-- input new notes -->
  <div class="py-5">
    <form action="?/update" method="post" bind:this={form} class="flex gap-5">
      <input
        type="text"
        id="reminder"
        name="reminder"
        class="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-green-500 dark:focus:ring-green-500"
        placeholder="What do you have to do?"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center rounded-lg bg-green-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >Add</button
      >
    </form>
  </div>

  <!-- loop the notes -->
  <div class="space-y-5">
    {#each reminders as reminder}
      <Reminder {reminder} {markAsDone} />
      <!-- <NoteCard {note} deleteNote={markAsDone} /> -->
    {/each}
  </div>
</div>
