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

<div class="relative flex h-screen bg-zinc-900 text-white max-md:flex-col dark">
  <div
    class="z-[12] h-screen border-r border-zinc-700 bg-zinc-900 px-4 py-3 max-md:hidden max-md:w-[50vw]"
  >
    <Menu />
  </div>
  <div class="z-10 md:h-screen grow overflow-y-auto">
    {#if isPageLoaded}
      <div class="bg-zinc-900 md:h-screen">
        <slot />
      </div>
    {/if}
  </div>
  <div class="bottom-0 z-[13] w-screen md:hidden">
    <Nav />
  </div>
</div>
