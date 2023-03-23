<script lang="ts">
  export let note: any;
  export let deleteNote: any;
</script>

<div
  class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  <p class="font-normal text-gray-700 dark:text-gray-200">
    {note.content}
  </p>
  <div class="flex justify-end pt-4">
    <button
      on:click={() => deleteNote(note.id)}
      class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >Delete
    </button>
  </div>
</div>
