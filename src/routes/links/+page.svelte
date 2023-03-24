<script lang="ts">
  import LinkCard from "$components/link/LinkCard.svelte";
  import type { ActionData, PageData } from "./$types";
  export let data: PageData;
  export let form: ActionData;

  let { session, cards } = data;

  let profileForm: any;
</script>

<div class="p-5">
  <h1 class="font-bold text-4xl py-5">Links</h1>

  <!-- input new link -->
  <div class="py-5">
    <label
      for="first_name"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >New link</label
    >
    <form action="?/update" method="post" bind:this={form} class="flex gap-5">
      <input
        type="text"
        id="link"
        name="link"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
        placeholder="https://example.com"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Add</button
      >
    </form>
  </div>

  <!-- loop the links -->
  <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
    {#each cards as card}
      <LinkCard {card} />
    {/each}
  </div>
</div>
