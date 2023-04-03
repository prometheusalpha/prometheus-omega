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

<div class="dark relative flex h-screen bg-zinc-950 text-white max-md:flex-col">
  <div
    class="z-[12] h-screen border-r border-zinc-700 bg-zinc-950 px-4 py-3 max-md:hidden max-md:w-[50vw]"
  >
    <Menu />
  </div>
  <div class="z-10 grow overflow-y-auto md:h-screen">
    {#if isPageLoaded}
      <div class="bg-zinc-950 md:h-screen">
        <slot />
      </div>
    {/if}
  </div>
  <div class="bottom-0 z-[13] w-screen md:hidden">
    <Nav />
  </div>
</div>
