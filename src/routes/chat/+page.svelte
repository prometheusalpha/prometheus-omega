<script lang="ts">
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  let { messages } = data;
</script>

<div class="flex h-[calc(100vh-6rem)] flex-col md:h-screen">
  <div class="border-b border-zinc-700">
    <h1 class="p-5 text-4xl font-bold">Command</h1>
  </div>
  <div class="grow">
    {#each messages as message}
      {#if message.from_user}
        <div class="flex justify-end p-2 pl-12">
          <div class="inline-block rounded-lg bg-green-800 p-3">
            <p class="text-gray-900 dark:text-white">{message.content}</p>
          </div>
        </div>
      {:else}
        <div class="p-2 pr-12">
          <div class="inline-block rounded-lg bg-zinc-800 p-3">
            <p class="text-gray-900 dark:text-white">{message.content}</p>
          </div>
        </div>
      {/if}
    {/each}
  </div>
  <div class="border-t border-zinc-700 p-3">
    <form action="?/update" method="post" bind:this={form} class="flex gap-5">
      <input
        type="text"
        id="message"
        name="message"
        autocomplete="off"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="What do you want me to do ?"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center rounded-lg bg-green-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >Go</button
      >
    </form>
  </div>
</div>
