<script lang="ts">
  export let note: any;
  export let deleteNote: any;
</script>

<a
  href={`/notes/${note.id}`}
  class="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-6 shadow dark:border-zinc-700 dark:bg-zinc-900"
>
  <p class="truncate break-words text-lg font-semibold text-zinc-700 dark:text-zinc-100">
    {note.title}
  </p>
  <p class="truncate break-words font-normal text-zinc-700 dark:text-zinc-400">
    {note.content}
  </p>
  <div class="flex justify-end pt-4">
    <button
      on:click={() => deleteNote(note.id)}
      class="inline-flex items-center rounded-lg bg-red-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >Delete
    </button>
  </div>
</a>
