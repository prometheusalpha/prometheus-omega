<script lang="ts">
  import LinkCard from "./LinkCard.svelte";
  import type { ActionData, PageData } from "./$types";
  export let data: PageData;
  export let form: ActionData;

  let { session, cards } = data;

  let deleteLink = async (id: string) => {
    cards = cards.filter((card: any) => card.id !== id);
    let form = new FormData();
    form.append("id", id);
    await fetch(`?/delete`, {
      method: "POST",
      headers: {},
      body: form,
    });
  };
</script>

<div class="p-5">
  <h1 class="py-5 text-4xl font-bold">Links</h1>

  <!-- input new link -->
  <div class="py-5">
    <label
      for="first_name"
      class="mb-2 block text-sm font-medium text-zinc-900 dark:text-white"
      >New link</label
    >
    <form action="?/update" method="post" bind:this={form} class="flex gap-5">
      <input
        type="text"
        id="link"
        name="link"
        class="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400 dark:focus:border-green-500 dark:focus:ring-green-500"
        placeholder="https://example.com"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center rounded-lg bg-green-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >Add</button
      >
    </form>
  </div>

  <!-- loop the links -->
  <div class="space-y-5">
    {#each cards as card}
      <div class="items-center gap-4 md:flex">
        <LinkCard {card} {deleteLink}/>
        <button
          class="text-zinc-500 max-md:hidden"
          on:click={() => deleteLink(card.id)}>Delete</button
        >
      </div>
    {/each}
  </div>
</div>
