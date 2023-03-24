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
      class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
      >New link</label
    >
    <form action="?/update" method="post" bind:this={form} class="flex gap-5">
      <input
        type="text"
        id="link"
        name="link"
        class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
        placeholder="https://example.com"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >Add</button
      >
    </form>
  </div>

  <!-- loop the links -->
  <div class="space-y-5">
    {#each cards as card}
      <LinkCard {card} />
    {/each}
  </div>
</div>
