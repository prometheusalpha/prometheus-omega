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

  let addOnEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addLink(e);
    }
  };

  let addLink = async (e: Event) => {
    e.preventDefault();
    let form = new FormData();
    form.append("link", (e.target as HTMLInputElement).value);
    let res = await fetch(`?/update`, {
      method: "POST",
      headers: {},
      body: form,
    });
    let data = await res.json();
    cards = [...cards, data];
    (e.target as HTMLInputElement).value = "";
  };
</script>

<div class="p-5">
  <h1 class="py-10 text-6xl">your links</h1>

  <!-- input new link -->
  <div class="py-5">
    <form
      action="?/update"
      method="post"
      bind:this={form}
      class="flex max-lg:flex-wrap items-center"
    >
      <label
        for="first_name"
        class="text-4xl text-zinc-900 dark:text-white"
        >i will remember
      </label>
      <input
        type="text"
        id="link"
        name="link"
        on:keydown={addOnEnter}
        class="min-w-0 block grow rounded-lg bg-transparent max-lg:py-2 lg:p-2.5 text-4xl text-zinc-900 focus:outline-none dark:text-white dark:placeholder-zinc-600"
        placeholder="https://example.com"
        required
      />
    </form>
  </div>

  <!-- loop the links -->
  <div class="grid gap-5 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
    {#each cards as card}
      <div class="items-center gap-4 md:flex">
        <LinkCard {card} {deleteLink} />
      </div>
    {/each}
  </div>
</div>
