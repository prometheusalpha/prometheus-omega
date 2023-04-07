<script lang="ts">
  import type { LinkCardData } from "./+page.server";

  import ContextMenu from "./ContextMenu.svelte";
  import { AdjustmentsHorizontal } from "svelte-heros-v2";

  export let card: LinkCardData;
  export let deleteLink: (id: string) => void;
  let isContextMenuOpen = false;

  import noimage from "$shared/assets/noimage.jpg";

  // calc number of char to truncate arcording to screen size
  const truncate = () => {
    const size = window.innerWidth;
    if (size < 640) return 30;
    if (size < 768) return 40;
    if (size < 1024) return 50;
    if (size < 1280) return 60;
    if (size < 1536) return 70;
    if (size < 1920) return 80;
    return 90;
  };

  let truncateLength = truncate();

  window.addEventListener("resize", () => {
    truncateLength = truncate();
  });

  let copyLink = async () => {
    if (!card.link) return;
    await navigator.clipboard.writeText(card.link);
  };
</script>

<div class="relative w-full">
  {#await card.data}
    <a
      target="_blank"
      href={card.link}
      class="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-950"
    >
      <div class="relative flex grow flex-col justify-between p-4 pr-12">
        <h5
          class="text-md truncate break-all font-semibold tracking-tight text-zinc-950 dark:text-white"
        >
          {"Untitled"}
        </h5>
        <p class="truncate py-1 text-sm text-zinc-400">
          {"No description"}
        </p>
        <div class="truncate text-sm text-zinc-300">
          {"No description"}
        </div>
      </div>
      <img class="h-[12rem] rounded-b-lg object-cover" src={noimage} alt="" />
    </a>
  {:then data}
    <a
      target="_blank"
      href={card.link}
      class="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-950"
    >
      <div class="relative flex grow flex-col justify-between p-4 pr-12">
        <h5
          class="text-md truncate break-all font-semibold tracking-tight text-zinc-950 dark:text-white"
        >
          {data.ogTitle?.length > truncateLength
            ? data.ogTitle.substring(0, truncateLength) + "..."
            : data.ogTitle || "Untitled"}
        </h5>
        <p class="truncate py-1 text-sm text-zinc-400">
          {data.ogDescription?.length > truncateLength
            ? data.ogDescription.substring(0, truncateLength) + "..."
            : data.ogDescription || "No description"}
        </p>
        <div class="truncate text-sm text-zinc-300">
          {card.link?.length > truncateLength
            ? card.link.substring(0, truncateLength) + "..."
            : card.link || "No description"}
        </div>
      </div>
      <img
        class="h-[12rem] rounded-b-lg object-cover"
        src={data.ogImage || noimage}
        alt=""
      />
    </a>
    <button
      class="absolute right-2 top-2 rounded-lg p-2 hover:bg-zinc-800"
      on:click={() => (isContextMenuOpen = !isContextMenuOpen)}
    >
      <AdjustmentsHorizontal class="h-5 w-5 dark:text-zinc-400" />
    </button>
    {#if isContextMenuOpen}
      <div class="absolute right-2 top-12">
        <ContextMenu deleteLink={() => deleteLink(card.id)} {copyLink} />
      </div>
    {/if}
  {/await}
</div>
