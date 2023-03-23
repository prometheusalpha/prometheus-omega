<script lang="ts">
  import "../app.css";
  import Menu from "../lib/shared/components/sidebar/Menu.svelte";
  import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	$: ({ supabase } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<div class="bg-gray-900 text-white flex min-h-screen">
  <div class="min-w-xl p-5 border-r border-gray-500">
    <h1 class="font-bold text-2xl py-4">Prometheus Omega</h1>
    <Menu />
  </div>
  <div class="grow">
    <slot />
  </div>
</div>
