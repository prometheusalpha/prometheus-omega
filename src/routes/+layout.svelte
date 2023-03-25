<script lang="ts">
  import "../app.css";
  import Menu from "../lib/shared/components/sidebar/Menu.svelte";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";
  import Nav from "$lib/shared/components/sidebar/Nav.svelte";

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

<div class="relative min-h-screen bg-zinc-900 text-white">
  <div
    class="fixed z-[12] h-screen w-[16rem] border-r border-zinc-700 bg-zinc-900 p-5 max-md:hidden max-md:w-[50vw]"
  >
    <h1 class="py-4 text-2xl font-bold">Prometheus Omega</h1>
    <Menu />
  </div>
  <div class="fixed bottom-0 z-[13] w-screen md:hidden">
    <Nav />
  </div>
  {#if isPageLoaded}
    <div
      class="absolute top-0 right-0 z-10 min-h-screen bg-zinc-900 max-md:w-screen md:left-64"
    >
      <slot />
    </div>
  {/if}
</div>
