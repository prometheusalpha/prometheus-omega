<script lang="ts">
  import { Clipboard, Trash, Check } from "svelte-heros-v2";

  export let deleteLink: () => void;
  export let copyLink: () => void;

  let isCopied: boolean = false;

  let copyLinkEffect = () => {
    copyLink();
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 1000);
  };
</script>

<div class="space-y-2 rounded bg-zinc-800 px-3 py-3">
  <button
    class="flex w-full items-center gap-2 rounded p-2 text-red-400 hover:bg-red-500/20"
    on:click={deleteLink}
  >
    <Trash class="h-5 w-5" />
    Delete</button
  >
  <button
    class="flex w-full items-center gap-2 rounded p-2 text-zinc-400 hover:bg-zinc-500/20"
    on:click={copyLinkEffect}
  >
    {#if isCopied}
      <Check class="h-5 w-5 text-green-400" />
      Copy
    {:else}
      <Clipboard class="h-5 w-5" />
      Copy
    {/if}
  </button>
</div>
