<script lang="ts">
  import type { LinkCardData } from "./+page.server";

  import { Trash } from "svelte-heros-v2";

  export let deleteLink: () => void;
</script>

<div class="rounded bg-zinc-800 px-3 py-3">
  <button
    class="flex items-center gap-2 text-red-400"
    on:click={() => deleteLink()}
  >
    <Trash class="h-5 w-5" />
    Delete</button
  >
</div>
