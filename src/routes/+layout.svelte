<script lang="ts">
  import "../app.css";
  import Menu from "../lib/shared/components/sidebar/Menu.svelte";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  let isPageLoaded = false;

  $: ({ supabase } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange(() => {
      invalidate("supabase:auth");
    });

    isPageLoaded = true;

    return () => data.subscription.unsubscribe();
  });
</script>

<div class="bg-zinc-900 text-white flex min-h-screen">
  <div
    class="w-[20rem] min-w-[20rem] max-w-[20rem] p-5 border-r border-zinc-700"
  >
    <h1 class="font-bold text-2xl py-4">Prometheus Omega</h1>
    <Menu />
  </div>
  {#if isPageLoaded}
    <div class="w-[calc(100vw-20rem)]">
      <slot />
    </div>
  {/if}
</div>
