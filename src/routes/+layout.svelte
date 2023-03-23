<script>
  import "../app.css";
  import Menu from "../lib/shared/components/sidebar/Menu.svelte";
</script>

<div class="bg-gray-900 text-white flex min-h-screen">
  <div class="p-5 border-r border-gray-500">
    <h1 class="font-bold text-2xl py-4">Prometheus Omega</h1>
    <Menu />
  </div>
  <div class="">
    <slot />
  </div>
</div>
